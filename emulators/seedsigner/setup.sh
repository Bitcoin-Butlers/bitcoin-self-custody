#!/bin/bash
# SeedSigner Web Emulator Setup
# Run SeedSigner in your browser — no hardware needed

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
INSTALL_DIR="$SCRIPT_DIR/seedsigner-emu"

echo "=== SeedSigner Web Emulator Setup ==="
echo ""

# Check Python 3
if ! command -v python3 &>/dev/null; then
    echo "ERROR: python3 not found. Install Python 3.9+ first."
    exit 1
fi

PYTHON_VERSION=$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')
echo "Found Python $PYTHON_VERSION"

# Check tkinter
if ! python3 -c "import tkinter" 2>/dev/null; then
    echo ""
    echo "WARNING: tkinter not found."
    echo "  macOS:   brew install python-tk"
    echo "  Ubuntu:  sudo apt install python3-tk"
    echo ""
fi

# Clone SeedSigner (no enteropositivo dependency)
if [ -d "$INSTALL_DIR/seedsigner" ]; then
    echo "SeedSigner source exists. Updating..."
    cd "$INSTALL_DIR/seedsigner" && git pull --ff-only 2>/dev/null || true
else
    echo "Cloning SeedSigner source..."
    mkdir -p "$INSTALL_DIR"
    cd "$INSTALL_DIR"
    git clone --depth 1 https://github.com/SeedSigner/seedsigner.git
fi

# Apply our emulator patches
echo "Applying emulator drivers..."
python3 "$SCRIPT_DIR/patches/apply.py" "$INSTALL_DIR/seedsigner/src"

# Create venv
echo "Setting up Python virtual environment..."
cd "$INSTALL_DIR"
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate

# Install deps
echo "Installing dependencies..."
pip install --quiet --upgrade pip
pip install --quiet Pillow setuptools embit dataclasses qrcode numpy
pip install --quiet opencv-python-headless
pip install --quiet websockets aiohttp
pip install --quiet pyzbar
pip install --quiet git+https://github.com/jreesun/urtypes.git@e0d0db277ec2339650343eaf7b220fffb9233241

deactivate

echo ""
echo "=== Setup complete! ==="
echo ""
echo "System dependencies needed:"
echo "  macOS:   brew install zbar python-tk"
echo "  Ubuntu:  sudo apt install libzbar0 python3-tk"
echo ""
echo "To run: bash $SCRIPT_DIR/run.sh"
echo "Then open http://localhost:8888"
