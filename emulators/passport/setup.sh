#!/bin/bash
# Passport Simulator Setup
# Automates the build process for Foundation's official Passport simulator

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
INSTALL_DIR="$SCRIPT_DIR/passport2"

echo "=== Passport Simulator Setup ==="
echo ""

# Detect OS
OS="$(uname -s)"
ARCH="$(uname -m)"

# Check required tools
check_cmd() {
    if ! command -v "$1" &>/dev/null; then
        echo "ERROR: $1 not found."
        echo "  $2"
        exit 1
    fi
}

check_cmd python3 "Install Python 3.8+"
check_cmd rustc "Install Rust: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"
check_cmd cargo "Install Rust: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"
check_cmd just "Install just: cargo install just"
check_cmd cbindgen "Install cbindgen: cargo install cbindgen"

# Check Rust version
RUST_VERSION=$(rustc --version | grep -oE '[0-9]+\.[0-9]+\.[0-9]+')
echo "Found Rust $RUST_VERSION"
if [ "$RUST_VERSION" != "1.77.1" ]; then
    echo "  ⚠️  Foundation recommends Rust 1.77.1. You have $RUST_VERSION."
    echo "  Run: rustup default 1.77.1"
    echo "  Continuing anyway (may work with other versions)..."
fi

# Check for SDL2
if [ "$OS" = "Darwin" ]; then
    if ! brew list sdl2 &>/dev/null; then
        echo "ERROR: SDL2 not found. Install with: brew install sdl2"
        exit 1
    fi
else
    if ! pkg-config --exists sdl2 2>/dev/null; then
        echo "ERROR: SDL2 not found. Install with: sudo apt install libsdl2-dev"
        exit 1
    fi
fi
echo "Found SDL2"

# Check for arm-none-eabi-gcc (needed for mpy-cross)
if ! command -v arm-none-eabi-gcc &>/dev/null; then
    echo ""
    echo "WARNING: arm-none-eabi-gcc not found."
    if [ "$OS" = "Darwin" ]; then
        echo "  Install with: brew install --cask gcc-arm-embedded"
    else
        echo "  Install with: sudo apt install gcc-arm-none-eabi"
    fi
    echo ""
    echo "This is required to build the firmware. Install it and re-run setup."
    exit 1
fi
echo "Found arm-none-eabi-gcc"

# Clone passport2
if [ -d "$INSTALL_DIR" ]; then
    echo "passport2 source exists. Updating..."
    cd "$INSTALL_DIR" && git pull --ff-only 2>/dev/null || true
else
    echo "Cloning passport2 (this may take a minute)..."
    # Full clone needed — build system uses git history for version info
    git clone https://github.com/Foundation-Devices/passport2.git "$INSTALL_DIR"
fi

# Set up Rust targets
echo "Configuring Rust targets..."
rustup target add thumbv7em-none-eabihf 2>/dev/null || true
if [ "$ARCH" = "arm64" ] && [ "$OS" = "Darwin" ]; then
    rustup target add aarch64-unknown-none 2>/dev/null || true
fi

# Build mpy-cross
echo "Building mpy-cross..."
cd "$INSTALL_DIR"
if ! make -C mpy-cross -j$(nproc 2>/dev/null || sysctl -n hw.ncpu) 2>&1 | tail -10; then
    echo ""
    echo "ERROR: mpy-cross build failed."
    echo "  Check that arm-none-eabi-gcc and autotools are installed correctly."
    echo "  See README.md for manual setup instructions."
    exit 1
fi
echo "  ✓ mpy-cross built"

# Install Python deps
echo "Installing Python dependencies..."
# Foundation requires Pillow 8.4.0, but newer Python may need a newer version
pip3 install --quiet Pillow==8.4.0 2>/dev/null || pip3 install --quiet Pillow
pip3 install --quiet opencv-python 2>/dev/null || pip3 install --quiet opencv-python-headless

echo ""
echo "=== Setup complete! ==="
echo ""
echo "To run the simulator:"
echo "  bash $SCRIPT_DIR/run.sh"
echo ""
echo "Or manually:"
echo "  cd $INSTALL_DIR/simulator"
echo "  just sim color    # Color display"
echo "  just sim mono     # Monochrome"
