# Sudoku icon and logo production contract

Base: v1.8.0 (`ed6e655`) -> clean v1.9.0 (`88bebcb`), not the rejected interim prototypes.
Approval: 2026-11-14. Reconstruct the approved large, almost edge-to-edge, 3×3 icon with nine separate rounded tiles, two accent colors (yellow and mint), and a large navy numeral `9` centered on the mint tile. Preserve upper-left and lower-right yellow tiles, six off-white tiles, navy rounded outer background, and minimal outer padding. Do not add a divider to the wordmark.

## Source of truth

- `docs/branding/icon-master.svg`: editable vector master for all raster icon exports. Do not upscale a 128px PNG. Solid colors and vector glyph outline preserve sharp edges on small icons.
- `scripts/render_brand_assets.py`: one reproducible export recipe (Python 3, Pillow, CairoSVG). Font files are never redistributed. Edit `icon-master.svg` for changes, then regenerate derived assets.
- `src-extension/icons/icon{16,32,48,128}.png`: Chrome, Edge, Firefox runtime and store package icons.
- `docs/branding/icon-{180,192,256,512,1024}.png`: potential iOS home-screen, PWA, Android, and full-resolution future use. These are export assets, not current native applications.
- `docs/store-assets/logos/store-logo-300x300.png`: Edge listing / general store icon export.
- `docs/branding/logo-lockup-{light,dark}.svg`: editable title text and accent bars, with exact vector icon embedded, no vertical separator. `*.png` are corresponding transparent 1200×300 exports.
- `docs/branding/promo-{440x280,1400x560}.svg` and `docs/store-assets/promo-{440x280,1400x560}.png`: optional store promotional artwork (not screenshot evidence).
- `docs/READMEs/screenshots/`: desktop/mobile JPEGs for all 25 locales.
- `docs/store-assets/screenshots/`: four English-only PNG compositions based on real desktop/mobile screenshots; the one-click icon banner is illustrative, not a browser screenshot.
- `docs/READMEs/badges/`: README store badges.

## Quality gates

All PNGs must have declared pixel dimensions and non-empty content. The four packaged sizes must match exports from the same vector master, with sufficiently large, centered tile layout and recognizable central 9. Store promo and logo exports must be reproducible. No theme-specific replacement of the icon is needed; the light/dark wordmark colors are already controlled via CSS. `src/index.html` uses one shared icon and `scripts/build.ts` embeds it in the standalone HTML.

Chrome icon 128×128, extension icons 16/32/48/128, screenshots 1280×800, optional promotional 440×280 and 1400×560. Edge listing PNG 300×300. Firefox uses the shared icon and screenshots. These requirements must be reconfirmed against store documentation before actual submission.
