# Development log

Per significant defect: what broke, what I first thought had broken, and the
measurement that settled it.

## 2026-10-22: Aqua Static screenshot never finished

- **Broke:** headless Edge (`--screenshot --virtual-time-budget=20000`) on the
  live Aqua Static site ran past two minutes and wrote no file.
- **First thought:** the backslash-escaped Windows output path had been mangled
  by the Bash tool (a known issue on this machine, CLAUDE.md).
- **Settled by:** Playwright with system Chrome, `domcontentloaded` plus a fixed
  12 s wait, saved the shot first time (`scripts/shot.mjs`). The page keeps
  network and animation activity going (live map, ticker), so virtual time never
  goes idle. The path was not the cause.

## 2026-10-22: Header went dark over the wrong sections

- **Broke:** the new solid header (review fix 4) turned ink over the light
  Excel Voice and About sections, stayed light over the ink experience section,
  and stayed light over Let's Talk at the page bottom.
- **First thought:** the theme triggers were created before the project pins, so
  their start positions missed the pin spacing. Creating them last with
  `refreshPriority: -1` fixed the middle of the page.
- **Settled by:** a Playwright probe at the bottom (contact top 0 px, past its
  32 px start) still read `class="bar"`. Two `toggleClass` triggers on the same
  class interfere. Replaced them with an IntersectionObserver on a strip at the
  top 4% of the viewport; the probe at six scroll points then read ink exactly
  while experience or contact was under the bar.

## 2026-10-22: Mobile full-page screenshot repeated the page

- **Broke:** `mobile.png` (390 wide at 2x) ran through the experience section,
  then started again from the hero. How I Work, skills and contact were never
  captured. The finish reviewer caught it; I had only looked at crops.
- **First thought:** the reviewer suggested pinned scenes or smooth scrolling
  broke the stitching, so I recaptured under reduced motion (no Lenis, no pins).
- **Settled by:** the recapture came back at the identical size, 780x20598. The
  page is 10,299 CSS px, which is 20,598 device px at 2x, past Chrome's 16,384 px
  limit for one capture. Split into `mobile-1.png` (16,000) and `mobile-2.png`
  (4,598); segment 2 ends at the footer. Lesson: check the image size against
  the limit before reading it.

## 2026-10-22: ABOUT and ME overlapped at the start of the About scene

- **Broke:** at the start of the pinned About scene the two words sat on top of
  each other ("ABOME").
- **First thought:** none needed. The fixed `x: ±24vw` offsets assumed the words
  were narrower than they are at 15vw display size.
- **Settled by:** scroll capture `.impeccable/review/scroll/d08.png` before,
  `about2.png` after. Offsets are now computed from `offsetLeft`/`offsetWidth`
  (unaffected by transforms) so the pair starts centred as "ABOUT ME" at any
  width.

## 2026-10-23: Redesign — the water canvas never showed

- **Broke:** the first captures of the dark redesign showed a flat background;
  no caustics, no gold rope.
- **First thought:** headless Chrome had no WebGL, or the shader failed to
  compile and `startWater` returned early.
- **Settled by:** a probe reported `webgl: true` and a 1440x900 canvas, so the
  shader was drawing. The `body` background was painting over the
  `position: fixed; z-index: -1` canvas (in-flow block backgrounds paint above
  negative z-index children of the root). Removing the body background (the
  `html` element keeps the colour) made the water appear.

## 2026-10-23: Redesign — rope crossed the project text

- **Broke:** mid-Work, the gold rope ran through the slide title.
- **First thought:** the arc height constants were wrong.
- **Settled by:** the rope sat at 0.33 of the height, which matches neither the
  Work arc (0.035) nor the lane height (0.15) but does match a half-done
  Work→Contact blend. A pinned section's height includes its pin distance, so
  phase 2.45 arrived halfway through the Work pin. The shader bands were moved
  to start after each pinned scene ends (Work pin ends at about 72% of the
  section).

## 2026-10-23: Redesign — "the slides jump straight to 4/4"

- **Broke (apparently):** three consecutive scroll captures all showed slide 4.
- **First thought:** the ring tween finished early, so the pin outlived it.
- **Settled by:** a probe stepping 300 px through the pin read scrollY and the
  counter: ScrollTrigger snap moved each stop to 2340 / 3105 / 3870 / 4635
  (one slide each, 765 px apart). The ring was right; the evenly spaced
  captures happened to snap to the last slide. Not a defect.

## 2026-10-23: Portrait gone after scrolling back to About

- **Broke:** the About portrait faded out on scroll as intended, but stayed
  invisible after scrolling back to the top (reported by Arya).
- **First thought:** the scroll trigger's start/end were wrong, so progress
  never returned to 0.
- **Settled by:** `scripts/check-portrait.mjs` read the computed opacity: 1 on
  load, 0.15 scrolled down, 0 back at the top. Progress did return to 0, but
  the scrubbed `.to()` had recorded its start value while the intro `.from()`
  held the portrait at opacity 0. Replaced with `fromTo({opacity: 1})` and
  `immediateRender: false`; the check now reads 1 / 0.15 / 1. Confirmed the
  check fails on the old code before the fix.

## 2026-10-23: Water vanished in Arya's open tab (light-theme work, local)

- **Broke:** Arya's browser showed the page on a flat pale background, no water,
  plus a horizontal scrollbar.
- **First thought:** the new light-theme shader (three caustic samples for the
  prism fringe) failed to compile on Arya's Intel Iris Xe GPU.
- **Settled by:** a headed Chrome on ANGLE/D3D11 with the same GPU rendered the
  water with no shader errors on a fresh load. Forcing `WEBGL_lose_context`
  reproduced the screenshot exactly (pixel spread 14.3 → 0.9), so the tab had
  lost its context and `startWater` never recovered. Added `webglcontextlost`
  (preventDefault) and `webglcontextrestored` (re-run setup) handlers: spread
  back to 12.3 after restore. Also render at 0.75× to cut GPU load.
- **Second, separate bug:** the scrollbar was the pinned Where I've been track
  (scrollWidth 2392 at a 1965 px viewport). `.has-motion .been__pin` now clips
  it; scrollWidth equals clientWidth. This bug is also on the live site.
