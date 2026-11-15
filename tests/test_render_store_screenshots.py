"""TDD contract: four deterministic real-source PNGs and intact mobile board."""
from __future__ import annotations

import hashlib
import importlib.util
import json
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / 'scripts/render_store_screenshots.py'
spec = importlib.util.spec_from_file_location('render_store_screenshots', SCRIPT)
assert spec and spec.loader
renderer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(renderer)


class StoreScreenshotTests(unittest.TestCase):
    def fixture(self, folder: Path) -> None:
        readmes = folder / 'docs/READMEs/screenshots'
        sources = folder / 'docs/store-assets/sources'
        icons = folder / 'src-extension/icons'
        for path in (readmes, sources, icons):
            path.mkdir(parents=True, exist_ok=True)
        Image.new('RGB', (1420, 920), '#edf5fb').save(readmes / 'screenshot_desktop_en.jpeg')
        Image.new('RGB', (1420, 920), '#101b2b').save(sources / 'screenshot_desktop_en_dark.jpeg')
        src = Image.new('RGB', (390, 1380), '#fbfcfd')
        draw = ImageDraw.Draw(src)
        # Actual board occupies 390 x 390; all four border corners are distinct.
        draw.rectangle((8, 465, 381, 840), fill='#e8f1f7', outline='#152b3c', width=4)
        for rect, color in (
            ((15, 470, 47, 502), '#fa1313'), ((345, 470, 375, 502), '#14c720'),
            ((15, 810, 47, 835), '#1515fa'), ((345, 810, 375, 835), '#f3e018'),
        ):
            draw.rectangle(rect, fill=color)
        # Number pad begins after the board; no split may pass through it.
        draw.rectangle((8, 863, 381, 1341), fill='#ddfaf5', outline='#123f50', width=4)
        for x in range(40, 380, 115):
            for y in (905, 1010, 1115):
                draw.rounded_rectangle((x, y, x+80, y+65), radius=10,
                                       fill='white', outline='#5b6a77', width=3)
        src.save(readmes / 'screenshot_mobile_en.jpeg', quality=95)
        (sources / 'mobile-en-regions.json').write_text(json.dumps({
            'screenshotWidth': 390,
            'screenshotHeight': 1380,
            'board': {'x': 8, 'y': 465, 'width': 374, 'height': 376},
            'controls': {'x': 8, 'y': 863, 'width': 374, 'height': 479},
        }), encoding='utf-8')
        Image.new('RGBA', (128, 128), '#04b89e').save(icons / 'icon128.png')

    def test_png_names_dimensions_sources_and_determinism(self):
        with TemporaryDirectory() as temp:
            root = Path(temp)
            self.fixture(root)
            files = renderer.generate(root)
            self.assertEqual(tuple(path.name for path in files), renderer.NAMES)
            first = []
            for file in files:
                with Image.open(file) as image:
                    self.assertEqual(image.format, 'PNG')
                    self.assertEqual(image.size, (1280, 800))
                first.append(hashlib.sha256(file.read_bytes()).hexdigest())
            self.assertEqual(len(set(first)), 4)
            renderer.generate(root)
            self.assertEqual(first, [hashlib.sha256(p.read_bytes()).hexdigest() for p in files])
            self.assertEqual(set(p.name for p in files), set(p.name for p in files[0].parent.iterdir()))

    def test_mobile_both_phone_views_show_an_uncut_board(self):
        with TemporaryDirectory() as temp:
            root = Path(temp)
            self.fixture(root)
            output = renderer.generate(root)[2]
            # The earlier two-phone composition is kept, but board corners must
            # appear together in EACH complete rendered phone view.
            regions = ((502, 24, 861, 774), (865, 24, 1237, 774))
            expected = ((250, 19, 19), (20, 199, 32), (21, 21, 250), (243, 224, 24))
            with Image.open(output) as image:
                for region in regions:
                    pixels = image.crop(region).get_flattened_data()
                    for target in expected:
                        self.assertTrue(any(max(abs(p[i] - target[i]) for i in range(3)) < 35
                                            for p in pixels),
                                        f'Mobile phone view {region} lost board corner {target}')
            self.assertEqual(renderer.MOBILE_LEAD, 'Mobile-friendly layout')

    def test_mobile_crop_boundaries_follow_board_geometry_not_fixed_rows(self):
        with TemporaryDirectory() as temp:
            root = Path(temp)
            self.fixture(root)
            source = renderer.open_image(root / 'docs/READMEs/screenshots/screenshot_mobile_en.jpeg')
            regions = renderer.regions_from_json(root / 'docs/store-assets/sources/mobile-en-regions.json', source)
            top, bottom = renderer.mobile_crop_boxes(source, regions)
            self.assertLessEqual(top[1], regions['board'][1])
            self.assertGreaterEqual(top[3], regions['board'][3])
            self.assertLessEqual(bottom[1], regions['board'][1])
            self.assertGreaterEqual(bottom[3], regions['controls'][3])
            self.assertLess(top[3], regions['controls'][1])  # no half Number Pad

    def test_browser_tab_toolbar_and_caret_are_distinct(self):
        with TemporaryDirectory() as temp:
            root = Path(temp)
            self.fixture(root)
            file = renderer.generate(root)[3]
            with Image.open(file) as image:
                self.assertLess(sum(image.getpixel((34, 72))), 240)
                self.assertGreater(sum(image.getpixel((34, 130))), 680)
                green = image.getpixel((1174, 132))
                self.assertGreater(green[1], green[0])
                # Label is a real filled pill immediately under the extension
                # icon/cursor, not free-floating text in the body area.
                self.assertLess(sum(image.getpixel((925, 250))), 450)
            cursor = renderer.cursor()
            self.assertEqual(cursor.mode, 'RGBA')
            bounds = cursor.getchannel('A').getbbox()
            self.assertIsNotNone(bounds)
            self.assertGreaterEqual(bounds[2] - bounds[0], 50)
            self.assertGreaterEqual(bounds[3] - bounds[1], 75)
            self.assertEqual(renderer.LAUNCH_LEAD, 'Launch in one click')

    def test_launch_preview_is_magnified_and_contains_genuine_gameplay(self):
        with TemporaryDirectory() as temp:
            root = Path(temp)
            self.fixture(root)
            file = root / 'docs/READMEs/screenshots/screenshot_desktop_en.jpeg'
            with Image.open(file) as original:
                marked = original.convert('RGB')
            # A synthetic marker in the source lets the test measure actual
            # screenshot scale without allowing the renderer to invent pixels.
            ImageDraw.Draw(marked).rectangle((200, 300, 1200, 885), fill='#ed8624')
            marked.save(file, quality=98)
            output = renderer.generate(root)[3]
            with Image.open(output) as rendered:
                found = []
                for y in range(255, 777, 3):
                    for x in range(100, 1170, 3):
                        r, g, b = rendered.getpixel((x, y))
                        if r > 170 and 80 < g < 185 and b < 90:
                            found.append((x, y))
                self.assertTrue(found)
                self.assertGreater(max(x for x, _ in found) - min(x for x, _ in found), 720)
                self.assertGreater(max(y for _, y in found) - min(y for _, y in found), 380)

    def test_stale_or_inaccurate_mobile_regions_are_rejected(self):
        with TemporaryDirectory() as temp:
            root = Path(temp)
            self.fixture(root)
            file = root / 'docs/store-assets/sources/mobile-en-regions.json'
            region_data = json.loads(file.read_text(encoding='utf-8'))
            region_data['board']['height'] = 1600
            file.write_text(json.dumps(region_data), encoding='utf-8')
            with self.assertRaisesRegex(ValueError, 'outside the genuine screenshot'):
                renderer.generate(root)

    def test_missing_dark_source_is_not_synthetically_repainted(self):
        with TemporaryDirectory() as temp:
            root = Path(temp)
            self.fixture(root)
            (root / 'docs/store-assets/sources/screenshot_desktop_en_dark.jpeg').unlink()
            with self.assertRaises(FileNotFoundError):
                renderer.generate(root)


if __name__ == '__main__':
    unittest.main()
