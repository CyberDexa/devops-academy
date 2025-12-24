#!/bin/bash
# Build and run the DevOps Academy lab container

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMAGE_NAME="devops-academy-lab"
CONTAINER_NAME="devops-lab"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  🚀 DevOps Academy - Lab Environment Setup                   ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

echo "✓ Docker is running"

# Build the image
echo ""
echo "📦 Building lab container image..."
echo "   This may take a few minutes on first build..."
echo ""

docker build -t $IMAGE_NAME -f "$SCRIPT_DIR/Dockerfile.lab" "$SCRIPT_DIR"

echo ""
echo "✓ Image built successfully"
echo ""

# Run the container
echo "🚀 Starting lab container..."

# Stop existing container if running
docker rm -f $CONTAINER_NAME 2>/dev/null || true

# Run with interactive terminal
docker run -it \
    --name $CONTAINER_NAME \
    --hostname devops-lab \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v "$HOME/.kube:/home/learner/.kube:ro" \
    -v "$HOME/.aws:/home/learner/.aws:ro" \
    -v "$HOME/.azure:/home/learner/.azure:ro" \
    $IMAGE_NAME

echo ""
echo "Lab session ended."
