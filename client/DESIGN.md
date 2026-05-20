---
name: Serene Flow
colors:
  surface: '#fff8f4'
  surface-dim: '#e8d7c9'
  surface-bright: '#fff8f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1e7'
  surface-container: '#fdebdc'
  surface-container-high: '#f7e5d7'
  surface-container-highest: '#f1dfd1'
  on-surface: '#231a11'
  on-surface-variant: '#454840'
  inverse-surface: '#392f25'
  inverse-on-surface: '#ffeee0'
  outline: '#75786f'
  outline-variant: '#c5c8bd'
  surface-tint: '#55634a'
  primary: '#55634a'
  on-primary: '#ffffff'
  primary-container: '#a8b79a'
  on-primary-container: '#3b4832'
  inverse-primary: '#bccbae'
  secondary: '#72594a'
  on-secondary: '#ffffff'
  secondary-container: '#fad9c5'
  on-secondary-container: '#765e4e'
  tertiary: '#516161'
  on-tertiary: '#ffffff'
  tertiary-container: '#a4b6b5'
  on-tertiary-container: '#384847'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e8c8'
  primary-fixed-dim: '#bccbae'
  on-primary-fixed: '#131f0c'
  on-primary-fixed-variant: '#3d4b34'
  secondary-fixed: '#fddcc8'
  secondary-fixed-dim: '#e0c0ad'
  on-secondary-fixed: '#29180c'
  on-secondary-fixed-variant: '#584234'
  tertiary-fixed: '#d4e6e5'
  tertiary-fixed-dim: '#b8cac9'
  on-tertiary-fixed: '#0e1e1e'
  on-tertiary-fixed-variant: '#3a4a49'
  background: '#fff8f4'
  on-background: '#231a11'
  surface-variant: '#f1dfd1'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1140px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
  stack-xl: 80px
---

## Brand & Style

The design system is centered on the concept of "Atmospheric Stillness." It targets a wellness-conscious audience seeking a digital sanctuary that mirrors the physical experience of a yoga studio. The brand personality is feminine, nurturing, and professional, prioritizing mental clarity over information density.

The style is a blend of **Soft Minimalism** and **Tactile Organicism**. It utilizes expansive whitespace (negative space) to allow content to breathe, moving away from rigid, boxy structures in favor of fluid transitions and soft edges. The interface should feel like high-quality matte paper—textured, warm, and inviting.

## Colors

The palette is rooted in nature, using earth-toned neutrals and desaturated botanical accents. 

- **Backgrounds:** Use `#FFFDF8` (Warm White) as the primary canvas. Use `#FAF5EC` (Cream) for section differentiation or card backgrounds to create subtle depth without relying on shadows.
- **Typography:** Primary headers and long-form text should use `#4A3F35` (Warm Brown) to maintain a soft contrast that is easier on the eyes than pure black. Use `#333333` for functional UI text and labels.
- **Accents:** Sage Green (`#A8B79A`) is the primary action color. Soft Peach and Pastel Mint are reserved for secondary highlights, category tags, or success states, ensuring the UI remains rhythmic and calm.

## Typography

The typographic scale emphasizes a "Literary Zen" aesthetic. **Playfair Display** provides an authoritative yet graceful serif voice for all headings. On mobile devices, display sizes scale down to prevent excessive line-breaking while maintaining their elegant proportions.

**Inter** is utilized for body copy and UI elements to ensure high legibility and a modern, clean touch. To maintain the professional feel, use generous line-heights (1.5x - 1.6x) for body text to prevent the "wall of text" effect. Labels use a slight tracking (letter-spacing) increase to add a sense of premium refinement.

## Layout & Spacing

This design system employs a **Fluid Grid** with exaggerated outer margins to simulate the feeling of a wide-open space. 

- **The 8px Rule:** All spacing between elements must be a multiple of 8px to maintain a rhythmic, predictable flow.
- **Section Breathing:** Vertical spacing between major sections (stack-xl) is intentionally large to encourage the user to pause as they scroll.
- **Desktop:** A 12-column grid with a maximum container width of 1140px, centered to provide focus.
- **Mobile:** A 4-column grid with 20px margins. Components should stack vertically, utilizing full-width cards with generous internal padding (24px+).

## Elevation & Depth

To maintain a "lightweight" feel, the system avoids heavy drop shadows and high-contrast layering. Depth is communicated through:

1.  **Tonal Stacking:** Using the Cream (`#FAF5EC`) background color on the Warm White (`#FFFDF8`) base to indicate hierarchy.
2.  **Soft Ambient Shadows:** When an element must float (e.g., a primary CTA card), use a very large blur radius (30px+) with low opacity (5-8%) using the Warm Brown color as the shadow tint. This mimics natural sunlight rather than synthetic UI shadows.
3.  **Thin Organic Outlines:** Use 1px borders in Gentle Gray (`#E5E7EB`) for functional boundaries, ensuring they feel like "ghost" lines that define space without trapping it.

## Shapes

The shape language is defined by "The Soft Curve." There are no sharp corners in this design system.

- **Standard Elements:** Buttons, input fields, and small cards use a 0.5rem (8px) radius.
- **Large Containers:** Feature cards and image containers use `rounded-lg` (1rem / 16px) or `rounded-xl` (1.5rem / 24px) to emphasize the organic, feminine aesthetic.
- **Organic Masks:** Occasionally use asymmetrical "pebble" shapes or soft blobs for decorative background elements or image masking to break the linearity of the grid.

## Components

- **Buttons:** Primary buttons use a solid Sage Green background with white text. They should have a subtle horizontal padding (32px) to feel substantial. Secondary buttons should use a Soft Peach background or a Sage Green outline.
- **Chips/Tags:** Used for "Class Types" or "Difficulty Levels." These should be pill-shaped with Pastel Mint or Soft Peach backgrounds and a slightly darker version of the same hue for text.
- **Input Fields:** Use a Warm White background with a 1px Gentle Gray border. On focus, the border transitions to Sage Green. Labels stay above the field in the Label-Sm style.
- **Cards:** Cards should have a 1px border or a soft ambient shadow, never both. Use 24px internal padding to ensure the content within the card feels uncrowded.
- **Lists:** Use a soft divider line (`#E5E7EB`) between items, or ideally, just whitespace if the list is short. Icons within lists should be thin-stroke (1.5px) and use the Warm Brown color.
- **Yoga Specifics:** Include a "Class Schedule Card" that highlights the time in a bold serif and the instructor name in a soft sans-serif, utilizing a Pastel Mint accent for "Live" status indicators.