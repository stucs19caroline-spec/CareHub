---
name: Petal & Cloud
colors:
  surface: '#fbf8ff'
  surface-dim: '#dad9e3'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2fd'
  surface-container: '#eeedf7'
  surface-container-high: '#e8e7f1'
  surface-container-highest: '#e3e1ec'
  on-surface: '#1a1b22'
  on-surface-variant: '#544249'
  inverse-surface: '#2f3038'
  inverse-on-surface: '#f1effa'
  outline: '#87717a'
  outline-variant: '#dac0c9'
  surface-tint: '#a43073'
  primary: '#a43073'
  on-primary: '#ffffff'
  primary-container: '#f472b6'
  on-primary-container: '#6d0047'
  inverse-primary: '#ffafd3'
  secondary: '#006b5f'
  on-secondary: '#ffffff'
  secondary-container: '#62fae3'
  on-secondary-container: '#007165'
  tertiary: '#855300'
  on-tertiary: '#ffffff'
  tertiary-container: '#de8e00'
  on-tertiary-container: '#4f2f00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd8e7'
  primary-fixed-dim: '#ffafd3'
  on-primary-fixed: '#3d0026'
  on-primary-fixed-variant: '#85145a'
  secondary-fixed: '#62fae3'
  secondary-fixed-dim: '#3cddc7'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005047'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#fbf8ff'
  on-background: '#1a1b22'
  surface-variant: '#e3e1ec'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.25rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system crafts an emotional sanctuary within personal healthcare. Navigating symptoms, tracking recovery, and receiving clinical diagnostics often triggers acute anxiety. The system counteracts this vulnerability with a whimsical, tactile, and deeply reassuring atmosphere—transforming clinical dread into an encouraging, botanical-inspired journey of self-care.

The aesthetic fuses soft modern tactile design with playful pastel glassmorphism and organic geometry:
- **Atmosphere:** Uplifting, nurturing, and gentle without sacrificing medical authority.
- **Target Audience:** Patients, wellness trackers, and individuals managing recurring health checks who crave a soothing, non-intimidating mobile experience.
- **Visual Personality:** Soft pillow-like cards, buoyant pill shapes, gentle chromatic blurs, and organic petal metaphors that celebrate everyday health milestones.

## Colors

The palette relies on a balanced spectrum of calming cloud surfaces, affectionate blush tones, restorative aquatic accents, and encouraging sunlit highlights:

- **Primary (Blush Petal):** `#F472B6` serves as the emotional anchor for key interactive targets, celebratory milestones, and vital actions. Complementary shades include `#FFF1F2` for ambient canvas backdrops, `#FCE7F3` for resting pill containers, and `#FB7185` for pressed states.
- **Secondary (Fresh Playful Teal):** `#2DD4BF` delivers clinical clarity and restorative freshness. Deep teal `#0D9488` guarantees AAA accessibility for copy, while `#CCFBF1` provides soft status highlights and diagnostic metric tiles.
- **Tertiary (Sunny Butter Yellow):** `#F59E0B` (accentuated by `#FEF08A` for background tints) designates active alerts, playful streak stars, and warm encouragement indicators.
- **Neutrals & Surfaces:** Canvas backgrounds rely strictly on cloud white (`#FAFAFA` and `#FFFFFF`). Body text utilizes `#3F3F46` to avoid the harshness of pure black, with secondary labels anchored in `#71717A`.
- **Semantic Health States:** Positive/Stable uses Mint Teal (`#0D9488` on `#CCFBF1`), Needs Attention uses Butter Amber (`#D97706` on `#FEF08A`), and Action Required relies on Berry Rose (`#E11D48` on `#FFE4E6`).

## Typography

The type system is powered entirely by **Plus Jakarta Sans**, chosen for its generous x-height, wide open counters, and inherently friendly, rounded geometric terminals. 

- **Headlines:** Use weights `700` and `800` to establish warmth and energetic playfulness while keeping patient onboarding and diagnostic summaries readable at a glance.
- **Body & Clinical Descriptions:** Retain comfortable `400` weights paired with relaxed line-height ratios (1.5x) to minimize cognitive fatigue during symptom input.
- **Numbers & Health Metrics:** Biometric counters, dosage intervals, and diagnostic scores render with bold weights (`700`), utilizing tabular spacing where dynamic data shifts occur.

## Layout & Spacing

Designed fundamentally for handheld ergonomics and mobile touch comfort:
- **Canvas System:** Operates on a 4-column fluid mobile grid anchored by `1rem` outer margins (`margin-mobile`), stepping to a structured 6-column presentation on compact tablets (`margin`: `1.25rem`). Max-content width on viewports wider than mobile is restrained to 480px, retaining native mobile ergonomics.
- **Vertical Rhythm:** Content clusters stack with generous breathing room (`space-lg`), separating diagnostic assessment modules from daily health logs to prevent cognitive overload.
- **Interactive Target Safe Zones:** All tap targets conform to minimum dimensions of 48x48px, padded internally with `space-sm` vertically and `space-md` horizontally.

## Elevation & Depth

Visual depth avoids cold, clinical drop shadows. Instead, it relies on **pastel ambient glows** and **tonal floating pillows**:

- **Resting Layer (Cloud Base):** Clean white cards resting on an ultra-soft `#FFF1F2` or `#FAFAFA` foundation, delineated by delicate `1px` borders tinted with `rgba(244, 114, 182, 0.12)`.
- **Soft Floating (Level 1):** Interactive cards, symptom selectors, and health logs project a colored, ultra-diffused aura: `0 8px 24px -4px rgba(244, 114, 182, 0.14)`.
- **Active / Elevated (Level 2):** Primary Floating Action Buttons, live diagnostic scanners, and triage dialogs cast an intensified dual-glow: `0 12px 32px -4px rgba(244, 114, 182, 0.28), 0 4px 12px -2px rgba(45, 212, 191, 0.20)`.
- **Translucent Pill Overlay:** Diagnostic floating sheets and navigation bars utilize a glassmorphic blur (`backdrop-filter: blur(16px)`) over an 85% opacity `#FFFFFF` fill, keeping background context visible as comforting color washes.

## Shapes

The shape vocabulary is unapologetically pill-shaped, curvilinear, and organic:
- **Pill Philosophy (Level 3):** Standard buttons, input envelopes, status badges, and tab switchers utilize full pill radiuses (`border-radius: 9999px`).
- **Cards & Containers:** Primary containers utilize `2rem` (`rounded-lg`) corner radii to form squircle-like "soft pillows" that feel tactile, safe, and huggable.
- **Whimsical Botanical Accents:** Specialized modal corners, floating health trackers, and decorative progress indicators feature organic asymmetric curvature (e.g., `border-radius: 2rem 2rem 2rem 0.75rem`) evoking blooming flower petals.

## Components

### Buttons
- **Primary Action:** Full pill radius (`9999px`), background gradient transitioning from `#F472B6` to `#FB7185`, white bold typography, accompanied by a soft rosy ambient glow (`rgba(244, 114, 182, 0.35)`). Active tap scales to `0.97` with a spring transition.
- **Secondary (Teal Refresh):** Pill-shaped container filled with `#CCFBF1`, text and icon tinted with `#0D9488`.
- **Tertiary / Ghost:** Pure cloud white surface with subtle petal-pink border (`rgba(244, 114, 182, 0.3)`), providing non-urgent options.

### Chips & Symptom Selectors
- Pill-shaped tags (`border-radius: 9999px`) with padding `0.5rem 1rem`.
- **Unselected:** Translucent `#FFFFFF` background with `1px` border of `#FCE7F3` and label in `#71717A`.
- **Selected:** Transitions instantly into `#FCE7F3` surface fill, `#F472B6` border (`1.5px`), `#F472B6` text, and a tiny leading botanical checkmark or petal motif.

### Cards & Floating Modules
- Encapsulated in `rounded-lg` (2rem) containers with `#FFFFFF` background and subtle rosy outer border (`1px solid rgba(244, 114, 182, 0.12)`).
- Floating Action Cards feature an interior upper banner displaying playful health badges or illustrated floral mood trackers.

### Inputs & Health Diagnostic Prompts
- Enclosed within pill envelopes (`border-radius: 9999px`) or ultra-rounded boxes (`border-radius: 1.5rem`) with `#FAFAFA` background.
- Focus states illuminate the border with vibrant teal `#2DD4BF` and an exterior glow of `rgba(45, 212, 191, 0.2)`. Placeholder text sits in `#A1A1AA`.

### Checkboxes & Radios
- **Radio Buttons:** Circular targets with concentric petal outlines; selecting activates a soft bubble expansion of `#F472B6` with a center cloud-white dot.
- **Checkboxes:** Squircle checkboxes (`border-radius: 0.5rem`) that fill with `#2DD4BF` upon completion, framing a playful white checkmark.

### Whimsical Progress Bars & Petal Gauges
- **Track:** Recessed cloud pill (`#FCE7F3`) with height of `12px` to `16px`.
- **Fill:** Gradient of `#F472B6` into `#2DD4BF` with animated glowing caps.
- **Milestone Accents:** Floating golden star icons (`#F59E0B`) and botanical petal indicators sit at key diagnostic progress markers (e.g., 25%, 50%, 100%), pulsing gently when unlocked.

### Daily Mood & Symptom Petal Wheel (Domain-Specific)
- A cluster of interactive petals configured in an organic bloom. Each petal represents a body system (e.g., sleep, hydration, mood, pain level), color-coded with the secondary teal and primary blush scales, expanding slightly upon user interaction to reveal micro-surveys.