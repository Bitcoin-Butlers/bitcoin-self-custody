#!/bin/bash
# Launch SeedSigner Web Emulator (always restarts unless killed with SIGTERM/SIGINT)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
INSTALL_DIR="$SCRIPT_DIR/seedsigner-emu"

if [ ! -d "$INSTALL_DIR/venv" ]; then
    echo "Run setup.sh first!"
    exit 1
fi

cd "$INSTALL_DIR"
source venv/bin/activate

# On arm64 Macs with x86_64 Homebrew (zbar), run everything under Rosetta
RUN_PREFIX=""
if [ "$(uname -m)" = "arm64" ] && file /usr/local/lib/libzbar.dylib 2>/dev/null | grep -q x86_64; then
    echo "Detected x86_64 zbar on arm64 Mac — running via Rosetta"
    RUN_PREFIX="arch -x86_64"
fi

STOP=0
trap "STOP=1" SIGTERM SIGINT

while [ $STOP -eq 0 ]; do
    $RUN_PREFIX python3 "$SCRIPT_DIR/web/server.py"
    echo "SeedSigner exited. Restarting in 2s... (Ctrl+C to stop)"
    sleep 2
done
