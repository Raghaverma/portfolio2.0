# Design System Specification: The Architectural Humanist

## 1. Overview & Creative North Star
This design system is built for the "Architectural Humanist." It rejects the sterile, cold nature of traditional technical portfolios in favor of a tactile, editorial experience that feels curated rather than programmed. The objective is to present software engineering not just as code, but as a craft—akin to high-end industrial design or modern architecture.

**The Creative North Star: "The Digital Atelier"**
The interface should feel like a physical workspace: premium paper stock, warm stone surfaces, and precise, intentional typography. We break the "web template" look by utilizing intentional asymmetry, overlapping elements that create depth, and a dramatic contrast between high-end serif displays and functional sans-serif UI.

---

## 2. Colors & Surface Logic
The palette intentionally avoids the "tech-standard" cool spectrum (blues/purples) to establish a sophisticated, grounded presence. It relies on earthy neutrals and a singular clay accent to provide warmth and humanity.

### The Palette
- **Background (`#faf9f7`):** A warm, off-white "bone" color that reduces eye strain and feels more like premium paper than a screen.
- **Primary (`#5f5e5e`):** A deep charcoal stone. Used for high-contrast UI elements and grounding the composition.
- **Secondary (`#944a32`):** A muted clay/terracotta. This is your "human" touch—use it sparingly for critical CTAs or to highlight a unique "handcrafted" detail.
- **Tertiary (`#655d59`):** A warm, flinty grey used for supporting elements and technical metadata.

### The "No-Line" Rule
**Explicit Instruction:** Do not use `1px` solid borders to define sections. Layout boundaries must be established through background color shifts. Use `surface-container-low` (`#f3f4f1`) against a `surface` background to denote a new area. If you feel a line is needed, use a `24` spacing unit (8.5rem) of whitespace instead.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the following tiers to create "nested" depth:
- **Level 0 (Base):** `surface` (`#faf9f7`)
- **Level 1 (Sections):** `surface-container-low` (`#f3f4f1`)
- **Level 2 (Cards/Modules):** `surface-container` (`#edeeeb`)
- **Level 3 (Interactive/Floating):** `surface-container-highest` (`#e0e3e0`)

---

## 3. Typography: The Editorial Contrast
We use a high-contrast typographic pairing to bridge the gap between "Technical Precision" and "Human Craft."

- **The Display & Headline (Newsreader):** A sophisticated serif. This represents the "human" aspect. Use `display-lg` (3.5rem) for hero statements with a `-0.02em` letter-spacing to feel tight and editorial.
- **The Functional UI (Inter):** A clean, neutral sans-serif. Used for `title`, `body`, and `label` roles. This provides the "technical" precision. 

**Hierarchy Note:** 
Always pair a `headline-lg` serif with a `label-md` sans-serif (all caps, `0.05em` tracking) nearby to create that "architectural blueprint" aesthetic.

---

## 4. Elevation & Depth
Depth in this system is achieved through **Tonal Layering** and **Atmospheric Optics**, never through heavy drop shadows.

### The Layering Principle
Stack surfaces to create hierarchy. A `surface-container-lowest` (`#ffffff`) card placed on a `surface-container-low` (`#f3f4f1`) section creates a natural "lift" that feels like a sheet of paper resting on a stone desk.

### Ambient Shadows
For floating elements (like a navigation bar or a modal), use "Ambient Shadows":
- **Shadow Color:** A 6% opacity version of `on-surface` (`#2f3331`).
- **Blur:** Large and diffused (e.g., `box-shadow: 0 20px 40px rgba(47, 51, 49, 0.06)`).

### The Ghost Border
If accessibility requires a container definition, use a **Ghost Border**: `outline-variant` (`#afb3b0`) at **15% opacity**. This creates a tactile edge that doesn't break the "Architectural" flow.

### Glassmorphism
For floating navigation or overlays, use `surface` with 80% opacity and a `20px` backdrop-blur. This allows the warm clay or charcoal accents to bleed through the UI, making the system feel integrated and light.

---

## 5. Components

### Buttons
- **Primary:** `primary` background with `on-primary` text. Use `rounded-sm` (0.125rem) for a sharp, architectural look.
- **Secondary:** `surface-container-highest` background. No border.
- **Interaction:** On hover, transition the background color to `secondary` (clay) to provide a "warm" tactile response.

### Cards & Lists
- **Rule:** Absolute prohibition of divider lines. 
- **Execution:** Use `spacing-6` (2rem) of vertical space to separate list items. For cards, use a subtle background shift to `surface-container` or an asymmetrical layout where text overlaps the edge of the container to break the grid.

### Input Fields
- **Style:** Underline only using `outline` (`#777c79`). When focused, the underline transitions to `secondary` (clay).
- **Label:** Always use `label-sm` in all-caps above the field to mimic technical drawings.

### Signature Component: The "Detail Spec"
For project descriptions, use a 2-column asymmetrical layout. Column 1 (Small) uses `label-md` for technical specs (Languages, Tools). Column 2 (Wide) uses `body-lg` for the "Human" narrative of the build.

---

## 6. Do's and Don'ts

### Do
- **Embrace White Space:** Use `spacing-20` (7rem) between major sections. Let the content breathe like a high-end magazine.
- **Asymmetry:** Offset images from their text containers. An image might be `rounded-md` while its background container is `rounded-none`.
- **Subtle Gradients:** Use a very soft linear gradient from `primary` to `primary-dim` on large CTA buttons to give them a "machined metal" feel.

### Don't
- **Don't use 100% Black:** Always use `on-surface` (`#2f3331`) for text; pure black is too harsh for this "natural" palette.
- **Don't use Rounded-Full:** Avoid pill-shaped buttons unless they are small utility chips. The architecture of this system prefers the `sm` (0.125rem) or `md` (0.375rem) radius for a more structural feel.
- **Don't use Glows:** No neon, no outer glows, and no high-saturation colors. If it doesn't exist in a high-end furniture catalog, it doesn't belong here.