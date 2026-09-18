---
name: Precision Industrial Studio
colors:
  surface: '#faf9fd'
  surface-dim: '#dbd9dd'
  surface-bright: '#faf9fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f7'
  surface-container: '#efedf1'
  surface-container-high: '#e9e7ec'
  surface-container-highest: '#e3e2e6'
  on-surface: '#1a1b1e'
  on-surface-variant: '#524439'
  inverse-surface: '#2f3033'
  inverse-on-surface: '#f2f0f4'
  outline: '#857467'
  outline-variant: '#d8c3b4'
  surface-tint: '#8c4f10'
  primary: '#894d0d'
  on-primary: '#ffffff'
  primary-container: '#a76526'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb77b'
  secondary: '#635e54'
  on-secondary: '#ffffff'
  secondary-container: '#e7ded2'
  on-secondary-container: '#686258'
  tertiary: '#8d4b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#b15f00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc2'
  primary-fixed-dim: '#ffb77b'
  on-primary-fixed: '#2e1500'
  on-primary-fixed-variant: '#6d3a00'
  secondary-fixed: '#eae1d5'
  secondary-fixed-dim: '#cec5b9'
  on-secondary-fixed: '#1f1b14'
  on-secondary-fixed-variant: '#4b463d'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#faf9fd'
  on-background: '#1a1b1e'
  surface-variant: '#e3e2e6'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 38px
    fontWeight: '600'
    lineHeight: 46px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies the ethos of precision industrial fabrication, bespoke architectural engineering, and advanced additive manufacturing. It operates at the intersection of artisanal workshop tactility and computational laboratory rigor—merging structural precision with an organic, material warmth inspired by machined metal, sintered powders, and calibrated tooling.

The aesthetic philosophy centers on **Precision Warm Minimalism** with refined physical metaphors:
- **Calibrated Precision:** Structural alignment, calibrated numerical rhythm, and technical clarity evoke professional CAD environments and high-spec laboratory instruments without cold utilitarian detachment.
- **Material Warmth:** Grounded in bone, graphite, and patinated copper rather than sterile digital blues or harsh pitch blacks. Every surface feels physical, tangible, and deliberate.
- **Architectural Clarity:** Layouts treat space like an architectural blueprint or CNC bed—generous, unhurried, yet defined by razor-thin, warm stone delineation.
- **Tone & Mood:** Authoritative, sophisticated, serene, and engineered.

## Colors

The palette establishes an authentic, material-driven atmosphere. It intentionally avoids clinical blues and achromatic greys, opting instead for warm mineral and metal tones that simulate a high-end physical prototyping studio.

### Surface System
- **Base Canvas (`#F9F8F6`):** Soft, warm bone that eliminates ocular fatigue during long inspection sessions.
- **Recessed / Secondary Surface (`#F3F1EC`):** Sunken tooling trays, inactive panels, and structural gutters.
- **Elevated Canvas (`#FFFFFF`):** Pure warm white for high-priority working surfaces, parameter cards, and modal sheets.

### Accent & Calibration Metals
- **Primary Copper (`#B87333`):** Brushed, conductive metal core used for primary CTAs, active parameter states, and focus rings.
- **Copper Tint Hover (`#C8873F`):** Radiant warmth activated on hover and cursor engagement.
- **Amber Glow / Warning (`#D97706`):** Thermal feedback, operational states, and dimensional warnings.

### Ink & Structural Tones
- **Primary Ink (`#18191C`):** Deep graphite/espresso slate providing maximum legibility without the harshness of pure `#000000`.
- **Secondary Ink (`#33363F`):** Muted structural dark for supporting text, labels, and secondary dimensions.
- **Subtle Slate Accent (`#716B61`):** Mid-tone warm slate used for inactive tool icons, measurement guides, and metadata.
- **Stone Border (`#E5E0D8`):** Precise sand/stone divider line that mimics fine-milled seams and edge boundaries.

## Typography

The typographic hierarchy juxtaposes the engineered, geometric idiosyncrasy of **Space Grotesk** with the balanced, crystalline clarity of **Hanken Grotesk**.

- **Space Grotesk (Headlines, Stats & Technical Labels):** Chosen for its mechanical heritage and angular quirks. Used for structural navigation, focal parameters, layer heights, coordinates, and section headers. Small technical labels must always render in uppercase with positive letter spacing (+0.06em to +0.08em) to evoke precision-engraved machine plates.
- **Hanken Grotesk (Body & Long-form Data):** Supplies exceptional legibility across dense material data tables, specification sheets, and parameter listings. Its neutral, contemporary geometry provides calm contrast against the technical character of Space Grotesk.
- **Tabular Figures:** All numerical readouts (coordinates, millimetre metrics, slicing estimates) must enable tabular numerals (`font-variant-numeric: tabular-nums`) to avoid jitter during real-time value updates.

## Layout & Spacing

The layout is anchored on an architectural 12-column grid system simulating the bed of an industrial CNC or volumetric 3D printer. Spatial rhythms follow an uncompromising 8-point base module, scaled linearly to establish clear mechanical hierarchy.

- **Desktop (12 Columns):** Margins of `3rem` (48px) with `1.5rem` (24px) gutters. Canvas areas feature structured tool rails (3 columns) adjacent to viewport/fabrication workspaces (9 columns).
- **Tablet (8 Columns):** Fluid margins at `2rem` with gutters collapsed to `1rem`. Secondary telemetry panels dock into horizontal collapsible drawer shelves.
- **Mobile (4 Columns):** Tightened margins (`1.25rem`) and gutters (`1rem`). Studio panels convert to stacked sheets with bottom navigation anchors.
- **Spatial Disciplines:** Never use ad-hoc margins. Element padding relies on `space-sm` for dense tool toggles, `space-md` for standard forms, and `space-xl` between logical studio modules.

## Elevation & Depth

Visual depth is achieved through **Tonal Layering and Low-Contrast Outlines** rather than heavy, synthetic drop shadows. Depth reflects physical material thicknesses: machined sheets stacked on top of one another.

1. **Layer 0 (Canvas Base - `#F9F8F6`):** The primary studio backdrop. Flat, non-reflective.
2. **Layer 1 (Recessed Well - `#F3F1EC`):** Sunken panels, tool beds, and coordinate trays. Inset 1px border of `#E5E0D8`.
3. **Layer 2 (Machined Surface - `#FFFFFF`):** High-interaction cards, parameter groupings, and control panels. Outlined with a continuous 1px `#E5E0D8` stroke. Shadow is an ambient, diffused warmth: `0 1px 3px rgba(24, 25, 28, 0.04), 0 8px 24px -6px rgba(113, 107, 97, 0.08)`.
4. **Layer 3 (Floating Modal / Overlay):** Active floating heads-up displays and flyout toolbars. Bounded by a 1px `#E5E0D8` border, accompanied by a calibrated copper-tinted depth shadow: `0 16px 40px -8px rgba(184, 115, 51, 0.12), 0 4px 12px rgba(24, 25, 28, 0.06)`.

## Shapes

The design system maintains a **Soft Architectural (`roundedness: 1`)** geometry. Radii are intentionally disciplined to mirror precision milling, beveled aluminum casings, and laser-cut substrates:

- **Base Radius (`0.25rem` / 4px):** Inputs, technical chips, segmented toggles, buttons, and alert strips. This crisp corner replicates a subtle mechanical chamfer.
- **Card & Panel Radius (`0.5rem` / 8px):** Primary modules, viewport frames, and dialog windows.
- **Expanded Radius (`0.75rem` / 12px):** Reserved solely for outer studio canvas containers and large modal enclosures.
- **Pills and Circles:** Restricted strictly to dimensional status indicators (e.g., active extruder LED indicators) and numerical step counts. Buttons and inputs must never be fully pill-shaped.

## Components

### Buttons
- **Primary Action:** Solid brushed copper background (`#B87333`), text in `#FFFFFF`, font `Space Grotesk` medium, height `40px`, padding `0 18px`, radius `4px`. On hover: `#C8873F` with an internal 1px highlight line. On active: `#A56226`.
- **Secondary / Studio Tool:** Background `#FFFFFF`, 1px border in `#E5E0D8`, text in `#18191C`. On hover, border shifts to `#B87333` and surface transitions to `#F9F8F6`.
- **Ghost Action:** Background transparent, text `#716B61`, hover text `#18191C` with `#F3F1EC` surface wash.

### Chips & Badges
- **Technical Readout Chips:** Background `#F3F1EC`, border 1px `#E5E0D8`, text `#33363F`, uppercase `Space Grotesk` font at `11px`, `0.06em` tracking. Padding: `2px 8px`.
- **Status Badges:** Feature a 6px solid circular dot before text. Operational/Active dot: `#B87333` (Copper) or `#D97706` (Amber thermal state).

### Input Fields & Controls
- **Text & Numeric Inputs:** Height `40px`, surface `#FFFFFF`, border 1px `#E5E0D8`, text `#18191C`, placeholder `#716B61`. Focus ring: crisp, non-blurred 1px outer ring in `#B87333` plus 1px offset.
- **Steppers & Sliders:** Sliders feature a thin 2px rail in `#E5E0D8` with active fill in `#B87333`. The thumb is a 14px solid `#FFFFFF` square with a 2px copper rim and 2px radius.

### Checkboxes & Radio Buttons
- **Checkboxes:** 16x16px, 2px border in `#E5E0D8`, 2px radius. Checked state fills with `#B87333` displaying a white geometric tick.
- **Radio Buttons:** 16x16px circular frame, 2px border in `#E5E0D8`. Selected state features an interior 6px concentric pip in `#B87333`.

### Cards & Tool Shelves
- **Studio Cards:** Surface `#FFFFFF`, 1px structural border `#E5E0D8`, padding `space-lg` (24px). Headers feature a bottom hairline separator in `#E5E0D8` paired with an uppercase `Space Grotesk` label.

### Specialized Studio Components
- **Telemetry Readout Bar:** Horizontal tray surfaced in `#F3F1EC` displaying layer coordinates, nozzle temperature, and filament telemetry in tabular format.
- **Dimension Rulers:** Millimeter guide rules set in `#E5E0D8` tick marks with `#716B61` numerical coordinates at every 10mm interval.