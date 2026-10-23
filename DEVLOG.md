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
