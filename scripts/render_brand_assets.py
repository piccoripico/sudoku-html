#!/usr/bin/env python3
"""Export PNG icon, logo, and store promo assets from one editable SVG master."""
from __future__ import annotations

import io
import re
from pathlib import Path

import cairosvg
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BRANDING = ROOT / 'docs' / 'branding'
ICONS = ROOT / 'src-extension' / 'icons'
STORE = ROOT / 'docs' / 'store-assets'
MASTER = BRANDING / 'icon-master.svg'

SIZES = (16, 32, 48, 128)
FUTURE_SIZES = (180, 192, 256, 512, 1024)
# CSS used by the app header at the 1420px desktop capture size.
# Measured from the actual .brand-lockup, not guessed promo coordinates.
ICON_SIZE = 52
ICON_GAP = 12
WORDMARK_WIDTH = 126.609375
CAPTION_WIDTH = 28.09375
CAPTION_GAP = 8
TYPE_WIDTH = WORDMARK_WIDTH
LOCKUP_WIDTH = ICON_SIZE + ICON_GAP + TYPE_WIDTH
LOCKUP_HEIGHT = 52.59375
RULE_WIDTH = (TYPE_WIDTH - CAPTION_WIDTH - 2 * CAPTION_GAP) / 2
RULE_Y = 43.296875
CAPTION_X = ICON_SIZE + ICON_GAP + (TYPE_WIDTH - CAPTION_WIDTH) / 2


def svg_icon_contents() -> str:
    source = MASTER.read_text(encoding='utf-8')
    match = re.search(r'<svg\b[^>]*>(.*)</svg>\s*\Z', source, re.S)
    if match is None:
        raise ValueError('icon-master.svg has no root svg')
    return match.group(1)


def png_bytes(svg: str, width: int, height: int) -> bytes:
    scale = 3 if min(width, height) <= 48 else 1
    rendered = cairosvg.svg2png(bytestring=svg.encode('utf-8'), output_width=width * scale, output_height=height * scale)
    with Image.open(io.BytesIO(rendered)) as image:
        result = image.convert('RGBA')
        if scale > 1:
            result = result.resize((width, height), Image.Resampling.LANCZOS)
        out = io.BytesIO()
        result.save(out, 'PNG', optimize=True)
        return out.getvalue()


def save_png(file: Path, svg: str, width: int, height: int) -> None:
    file.parent.mkdir(parents=True, exist_ok=True)
    file.write_bytes(png_bytes(svg, width, height))


def svg_root(width: int, height: int, body: str) -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
        f'viewBox="0 0 {width} {height}">\n{body}\n</svg>\n'
    )


def icon_at(x: float, y: float, size: float, contents: str) -> str:
    scale = size / 1024
    return f'<g transform="translate({x} {y}) scale({scale})">{contents}</g>'


def lockup_body(contents: str, theme: str, scale: float, x: float, y: float) -> str:
    ink = '#F8FAFC' if theme == 'dark' else '#0F172A'
    teal = '#5EEAD4' if theme == 'dark' else '#0D9488'
    wordmark_x = ICON_SIZE + ICON_GAP
    right_rule_x = wordmark_x + TYPE_WIDTH - RULE_WIDTH
    return (
        f'<g transform="translate({x} {y}) scale({scale})">\n'
        f'{icon_at(0, (LOCKUP_HEIGHT - ICON_SIZE) / 2, ICON_SIZE, contents)}\n'
        f'<text id="wordmark" x="{wordmark_x}" y="31.7" data-width="{TYPE_WIDTH}" fill="{ink}" '
        f'font-family="Helvetica Neue, Arial, sans-serif" font-size="36" font-weight="800" '
        f'letter-spacing="-0.9">Sudoku</text>\n'
        f'<rect id="rule-left" x="{wordmark_x}" y="{RULE_Y}" width="{RULE_WIDTH}" '
        f'height="3" rx="1.5" fill="{teal}"/>\n'
        f'<text id="caption-text" x="{CAPTION_X + CAPTION_WIDTH / 2}" y="49.7" data-width="{CAPTION_WIDTH}" text-anchor="middle" '
        f'fill="{ink}" font-family="Noto Sans CJK JP, sans-serif" font-size="13" '
        f'font-weight="700" letter-spacing="1.04">数独</text>\n'
        f'<rect id="rule-right" x="{right_rule_x}" y="{RULE_Y}" width="{RULE_WIDTH}" '
        f'height="3" rx="1.5" fill="{teal}"/>\n'
        '</g>'
    )


def logo(theme: str, contents: str) -> str:
    scale = 4.0
    body = lockup_body(contents, theme, scale, (1200 - LOCKUP_WIDTH * scale) / 2, (300 - LOCKUP_HEIGHT * scale) / 2)
    return svg_root(1200, 300, body)


def promo(width: int, height: int, contents: str) -> str:
    scale = 1.8 if width == 440 else 5.8
    x = (width - LOCKUP_WIDTH * scale) / 2
    y = (height - LOCKUP_HEIGHT * scale) / 2
    body = (
        f'<rect width="{width}" height="{height}" fill="#F8FAFC"/>\n'
        f'{lockup_body(contents, "light", scale, x, y)}'
    )
    return svg_root(width, height, body)


def main() -> None:
    source = MASTER.read_text(encoding='utf-8')
    contents = svg_icon_contents()
    for size in SIZES:
        save_png(ICONS / f'icon{size}.png', source, size, size)
    for size in FUTURE_SIZES:
        save_png(BRANDING / f'icon-{size}.png', source, size, size)
    save_png(STORE / 'logos' / 'store-logo-300x300.png', source, 300, 300)
    for theme in ('light', 'dark'):
        svg = logo(theme, contents)
        (BRANDING / f'logo-lockup-{theme}.svg').write_text(svg, encoding='utf-8')
        save_png(BRANDING / f'logo-lockup-{theme}.png', svg, 1200, 300)
    for width, height in ((440, 280), (1400, 560)):
        svg = promo(width, height, contents)
        (BRANDING / f'promo-{width}x{height}.svg').write_text(svg, encoding='utf-8')
        save_png(STORE / f'promo-{width}x{height}.png', svg, width, height)


if __name__ == '__main__':
    main()
