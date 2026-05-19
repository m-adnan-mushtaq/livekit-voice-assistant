---
name: Ethereal Flow
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bbcac0'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#85948b'
  outline-variant: '#3c4a42'
  surface-tint: '#45dfa4'
  primary: '#5af0b3'
  on-primary: '#003825'
  primary-container: '#34d399'
  on-primary-container: '#00563b'
  inverse-primary: '#006c4b'
  secondary: '#4ddcc6'
  on-secondary: '#003730'
  secondary-container: '#00b4a0'
  on-secondary-container: '#003f37'
  tertiary: '#b3e75a'
  on-tertiary: '#233600'
  tertiary-container: '#99ca41'
  on-tertiary-container: '#385200'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#68fcbf'
  primary-fixed-dim: '#45dfa4'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#005137'
  secondary-fixed: '#6ef9e2'
  secondary-fixed-dim: '#4ddcc6'
  on-secondary-fixed: '#00201b'
  on-secondary-fixed-variant: '#005047'
  tertiary-fixed: '#bff365'
  tertiary-fixed-dim: '#a4d64c'
  on-tertiary-fixed: '#131f00'
  on-tertiary-fixed-variant: '#354e00'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 64px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 4rem
  container-max: 1280px
  gutter: 1.5rem
---

## Brand & Style

The design system embodies a "High-Tech Zen" philosophy, specifically tailored for an AI-powered wellness environment. It targets a premium demographic that values both the ancient practice of yoga and the precision of modern technology. The UI should evoke a sense of weightlessness, clarity, and digital tranquility.

The aesthetic merges **Minimalism** with sophisticated **Glassmorphism**. By utilizing deep blacks and vibrant emerald accents, the interface creates a focused "void" where content feels like it is floating. The use of soft glows and radial gradients mimics natural light filtering through digital glass, reinforcing a professional yet calming atmosphere.

## Colors

This design system utilizes a high-contrast dark palette to minimize eye strain and maximize the vibrancy of the primary brand colors. 

- **Primary & Secondary:** Emerald 400 and Teal 300 are used for active states, primary actions, and brand-critical elements. They should frequently appear as subtle linear gradients to add depth.
- **Accent:** Soft Lime 300 is reserved for "AI-powered" insights, high-priority notifications, or secondary call-to-actions that require immediate visual distinction.
- **Surface Strategy:** Backgrounds are anchored in Neutral 950 or pure Black. Layering is achieved via white overlays at 4% opacity, creating a "smoke-on-glass" effect.

## Typography

The typography scale prioritizes legibility and a "sharp" technical feel. **Geist** is used for headings and labels to provide a precise, developer-grade aesthetic that reflects the AI backend. **Inter** is utilized for body text to ensure maximum readability during long-form content consumption.

Large headlines should use tight letter-spacing and a slight negative tracking to feel more "editorial" and premium. For mobile, headline sizes are aggressively scaled down to ensure they remain within the viewport without breaking into awkward line fragments.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop environments, centering content within a 1280px container to maintain a focused "dashboard" feel. On mobile, the system transitions to a fluid model with generous side margins (24px) to emphasize the spacious, premium nature of the brand.

A 4px baseline grid ensures vertical rhythm. Components should utilize large internal padding to avoid visual clutter. Components that sit next to each other should prioritize the `lg` spacing (2rem) to maintain the "breathable" quality essential for a yoga-centric product.

## Elevation & Depth

Depth in this design system is created through transparency rather than traditional shadows.

1.  **Backdrop Blurs:** All surfaces must use a minimum of `20px` backdrop blur. This prevents the dark background from feeling flat and adds a sense of physical material.
2.  **Tonal Borders:** Elevation is defined by a `1px` border using `white/10` (10% opacity). This creates a crisp "hairline" edge that catches the virtual light.
3.  **Radial Glows:** To emphasize the AI presence, use large, low-opacity radial gradients (Primary Emerald at 5-10% opacity) behind primary cards or in the corners of the viewport. This suggests a "pulsing" or "living" interface.

## Shapes

The shape language is defined by extreme softness to counteract the "coldness" of dark mode and technical typography. 

- **Containers:** Large cards and glass panels use a `24px` (1.5rem) or higher radius to feel approachable and organic.
- **Interactive Elements:** Buttons and input fields should lean towards pill-shaped or highly rounded forms.
- **Consistency:** Maintain a consistent corner ratio; if a card has a 24px radius, nested elements should have a proportionally smaller radius (e.g., 12px) to maintain visual harmony.

## Components

### Buttons
- **Primary:** Linear gradient from Emerald 400 to Teal 300. Text is dark (Neutral 950) for maximum contrast.
- **Glass/Ghost:** White background at 4% opacity with a `white/10` border. On hover, increase border opacity to 30%.

### Cards
- Surfaces must use `bg-white/[0.04]` with a heavy backdrop blur.
- Borders should be a consistent `1px` white at 10% opacity.
- Avoid inner shadows; use external soft emerald glows (5% opacity) to indicate "featured" status.

### Input Fields
- Inputs are dark and recessed. Use `black` background with `white/10` borders.
- On focus, the border transitions to Emerald 400 with a subtle outer glow (4px spread).

### Chips & Badges
- Used for yoga styles (e.g., Vinyasa, Yin).
- Use Soft Lime 300 for AI-suggested classes to distinguish them from standard bookings.

### Lists
- Use horizontal dividers with `white/5` opacity.
- List items should have generous vertical padding (16px) to maintain the airy layout.