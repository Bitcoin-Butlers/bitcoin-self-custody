#!/usr/bin/env python3
"""
Apply emulator patches to SeedSigner source.

This script copies our driver overrides into the SeedSigner source tree
and patches any compatibility issues with newer firmware versions.

Run after cloning SeedSigner and before starting the emulator.
"""

import os
import shutil
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent.resolve()
EMULATOR_DIR = SCRIPT_DIR.parent
DRIVERS_DIR = EMULATOR_DIR / "drivers"
WEB_DIR = EMULATOR_DIR / "web"


# Last tested SeedSigner commit — update when verifying compatibility
LAST_TESTED_COMMIT = "5a91af00700d"
LAST_TESTED_DATE = "2026-02-26"


def check_seedsigner_version(seedsigner_src: Path):
    """Warn if SeedSigner source is newer than last tested."""
    import subprocess
    git_dir = seedsigner_src.parent  # .git is one level up from src/
    try:
        result = subprocess.run(
            ["git", "log", "-1", "--format=%H %ci"],
            cwd=git_dir, capture_output=True, text=True
        )
        if result.returncode == 0:
            parts = result.stdout.strip().split(" ", 1)
            commit = parts[0][:12]
            date = parts[1] if len(parts) > 1 else "unknown"
            print(f"  SeedSigner source: {commit} ({date})")
            if LAST_TESTED_COMMIT and not result.stdout.startswith(LAST_TESTED_COMMIT):
                print(f"  ⚠️  WARNING: Last tested with {LAST_TESTED_COMMIT} ({LAST_TESTED_DATE})")
                print(f"     Patches may need updating if firmware changed significantly.")
    except Exception:
        pass


def apply_patches(seedsigner_src: Path):
    """Apply all patches to the SeedSigner source tree."""
    ss = seedsigner_src / "seedsigner"

    print("Applying emulator patches...")
    check_seedsigner_version(seedsigner_src)

    # 1. Install virtualGPIO
    emulator_dir = ss / "emulator"
    emulator_dir.mkdir(exist_ok=True)
    (emulator_dir / "__init__.py").touch()
    shutil.copy(DRIVERS_DIR / "virtualGPIO.py", emulator_dir / "virtualGPIO.py")
    print("  ✓ virtualGPIO.py")

    # 2. Install web display driver as desktopDisplay.py
    shutil.copy(WEB_DIR / "webDisplay.py", emulator_dir / "desktopDisplay.py")
    print("  ✓ webDisplay.py → desktopDisplay.py")

    # 3. Override hardware drivers
    hw_dir = ss / "hardware"
    shutil.copy(DRIVERS_DIR / "buttons.py", hw_dir / "buttons.py")
    shutil.copy(DRIVERS_DIR / "camera.py", hw_dir / "camera.py")
    shutil.copy(DRIVERS_DIR / "pivideostream.py", hw_dir / "pivideostream.py")
    print("  ✓ buttons.py, camera.py, pivideostream.py")

    # 4. Patch renderer for is_screenshot_generator compatibility
    renderer_path = ss / "gui" / "renderer.py"
    if renderer_path.exists():
        content = renderer_path.read_text()
        if 'is_screenshot_generator' not in content:
            content = content.replace(
                'if self.display_type == DISPLAY_TYPE__ST7789:',
                'self.is_screenshot_generator = False\n        if self.display_type == DISPLAY_TYPE__ST7789:',
                1
            )
            renderer_path.write_text(content)
            print("  ✓ Patched renderer.py (is_screenshot_generator)")
        else:
            print("  ✓ renderer.py already compatible")

    # 5. Patch DisplayDriverFactory to return our web display
    display_driver_path = ss / "hardware" / "displays" / "display_driver.py"
    if display_driver_path.exists():
        content = display_driver_path.read_text()
        if 'desktopDisplay' not in content:
            old = 'def instantiate_display_driver'
            if old not in content:
                print("  ❌ ERROR: display_driver.py has changed — cannot find 'def instantiate_display_driver'")
                print("     SeedSigner may have refactored DisplayDriverFactory.")
                print("     Update patches/apply.py to match the new structure.")
                sys.exit(1)
            new = '''def instantiate_display_driver(*args, **kwargs):
        from seedsigner.emulator.desktopDisplay import desktopDisplay
        display_type = args[0] if args else kwargs.get("display_type", "st7789")
        width = kwargs.get("width", args[1] if len(args) > 1 else 240)
        height = kwargs.get("height", args[2] if len(args) > 2 else 240)
        return desktopDisplay(display_type=display_type, width=width, height=height)

    @staticmethod
    def _original_instantiate_display_driver'''
            content = content.replace(old, new, 1)
            display_driver_path.write_text(content)
            print("  ✓ Patched display_driver.py (use web display)")
        else:
            print("  ✓ display_driver.py already patched")

    # 6. Stub out picamera imports at module level
    # We handle this in server.py by injecting fake picamera modules

    print("Patches applied successfully!")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(f"Usage: python3 {sys.argv[0]} <path-to-seedsigner-src>")
        print("  e.g.: python3 apply.py ../seedsigner-emu/seedsigner/src")
        sys.exit(1)

    src_path = Path(sys.argv[1]).resolve()
    if not (src_path / "seedsigner").is_dir():
        print(f"Error: {src_path}/seedsigner not found")
        sys.exit(1)

    apply_patches(src_path)
