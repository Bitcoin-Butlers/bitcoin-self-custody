#!/bin/bash
# Build SeedSigner source bundle for Pyodide (browser) emulator
# Includes SeedSigner source + Python dependencies (embit, qrcode, urtypes)
# Strips CJK fonts and __pycache__ to minimize download size

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
EMU_DIR="$SCRIPT_DIR/.."
SS_SRC="$EMU_DIR/seedsigner-emu/seedsigner/src/seedsigner"
VENV_PKGS="$EMU_DIR/seedsigner-emu/venv/lib/python3.12/site-packages"
BUNDLE_DIR="$SCRIPT_DIR/bundle-staging"
OUTPUT="$SCRIPT_DIR/seedsigner-bundle.zip"

echo "Building SeedSigner browser bundle..."

# Clean staging
rm -rf "$BUNDLE_DIR"
mkdir -p "$BUNDLE_DIR/seedsigner"

# Copy SeedSigner source
cp -r "$SS_SRC"/* "$BUNDLE_DIR/seedsigner/"

# Copy Python dependencies
for pkg in embit qrcode urtypes; do
  if [ -d "$VENV_PKGS/$pkg" ]; then
    cp -r "$VENV_PKGS/$pkg" "$BUNDLE_DIR/$pkg"
    echo "  ✓ Bundled $pkg"
  else
    echo "  ✗ WARNING: $pkg not found in venv!"
  fi
done

# Also copy cbor2 if urtypes needs it
if [ -d "$VENV_PKGS/cbor2" ]; then
  cp -r "$VENV_PKGS/cbor2" "$BUNDLE_DIR/cbor2"
  echo "  ✓ Bundled cbor2"
fi

# Remove __pycache__ directories
find "$BUNDLE_DIR" -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true

# Remove CJK and non-Latin fonts (saves ~21MB)
cd "$BUNDLE_DIR/seedsigner/resources/fonts"
rm -f NotoSansSC-Regular.ttf NotoSansKR-Regular.ttf NotoSansJP-Regular.ttf
rm -f NotoSansDevanagari-Regular.ttf NotoSansAR-Regular.ttf NotoSansTH-Regular.ttf
echo "  ✓ Stripped non-Latin fonts"

# Remove prebuilt C libraries from embit (we use pure Python fallback)
rm -rf "$BUNDLE_DIR/embit/util/prebuilt" 2>/dev/null || true
echo "  ✓ Stripped embit prebuilt binaries"

# Remove .pyc files
find "$BUNDLE_DIR" -name "*.pyc" -delete 2>/dev/null || true

# Create zip
cd "$BUNDLE_DIR"
rm -f "$OUTPUT"
zip -r "$OUTPUT" . -x "*.pyc" "*__pycache__*" > /dev/null
echo "  ✓ Created bundle: $(du -sh "$OUTPUT" | cut -f1)"

# Clean staging
rm -rf "$BUNDLE_DIR"

echo "Done! Bundle at: $OUTPUT"
