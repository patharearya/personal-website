---
name: Arya Pathare
description: Sunlit shallow water over sand; a bronze lane rope guides the visitor from About to Contact.
colors:
  sand-ground: "#ece5d8"
  sand-depth: "#e2d8c6"
  ink: "#1f1b16"
  driftwood: "#675d50"
  lane-rope-bronze: "#8a6428"
  hairline: "rgb(31 27 22 / 0.14)"
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
    backgroundColor: "{colors.lane-rope-bronze}"
    textColor: "{colors.sand-ground}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.25rem"
    height: "44px"
  pill-gold-hover:
    backgroundColor: "#9c7433"
  pill:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.25rem"
    height: "44px"
  nav-link:
    textColor: "{colors.driftwood}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.ink}"
  slide-media:
    backgroundColor: "{colors.sand-depth}"
    rounded: "{rounded.media}"
---

# Design System: Arya Pathare

## Overview

**Creative North Star: "Sunlit Shallows"**

The page is the sandy floor of sunlit shallow water. Crisp lines of sunlight move over warm sand, with soft dappled shade between them, a fine still sand grain underneath, and a faint prism fringe where the light is brightest. A bronze lane rope made of rounded floats runs across the screen as the one guide from About to Contact, and a soft sunspot follows the pointer. Everything visual is in one fixed WebGL canvas behind the content. The interface itself stays quiet: near-black ink type, warm grey-brown secondary text, hairline rules, and bronze used only where the rope or the visitor's next step is. (It began as a dark night-pool world; Arya switched it to light on 2026-10-23 because it was more vibrant and the dark version made the portrait look ghostly.)

Density is low. Each viewport holds one block set off-centre against empty water: the About text sits low and left of centre, the moments run as one band, the projects turn on one curved lane, and Contact sits at the bottom near the rope line. Motion follows the water. Content rises out of a blur at the start, the moments band moves sideways while the page is pinned, the project lane turns and always stops on a slide, and the shader changes through four states as you scroll.

The world rejects the developer portfolio of glowing cards, chips and neon, and the flat, textureless light page.

**Key Characteristics:**
- One fixed full-screen WebGL canvas holds all the art; nothing else paints a background over it.
- Warm sand ground, ink type, one deep bronze.
- One variable grotesque face: light weights at display size, regular at reading size.
- Hairline rules and frameless type; no cards, no boxed sections, no section numbers.
- Scroll drives the scene. Pinned sideways band, curved project lane that snaps per slide, flat native scrollers as the fallback.

## Colors

Warm sand and sunlight with one deeper thread: beige surfaces, ink text, and one bronze.

### Primary
- **Lane-Rope Bronze** (lane-rope-bronze): the rope floats in the shader, the active project slide's hairline frame (at 70% alpha), the project counter's current number, the primary contact pill (with sand-coloured text), text selection, caret, and the focus outline. It lightens to #9c7433 on hover of the pill only. Deep enough to meet contrast on the sand.

### Neutral
- **Sand Ground** (sand-ground): the page and html background, the theme colour, the fade behind the top bar, and the text colour on bronze.
- **Sand Depth** (sand-depth): the canvas fallback gradient and the placeholder fill behind project media.
- **Ink** (ink): primary text, headings, and hover state for links.
- **Driftwood** (driftwood): secondary text such as nav links, places and dates, follow-up paragraphs, tech stacks, and the footer.
- **Hairline** (hairline): every rule and outline, including the top rule on moments and the footer, the 1px ring around project media, resting pill borders, and link underlines. Raised to 50% alpha (`rgb(31 27 22 / 0.5)`) on pill hover.

The shader paints sand from `vec3(0.84, 0.79, 0.70)` (bottom) to `vec3(0.92, 0.88, 0.81)` (top), adds sunlight as warm white `vec3(1.0, 0.97, 0.9)`, and draws the rope floats in `vec3(0.6, 0.44, 0.18)`, close to Lane-Rope Bronze.

### Named Rules
**The One Thread Rule.** Bronze means "follow this" or "this one." It marks the rope, the active slide, the current count, the primary action and focus. Nothing else is bronze, and nothing decorative is bronze.

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
- **Label** (400, 0.8125–0.9375rem): the top bar (0.875rem), dates, stacks, links, pills and the footer. Usually Driftwood. Mixed case, no tracking. The project counter uses tabular numerals.

Emphasis comes from weight 500 only: the name in the bar, award text, and the bronze pill.

### Named Rules
**The Light-Large Rule.** The bigger the type, the lighter the weight (300 display, 350 headline, 400 title and body). Never set display type in bold.

**The No Kicker Rule.** A section starts with its display heading. Nothing small, uppercase or numbered sits above it.

## Layout

Everything uses one side margin, `gutter` (clamp(16px, 4vw, 56px)). The About block is inset by an extra 6vw, aligned to the bottom of a 100svh section with 15vh below it, and limited to 38rem wide. Sections are separated by about 18vh of empty water at the top and 10–12vh at the bottom. Inside blocks, spacing steps are 0.4, 1.25 and 2.25rem.

Two layouts sit on one breakpoint, 900px, together with the reduced-motion setting:
- **Full scenes** (≥900px and motion allowed; `has-motion` on html): Lenis smooth scroll. The moments section pins at 100svh and its track moves sideways with scrub 0.8. The work section pins and its slides sit inside a cylinder (radius 1.15 × viewport width, 1500px perspective). Scroll turns the cylinder, and it snaps to each slide with power3.inOut over 0.3–0.8s. Slides further from centre fade out and are hidden past 1.1 rad. Inactive slide text drops to 35% opacity. On viewports under 780px tall the slide's second note is hidden.
- **Flat** (under 900px or reduced motion): the CSS default, which works with no JS. Moments and projects become native horizontal scrollers with mandatory snap. At 900px and wider the moments become a four-column grid and the projects a two-column grid, and the counter is hidden. The top-bar section links are hidden at 720px and below.

## Elevation & Depth

Depth comes from the light, not from stacked surfaces. The shader is brighter toward the top, shades the gaps between light lines (the dapple), and has a soft vignette. The rope casts a soft shadow on the water under it. In the interface the only lifted element is project media.

### Shadow Vocabulary
- **Media ring** (`box-shadow: 0 0 0 1px var(--rule), 0 30px 60px -30px rgb(70 52 28 / 0.35)`): every project media frame. A hairline ring plus a long, soft drop below it.
- **Active ring** (`box-shadow: 0 0 0 1px rgb(138 100 40 / 0.7), 0 30px 60px -30px rgb(70 52 28 / 0.35)`): the slide in view. Transitions over 0.6s.

### Named Rules
**The Underwater Light Rule.** Light comes from above, through the surface. Glows, highlights and shadows follow that direction. Nothing glows from inside a card.

## Shapes

Edges are square except where a shape means something. Rules are 1px hairlines. Project media is 16:9 with 4px corners. Pills are fully rounded (999px), and the reduced-motion play button is a 44px circle. The focus outline is 2px bronze, 4px offset, with 2px corners. Icons are inline 16px-grid SVG strokes at 1.25 width, sized to 0.9em. The rope's floats are flattened ellipses in two alternating bronzes, and the favicon repeats that wave.

## Components

### Buttons (pills)
Quiet capsules that appear only at Contact.
- **Shape:** fully rounded (999px), at least 44px tall, 0.6rem × 1.25rem padding, 0.9375rem label, optional trailing icon.
- **Primary:** Lane-Rope Bronze fill and border, Sand Ground text, weight 500. Exactly one per page: the email.
- **Secondary:** transparent with a hairline border and Ink text (Résumé, LinkedIn, GitHub). On hover the border rises to 50% alpha.
- **Transitions:** 0.3s with the house ease `cubic-bezier(0.16, 1, 0.3, 1)`.

### Navigation
A thin fixed bar that fades into the water instead of ending at an edge. The name sits on the left at weight 500. Section links are centred in Driftwood and turn Ink on hover. Résumé with a download icon sits on the right. The background is a ground-colour gradient that fades to transparent over 72px. Only the links take pointer events.

### Moment
A hairline rule on top, then a headline title, a Driftwood "place · date" line, and one body line. There is no frame. Moments are items in a sideways band.

### Project Slide (signature)
16:9 media with the media ring, then a title, a date line (award in weight 500 followed by a "·" separator), a claim, a muted note, and a footer that puts the stack on the left and underlined links on the right. Link underlines are hairline and turn ink on hover, offset 0.3em. Only the active slide's video plays. Videos loop back to their start offset, not to 0.

### The Water (signature)
One fixed canvas behind everything, with four states driven by scroll phase 0–3. About shows sunlight with pointer ripples and a low, waving rope. Where I've been stretches the light into drifting horizontal lane streaks above a straight rope. Work bows the rope into an arc under the curved project lane. Contact dims the light and lifts the rope to the surface line. The pointer carries a warm sunspot that brightens the light around it, pushes the rope away and brightens the floats near it. Rendered at 0.75x CSS pixels; rebuilds itself after a lost WebGL context. Under reduced motion the canvas draws one still frame per scroll step.

### Portrait
Arya's photo in colour (saturation 62%, midtones lifted), cut out, cropped to head and shoulders, with every edge faded into the sand, normal blending. Right of the About text; drifts slightly with the pointer and sinks as you scroll on.

## Do's and Don'ts

### Do:
- **Do** keep all art in the single fixed water canvas, and keep section backgrounds transparent.
- **Do** spend bronze only on the rope, the active slide, the current count, the one primary action, selection and focus.
- **Do** set section headings in the light display style (300, -0.035em) with nothing above them.
- **Do** separate content with 1px hairline rules at 14% alpha instead of boxes.
- **Do** make every scroll-driven scene come to rest on an item, never between two.
- **Do** ship a flat, JS-free layout below 900px and under reduced motion. Scenes are an enhancement.
- **Do** use `cubic-bezier(0.16, 1, 0.3, 1)` for interface transitions (0.3s for hover, 0.6s for slide state).

### Don't:
- **Don't** use glowing cards, chips, neon or gradient text. That is the developer portfolio this world rejects.
- **Don't** add kickers, eyebrows or section numbers above headings.
- **Don't** add a second accent colour or a second bronze-filled action.
- **Don't** give body or sections a background that covers the canvas.
- **Don't** set display type heavier than 300.
