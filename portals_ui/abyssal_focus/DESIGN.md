---
name: Abyssal Focus
colors:
  surface: '#001719'
  surface-dim: '#001719'
  surface-bright: '#243d40'
  surface-container-lowest: '#001113'
  surface-container-low: '#041f22'
  surface-container: '#082326'
  surface-container-high: '#142e31'
  surface-container-highest: '#1f393c'
  on-surface: '#cce8eb'
  on-surface-variant: '#bfc8ca'
  inverse-surface: '#cce8eb'
  inverse-on-surface: '#1b3437'
  outline: '#8a9294'
  outline-variant: '#40484a'
  surface-tint: '#99d0d9'
  primary: '#99d0d9'
  on-primary: '#00363d'
  primary-container: '#145058'
  on-primary-container: '#8bc1ca'
  inverse-primary: '#2f666e'
  secondary: '#e0c19d'
  on-secondary: '#402d13'
  secondary-container: '#5b4529'
  on-secondary-container: '#d1b48f'
  tertiary: '#66d8d2'
  on-tertiary: '#003735'
  tertiary-container: '#00524f'
  on-tertiary-container: '#55c9c3'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b5ecf5'
  primary-fixed-dim: '#99d0d9'
  on-primary-fixed: '#001f24'
  on-primary-fixed-variant: '#114e56'
  secondary-fixed: '#feddb7'
  secondary-fixed-dim: '#e0c19d'
  on-secondary-fixed: '#281802'
  on-secondary-fixed-variant: '#584327'
  tertiary-fixed: '#84f5ee'
  tertiary-fixed-dim: '#66d8d2'
  on-tertiary-fixed: '#00201e'
  on-tertiary-fixed-variant: '#00504d'
  background: '#001719'
  on-background: '#cce8eb'
  surface-variant: '#1f393c'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
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

This design system expresses disciplined academic focus, prestige, and relentless motivation for competitive STEM aspirants (JEE Main & JEE Advanced). Built upon a foundation of deep, layered ocean teals accented by warm mineral sand, it projects the quiet intensity of late-night study sessions paired with the clarity of elite mentorship.

The aesthetic blends high-contrast dark minimalism with tactile precision:
- **Atmosphere:** Immersive dark teal depth that eliminates cognitive eye fatigue during marathon problem-solving sessions.
- **Tone:** Methodical, authoritative, empathetic, and ambitious. Avoid playful or cartoonish gamification; favor structured, metrics-driven clarity.
- **Visual Stance:** Crisp boundaries, subtle luminous glows for active progress, and deliberate Desert Sand highlights that draw the eye directly to key milestone moments, rank predictors, and mentorship calls-to-action.

## Colors

The palette operates on an 80/20 dominance rule: 80% Abyssal Teal variants to establish a distraction-free, low-glare canvas, and 20% Desert Sand tokens for accents, badges, selection states, and milestone achievements.

### Palette Hierarchy & Intent
- **Canvas & Backgrounds (`#071A1C`, `#0A2528`):** The foundational substrate. Extremely deep teal-black reduces eye strain while maintaining more chromatic richness than standard neutral grays.
- **Surfaces & Cards (`#0D3B40`, `#145058`):** Structural elevations. Used for problem sets, batch cards, analytics panels, and navigation rails.
- **Primary Accent — Desert Sand (`#E3C49F`, `#EDD5B8`, `#C9A77D`):** Reserved exclusively for high-intent interactive elements, percentile metrics, active batch indicators, scholarship banners, and primary conversion triggers.
- **Secondary Accent — Cyan Slate (`#38B2AC`):** Utility accent for real-time telemetry, mock test timers, correct-answer feedback, and live mentorship badges.
- **Text & Contrast:** Primary text sits at `#F6E7D2` (warm sand-white) to maintain comfortable luminance against deep teal. Secondary text sits at a muted slate-teal (`#8AA5A8`).

## Typography

Typography bridges technical precision with structural legibility:
- **Headlines (Space Grotesk):** Provides engineering-inspired geometry with distinct glyph structures, anchoring the rigorous identity required for competitive entrance training.
- **Body (Manrope):** Delivers clean optical balance for extended study sessions, syllabi reviews, solution explanations, and faculty profiles.
- **Technical & Metrics (JetBrains Mono):** Reserved for quantitative elements—All India Ranks (AIR), mock test timers, formula annotations, batch codes, question tags (e.g., `[JEE Adv '23]`), and percentage deltas.

## Layout & Spacing

The layout is built on a responsive 12-column fluid grid system engineered to support complex analytical dashboards, batch comparison tables, and progressive mentorship steps.

### Responsive Breakpoints
- **Mobile (< 768px):** 4-column system. Margins lock to `1.25rem` (`margin-mobile`), and gutters contract to `1rem` (`gutter-mobile`). Dense interactive modules (e.g., question navigation palettes) scroll horizontally or switch to stacked card representations.
- **Tablet (768px – 1024px):** 8-column system. Margins expand to `2rem`. Two-column layouts for study materials and mentor profile overviews.
- **Desktop (> 1024px):** 12-column layout with a capped max-width container of `1280px`. Provides dedicated lateral space for real-time doubt-clearing panels and lecture notes.

### Spacing Rhythm
- Use `space-xs` and `space-sm` for inline metadata, tag clusters, and metric labels.
- Use `space-md` for internal component padding within cards and inputs.
- Use `space-lg` to separate modular blocks within cards and section headers.
- Use `space-xl` for sectional transitions, milestone steps, and dashboard module dividers.

## Elevation & Depth

Visual hierarchy does not rely on heavy drop shadows; instead, it uses tonal stacking, crisp surface boundaries, and soft sand edge highlights.

- **Base Layer (Level 0):** Canvas `#0A2528`. Static canvas backdrop.
- **Surface Layer (Level 1):** `#0D3B40` accompanied by a subtle 1px border of `rgba(227, 196, 159, 0.12)`. Applied to standard cards, problem list items, and batch summaries.
- **Raised Interactive Layer (Level 2):** `#145058` with a 1px border of `rgba(227, 196, 159, 0.25)`. Used for active batch cards, hovered interactive elements, and modal dialogue surfaces.
- **Ambient Focus / High Priority:** When cards reach an active state (e.g., the selected JEE Target Year batch), apply a warm, subtle glow: `box-shadow: 0 0 24px -4px rgba(227, 196, 159, 0.15)`.
- **Glass Overlays:** Drawer navigations, live doubt panels, and fixed bottom navigation bars utilize `background: rgba(10, 37, 40, 0.85)` with `backdrop-filter: blur(12px)` and a top edge stroke in `rgba(227, 196, 159, 0.18)`.

## Shapes

The design system uses a controlled, disciplined border radius (`roundedness: 1`). Soft curves (4px base, 8px for containers, 12px for modal cards) maintain an architectural, serious presence suited for engineering preparation, rejecting overly playful or circular profiles.

- **Inputs, Buttons, Tags:** `0.25rem` (4px). Precise and crisp.
- **Cards, Batch Tiles, Step Containers:** `0.5rem` (8px). Delivers structured geometry across data tables and multi-column dashboards.
- **Feature Modals & Hero Highlights:** `0.75rem` (12px). Provides just enough softening to distinguish overlay modules from the main grid.

## Components

### Buttons
- **Primary (Sand CTA):** Background `#E3C49F`, text `#0A2528`, typography `label-md`. High contrast, bold weight. Hover shifts to `#EDD5B8` with an ambient glow of `rgba(227, 196, 159, 0.25)`. Active scale compresses to `0.98`.
- **Secondary (Teal Outline):** Transparent background, 1px border of `rgba(227, 196, 159, 0.4)`, text `#F6E7D2`. Hover transitions background to `rgba(20, 80, 88, 0.4)` and border to `#E3C49F`.
- **Ghost:** Text `#8AA5A8`, no border. Hover transitions text to `#F6E7D2`.

### Chips & Badges
- **Academic Tags (e.g., "JEE Adv Focus", "Rank Booster"):** Background `rgba(20, 80, 88, 0.6)`, 1px border of `rgba(227, 196, 159, 0.2)`, text `#EDD5B8`, font `label-sm`.
- **Live Status:** Background `rgba(56, 178, 172, 0.15)`, text `#38B2AC`, 1px border `rgba(56, 178, 172, 0.3)`. Includes a pulse indicator for live classes and mentor availability.

### Cards
- **Batch Cards:** `#0D3B40` surface, 1px border in `rgba(227, 196, 159, 0.12)`. Padding `space-lg`. Includes an upper-right corner ribbon or tag for batch targets (`Class 11`, `Droppers`, `Crash Course`). Selected batch cards receive an outline of `#E3C49F` and elevation level 2 glow.

### Interactive Batch Selector
- Segmented control layout with horizontal tabs on desktop and swipeable cards on mobile. Unselected segments rest at `#0A2528` with `#8AA5A8` text. The active segment raises to `#145058` with a bottom indicator in `#E3C49F`.

### Input Fields
- Background `#071A1C`, 1px border `rgba(138, 165, 168, 0.2)`. Placeholder text in `#8AA5A8`. Focus state transitions the border to `#E3C49F` with an outer focus-ring of `rgba(227, 196, 159, 0.15)`. Error states switch border to crimson (`#E53E3E`).

### Step-by-Step Mentorship Journey
- Connected vertical timeline (mobile) or horizontal stepper (desktop). Active nodes display a solid `#E3C49F` disc with `#0A2528` numbering. Upcoming nodes are `#0D3B40` with `#8AA5A8` text. Connecting lines illuminate in `#E3C49F` as milestones (Diagnostic Test, Strategy Call, Doubt Plan, Weekly Review) are completed.

### Checkboxes & Radios
- Square (checkbox) or circular (radio) container in `#071A1C` with a 1px border in `rgba(227, 196, 159, 0.3)`. Selected state fills with `#E3C49F`, rendering the checkmark or dot in `#0A2528`.