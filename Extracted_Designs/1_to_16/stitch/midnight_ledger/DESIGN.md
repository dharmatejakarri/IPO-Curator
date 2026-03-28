# Design System Document: IPO Analysis Editorial Experience

## 1. Overview & Creative North Star: "The Financial Curator"

This design system moves away from the cluttered, anxiety-inducing density of traditional trading platforms. Instead, it adopts the persona of **"The Financial Curator."** The goal is to present complex IPO data through a lens of high-end editorial luxury—combining the structural discipline of Apple-inspired minimalism with the rhythmic asymmetry of a Bento Grid.

By utilizing massive intentional white space (100px–200px) and a "vanta-black" depth, we create a focused environment where data isn't just displayed; it is showcased. We break the "template" look by favoring organic, overlapping layers and tonal depth over rigid borders and generic grids.

---

## 2. Colors: Depth Beyond Black

The palette is rooted in absolute blacks and near-blacks to ensure the "Growth Accents" (Teal and Blue) vibrate with importance.

### Color Tokens
*   **Background (Deep Base):** `#131313` (The canvas for all layouts)
*   **Primary (Growth):** `#46f1c5` (Used for positive trends and primary actions)
*   **Secondary (Trust):** `#9fcaff` (Used for stability and technical data)
*   **Surface Hierarchy:**
    *   `surface_container_lowest`: `#0e0e0e` (Deepest recessed areas)
    *   `surface_container`: `#201f1f` (Standard card base)
    *   `surface_container_highest`: `#353534` (Elevated/Hovered states)

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Layout boundaries must be achieved exclusively through background color shifts. A `surface_container_low` section sitting on a `surface` background provides all the definition required. If the layout feels "mushy," increase the spacing scale rather than adding a line.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of obsidian. To create focus, nest a `surface_container_lowest` data table inside a `surface_container` card. This "inward depth" creates a sense of sophisticated machinery without visual noise.

### The "Glass & Gradient" Rule
Floating elements (modals, dropdowns, navigation) must utilize Glassmorphism. Use `surface` at 60% opacity with a `20px` backdrop-blur. For primary CTAs, apply a subtle linear gradient from `primary` (#46f1c5) to `primary_container` (#00d4aa) at a 135° angle to inject "visual soul."

---

## 3. Typography: Editorial Authority

We use **Inter** (or SF Pro) as our voice. The scale is intentionally dramatic to create a hierarchy that feels like a premium magazine.

*   **Display-LG (72-96pt):** Used for IPO Headlines or Ticker Symbols. Letter-spacing: `-0.04em`. This is the "Hero" of the page.
*   **Headline-LG (2rem):** Used for section headers in the Bento Grid.
*   **Body-LG (1rem/16px):** The standard for analysis text. High line-height (1.6) is mandatory to maintain the "Luxury" feel.
*   **Label-MD (0.75rem):** All-caps with `0.1em` tracking for technical metadata (e.g., "MARKET CAP," "OFFER PRICE").

The juxtaposition of a `Display-LG` price point next to a `Body-SM` analysis creates the "Editorial" tension required for a high-end experience.

---

## 4. Elevation & Depth: Tonal Layering

Traditional shadows are often a crutch for poor spacing. In this system, we prioritize **Tonal Layering**.

*   **The Layering Principle:** Place a `surface_container_high` element on a `surface` background to create a "lift." No shadow is needed.
*   **Ambient Shadows:** For floating Bento cards that require a "hover lift," use a 48px blur, 0px offset, and 6% opacity of the `on_surface` color. This mimics a soft glow rather than a harsh drop shadow.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use the `outline_variant` token at **15% opacity**. It should be felt, not seen.
*   **Motion Depth:** When a card is hovered, transition the background from `surface_container` to `surface_container_highest` and apply a 2px vertical lift.

---

## 5. Components

### Buttons
*   **Primary:** Large (height: 64px), 24px radius (`xl`). Background: `primary` gradient. Text: `on_primary`. Apply a subtle `0 0 20px` outer glow using the `primary` color at 20% opacity.
*   **Tertiary:** No background. `primary` text. Use for "Cancel" or "Back" actions.

### Bento-Style Cards
*   **Construction:** Use `md` (1.5rem) or `lg` (2rem) corner radii.
*   **Padding:** Minimum `2.75rem` (8 scale) internal padding to allow data to breathe.
*   **Separation:** Forbid dividers. Use vertical spacing (`1.7rem`) to separate headline from content.

### High-Contrast Charts
*   **Visual Style:** Use `primary` (teal) for growth lines and `secondary` (blue) for benchmarks. 
*   **Grid Lines:** Use `outline_variant` at 10% opacity. 
*   **Fills:** Use a vertical gradient from `primary` (20% opacity) to transparent for area charts.

### Input Fields
*   **Style:** `surface_container_low` background with no border. On focus, transition the background to `surface_container_high` and add a 1px "Ghost Border" using the `primary` color at 30% opacity.

---

## 6. Do's and Don'ts

### Do
*   **Use Massive Spacing:** If a section feels crowded, double the padding. Use the `20` (7rem) or `24` (8.5rem) spacing tokens between major Bento blocks.
*   **Embrace Asymmetry:** Mix 1-column and 2-column widths in your Bento Grid to create visual interest.
*   **Color as Data:** Use `primary` (teal) only for positive growth and `error` (soft red) for risks.

### Don't
*   **No 1px Lines:** Never use a solid white or grey line to separate content.
*   **No Standard Grays:** Avoid neutral grays (#808080). Use the `tertiary` and `surface_variant` tokens which are tinted to feel more integrated into the dark theme.
*   **No Density:** Do not try to fit more than 5-6 key metrics on a single screen. This is an "Analysis" tool, not a "Day-Trading" terminal.