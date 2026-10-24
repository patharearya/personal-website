# Brief: Arya Pathare portfolio

A personal portfolio site with the feel of the ECHO reference
(`reference/notes.md`): monochrome, pinned scroll scenes, heavy type, and
3D moments. The content is Arya's own (`reference/profile.md`).

**Source of truth for content: the resume** (`Pathare_Arya_Resume_10-16-2026_v2.pdf`).
LinkedIn-only items stay off the site (D18).

## Decisions log

Grilling session, 22 Oct 2026. Cite as D<n> in code and the dev log.
Superseded answers are struck through, not deleted.

| # | Question | Decision |
|---|---|---|
| D1 | What does Arya do? | CS student at UNC Chapel Hill (May 2028), minor in Data Science; builds full-stack and AI tools. From the resume. |
| D2 | Goal of the site | Land a Summer 2027 software or AI engineering internship. ECHO's "Services" section becomes "How I work". Contact leads with the CV and email. |
| D3 | Wordmark | "ARYA." in the preloader, "Arya Pathare" everywhere else. |
| D4 | Content | Four projects (D11), experience, education, skills, activities. |
| D5 | Stack | Vite + React + TypeScript; GSAP (ScrollTrigger), Lenis, React Three Fiber. |
| D6 | Hosting | Vercel. Git set up now; custom domain later, optional. |
| D7 | Phones and reduced motion | Full motion on desktop. Simpler versions of the same sections on phones and under `prefers-reduced-motion`: flat gallery, plain list, fades instead of pins. |
| D8 | Order of work | Ship a complete, simpler version first, so Arya has a link for applications now; add the 3D scenes after. |
| D9 | Angle | "Builds AI tools that show their work." Exact headline set in the design step. |
| D10 | Aqua Static credit | Arya is the top committer (22 of 47) but committed as apathare@unc.edu, which isn't linked to the account. Arya to add the email on GitHub. The site describes Arya's part in the resume's words and links the live demo and repo. |
| D11 | Excel Voice | Include it as the fourth project, even though it isn't on the resume (Arya's own public repo). |
| D12 | Hero photo | Placeholder silhouette, clearly marked, until Arya supplies a photo. |
| D13 | Visual motif | Swimming, used lightly: underwater light behind ABOUT ME, lane-line dividers. No wave animations everywhere. |
| D14 | Public contact | Email (patharearya@gmail.com), LinkedIn, GitHub, CV download. No phone number. |
| D15 | Fucient dates | Use the resume: AI Intern, Fucient Consulting, Pune, India, Jun – Jul 2026. |
| D16 | Health thread | ~~One line in About (EMT, HOSA).~~ Dropped by D18: health items are LinkedIn-only. |
| D17 | Non-tech items | ~~Experience: Fucient, tutoring, District C. About: swim captain, EMT, HOSA.~~ Superseded by D18. Experience: Fucient, math tutoring. About: swim team captain and school-record medley relay, club swimming at UNC, NHS chapter president, English/Hindi/Marathi. |
| D18 | Resume vs LinkedIn | Keep the site in line with the resume. LinkedIn-only items (District C, EMT, HOSA, Red Cross, Spanish, extra certifications) are left out. |

## Redesign, 2026-10-23

Supersedes the light Swiss build and D12/D13's motif details. Direction contract:
`.impeccable/surfaces/index-html.md` ("Night pool from below").

| # | Question | Decision |
|---|---|---|
| D19 | Section order | About me, Where I've been, Work, contact block. No hero, no How I work. |
| D20 | Look | Calm and dark, muted gold accent. One continuous interactive WebGL artwork (pool caustics + a gold lane rope) that changes with scroll. |
| D21 | Projects | Sideways strip on a slight 3D curve, scroll-driven, snaps per slide. Media, name, a line or two. No stat counters or number-line charts. |
| D22 | Tone | About Arya and the projects, not a resume replica. NHS chapter president and languages lines removed. |
| D23 | Portrait | Arya's own photo (supplied 2026-10-23), cut out and duotoned into the pool palette, right of the About text, screen-blended into the water. Resolves D12. Origin embedded in `public/media/arya.png`. |

## Still open

- Custom domain (D6).
- Arya: add apathare@unc.edu to the GitHub account so the 22 Aqua Static
  commits are credited (D10).

## Where the build stopped (2026-10-22)

The finish review ran three verdicts. All eight original fixes are resolved. Open
from the third verdict, to fix next session (estimated 15–20 min):

1. **Truth:** project figures are tied to scroll, so a paused visitor can read
   "0 of 47 commits". Play each count as a short timed tween when its scene
   is entered; keep the scale marker scroll-tied (src/motion.ts, project
   timelines).
2. **Contract:** the hero headline is now ~9vw at 1440x900, not ~12vw over
   columns 1–10, to bring Aqua Static into the first viewport (the user's
   "slow to reach projects" answer). Record that in FIRST VIEWPORT
   (.impeccable/surfaces/index-html.md), or widen it within the height budget.
3. **Unverified:** in .impeccable/review/scroll/blur.png the fixed bar sits
   ~22px low mid-scroll. Probe `.bar.getBoundingClientRect().top` 140ms after
   fast wheel steps; if it is non-zero, find the ancestor making a containing
   block.

Then: one verdict pass from a fresh finish reviewer, then DESIGN.md via the
impeccable documenter. Later: the 3D curved gallery and hexagon (D8), deploy
to Vercel (D6).

Run locally: `npm run dev` (or `npm run build` then `npx vite preview`).
Review captures: `node scripts/review.mjs` with the preview on port 4173.
