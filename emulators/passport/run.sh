#!/bin/bash
# Run the Passport Simulator
# Launches the color simulator by default. Pass 'mono' for monochrome.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PASSPORT_DIR="$SCRIPT_DIR/passport2"
MODE="${1:-color}"

if [ ! -d "$PASSPORT_DIR" ]; then
    echo "ERROR: passport2 not found. Run setup.sh first."
    exit 1
fi

if ! command -v just &>/dev/null; then
    echo "ERROR: 'just' not found. Install with: cargo install just"
    exit 1
fi

# Verify mpy-cross was built
if [ ! -f "$PASSPORT_DIR/mpy-cross/build/mpy-cross" ]; then
    echo "ERROR: mpy-cross not built. Run setup.sh first."
    exit 1
fi

echo "Starting Passport Simulator ($MODE)..."
echo "  Display: $MODE"
echo "  Webcam: auto-detected via OpenCV"
echo ""
cd "$PASSPORT_DIR/simulator"
just sim "$MODE"
