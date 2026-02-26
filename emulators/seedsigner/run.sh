#!/bin/bash
# Launch SeedSigner Web Emulator
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
INSTALL_DIR="$SCRIPT_DIR/seedsigner-emu"

if [ ! -d "$INSTALL_DIR/venv" ]; then
    echo "Run setup.sh first!"
    exit 1
fi

cd "$INSTALL_DIR"
source venv/bin/activate
python3 "$SCRIPT_DIR/web/server.py"
