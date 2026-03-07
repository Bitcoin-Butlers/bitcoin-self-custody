#!/bin/bash
# Jade Emulator Setup
# Clones Blockstream's Jade firmware and builds the QEMU web emulator via Docker.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
JADE_DIR="$SCRIPT_DIR/Jade"

echo "=== Jade Web Emulator Setup ==="
echo ""

# Check Docker
if ! command -v docker &>/dev/null; then
    echo "ERROR: Docker is required."
    echo "  Install Docker Desktop: https://www.docker.com/products/docker-desktop"
    exit 1
fi

if ! docker info &>/dev/null 2>&1; then
    echo "ERROR: Docker daemon is not running. Start Docker Desktop first."
    exit 1
fi
echo "Found Docker"

# Clone Jade firmware
if [ -d "$JADE_DIR" ]; then
    echo "Jade source exists. Updating..."
    cd "$JADE_DIR" && git pull --ff-only 2>/dev/null || true
else
    echo "Cloning Blockstream Jade (this takes a minute)..."
    git clone --recursive https://github.com/Blockstream/Jade.git "$JADE_DIR"
fi

# Build QEMU image with web display
echo ""
echo "Building Jade QEMU image with web display (this takes 10-20 min first time)..."
echo "  Docker will cache layers - rebuilds are fast."
echo ""
cd "$JADE_DIR"
DOCKER_BUILDKIT=1 docker build \
    -t jade-qemu-web \
    -f Dockerfile.qemu \
    --build-arg QEMU_CONFIG_ARGS="--dev --psram --webdisplay" \
    .

echo ""
echo "=== Setup complete! ==="
echo ""
echo "Run the emulator:"
echo "  bash $SCRIPT_DIR/run.sh"
echo ""
echo "Then open http://localhost:30122 in your browser."
