#!/bin/bash

# Deploy script for reveal-multiplex to Azure Container Instances
# Usage: ./deploy.sh

set -e  # Exit on any error

# Configuration
RG="rg-ddd-outback"
ACI="aci-reveal-multiplex"
LOC="australiaeast"
ACR="dddoutback"
IMAGE="reveal-multiplex"
TAG="latest"
PORT=8080

echo "Starting deployment process for ${IMAGE}:${TAG}"
echo "============================================="

# Step 1: Check and login to Azure if needed
echo "🔐 Checking Azure login status..."
if ! az account show &>/dev/null; then
    echo "Not logged in to Azure. Logging in..."
    if ! az login; then
        echo "❌ Azure login failed"
        exit 1
    fi
    echo "✅ Azure login successful"
else
    echo "✅ Already logged in to Azure"
fi

# Step 2: Check and login to Azure Container Registry if needed
echo "🔐 Checking Azure Container Registry login status (${ACR})..."
if ! az acr repository list --name "${ACR}" --output table &>/dev/null; then
    echo "Not logged in to ACR or need to authenticate. Logging in..."
    if ! az acr login --name "${ACR}"; then
        echo "❌ ACR login failed"
        exit 1
    fi
    echo "✅ ACR login successful"
else
    echo "✅ Already logged in to ACR"
fi

# Step 3: Get ACR login server
echo "🔍 Getting ACR login server..."
LOGIN_SERVER=$(az acr show -n "$ACR" --query loginServer -o tsv)

# Step 4: Check and delete existing ACI instance if it exists
echo "🗑️  Checking for existing ACI instance..."
if az container show -g "$RG" -n "$ACI" &>/dev/null; then
    echo "Existing ACI instance found. Deleting..."
    if ! az container delete -g "$RG" -n "$ACI" --yes; then
        echo "❌ Failed to delete existing ACI instance"
        exit 1
    fi
    echo "✅ Existing ACI instance deleted successfully"
else
    echo "✅ No existing ACI instance found"
fi

# Step 5: Deploy to Azure Container Instances
echo "🚀 Deploying to Azure Container Instances..."
echo "Container Instance: ${ACI}"
echo "Image: ${LOGIN_SERVER}/${IMAGE}:${TAG}"

# recreate with new port and HTTPS support
if ! az container create \
  -g "$RG" -n "$ACI" -l "$LOC" \
  --image "$LOGIN_SERVER/$IMAGE:$TAG" \
  --os-type Linux \
  --cpu 1 \
  --memory 1.5 \
  --ports $PORT \
  --ip-address Public \
  --dns-name-label "reveal-multiplex-$RANDOM" \
  --registry-login-server "$LOGIN_SERVER" \
  --registry-username "$(az acr credential show -n $ACR --query username -o tsv)" \
  --registry-password "$(az acr credential show -n $ACR --query passwords[0].value -o tsv)" \
  --environment-variables NODE_ENV=production PORT=$PORT; then
    echo "❌ Container deployment failed"
    exit 1
fi

echo "✅ Container deployed successfully!"

# Get the FQDN of the deployed container
echo "🔗 Getting container access URL..."
FQDN=$(az container show -g "$RG" -n "$ACI" --query ipAddress.fqdn -o tsv)

if [ -n "$FQDN" ]; then
    echo "URL: http://${FQDN}:${PORT}"
else
    echo "⚠️  Could not retrieve container FQDN. Check the Azure portal for access details."
fi

echo "============================================="
