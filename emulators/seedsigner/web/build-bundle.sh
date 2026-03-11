#!/bin/bash
# Build SeedSigner source bundle for Pyodide (browser) emulator
# Strips CJK fonts and __pycache__ to minimize download size

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
EMU_DIR="$SCRIPT_DIR/.."
SS_SRC="$EMU_DIR/seedsigner-emu/seedsigner/src/seedsigner"
BUNDLE_DIR="$SCRIPT_DIR/bundle-staging"
OUTPUT="$SCRIPT_DIR/seedsigner-bundle.zip"

echo "Building SeedSigner browser bundle..."

# Clean staging
rm -rf "$BUNDLE_DIR"
mkdir -p "$BUNDLE_DIR/seedsigner"

# Copy source
cp -r "$SS_SRC"/* "$BUNDLE_DIR/seedsigner/"

# Remove __pycache__ directories
find "$BUNDLE_DIR" -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true

# Remove CJK and non-Latin fonts (saves ~21MB)
cd "$BUNDLE_DIR/seedsigner/resources/fonts"
rm -f NotoSansSC-Regular.ttf    # Chinese Simplified (10MB)
rm -f NotoSansKR-Regular.ttf    # Korean (5.9MB)
rm -f NotoSansJP-Regular.ttf    # Japanese (5.5MB)
rm -f NotoSansDevanagari-Regular.ttf  # Hindi (216KB)
rm -f NotoSansAR-Regular.ttf    # Arabic (192KB)
rm -f NotoSansTH-Regular.ttf    # Thai (48KB)
echo "  ✓ Stripped non-Latin fonts"

# Remove .pyc files
find "$BUNDLE_DIR" -name "*.pyc" -delete 2>/dev/null || true

# Create zip
cd "$BUNDLE_DIR"
rm -f "$OUTPUT"
zip -r "$OUTPUT" seedsigner/ -x "*.pyc" "*__pycache__*" > /dev/null
echo "  ✓ Created bundle: $(du -sh "$OUTPUT" | cut -f1)"

# Clean staging
rm -rf "$BUNDLE_DIR"

echo "Done! Bundle at: $OUTPUT"
