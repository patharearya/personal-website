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
- Calm, aesthetically pleasing, dark. Muted gold accent, used sparingly.
- One continuous abstract interactive artwork that reacts to pointer and scroll
  and changes shape across sections.
- Projects on a sideways strip with a slight 3D curve, driven by vertical scroll.
  Each slide: media, name, a line or two. No stat counters or number-line charts.
- Not a resume replica: about Arya and the projects. Where I've been is a few
  short moments in one band. NHS and languages lines removed.
- References: ingrassiadaniel.it (calm, particles morphing), wodniack.dev,
  soraeats.com (calm, gold), ECHO reel (reference/notes.md: curved strip).

## Direction contract

THESIS: The page is a night lap pool seen from the bottom: you look up through
dark water while light moves over you, and a gold lane rope guides you from
About to Contact. It refuses the dark dev portfolio of glowing cards, chips and
neon, and refuses the old light Swiss sheet.

OWN-WORLD: Blue-black water (#070b10 ground, #0f1820 depth), pale caustic light
(#dfe7ea at low intensity), cool white type, a muted blue-grey (#7d8f99) for
secondary text, and lane-rope gold (#c8a463) only for the rope, the active
slide and the primary contact action. One variable face, Bricolage Grotesque:
light weights at large optical size for display, regular weight at reading
size. No cards, no boxes, no kickers, no section numbers; hairline rules only.
One fixed WebGL canvas holds all the art.

STORY: The visitor meets Arya in plain words over moving water, follows the
rope through a few moments, scrolls the projects along a curved lane, and
surfaces at Contact with the CV or an email.

FIRST VIEWPORT: Full-screen water with caustics drifting and rippling under the
pointer; the gold rope crosses low and bends away from the pointer. Thin top
bar: "Arya Pathare" left, About / Where I've been / Work / Contact, Résumé
right. "About me" in large light display type sits in the left two thirds of
the lower half, with the lead paragraph under it at reading size and room to
breathe around it.

FORM: Night pool from below, candidate 1 of 7 on the ordered list (the user
chose IMPECCABLE'S PICK over the roll's "gold dust on lacquer"). Seed key
32b822e4. Raises carried over: ma, each viewport holds one asymmetric block
against empty water (ikebana); the strip settles on a slide, never between two,
and the slide in view is marked in gold (cutting bench); gold catches light
near the pointer (matchbook).

Signature interaction: one shader, four states by scroll. About: caustics with
pointer ripples, rope low and waving. Where I've been: the light stretches into
horizontal lane streaks and the rope runs straight beneath a sideways band of
moments. Work: the rope bows into the arc under the curved project strip, which
rotates as you scroll and snaps per slide. Contact: the light dims and the rope
rises to become the water's surface line.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
