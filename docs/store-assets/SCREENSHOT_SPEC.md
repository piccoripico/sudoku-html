# Store screenshots — approved four-image specification (v1.9.0)

The **only** store-listing screenshots are these four English-language **1280 × 800 PNGs**, reused unchanged for Chrome Web Store, Microsoft Edge Add-ons, and Firefox Add-ons. Do not add a fifth screenshot, substitute other languages, change the aspect ratio, or omit a previously approved subject.

| Order and PNG filename in `docs/store-assets/screenshots/` | Content | Genuine source |
| --- | --- | --- |
| `01-desktop-light-notes-highlights-1280x800.png` | Desktop light; notes, red notes, completed-number and duplicate highlighting | `docs/READMEs/screenshots/screenshot_desktop_en.jpeg` |
| `02-desktop-dark-notes-highlights-1280x800.png` | The corresponding desktop dark view | `docs/store-assets/sources/screenshot_desktop_en_dark.jpeg` |
| `03-mobile-light-1280x800.png` | **Mobile-friendly layout**. Two device-framed genuine screenshot views: controls + complete board, then complete board + number pad. Neither view cuts through the board | `docs/READMEs/screenshots/screenshot_mobile_en.jpeg` plus `docs/store-assets/sources/mobile-en-regions.json` |
| `04-one-click-launch-1280x800.png` | **Launch in one click** placed in a compact pill adjacent to a crisp anti-aliased cursor targeting the extension icon. Recognizable browser window, distinct tab/address/toolbar rows, and a substantially enlarged genuine game screenshot | Light desktop JPEG plus `src-extension/icons/icon128.png` |

## Reproducible production

1. `npm run screenshots` builds the current app, captures the 25 localized README desktop/mobile JPEGs using Playwright, captures the actual English dark desktop JPEG, and measures the mobile **`#board` and `.sidebar .panel` rectangles**. The English region JSON and full-page mobile JPEG are always captured together.
2. `npm run screenshots:store` invokes `python scripts/render_store_screenshots.py` and uses Pillow to regenerate exactly four store PNGs. Playwright **never renders store compositions**. For image 03, the layout returns to two phone-like screenshots beside a single concise lead. The first view ends **after** the complete board; the second begins **before** the complete board and includes the number pad. Both image windows are driven by the actual board/pad DOM bounds, not a hard-coded screenshot height.
3. Preserve each source screenshot's aspect ratio. Never fabricate numbers, controls, text, notes, or a dark-mode appearance. The browser chrome in image 04 is an **illustrative browser frame**, not a claim that a real toolbar was captured; the game screenshot and extension icon are genuine.
4. Keep all 25-language README JPEGs in `docs/READMEs/screenshots/` unchanged by store compositing. Keep Chrome/Edge README badges in `docs/READMEs/badges/`. Keep only the approved four PNG outputs in `docs/store-assets/screenshots/`.
5. Quality gate: `python -m unittest discover -s tests -p test_render_store_screenshots.py -v`; `npm run verify`; visually inspect all four 1280×800 PNGs in English, especially **all 81 squares in both mobile crops**, the browser window/tab/address bar/extension toolbar icon, the anti-aliased pointer, the adjacent pill label, and the larger Sudoku preview. The source region JSON must match its JPEG or rendering fails rather than guessing.

## Iteration: 03 and 04 only

- 01 and 02 must be byte-identical when regenerated from unchanged inputs; their generators are not redesigned.
- 03 uses the earlier two-phone composition but **never truncates a board**. The first phone shows app header/controls through the bottom of the 9×9 board. The second shows the same complete board followed by the number pad. The only headline is `Mobile-friendly layout`; no additional claims.
- 04 displays a full, recognizable illustrative browser tab + address/toolbar at the top, with the actual extension icon highlighted and a high-resolution, correctly shaped mouse cursor targeting it. `Launch in one click` appears inside a restrained rounded label immediately near the cursor. Crop the existing desktop source to the board-and-pad gameplay region **without cutting off the board**, rather than fitting the full desktop JPEG into a small inset. This is a marketing composition, not a purported browser screenshot.
