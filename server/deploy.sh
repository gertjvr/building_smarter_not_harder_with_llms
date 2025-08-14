#!/bin/bash

# Deploy script for reveal-multiplex to Azure Container Apps
# Usage: ./deploy.sh

set -e  # Exit on any error

# Configuration
RG="rg-ddd-outback"
ACA_ENV="ce-dddoutback"
ACA_APP="reveal-multiplex"
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

# Step 1.1: Install Container Apps extension if needed
echo "🔧 Ensuring Container Apps extension is installed..."
if ! az extension show --name containerapp &>/dev/null; then
    echo "Installing Container Apps extension..."
    az extension add --name containerapp --upgrade
    echo "✅ Container Apps extension installed"
else
    echo "✅ Container Apps extension already installed"
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

# Step 4: Create Container Apps Environment if it doesn't exist
echo "🏗️  Checking for Container Apps Environment..."
if ! az containerapp env show -g "$RG" -n "$ACA_ENV" &>/dev/null; then
    echo "Container Apps Environment not found. Creating..."
    if ! az containerapp env create -g "$RG" -n "$ACA_ENV" -l "$LOC"; then
        echo "❌ Failed to create Container Apps Environment"
        exit 1
    fi
    echo "✅ Container Apps Environment created successfully"
else
    echo "✅ Container Apps Environment already exists"
fi

# Step 5: Check and delete existing Container App if it exists
echo "🗑️  Checking for existing Container App..."
if az containerapp show -g "$RG" -n "$ACA_APP" &>/dev/null; then
    echo "Existing Container App found. Deleting..."
    if ! az containerapp delete -g "$RG" -n "$ACA_APP" --yes; then
        echo "❌ Failed to delete existing Container App"
        exit 1
    fi
    echo "✅ Existing Container App deleted successfully"
else
    echo "✅ No existing Container App found"
fi

# Step 6: Deploy to Azure Container Apps
echo "🚀 Deploying to Azure Container Apps..."
echo "Container App: ${ACA_APP}"
echo "Image: ${LOGIN_SERVER}/${IMAGE}:${TAG}"

# Create Container App with HTTPS ingress support
if ! az containerapp create \
  -g "$RG" -n "$ACA_APP" \
  --environment "$ACA_ENV" \
  --image "$LOGIN_SERVER/$IMAGE:$TAG" \
  --target-port $PORT \
  --ingress external \
  --cpu 1.0 \
  --memory 2.0Gi \
  --min-replicas 1 \
  --max-replicas 3 \
  --registry-server "$LOGIN_SERVER" \
  --registry-username "$(az acr credential show -n $ACR --query username -o tsv)" \
  --registry-password "$(az acr credential show -n $ACR --query passwords[0].value -o tsv)" \
  --env-vars NODE_ENV=production PORT=$PORT; then
    echo "❌ Container App deployment failed"
    exit 1
fi

echo "✅ Container App deployed successfully!"

echo "============================================="
