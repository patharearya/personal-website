# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React + TypeScript, with GSAP (ScrollTrigger), Lenis and React Three
Fiber. Hosted on Vercel. Chosen in the grilling session (BRIEF.md D5, D6).

## Users

Primary: an engineer or hiring manager who opens the link from Arya's
internship application or resume and wants proof Arya can build: how each
project works, the code, the live demos. They read on a laptop, often between
other tasks, and will open the GitHub repos.

Secondary: recruiters skimming quickly. They need name, role, the headline
results and the CV within the first screen.

## Product Purpose

Arya Pathare's personal portfolio. Arya is a CS student at UNC Chapel Hill
(B.S. expected May 2028, minor in Data Science). Its job is to help Arya land a
Summer 2027 software or AI engineering internship (D2). Success: a visitor
opens a project, a repo or the CV, and gets in touch.

## Positioning

Arya builds AI tools that show their work (D9). Every project makes its
reasoning or evidence visible instead of asking to be trusted:

- the investment agent cites a source for every claim and can recommend nothing;
- the internship finder logs every rejected posting with its reason;
- Excel Voice previews every change and refuses to guess;
- Aqua Static's assistant cites its sources and says when it doesn't know.

## Operating Context

Visitors arrive from a job application, resume link, LinkedIn or GitHub.
Engineers check the claims against the repos and live demos, so every number
on the site must match its source.

## Capabilities and Constraints

- Content source of truth is the resume (D18). LinkedIn-only items stay off.
- Full motion on desktop; simpler versions of each section on phones and
  under `prefers-reduced-motion` (D7).
- Ship a complete simpler version first, then the 3D scenes (D8).
- Public contact: email, LinkedIn, GitHub, CV download. No phone number (D14).
- Undecided: hero photo (placeholder for now, D12); custom domain (D6).

## Brand Commitments

- Name: "ARYA." in the preloader, "Arya Pathare" everywhere else (D3).
- Swimming is a light personal motif (D13): Arya captained the varsity swim
  team and holds a school-record medley relay.
- The feel of the ECHO reference (reference/notes.md) is the user's stated
  target: monochrome, heavy type, scroll-driven scenes, a few 3D moments. Take
  its principles, not its sections or assets.

## Evidence on Hand

From reference/profile.md:

- **Aqua Static:** winner, MLH Best Use of ElevenLabs at HackNC 2026, 4-person
  team. Arya is the top committer (22 of 47). Live demo:
  aqua-static-hack-nc-2026-pied.vercel.app. No screenshots yet.
- **Internship & Research Finder:** about 11,000 live postings from 2,200+
  boards; 297-posting hand-labelled sample; 39 JUnit tests. Live site, repo,
  21 s launch video, four screenshots.
- **AI Investment Research Agent:** five LangGraph agents; v1.0.0; 15-page case
  study on 74 defects; 11 recorded runs. Live demo, repo, 20 s video.
- **Excel Voice:** working prototype, repo, 21 s video.
- **Experience:** AI Intern, Fucient Consulting (Jun – Jul 2026); private math
  tutor (2021 – present).
- **Education, skills, certifications (PCAP, PCEP), activities:** see the
  profile.
- **Absent:** testimonials, employer quotes, metrics beyond those above, a
  photo of Arya. Do not invent any.

## Product Principles

1. **Proof over adjectives.** Show the mechanism, the number, the repo. Never
   "passionate developer".
2. **Every claim checks out.** Figures match the resume and the READMEs.
3. **Depth on demand.** The skim works in 30 seconds; each project rewards the
   engineer who digs in.
4. **Spectacle serves the work.** Motion and 3D frame the projects; they never
   hide them or slow the way to them.

## Accessibility & Inclusion

WCAG 2.2 AA. Respect `prefers-reduced-motion` (D7). All content reachable
without scroll-driven animation, by keyboard and by screen reader.
