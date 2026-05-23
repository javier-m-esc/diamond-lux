# Diamond Lux — Required Assets

Place all files listed below in this `/public` directory before running the project.
All paths are referenced in the source code as-is.

---

## Video

| File           | Spec                                                  |
|----------------|-------------------------------------------------------|
| `hero.mp4`     | 1920×1080, H.264, ~10–30 s loop, ≤15 MB recommended  |
| `hero-poster.jpg` | 1920×1080 JPEG, still frame from the video for fast LCP |

**Recommended content:** Car being polished / coated under focused lighting, dramatic reflection shot, or an abstract close-up of a corrected paint surface.

---

## Before / After Images

| File          | Spec                                                       |
|---------------|------------------------------------------------------------|
| `before-1.jpg` | 1600×900 JPEG, same framing as after — shows paint defects |
| `after-1.jpg`  | 1600×900 JPEG, same framing as before — post-correction    |

**Tip:** Shoot both images with a paint inspection light (e.g. Sun Gun, Scangrip) at the same angle and distance. Convert to WebP for production (`next/image` handles this automatically once you swap the `<img>` tags for `<Image />`).

---

## Swapping placeholders for `next/image`

The BeforeAfter component currently uses plain `<img>` tags so the project runs without real images.
Once your assets are in place, replace each `<img>` with:

```tsx
import Image from 'next/image';

<Image
  src="/before-1.jpg"
  alt="Before — paint showing swirl marks"
  fill
  sizes="(max-width: 768px) 100vw, 90vw"
  className="object-cover"
  priority={false}
/>
```

Remove the fallback gradient `<div>` elements at the same time.

---

## Optional — Open Graph image

| File     | Spec                              |
|----------|-----------------------------------|
| `og.jpg` | 1200×630 JPEG for social previews |

Add to `app/layout.tsx` metadata:
```ts
openGraph: { images: [{ url: '/og.jpg', width: 1200, height: 630 }] }
```
