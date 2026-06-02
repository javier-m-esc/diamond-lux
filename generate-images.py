"""
Diamond Lux — Image Generator
Lacquer Noir philosophy — three images for the website
"""

import numpy as np
from PIL import Image, ImageFilter, ImageDraw
import math

# ── Palette (normalized 0-1) ──────────────────────────────
VOID      = np.array([10,  10,  10 ]) / 255.0
CARBON    = np.array([28,  28,  30 ]) / 255.0
GRAPHITE  = np.array([46,  46,  50 ]) / 255.0
MID       = np.array([85,  85,  80 ]) / 255.0
DIM       = np.array([58,  58,  62 ]) / 255.0
SILVER    = np.array([200, 196, 188]) / 255.0
PLATINUM  = np.array([232, 228, 220]) / 255.0

def smoothstep(x):
    x = np.clip(x, 0, 1)
    return x * x * (3.0 - 2.0 * x)

def smootherstep(x):
    x = np.clip(x, 0, 1)
    return x * x * x * (x * (x * 6.0 - 15.0) + 10.0)

def add_grain(arr, strength=0.006, seed=42):
    rng = np.random.default_rng(seed)
    grain = rng.standard_normal(arr.shape[:2]).astype(np.float32) * strength
    arr = arr + grain[:, :, np.newaxis]
    return arr

# ════════════════════════════════════════════════════════════
# IMAGE 1 — HERO BACKGROUND  1440 × 800
# A dark studio void with a single raking inspection light
# sweeping from right — the moment before assessment begins.
# ════════════════════════════════════════════════════════════
def make_hero(width=1440, height=800):
    print("  Rendering hero background...")
    Y, X = np.mgrid[0:height, 0:width]
    Xf = X.astype(np.float32) / width
    Yf = Y.astype(np.float32) / height

    # ── Base void ────────────────────────────────────────────
    r = np.full((height, width), VOID[0])
    g = np.full((height, width), VOID[1])
    b = np.full((height, width), VOID[2])

    # ── Radial bloom — soft inspection light (right, upper-mid)
    lx, ly = 0.76, 0.40
    dx = (Xf - lx) * 1.2
    dy = (Yf - ly) * 1.8
    dist = np.sqrt(dx**2 + dy**2)
    bloom = smootherstep(np.maximum(0, 1.0 - dist * 2.0)) * 0.20
    r += bloom * PLATINUM[0]
    g += bloom * PLATINUM[1]
    b += bloom * PLATINUM[2]

    # ── Secondary ambient lift — very faint diagonal
    ambient = (Xf * 0.5 + (1.0 - Yf) * 0.5) * 0.028
    r += ambient * CARBON[0]
    g += ambient * CARBON[1]
    b += ambient * CARBON[2]

    # ── Sweep line — inspection beam at y ≈ 0.50
    # Brightens from left edge, peaks at right, fades out
    sweep_y = 0.50
    dy_s = np.abs(Yf - sweep_y) / 0.032
    sweep_profile = np.maximum(0, 1.0 - dy_s) ** 2.2
    sweep_x = Xf ** 0.6  # grows toward right
    sweep = sweep_profile * sweep_x * 0.13
    r += sweep * PLATINUM[0]
    g += sweep * PLATINUM[1]
    b += sweep * PLATINUM[2]

    # ── Second faint sweep — reflection below
    sweep2_y = 0.64
    dy_s2 = np.abs(Yf - sweep2_y) / 0.018
    sweep2 = np.maximum(0, 1.0 - dy_s2) ** 3.0 * (Xf ** 0.8) * 0.045
    r += sweep2 * SILVER[0]
    g += sweep2 * SILVER[1]
    b += sweep2 * SILVER[2]

    # ── Vertical grid lines (80px spacing, extremely subtle)
    grid_mask = (X % 80 == 0).astype(np.float32)
    grid_line = grid_mask * 0.016
    r += grid_line * 0.5
    g += grid_line * 0.5
    b += grid_line * 0.5

    # ── Horizontal hairline at sweep position (1px platinum)
    hairline_y = int(height * sweep_y)
    hl_x = np.arange(width)
    hl_fade = smoothstep(hl_x / width)
    hl_strength = hl_fade * 0.28
    r[hairline_y, :] = np.maximum(r[hairline_y, :], hl_strength * PLATINUM[0])
    g[hairline_y, :] = np.maximum(g[hairline_y, :], hl_strength * PLATINUM[1])
    b[hairline_y, :] = np.maximum(b[hairline_y, :], hl_strength * PLATINUM[2])

    # ── Vignette — pulls corners to absolute void
    vx = Xf - 0.5
    vy = Yf - 0.5
    vignette = 1.0 - smoothstep(np.sqrt(vx**2 * 1.6 + vy**2 * 1.6) * 1.35)
    r *= vignette
    g *= vignette
    b *= vignette

    arr = np.stack([r, g, b], axis=2).astype(np.float32)
    arr = add_grain(arr, strength=0.007)
    arr = np.clip(arr, 0, 1)

    return Image.fromarray((arr * 255).astype(np.uint8))


# ════════════════════════════════════════════════════════════
# IMAGE 2 — COMPARISON: ORANGE PEEL vs MIRROR FINISH  760 × 480
# Left: simulated bump-map of orange peel texture showing
#       distorted, fragmented light reflections.
# Right: perfectly flat mirror surface — one clean reflection.
# Divided by a 1-2px platinum hairline.
# ════════════════════════════════════════════════════════════

def perlin_like_noise(h, w, scale, seed=0):
    """Multi-frequency noise via blurred random fields."""
    rng = np.random.default_rng(seed)
    noise = np.zeros((h, w), dtype=np.float32)
    amplitude = 1.0
    freq = 1.0
    total_amp = 0.0
    for octave in range(6):
        sample_h = max(4, int(h / (scale * freq)))
        sample_w = max(4, int(w / (scale * freq)))
        raw = rng.random((sample_h, sample_w)).astype(np.float32)
        raw_img = Image.fromarray((raw * 255).astype(np.uint8))
        raw_resized = raw_img.resize((w, h), Image.BICUBIC)
        layer = np.array(raw_resized, dtype=np.float32) / 255.0
        noise += layer * amplitude
        total_amp += amplitude
        amplitude *= 0.5
        freq *= 2.0
    return noise / total_amp

def compute_normals(height_map):
    """Compute surface normals from height map using finite differences."""
    dy = np.gradient(height_map, axis=0)
    dx = np.gradient(height_map, axis=1)
    # Normal = (-dx, -dy, 1), normalized
    scale = 3.5
    nx = -dx * scale
    ny = -dy * scale
    nz = np.ones_like(nx)
    length = np.sqrt(nx**2 + ny**2 + nz**2)
    return nx / length, ny / length, nz / length

def make_comparison(width=760, height=480):
    print("  Rendering comparison image...")
    mid_x = width // 2

    r = np.zeros((height, width), dtype=np.float32)
    g = np.zeros((height, width), dtype=np.float32)
    b = np.zeros((height, width), dtype=np.float32)

    Y, X = np.mgrid[0:height, 0:width]
    Xf = X.astype(np.float32) / width
    Yf = Y.astype(np.float32) / height

    # ── Light direction (from upper right, raking) ──────────
    # Normalised: pointing toward scene from upper-right
    lx_n, ly_n, lz_n = -0.55, -0.4, 0.74
    l_len = math.sqrt(lx_n**2 + ly_n**2 + lz_n**2)
    lx_n /= l_len; ly_n /= l_len; lz_n /= l_len

    # ═══ LEFT HALF — ORANGE PEEL ════════════════════════════
    # Build height map from layered noise
    hmap_l = perlin_like_noise(height, mid_x, scale=0.18, seed=7)
    # Orange peel is "medium" frequency — emphasize mid range
    hmap_l = (hmap_l - hmap_l.min()) / (hmap_l.max() - hmap_l.min())
    # Slight smoothing to avoid too sharp micro-detail
    hmap_pil = Image.fromarray((hmap_l * 255).astype(np.uint8))
    hmap_pil = hmap_pil.filter(ImageFilter.GaussianBlur(radius=1.5))
    hmap_l = np.array(hmap_pil, dtype=np.float32) / 255.0

    nx_l, ny_l, nz_l = compute_normals(hmap_l)

    # Diffuse lighting: N · L
    ndotl = nx_l * lx_n + ny_l * ly_n + nz_l * lz_n
    ndotl = np.maximum(0, ndotl)

    # Specular: Phong highlight (shininess ~40 for paint — broad highlight)
    # Reflect = 2(N·L)N - L
    rx = 2 * ndotl * nx_l - lx_n
    ry = 2 * ndotl * ny_l - ly_n
    rz = 2 * ndotl * nz_l - lz_n
    # View direction (straight on)
    vz = 1.0
    rdotv = np.maximum(0, rz * vz)
    spec_l = rdotv ** 40 * 1.4

    # Base surface: dark carbon
    base_r_l = CARBON[0] + ndotl * 0.04
    base_g_l = CARBON[1] + ndotl * 0.04
    base_b_l = CARBON[2] + ndotl * 0.04

    r[:, :mid_x] = base_r_l + spec_l * PLATINUM[0] * 0.7
    g[:, :mid_x] = base_g_l + spec_l * PLATINUM[1] * 0.7
    b[:, :mid_x] = base_b_l + spec_l * PLATINUM[2] * 0.7

    # ═══ RIGHT HALF — MIRROR FINISH ═════════════════════════
    # Perfectly flat surface: normal = (0, 0, 1) everywhere
    # One clean specular band
    nx_r = np.zeros((height, width - mid_x), dtype=np.float32)
    ny_r = np.zeros((height, width - mid_x), dtype=np.float32)
    nz_r = np.ones( (height, width - mid_x), dtype=np.float32)

    Yf_r = Y[:, mid_x:].astype(np.float32) / height
    Xf_r = (X[:, mid_x:].astype(np.float32) - mid_x) / (width - mid_x)

    # Perfect specular: exactly where reflection hits the view
    # For a flat surface with our light: reflection band is a horizontal stripe
    # Simulate by placing the band at ~y=0.42 (match hero sweep line)
    spec_band_y = 0.42
    spec_dy = np.abs(Yf_r - spec_band_y) / 0.06
    spec_r_right = np.maximum(0, 1.0 - spec_dy) ** 2.0 * 0.7

    # Also very faint broad ambient reflection
    ambient_r = 0.02

    base_r_r = CARBON[0] + ambient_r
    base_g_r = CARBON[1] + ambient_r
    base_b_r = CARBON[2] + ambient_r

    r[:, mid_x:] = base_r_r + spec_r_right * PLATINUM[0]
    g[:, mid_x:] = base_g_r + spec_r_right * PLATINUM[1]
    b[:, mid_x:] = base_b_r + spec_r_right * PLATINUM[2]

    # Perfect hairline at the reflection on right
    hl_y = int(height * spec_band_y)
    r[hl_y, mid_x:] = PLATINUM[0]
    g[hl_y, mid_x:] = PLATINUM[1]
    b[hl_y, mid_x:] = PLATINUM[2]

    # ═══ DIVIDER LINE ═══════════════════════════════════════
    r[:, mid_x:mid_x+1] = PLATINUM[0] * 0.6
    g[:, mid_x:mid_x+1] = PLATINUM[1] * 0.6
    b[:, mid_x:mid_x+1] = PLATINUM[2] * 0.6

    arr = np.stack([r, g, b], axis=2).astype(np.float32)
    arr = add_grain(arr, strength=0.006)
    arr = np.clip(arr, 0, 1)

    img = Image.fromarray((arr * 255).astype(np.uint8))

    # ── Labels ───────────────────────────────────────────────
    draw = ImageDraw.Draw(img)
    # Use default font for crisp labels
    lbl_y = height - 28
    lbl_color = tuple(int(v * 255) for v in MID)
    plat_color = tuple(int(v * 255) for v in PLATINUM)

    # Left label
    draw.text((20, lbl_y), "FACTORY FINISH — ORANGE PEEL TEXTURE",
              fill=lbl_color)
    # Right label
    draw.text((mid_x + 20, lbl_y), "DIAMOND LUX — CORRECTED MIRROR SURFACE",
              fill=plat_color)

    # Top labels
    draw.text((20, 16), "SURFACE A", fill=lbl_color)
    draw.text((mid_x + 20, 16), "SURFACE B", fill=plat_color)

    # 1px top rule in each half
    for x in range(0, mid_x):
        img.putpixel((x, 0), tuple(int(v*255) for v in DIM))
    for x in range(mid_x, width):
        img.putpixel((x, 0), tuple(int(v*255) for v in PLATINUM))

    return img


# ════════════════════════════════════════════════════════════
# IMAGE 3 — PTG MEASUREMENT DIAGRAM  900 × 560
# Technical cross-section of paint layers with measurement
# annotations — the science made visual. Industrial precision
# aesthetic. Minimal typography as data markers.
# ════════════════════════════════════════════════════════════
def make_ptg_diagram(width=900, height=560):
    print("  Rendering PTG diagram...")

    arr = np.full((height, width, 3), VOID, dtype=np.float32)

    Y, X = np.mgrid[0:height, 0:width]
    Xf = X.astype(np.float32) / width
    Yf = Y.astype(np.float32) / height

    # ── Paint layer bands ─────────────────────────────────────
    # From bottom to top: substrate → primer → basecoat → lacquer → surface
    # Represented as horizontal bands with different tones
    margin_left = 80
    margin_right = 80
    diagram_left = margin_left
    diagram_right = width - margin_right
    diagram_width = diagram_right - diagram_left

    # Layer positions (y ratio from top)
    layers = [
        # (y_top, y_bottom, color_normalized, label)
        (0.72, 0.85, np.array([20, 20, 22])/255.0,   "STEEL SUBSTRATE"),
        (0.60, 0.72, np.array([32, 32, 35])/255.0,   "PRIMER / E-COAT  ~30–40 μm"),
        (0.46, 0.60, np.array([44, 44, 48])/255.0,   "BASE COAT  ~15–25 μm"),
        (0.32, 0.46, np.array([56, 56, 60])/255.0,   "CLEAR COAT  ~40–80 μm"),
        (0.22, 0.32, np.array([68, 68, 72])/255.0,   "SURFACE ZONE — CORRECTABLE"),
    ]

    for (yt, yb, col, label) in layers:
        y0 = int(yt * height)
        y1 = int(yb * height)
        arr[y0:y1, diagram_left:diagram_right] = col

    # ── Orange peel undulation on top surface ─────────────────
    # Simulate the bumpy clear coat surface
    rng = np.random.default_rng(99)
    surface_y_base = int(0.22 * height)
    x_coords = np.arange(diagram_left, diagram_right)
    # Combine two sinusoids for organic feel
    wave = (np.sin(x_coords * 0.045) * 4.5
            + np.sin(x_coords * 0.019 + 1.3) * 3.0
            + np.sin(x_coords * 0.11 + 0.7) * 1.5)
    wave = wave.astype(int)

    for i, x in enumerate(x_coords):
        y_surface = surface_y_base + wave[i]
        y_min = max(0, y_surface - 3)
        y_max = min(height, y_surface + 3)
        # Paint the surface undulation in a lighter tone
        arr[y_min:y_max, x] = GRAPHITE

    # ── Measurement bracket on right side ────────────────────
    bracket_x = diagram_right + 20
    # Total paint thickness bracket
    y_top_paint = int(0.22 * height)
    y_bot_paint = int(0.85 * height)
    mid_y = (y_top_paint + y_bot_paint) // 2

    # Horizontal ticks
    tick_len = 8
    for y in [y_top_paint, y_bot_paint]:
        for x in range(bracket_x, bracket_x + tick_len):
            if 0 <= y < height and 0 <= x < width:
                arr[y, x] = SILVER

    # Vertical bracket line
    for y in range(y_top_paint, y_bot_paint):
        if 0 <= y < height and bracket_x < width:
            arr[y, bracket_x] = DIM

    # ── PTG probe indicator ───────────────────────────────────
    # A vertical probe line from top coming down to surface
    probe_x = int(diagram_left + diagram_width * 0.62)
    probe_top = 30
    probe_bottom = surface_y_base + 4
    for y in range(probe_top, probe_bottom):
        if 0 <= y < height and 0 <= probe_x < width:
            arr[y, probe_x] = PLATINUM
    # Probe tip — 3 pixel cross
    for dx in range(-3, 4):
        x_ = probe_x + dx
        if 0 <= x_ < width:
            arr[probe_bottom, x_] = PLATINUM
    for dy in range(-2, 3):
        y_ = probe_bottom + dy
        if 0 <= y_ < height:
            arr[y_, probe_x] = PLATINUM

    # Probe reading box
    box_y = probe_top - 8
    box_h = 22; box_w = 90
    box_x = probe_x - box_w // 2
    box_x = max(margin_left, min(box_x, width - margin_right - box_w))
    arr[box_y:box_y+box_h, box_x:box_x+box_w] = GRAPHITE
    # Thin outline
    arr[box_y, box_x:box_x+box_w] = PLATINUM
    arr[box_y+box_h, box_x:box_x+box_w] = DIM
    arr[box_y:box_y+box_h, box_x] = DIM
    arr[box_y:box_y+box_h, box_x+box_w] = DIM

    # ── Cross-section delimiter lines ─────────────────────────
    # Thin separator between each layer
    for (yt, yb, col, label) in layers:
        y0 = int(yt * height)
        arr[y0, diagram_left:diagram_right] = DIM

    # Bottom line
    y_bottom = int(0.85 * height)
    arr[y_bottom, diagram_left:diagram_right] = DIM

    # Left margin rule
    for y in range(int(0.22*height), int(0.85*height)):
        arr[y, diagram_left] = DIM
        arr[y, diagram_right] = DIM

    # ── Grain ─────────────────────────────────────────────────
    arr = add_grain(arr, strength=0.005)
    arr = np.clip(arr, 0, 1)

    img = Image.fromarray((arr * 255).astype(np.uint8))
    draw = ImageDraw.Draw(img)

    # Label colors
    lbl_mid   = tuple(int(v*255) for v in MID)
    lbl_silv  = tuple(int(v*255) for v in SILVER)
    lbl_plat  = tuple(int(v*255) for v in PLATINUM)
    lbl_dim   = tuple(int(v*255) for v in DIM)

    # Layer labels on left margin
    layer_label_x = 8
    for (yt, yb, col, label) in layers:
        y_mid = int((yt + yb) / 2 * height) - 4
        draw.text((layer_label_x, y_mid), label, fill=lbl_mid)

    # Bracket label
    draw.text((bracket_x + 14, mid_y - 6), "TOTAL", fill=lbl_mid)
    draw.text((bracket_x + 14, mid_y + 8), "FILM", fill=lbl_mid)

    # PTG reading label
    ptg_label_x = max(margin_left, probe_x - box_w//2 + 6)
    draw.text((ptg_label_x + 6, probe_top - 4), "132 μm  PTG", fill=lbl_plat)

    # Title
    draw.text((diagram_left, 14), "PAINT SECTION — PRE-ASSESSMENT MAPPING",
              fill=lbl_mid)
    draw.text((diagram_right - 140, 14), "DL-2025", fill=lbl_dim)

    # Top hairline
    draw.line([(diagram_left, 10), (diagram_right, 10)], fill=tuple(int(v*255) for v in DIM), width=1)

    return img


# ════════════════════════════════════════════════════════════
# MAIN
# ════════════════════════════════════════════════════════════
if __name__ == "__main__":
    import os
    out = r"C:\Users\moyaj\diamond-lux\public\images"

    print("Diamond Lux — Generating images (Lacquer Noir philosophy)")
    print()

    print("01 / Hero background...")
    hero = make_hero(1440, 800)
    hero.save(os.path.join(out, "hero-bg.jpg"), "JPEG", quality=95)
    print(f"   saved: hero-bg.jpg  ({hero.size[0]}x{hero.size[1]})")

    print("02 / Surface comparison...")
    comp = make_comparison(760, 480)
    comp.save(os.path.join(out, "surface-comparison.png"), "PNG")
    print(f"   saved: surface-comparison.png  ({comp.size[0]}x{comp.size[1]})")

    print("03 / PTG diagram...")
    ptg = make_ptg_diagram(900, 560)
    ptg.save(os.path.join(out, "ptg-diagram.png"), "PNG")
    print(f"   saved: ptg-diagram.png  ({ptg.size[0]}x{ptg.size[1]})")

    print()
    print("Done.")
