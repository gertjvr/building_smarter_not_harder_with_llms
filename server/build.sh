#!/bin/bash

# Build and push script for reveal-multiplex Docker image to Azure Container Registry
# Usage: ./build.sh

set -e  # Exit on any error

# Configuration
ACR_NAME="dddoutback"
IMAGE_NAME="reveal-multiplex"
TAG="latest"
FULL_IMAGE_NAME="${ACR_NAME}.azurecr.io/${IMAGE_NAME}:${TAG}"

echo "Starting build and push process for ${FULL_IMAGE_NAME}"
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
echo "🔐 Checking Azure Container Registry login status (${ACR_NAME})..."
if ! az acr repository list --name "${ACR_NAME}" --output table &>/dev/null; then
    echo "Not logged in to ACR or need to authenticate. Logging in..."
    if ! az acr login --name "${ACR_NAME}"; then
        echo "❌ ACR login failed"
        exit 1
    fi
    echo "✅ ACR login successful"
else
    echo "✅ Already logged in to ACR"
fi

# Step 3: Build and push Docker image
echo "🐳 Building and pushing Docker image..."
echo "Platform: linux/amd64"
echo "Image: ${FULL_IMAGE_NAME}"

if ! docker buildx build \
  --platform linux/amd64 \
  -t "${FULL_IMAGE_NAME}" \
  --push \
  .; then
    echo "❌ Docker build and push failed"
    exit 1
fi

echo "✅ Docker image built and pushed successfully!"
echo "============================================="
echo "Image available at: ${FULL_IMAGE_NAME}"
