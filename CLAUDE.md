@AGENTS.md

# Mahoney V2 — Design System

## Typography

| Token | Font | Weight | Size | Usage |
|---|---|---|---|---|
| `var(--font-sans)` | IBM Plex Sans | — | — | Body, UI text |
| `var(--font-condensed)` | IBM Plex Sans Condensed | — | — | Headings, titles |

### Type scale in use
- Section heading ("Find your Product"): condensed, 700, 44px, `#092211`, `letterSpacing: -0.02em`
- Product name: condensed, 600, 18px, `#0D2818`
- Price: sans, 500, 16px, `#0D2818`
- SKU: sans, 400, 14px, `rgba(13, 40, 24, 0.52)`, `letterSpacing: 0.04em`
- Specs / description: sans, 400, 14px, `#0D2818`
- Stock status: condensed, 600, 14px, dynamic color
- Filter tabs (BestSeller / New Arrivals): sans, 600, 14px
- Button labels (Add to Quote, Quick Overview): sans, 600, 14px–16px

---

## Color Palette

### Brand greens
| Name | Hex | Usage |
|---|---|---|
| Deep forest | `#092211` | Dark circles, primary dark |
| Dark green | `#0D2818` | Body text, product titles |
| Forest | `#162518` | Hero background |
| Mid green | `#0B2A1B` | Add to Quote hover bg |
| Action green | `#538D22` | In-stock status, Add to Quote bg, Buy Now |
| Light green | `#AAD576` | Quick Overview bg, Add to Quote hover text, Shop Now |
| Pale green | `#F1F4F2` | BestSeller active tab bg |

### Neutrals
| Name | Hex | Usage |
|---|---|---|
| White | `#ffffff` | Section bg, cart hover fill |
| Card bg | `#F0F0F0` | Product image box fill |
| Border | `#E8E4DC` | Arrow button borders, progress bar track |
| Muted text | `#5A5A5A` | New Arrivals inactive tab |

### Status
| Name | Hex | Usage |
|---|---|---|
| In-stock | `#538D22` | Stock dot + text |
| Lead time / out | `#E33C3F` | Stock dot + text |

---

## Layout

- Section wrapper: `backgroundColor: #ffffff`, `borderRadius: 32px 32px 0 0`, `marginTop: -40px`, `paddingTop: 80px`, `paddingBottom: 120px`
- Horizontal padding (header/footer): `0 200px`
- Product carousel: 4 cards visible, `width: calc((100vw - 400px - 60px) / 4)` per card, `gap: 12px`
- Left/right spacers: `180px` each to align with page margins

---

## Product Card — Default State

- Image box: `backgroundColor: #F0F0F0`, `borderRadius: 18px`, `height: 440px`, `overflow: hidden`
- Product image: centered, `padding: 44px`, `objectFit: contain`
- Cart button: `40×40px` circle, `#092211` fill, `bottom: 16px`, `right: 16px`, absolutely positioned — **never moves**
- Card details gap: `4px`

### Card detail order
1. SKU
2. Product name
3. Price
4. Specs
5. Stock status (dot + text)
6. Brand logo (`80×32px`)

---

## Product Card — Hover State

Card hover triggers `hovered: true` on the `ProductCard` wrapper.

### Image box on hover
- Default product image: fades to `opacity: 0` (`220ms ease`)
- **Top 83%**: lifestyle hover image (`objectFit: cover`, `objectPosition: center top`), fades in
- **Bottom 17%**: `#F0F0F0` area — Add to Quote + cart button zone

### Quick Overview button (overlaid on hover image)
- Position: `bottom: 24px`, `left: 20px`, `right: 20px`
- Style: `backgroundColor: #AAD576`, `color: #162518`, `borderRadius: 12px`, `padding: 16px 40px`, sans, 600, 16px
- Same visual size/style as Hero "Shop Now"

### Add to Quote button (hover only)
- Position: `bottom: 16px`, `left: 16px` — fades in (`opacity 220ms ease`)
- Style: `backgroundColor: #538D22`, `color: #ffffff`, `borderRadius: 9999px`, `padding: 12px 24px`, sans, 600, 14px
- Hover animation: **left-to-right CSS swipe** — `::before` slides `translateX(-100%)` → `translateX(0)`, `background: #0B2A1B`, `500ms cubic-bezier(0.23, 1, 0.32, 1)`
- Hover text color: `#AAD576` (transitions at same 500ms)

### Cart button (hover state)
- Stays at exact same position — `bottom: 16px`, `right: 16px`, **never moves or changes position**
- Hover animation: **position-aware circular fill** — white circle expands from cursor entry point (`scale(0)` → `scale(3)`), `1400ms cubic-bezier(0.23, 1, 0.32, 1)`
- On hover: border `1.5px solid #092211`, icon color `#092211`
- Animation triggered ONLY by direct cursor-over-circle hover (pure CSS `:hover`, no JS state)
- Entry/exit position tracked via `--mouse-x` / `--mouse-y` CSS custom properties set imperatively (no React state)

---

## Animation Conventions

- **Easing**: `cubic-bezier(0.23, 1, 0.32, 1)` — strong ease-out, used for all UI interactions
- **Hover fills**: CSS `::before` pseudo-elements, never JS-driven color changes
- **No `transition: all`** — always specify exact properties
- **JS handlers** on buttons: only for CSS custom property updates (no `setState`, no re-render risk)
- **Slow animations** (cart fill): `1400ms` — intentionally deliberate
- **Medium animations** (Add to Quote swipe, hover image): `500ms` / `220ms`
- **Press feedback**: `scale(0.9)` on `:active` for cart, `scale(0.97)` for larger buttons

---

## Image Assets

| Folder | Usage |
|---|---|
| `/public/images/products/default/product-{1-9}.png` | Default product images (uniform width, white bg) |
| `/public/images/products/hover/hover-image.jpg` | Hover lifestyle image (shared across all cards) |
| `/public/images/logo/partner logo/logo-{1-3}.png` | Partner brand logos |
| `/public/images/banners/` | Hero background panels |

---

## Hero Section Reference Values

These are used to match button styles across sections:

- **Shop Now**: `backgroundColor: #AAD576`, `color: #162518`, `borderRadius: 9999px`, `padding: 16px 40px`, sans, 600, 16px
- **Buy Now**: `backgroundColor: #538D22`, `color: #ffffff`, `borderRadius: 9999px`, `padding: 12px 24px`, sans, 600, 14px
- Hero product card: `borderRadius: 18px` (matched by second section image box)

---

## Carousel

- Draggable: click-drag to scroll, `cursor: grab` / `grabbing`
- Scroll snap: `x mandatory`, disabled during drag, re-enabled on release
- Arrow buttons: `44×44px` circles, `border: 1px solid #E8E4DC`, `ChevronLeft/Right` at `size=20`, `strokeWidth=2.5`
- Progress bar: `200px × 2px`, `#E8E4DC` track, `#092211` indicator (`40px` wide, translates on scroll)
