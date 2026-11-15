# Sudoku branding assets

The user-approved, edge-to-edge 3×3 icon was rebuilt as editable vector artwork. The **single source of truth** is [`icon-master.svg`](icon-master.svg); the previously shipped low-resolution icon has been replaced. Keep exactly nine rounded tiles, yellow top-left and lower-right, teal middle with navy 9, and six off-white tiles.

Use `python -m pip install -r docs/branding/requirements.txt` and `python scripts/render_brand_assets.py` to regenerate assets. The export script reads `icon-master.svg` and does **not** rescale an old 128px PNG.

- `src-extension/icons/icon16.png`, `icon32.png`, `icon48.png`, `icon128.png`: extension icons (Chrome, Edge and Firefox).
- `icon-{180,192,256,512,1024}.png`: future iOS/PWA/Android and general publishing assets. Creating these does not constitute a native app build.
- `../store-assets/logos/store-logo-300x300.png`: 300×300 Edge / general store listing.
- `logo-lockup-{light,dark}.svg`: editable 1200×300 theme-specific logo with vector icon and live text; `*.png`: 1200×300 transparent exports. The header uses HTML/CSS for theme colors, not a baked text image. No vertical divider.
- `promo-{440x280,1400x560}.svg`: editable promo source; `../store-assets/promo-*.png`: optional store promo exports. **These are not screenshots.**
- `../READMEs/screenshots/`: desktop/mobile JPEGs in all 25 locales for the README and Game Guide.
- `../store-assets/screenshots/`: four English-only 1280×800 PNGs produced from real source screenshots with Pillow; dark-mode source stored in `../store-assets/sources/`.
- `../READMEs/badges/`: Chrome/Edge store badges referenced by localized READMEs.

See [`ICON_DESIGN.md`](ICON_DESIGN.md) for exact dimensions and quality gates. Verify store requirements again before submitting. Do not distribute any font binaries; SVG texts use ordinary browser-installed fallback fonts.
