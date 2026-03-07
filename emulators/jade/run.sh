#!/bin/bash
# Run the Jade Web Emulator
# Starts the QEMU-based Jade emulator with web display on port 30122.

set -e

IMAGE="jade-qemu-web"

# Check if image exists
if ! docker image inspect "$IMAGE" &>/dev/null; then
    echo "ERROR: Docker image '$IMAGE' not found. Run setup.sh first."
    exit 1
fi

echo "Starting Jade Web Emulator..."
echo "  Web UI:  http://localhost:30122"
echo "  Serial:  tcp://localhost:30121"
echo ""
echo "Press Ctrl+C to stop."
echo ""

docker run --rm \
    -p 30121:30121 \
    -p 30122:30122 \
    -it "$IMAGE"
