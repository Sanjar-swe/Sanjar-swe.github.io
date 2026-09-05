#!/usr/bin/env python3
"""Rebuild the raster brand assets in client/public from the logo pack.

Everything here derives from one source: the Speakband S monogram, authored as
vector art in the app repo (docs/brand) and copied into this folder as PNG so
the site can be rebuilt without that repo checked out.

Outputs:
  client/public/icon-192.png   apple-touch-icon
  client/public/icon-512.png   the logo the structured data points at
  client/public/og-image.jpg   social card, 1200x630

The card is set in Nunito, the app's own typeface, rather than the site's Inter
Tight: the card is rendered here rather than in the browser, and Inter is only
ever loaded from Google Fonts at runtime.

Run: python3 scripts/brand/gen-assets.py
"""
import os

from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
PUBLIC = os.path.join(REPO, "client", "public")

TEAL_LIGHT = (20, 144, 122)   # #14907A
TEAL       = (11, 122, 99)    # #0B7A63
TEAL_DEEP  = (8, 89, 74)      # #08594A
MINT       = (220, 239, 233)
AMBER      = (246, 163, 64)   # #F6A340
WHITE      = (255, 255, 255)

BOLD = os.path.join(HERE, "nunito-bold.ttf")
REG  = os.path.join(HERE, "nunito-regular.ttf")

SS = 3  # supersample factor for crisp edges


def hgrad(w, h, stops):
    """Horizontal gradient through a list of (offset, rgb) stops."""
    img = Image.new("RGB", (w, h))
    px = img.load()
    for x in range(w):
        t = x / max(1, w - 1)
        col = stops[-1][1]
        for i in range(len(stops) - 1):
            o0, c0 = stops[i]
            o1, c1 = stops[i + 1]
            if t <= o1 or i == len(stops) - 2:
                k = 0.0 if o1 == o0 else (t - o0) / (o1 - o0)
                k = min(max(k, 0.0), 1.0)
                col = tuple(int(c0[j] + (c1[j] - c0[j]) * k) for j in range(3))
                break
        for y in range(h):
            px[x, y] = col
    return img


# ---------- app icons ----------
rounded = Image.open(os.path.join(HERE, "icon-rounded.png")).convert("RGBA")
for size in (192, 512):
    # Flattened onto the tile's own darkest teal: an apple-touch-icon is drawn
    # opaque anyway, and a transparent corner would read as black on iOS.
    tile = Image.new("RGB", (size, size), TEAL_DEEP)
    art = rounded.resize((size, size), Image.LANCZOS)
    tile.paste(art, (0, 0), art)
    tile.save(os.path.join(PUBLIC, f"icon-{size}.png"))

# ---------- social card 1200x630 ----------
W, H = 1200, 630
card = hgrad(W * SS, H * SS, [(0.0, TEAL_DEEP), (0.55, TEAL), (1.0, TEAL_LIGHT)])

mark = Image.open(os.path.join(HERE, "mark-white.png")).convert("RGBA")
mark_h = int(400 * SS)
mark_w = int(mark.width * mark_h / mark.height)
mark = mark.resize((mark_w, mark_h), Image.LANCZOS)
card.paste(mark, (int(W * SS * 0.80) - mark_w // 2, (H * SS - mark_h) // 2), mark)

d = ImageDraw.Draw(card)
d.text((80 * SS, 205 * SS), "Speakband", font=ImageFont.truetype(BOLD, 108 * SS), fill=WHITE)
d.text((84 * SS, 345 * SS), "IELTS Speaking practice", font=ImageFont.truetype(REG, 46 * SS), fill=MINT)
d.text((84 * SS, 408 * SS), "with your AI examiner", font=ImageFont.truetype(REG, 36 * SS), fill=AMBER)

card = card.resize((W, H), Image.LANCZOS)
card.save(os.path.join(PUBLIC, "og-image.jpg"), quality=92, subsampling=0)

print("wrote: icon-192.png icon-512.png og-image.jpg")
