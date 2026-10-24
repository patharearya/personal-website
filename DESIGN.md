---
name: Arya Pathare
description: A night lap pool seen from the bottom; a gold lane rope guides the visitor from About to Contact.
colors:
  pool-ground: "#070b10"
  pool-depth: "#0f1820"
  surface-white: "#e3eaed"
  tile-grey: "#8b9ca6"
  lane-rope-gold: "#c8a463"
  hairline: "rgb(223 231 234 / 0.14)"
typography:
  display:
    fontFamily: "Bricolage Grotesque Variable, system-ui, sans-serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 300
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque Variable, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 2.6vw, 2.25rem)"
    fontWeight: 350
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bricolage Grotesque Variable, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 2vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Bricolage Grotesque Variable, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.6vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Bricolage Grotesque Variable, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Bricolage Grotesque Variable, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  focus: "2px"
  media: "4px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  stack-sm: "1.25rem"
  stack-lg: "2.25rem"
  section: "18vh"
components:
  pill-gold:
    backgroundColor: "{colors.lane-rope-gold}"
    textColor: "{colors.pool-ground}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.25rem"
    height: "44px"
  pill-gold-hover:
    backgroundColor: "#d6b577"
  pill:
    backgroundColor: "transparent"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.25rem"
    height: "44px"
  nav-link:
    textColor: "{colors.tile-grey}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.surface-white}"
  slide-media:
    backgroundColor: "{colors.pool-depth}"
    rounded: "{rounded.media}"
---

# Design System: Arya Pathare

## Overview

**Creative North Star: "The Night Lap Pool"**

The page is a pool at night seen from the bottom. The visitor looks up through blue-black water while pale caustic light moves overhead, and a gold lane rope made of rounded floats runs across the screen as the one guide from About to Contact. Everything visual is in one fixed WebGL canvas behind the content. The interface itself stays quiet: cool white type, blue-grey secondary text, hairline rules, and gold used only where the rope or the visitor's next step is.

Density is low. Each viewport holds one block set off-centre against empty water: the About text sits low and left of centre, the moments run as one band, the projects turn on one curved lane, and Contact sits at the bottom near the rope line. Motion follows the water. Content rises out of a blur at the start, the moments band moves sideways while the page is pinned, the project lane turns and always stops on a slide, and the shader changes through four states as you scroll.

The world rejects the dark developer portfolio of glowing cards, chips and neon, and it rejects the light Swiss sheet it replaced.

**Key Characteristics:**
- One fixed full-screen WebGL canvas holds all the art; nothing else paints a background over it.
- Blue-black ground, cool white type, one muted gold.
- One variable grotesque face: light weights at display size, regular at reading size.
- Hairline rules and frameless type; no cards, no boxed sections, no section numbers.
- Scroll drives the scene. Pinned sideways band, curved project lane that snaps per slide, flat native scrollers as the fallback.

## Colors

Cold water with a single warm thread: near-black blue surfaces, pale cool text, and one gold.

### Primary
- **Lane-Rope Gold** (lane-rope-gold): the rope floats in the shader, the active project slide's hairline frame (at 70% alpha), the project counter's current number, the primary contact pill, text selection, caret, and the focus outline. It warms to a lighter gold (#d6b577) on hover of the gold pill only.

### Neutral
- **Pool Ground** (pool-ground): the page and html background, the deep floor of the shader, the theme colour, the fade behind the top bar, and the text colour on gold.
- **Pool Depth** (pool-depth): the lit water nearer the surface, the canvas fallback gradient, and the placeholder fill behind project media.
- **Surface White** (surface-white): primary text, headings, and hover state for links.
- **Tile Grey** (tile-grey): secondary text such as nav links, places and dates, follow-up paragraphs, tech stacks, and the footer.
- **Hairline** (hairline): every rule and outline, including the top rule on moments and the footer, the 1px ring around project media, resting pill borders, and link underlines. Raised to 50% alpha (`rgb(223 231 234 / 0.5)`) on pill hover.

The shader draws its caustic light in a pale blue (about `rgb(158 194 209)`, added at low strength) and its gold as `vec3(0.784, 0.643, 0.388)`, which equals Lane-Rope Gold.

### Named Rules
**The One Thread Rule.** Gold means "follow this" or "this one." It marks the rope, the active slide, the current count, the primary action and focus. Nothing else is gold, and nothing decorative is gold.

**The Water Owns the Background Rule.** Body has no background. A section that paints its own fill covers the canvas. The only allowed local wash is a ground-colour radial pool behind text that would otherwise sit on a bright screenshot.

## Typography

**Display Font:** Bricolage Grotesque Variable (with system-ui, sans-serif)
**Body Font:** Bricolage Grotesque Variable (same face)

**Character:** one variable grotesque with optical sizing on. At display size it is light and tightly tracked, almost liquid. At reading size it is plain and regular.

### Hierarchy
- **Display** (300, clamp(3rem, 8vw, 6rem), 0.95, -0.035em, balanced wrap): one per section as its heading. "About me", "Where I've been", "Work", "Let's talk."
- **Headline** (350, clamp(1.75rem, 2.6vw, 2.25rem), 1.05): moment titles in the sideways band.
- **Title** (400, clamp(1.375rem, 2vw, 1.75rem), 1.1): project names under slide media.
- **Lead** (400, clamp(1.125rem, 1.6vw, 1.3125rem), 1.55, max 34em): the opening About paragraph.
- **Body** (400, 1.0625rem, 1.6, 30–38em measure): moment lines, project claims, follow-up paragraphs.
- **Label** (400, 0.8125–0.9375rem): the top bar (0.875rem), dates, stacks, links, pills and the footer. Usually Tile Grey. Mixed case, no tracking. The project counter uses tabular numerals.

Emphasis comes from weight 500 only: the name in the bar, award text, and the gold pill.

### Named Rules
**The Light-Large Rule.** The bigger the type, the lighter the weight (300 display, 350 headline, 400 title and body). Never set display type in bold.

**The No Kicker Rule.** A section starts with its display heading. Nothing small, uppercase or numbered sits above it.

## Layout

Everything uses one side margin, `gutter` (clamp(16px, 4vw, 56px)). The About block is inset by an extra 6vw, aligned to the bottom of a 100svh section with 15vh below it, and limited to 38rem wide. Sections are separated by about 18vh of empty water at the top and 10–12vh at the bottom. Inside blocks, spacing steps are 0.4, 1.25 and 2.25rem.

Two layouts sit on one breakpoint, 900px, together with the reduced-motion setting:
- **Full scenes** (≥900px and motion allowed; `has-motion` on html): Lenis smooth scroll. The moments section pins at 100svh and its track moves sideways with scrub 0.8. The work section pins and its slides sit inside a cylinder (radius 1.15 × viewport width, 1500px perspective). Scroll turns the cylinder, and it snaps to each slide with power3.inOut over 0.3–0.8s. Slides further from centre fade out and are hidden past 1.1 rad. Inactive slide text drops to 35% opacity. On viewports under 780px tall the slide's second note is hidden.
- **Flat** (under 900px or reduced motion): the CSS default, which works with no JS. Moments and projects become native horizontal scrollers with mandatory snap. At 900px and wider the moments become a four-column grid and the projects a two-column grid, and the counter is hidden. The top-bar section links are hidden at 720px and below.

## Elevation & Depth

Depth comes from the water, not from stacked surfaces. The shader is brighter toward the top (Snell's window is a pale disc centred above the viewport), darkens toward the floor, and has a vignette. The rope casts a soft shadow on the water under it. In the interface the only lifted element is project media.

### Shadow Vocabulary
- **Media ring** (`box-shadow: 0 0 0 1px var(--rule), 0 30px 60px -30px rgb(0 0 0 / 0.8)`): every project media frame. A hairline ring plus a long, soft drop below it.
- **Active ring** (`box-shadow: 0 0 0 1px rgb(200 164 99 / 0.7), 0 30px 60px -30px rgb(0 0 0 / 0.8)`): the slide in view. Transitions over 0.6s.

### Named Rules
**The Underwater Light Rule.** Light comes from above, through the surface. Glows, highlights and shadows follow that direction. Nothing glows from inside a card.

## Shapes

Edges are square except where a shape means something. Rules are 1px hairlines. Project media is 16:9 with 4px corners. Pills are fully rounded (999px), and the reduced-motion play button is a 44px circle. The focus outline is 2px gold, 4px offset, with 2px corners. Icons are inline 16px-grid SVG strokes at 1.25 width, sized to 0.9em. The rope's floats are flattened ellipses in two alternating golds, and the favicon repeats that wave.

## Components

### Buttons (pills)
Quiet capsules that appear only at Contact.
- **Shape:** fully rounded (999px), at least 44px tall, 0.6rem × 1.25rem padding, 0.9375rem label, optional trailing icon.
- **Primary:** Lane-Rope Gold fill and border, Pool Ground text, weight 500. Exactly one per page: the email.
- **Secondary:** transparent with a hairline border and Surface White text (Résumé, LinkedIn, GitHub). On hover the border rises to 50% alpha.
- **Transitions:** 0.3s with the house ease `cubic-bezier(0.16, 1, 0.3, 1)`.

### Navigation
A thin fixed bar that fades into the water instead of ending at an edge. The name sits on the left at weight 500. Section links are centred in Tile Grey and turn Surface White on hover. Résumé with a download icon sits on the right. The background is a ground-colour gradient that fades to transparent over 72px. Only the links take pointer events.

### Moment
A hairline rule on top, then a headline title, a Tile Grey "place · date" line, and one body line. There is no frame. Moments are items in a sideways band.

### Project Slide (signature)
16:9 media with the media ring, then a title, a date line (award in weight 500 followed by a "·" separator), a claim, a muted note, and a footer that puts the stack on the left and underlined links on the right. Link underlines are hairline and turn white on hover, offset 0.3em. Only the active slide's video plays. Videos loop back to their start offset, not to 0.

### The Water (signature)
One fixed canvas behind everything, with four states driven by scroll phase 0–3. About shows caustics with pointer ripples and a low, waving rope. Where I've been stretches the light into drifting horizontal lane streaks above a straight rope. Work bows the rope into an arc under the curved project lane. Contact dims the light by 60% and lifts the rope to the surface line. The pointer pushes the rope away and brightens the gold near it. Under reduced motion the canvas draws one still frame per scroll step.

## Do's and Don'ts

### Do:
- **Do** keep all art in the single fixed water canvas, and keep section backgrounds transparent.
- **Do** spend gold only on the rope, the active slide, the current count, the one primary action, selection and focus.
- **Do** set section headings in the light display style (300, -0.035em) with nothing above them.
- **Do** separate content with 1px hairline rules at 14% alpha instead of boxes.
- **Do** make every scroll-driven scene come to rest on an item, never between two.
- **Do** ship a flat, JS-free layout below 900px and under reduced motion. Scenes are an enhancement.
- **Do** use `cubic-bezier(0.16, 1, 0.3, 1)` for interface transitions (0.3s for hover, 0.6s for slide state).

### Don't:
- **Don't** use glowing cards, chips, neon or gradient text. That is the dark developer portfolio this world rejects.
- **Don't** add kickers, eyebrows or section numbers above headings.
- **Don't** add a second accent colour or a second gold-filled action.
- **Don't** give body or sections a background that covers the canvas.
- **Don't** set display type heavier than 300.
