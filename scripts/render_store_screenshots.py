#!/usr/bin/env python3
"""Generate four English store PNGs from genuine Sudoku screenshots (Pillow 12.3)."""
from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

SIZE = (1280, 800)
ROOT = Path(__file__).resolve().parents[1]
NAMES = (
    '01-desktop-light-notes-highlights-1280x800.png',
    '02-desktop-dark-notes-highlights-1280x800.png',
    '03-mobile-light-1280x800.png',
    '04-one-click-launch-1280x800.png',
)
MOBILE_LEAD = 'Mobile-friendly layout'
LAUNCH_LEAD = 'Launch in one click'


def font(size: int, *, bold: bool = True) -> ImageFont.FreeTypeFont:
    candidates = (
        ('C:/Windows/Fonts/arialbd.ttf', 'C:/Windows/Fonts/arial.ttf'),
        ('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
         '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'),
        ('/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf',
         '/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf'),
    )
    for bold_file, regular_file in candidates:
        try:
            return ImageFont.truetype(bold_file if bold else regular_file, size)
        except OSError:
            pass
    raise RuntimeError('An Arial, DejaVu Sans, or Liberation Sans font is required.')


def open_image(file: Path) -> Image.Image:
    if not file.is_file():
        raise FileNotFoundError(f'Missing genuine source screenshot: {file}')
    with Image.open(file) as img:
        img.load()
        return img.convert('RGB')


def background() -> Image.Image:
    canvas = Image.new('RGB', SIZE)
    draw = ImageDraw.Draw(canvas)
    for y in range(SIZE[1]):
        t = y / (SIZE[1] - 1)
        color = (int(235 + 8*t), int(250 - 9*t), int(249 - 3*t))
        draw.line((0, y, SIZE[0], y), fill=color)
    return canvas


def surface(canvas: Image.Image, box: tuple[int, int, int, int], radius: int = 25) -> None:
    layer = Image.new('RGBA', SIZE, (0, 0, 0, 0))
    shadow = ImageDraw.Draw(layer)
    moved = (box[0] + 2, box[1] + 8, box[2] + 2, box[3] + 8)
    shadow.rounded_rectangle(moved, radius=radius, fill=(13, 44, 61, 43))
    layer = layer.filter(ImageFilter.GaussianBlur(13))
    canvas.paste(layer, (0, 0), layer)
    ImageDraw.Draw(canvas).rounded_rectangle(
        box, radius=radius, fill='white', outline='#d4e4e5', width=2
    )


def place_fit(canvas: Image.Image, image: Image.Image, rect: tuple[int, int, int, int]) -> None:
    x0, y0, x1, y1 = rect
    sized = ImageOps.contain(image, (x1 - x0, y1 - y0), Image.Resampling.LANCZOS)
    canvas.paste(sized, (x0 + (x1 - x0 - sized.width) // 2,
                         y0 + (y1 - y0 - sized.height) // 2))


def desktop(source: Image.Image) -> Image.Image:
    """Preserve the whole desktop capture, including every part of its grid."""
    return ImageOps.pad(source, SIZE, method=Image.Resampling.LANCZOS,
                        color=source.getpixel((0, 0)))


def regions_from_json(file: Path, source: Image.Image) -> dict[str, tuple[int, int, int, int]]:
    if not file.is_file():
        raise FileNotFoundError(f'Missing mobile DOM crop coordinates: {file}. Run npm.cmd run screenshots.')
    data = json.loads(file.read_text(encoding='utf-8'))
    if data.get('screenshotWidth') != source.width or data.get('screenshotHeight') != source.height:
        raise ValueError('Mobile screenshot dimensions and its DOM coordinates differ. Recapture both together.')
    found = {}
    for name in ('board', 'controls'):
        rect = data.get(name)
        if not isinstance(rect, dict) or any(not isinstance(rect.get(k), int) for k in ('x', 'y', 'width', 'height')):
            raise ValueError(f'Invalid mobile region coordinates: {name}')
        x, y, w, h = (rect[k] for k in ('x', 'y', 'width', 'height'))
        if x < 0 or y < 0 or w < 50 or h < 50 or x + w > source.width or y + h > source.height:
            raise ValueError(f'Mobile region is outside the genuine screenshot: {name}')
        found[name] = (x, y, x + w, y + h)
    if found['board'][3] > found['controls'][1]:
        raise ValueError('Mobile board must end before the number-pad panel starts.')
    return found


def mobile_crop_boxes(source: Image.Image, regions: dict[str, tuple[int, int, int, int]]
                      ) -> tuple[tuple[int, int, int, int], tuple[int, int, int, int]]:
    """Keep full board in both views, with the number pad in the second view."""
    board, controls = regions['board'], regions['controls']
    gap = controls[1] - board[3]
    upper_end = board[3] + min(12, max(1, gap - 1))
    lower_start = max(0, board[1] - 12)
    lower_end = min(source.height, controls[3] + 12)
    return (0, 0, source.width, upper_end), (0, lower_start, source.width, lower_end)


def phone(canvas: Image.Image, source: Image.Image, box: tuple[int, int, int, int]) -> None:
    """Present a genuine mobile crop inside a crisp device-shaped window."""
    x0, y0, x1, y1 = box
    surface(canvas, (x0, y0, x1, y1), radius=24)
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((x0, y0, x1, y1), radius=24,
                           outline='#193946', width=5)
    place_fit(canvas, source, (x0 + 14, y0 + 14, x1 - 14, y1 - 14))


def mobile(source: Image.Image, regions: dict[str, tuple[int, int, int, int]]) -> Image.Image:
    """Keep the earlier two-phone composition without cutting either Sudoku board."""
    canvas = background()
    draw = ImageDraw.Draw(canvas)
    draw.text((49, 263), 'Mobile-friendly', font=font(43), fill='#102b3b')
    draw.text((49, 323), 'layout', font=font(43), fill='#102b3b')
    draw.rounded_rectangle((50, 402, 153, 408), radius=3, fill='#159c8a')
    top, bottom = mobile_crop_boxes(source, regions)
    phone(canvas, source.crop(top), (502, 28, 859, 772))
    phone(canvas, source.crop(bottom), (871, 28, 1233, 772))
    return canvas


def arrow(draw: ImageDraw.ImageDraw, x: int, y: int, *, flip: bool = False) -> None:
    sign = -1 if flip else 1
    draw.line((x + sign*11, y - 10, x, y, x + sign*11, y + 10),
              fill='#536579', width=4, joint='curve')


def cursor() -> Image.Image:
    """A recognizable anti-aliased white mouse pointer with a dark outline."""
    scale = 4
    points = ((7, 6), (12, 72), (29, 55), (44, 89), (58, 82),
              (42, 50), (66, 50))
    outline = Image.new('RGBA', (80 * scale, 102 * scale))
    mask = ImageDraw.Draw(outline)
    mask.polygon([(x * scale, y * scale) for x, y in points], fill='white')
    mask.line([(x * scale, y * scale) for x, y in (*points, points[0])],
              fill='#142c40', width=4 * scale, joint='curve')
    return outline.resize((80, 102), Image.Resampling.LANCZOS)


def gameplay_crop(source: Image.Image) -> Image.Image:
    """Magnify the real board + number pad rather than the desktop's margins."""
    width = min(source.width, 1080)
    x0 = (source.width - width) // 2
    y0 = round(source.height * 0.19)
    return source.crop((x0, y0, x0 + width, source.height))


def launch(source: Image.Image, icon: Image.Image) -> Image.Image:
    """Illustrative browser chrome around a larger genuine Sudoku screenshot."""
    canvas = background()
    surface(canvas, (22, 18, 1258, 780), radius=23)
    draw = ImageDraw.Draw(canvas)

    # A real-looking two-level chrome: tab strip, then address and toolbar.
    draw.rounded_rectangle((25, 21, 1255, 101), radius=21, fill='#1f2f40')
    draw.rectangle((25, 83, 1255, 101), fill='#1f2f40')
    draw.rectangle((25, 101, 1255, 166), fill='#f6f9fc')
    draw.line((25, 166, 1255, 166), fill='#cdd7e1', width=2)
    for x, fill in ((66, '#f28b82'), (92, '#fbbc52'), (118, '#64cb8f')):
        draw.ellipse((x - 7, 56, x + 7, 70), fill=fill)
    draw.rounded_rectangle((166, 47, 457, 109), radius=14, fill='#f6f9fc')
    small_icon = icon.convert('RGBA').resize((28, 28), Image.Resampling.LANCZOS)
    canvas.paste(small_icon, (184, 63), small_icon)
    draw.text((224, 64), 'Sudoku', font=font(23), fill='#1b3343')
    draw.line((438, 72, 444, 78), fill='#637888', width=2)
    draw.line((444, 72, 438, 78), fill='#637888', width=2)
    draw.text((479, 54), '+', font=font(36, bold=False), fill='#e8f3f6')
    arrow(draw, 70, 132)
    arrow(draw, 119, 132, flip=True)
    draw.arc((149, 117, 171, 145), 30, 319, fill='#536579', width=3)
    draw.polygon([(169, 116), (176, 126), (164, 125)], fill='#536579')
    draw.rounded_rectangle((191, 111, 999, 156), radius=20, fill='#e7eef5')
    draw.ellipse((210, 126, 224, 140), outline='#7a8c9d', width=2)
    draw.text((239, 119), 'Sudoku', font=font(22, bold=False), fill='#576c7d')

    draw.ellipse((1025, 120, 1048, 143), outline='#5f7483', width=3)
    draw.line((1035, 113, 1035, 123), fill='#5f7483', width=3)
    for ix in (1070, 1098):
        draw.rounded_rectangle((ix, 123, ix+15, 139), radius=3, fill='#8193a4')
    draw.rounded_rectangle((1125, 110, 1227, 159), radius=15,
                           fill='#c8f6ed', outline='#16a792', width=3)
    extension_icon = icon.convert('RGBA').resize((41, 41), Image.Resampling.LANCZOS)
    canvas.paste(extension_icon, (1154, 114), extension_icon)
    for y in (127, 134, 141):
        draw.ellipse((1238, y, 1242, y+4), fill='#5e7285')

    # The gameplay preview is substantially larger than the former full-JPEG inset.
    # Its real 9x9 board remains intact; only external desktop margins and header
    # whitespace are omitted.
    preview = gameplay_crop(source)
    sized = ImageOps.contain(preview, (1100, 600), Image.Resampling.LANCZOS)
    x = 67
    y = 170 + (600 - sized.height) // 2
    surface(canvas, (x - 10, y - 8, x + sized.width + 10, y + sized.height + 8), radius=16)
    canvas.paste(sized, (x, y))

    # Compact, well-balanced label beside the cursor, not a detached headline.
    pill = (910, 232, 1240, 297)
    surface(canvas, pill, radius=21)
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle(pill, radius=21, fill='#14394a', outline='#1e5963', width=2)
    draw.text((929, 245), LAUNCH_LEAD, font=font(27), fill='#ffffff')

    # Pointer tip lands directly on the actual extension icon in the toolbar.
    pointer = cursor()
    canvas.paste(pointer, (1174, 122), pointer)
    return canvas


def generate(root: Path = ROOT) -> tuple[Path, ...]:
    screenshot_dir = root / 'docs/READMEs/screenshots'
    sources_dir = root / 'docs/store-assets/sources'
    destination = root / 'docs/store-assets/screenshots'
    light = open_image(screenshot_dir / 'screenshot_desktop_en.jpeg')
    dark = open_image(sources_dir / 'screenshot_desktop_en_dark.jpeg')
    mobile_source = open_image(screenshot_dir / 'screenshot_mobile_en.jpeg')
    if min(light.width, dark.width) < 1000 or min(light.height, dark.height) < 800:
        raise ValueError('Desktop source screenshots must be full-size, unzoomed captures.')
    if mobile_source.width > 650 or mobile_source.height < 800:
        raise ValueError('Mobile source must be a real tall-screen capture.')
    regions = regions_from_json(sources_dir / 'mobile-en-regions.json', mobile_source)
    icon_file = root / 'src-extension/icons/icon128.png'
    if not icon_file.is_file():
        raise FileNotFoundError(f'Missing installed extension icon: {icon_file}')
    with Image.open(icon_file) as file:
        icon = file.convert('RGBA')
    images = (desktop(light), desktop(dark), mobile(mobile_source, regions), launch(light, icon))
    destination.mkdir(parents=True, exist_ok=True)
    files = tuple(destination / name for name in NAMES)
    for image, file in zip(images, files, strict=True):
        image.save(file, 'PNG', optimize=True)
    return files


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=ROOT)
    args = parser.parse_args()
    for image_path in generate(args.root.resolve()):
        print(image_path)
