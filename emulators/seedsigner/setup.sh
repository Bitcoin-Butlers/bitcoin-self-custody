#!/bin/bash
# SeedSigner Web Emulator Setup
# Run SeedSigner in your browser — no hardware needed
# Tested on: macOS, Ubuntu, Debian

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

# Check tkinter (still needed by some SeedSigner internals)
if ! python3 -c "import tkinter" 2>/dev/null; then
    echo ""
    echo "WARNING: tkinter not found. Installing it is recommended."
    echo "  macOS:   brew install python-tk"
    echo "  Ubuntu:  sudo apt install python3-tk"
    echo ""
fi

# Clone SeedSigner
if [ -d "$INSTALL_DIR" ]; then
    echo "Directory exists. Updating..."
    cd "$INSTALL_DIR/seedsigner" && git pull --ff-only 2>/dev/null || true
    cd "$INSTALL_DIR/seedsigner-emulator" && git pull --ff-only 2>/dev/null || true
else
    echo "Cloning SeedSigner source..."
    mkdir -p "$INSTALL_DIR"
    cd "$INSTALL_DIR"
    git clone --depth 1 https://github.com/SeedSigner/seedsigner.git

    echo "Cloning emulator overlay..."
    git clone --depth 1 https://github.com/enteropositivo/seedsigner-emulator.git
fi

# Merge emulator files
echo "Applying emulator overlay..."
cd "$INSTALL_DIR"
cp -r seedsigner-emulator/seedsigner/* seedsigner/src/seedsigner/

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
pip install --quiet Pillow setuptools embit dataclasses qrcode opencv-python-headless
pip install --quiet websockets aiohttp
pip install --quiet git+https://github.com/enteropositivo/pyzbar.git@a52ff0b2e8ff714ba53bbf6461c89d672a304411#egg=pyzbar
pip install --quiet git+https://github.com/jreesun/urtypes.git@e0d0db277ec2339650343eaf7b220fffb9233241

deactivate

echo ""
echo "=== Setup complete! ==="
echo ""
echo "To run the web emulator:"
echo "  bash $SCRIPT_DIR/run.sh"
echo ""
echo "Then open http://localhost:8888 in your browser."
