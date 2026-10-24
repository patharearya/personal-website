---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["src/App.tsx","src/styles.css","src/water.ts"]
---

# Surface: portfolio home (single page)

Scope: the whole one-page site, `index.html` + `src/`. Mode: **Experience**: the
artwork and the projects lead; the interface recedes.

Audience: engineer interviewer arriving from an internship application (primary),
recruiter skimming (secondary). Action: open a project, repo or the CV; email
Arya. Proof: resume figures and repo facts in PRODUCT.md / reference/profile.md.

Redesign brief (user, 2026-10-23), replacing the 2026-10-22 Swiss light build:
- Order: About me, Where I've been, Work, contact block. No hero, no How I work.
- Calm and aesthetically pleasing, one accent used sparingly.
- One continuous abstract interactive artwork that reacts to pointer and scroll
  and changes shape across sections.
- Projects on a sideways strip with a slight 3D curve, driven by vertical scroll,
  newest first. Each slide: media, name, a line or two. No stat counters.
- Not a resume replica: about Arya and the projects. Where I've been is a few
  short moments in one band. NHS and languages lines removed.
- References: ingrassiadaniel.it, wodniack.dev, soraeats.com, ECHO reel
  (reference/notes.md: curved strip).

Later the same day Arya switched the theme from dark to light: "more vibrant",
and the dark version made the portrait look like a ghost. The portrait went back
to colour. Rejected along the way (do not reintroduce): a Voronoi cell net, a
mossy teal palette, and a vivid tiled competition pool with lane lines.

## Direction contract

THESIS: The page is the sandy floor of sunlit shallow water: crisp sunlight
moves over warm sand, and a bronze lane rope guides you from About to Contact.
It refuses the dev portfolio of glowing cards, chips and neon, and the flat,
textureless light page.

OWN-WORLD: Warm sand (#ece5d8 ground, #e2d8c6 depth), sunlight as crisp warm
white lines with dappled shade between them, a still fine sand grain, a faint
prism fringe on the brightest lines. Near-black ink type (#1f1b16), warm
grey-brown secondary text (#675d50), and lane-rope bronze (#8a6428) only for
the rope, the active slide, the current count and the primary contact action.
One variable face, Bricolage Grotesque: light weights at display size, regular
at reading size. No cards, boxes, kickers or section numbers; hairlines only.
One fixed WebGL canvas holds all the art.

STORY: The visitor meets Arya, in colour and in plain words, over sunlit water,
follows the rope through a few moments, scrolls the projects along a curved
lane, and reaches Contact with the CV or an email.

FIRST VIEWPORT: Full-screen sunlit sand with light rippling under the pointer and
a warm sunspot following it; the bronze rope crosses low and bends away from the
pointer. Thin top bar: "Arya Pathare" left, About / Where I've been / Work /
Contact, Résumé right. "About me" in large light display type in the left of the
lower half with the lead paragraph under it; Arya's colour headshot to the
right, faded into the sand at every edge.

FORM: Night pool from below, candidate 1 of 7 on the ordered list (the user chose
IMPECCABLE'S PICK over the roll's "gold dust on lacquer"), re-rendered in light
as "sunlit shallows" at the user's request. Seed key 32b822e4. Raises carried
over: ma, one asymmetric block per viewport (ikebana); the strip settles on a
slide and marks it (cutting bench); the accent catches light near the pointer,
now the sunspot (matchbook).

Signature interaction: one shader, four states by scroll. About: sunlight with
pointer ripples and the sunspot, rope low and waving. Where I've been: the light
stretches into horizontal lane streaks above a straight rope. Work: the rope bows
into the arc under the curved project strip, which turns with scroll and snaps
per slide. Contact: the light settles and the rope rises to the surface line.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
