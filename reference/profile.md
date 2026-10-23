# Profile: Arya Pathare

Sources: resume (`Pathare_Arya_Resume_10-16-2026_v2.pdf`, 16 Oct 2026), GitHub
`patharearya` (read 22 Oct 2026 via `gh`), Aqua Static team repo
`arham-hi/AquaStatic-HackNC2026`, LinkedIn export (`Profile.pdf`, received 22
Oct 2026; see "From LinkedIn only" and "Conflicts" at the end).

## Basics

- **Name:** Arya Pathare
- **Location:** Apex, NC
- **Email:** patharearya@gmail.com · phone on resume (do not publish without asking)
- **Links:** linkedin.com/in/arya-pathare · github.com/patharearya
- **Spoken languages:** English, Hindi, Marathi

## Education

- **UNC Chapel Hill**, B.S. Computer Science, minor in Data Science. Expected
  May 2028. GPA 3.59.
  Courses: Data Structures and Analysis, Systems Fundamentals, Foundations of
  Programming, Computer Organization, Discrete Math, Linear Algebra, Intro to
  Data Science, Ethics of AI.
- **Wake Technical Community College**, Associate in Science, Aug 2022 – May
  2025. GPA 3.87, President's List, 60 credits transferred. (Taken alongside
  Wake Early College of Health and Sciences.)

## Skills

- **Languages:** Python, Java, C, JavaScript, TypeScript (Excel Voice and Aqua
  Static), HTML/CSS
- **Frameworks:** LangGraph, FastAPI, Pydantic, pytest, JUnit, Next.js, Office.js
- **Tools:** Git, GitHub Actions, GitHub Pages, Maven, Render, Vercel, Google
  Drive API (OAuth), Gemini API, ElevenLabs API, Groq, Tiger Data (PostgreSQL),
  MapLibre GL, Three.js
- **Certifications:** PCAP and PCEP (Python Institute, 2026)

## Projects

### 1. Aqua Static — HackNC 2026, Oct 2026
- **Award:** Winner, MLH Best Use of ElevenLabs (4-person team).
- **What:** a live 3D map of UNC where students post needs in plain English
  ("Need a USB-C charger at Davis Library for the next hour"). Gemini turns
  posts into structured pins and a matching engine connects people nearby. An
  AI campus radio station is voiced by ElevenLabs. Real Chapel Hill Transit
  routes are on the same map. Frutiger Aero style: glass, gloss, optimism.
- **Arya's part (resume):** proposed the winning concept; built the Next.js
  app, API routes and database; built the 3D map with MapLibre GL and
  Three.js; refined the UI; made the demo video.
- **Links:** live at aqua-static-hack-nc-2026-pied.vercel.app; repo
  `arham-hi/AquaStatic-HackNC2026`; Devpost (URL not found yet).
- **Commits:** Arya is the top committer: 22 of 47 (Aadee Chheda 16, arham-hi
  7, nialexis 2). They are authored as "AryaPathare <apathare@unc.edu>", an
  email not linked to the `patharearya` account, so GitHub doesn't credit
  them. Work includes the first base (Express + SSE server, Gemini parsing,
  ElevenLabs digest, map), the radio station build plan, a 3-part
  sustainability feature (giveaways, ride sharing, kept-in-use tally), a 7-part
  UI simplification, Gemini timeouts and fallbacks, and Transit map fixes.
- **Fix:** add apathare@unc.edu under GitHub Settings → Emails. GitHub then
  credits past commits to the account.
- The repo has no screenshots; capture them from the live site.

### 2. Internship & Research Finder — Oct 2026
- **What:** every open US internship and funded research programme, read from
  employers' own job boards plus USAJOBS, NSF and NIH, grouped by major.
  About 11,100 open postings from about 1,030 employers, out of 2,205 boards
  watched. Updated automatically 4–5 times a day by GitHub Actions. A planner
  syncs to the student's own Google Drive; no server, no database, no AI.
- **Proof of care:** 297-posting hand-labelled sample, 39 JUnit tests, every
  rejected posting logged with its reason, polite crawling (robots.txt,
  backoff).
- **Language mix:** Java 144k, JavaScript 65k, HTML 36k, CSS 31k (bytes).
- **Links:** patharearya.github.io/internship-tracker · repo
  `patharearya/internship-tracker`.
- **Assets:** `brag-output/brag.mp4` (21 s launch video) and `brag.jpg`;
  `docs/images/hero.png` (a "river of points": one dot per posting in 13
  streams by major), `fields.png`, `planner.png`, `timeline.png`.

### 3. AI Investment Research Agent — Jul–Aug 2026
- **What:** five LangGraph agents (validate, research, screen, critique,
  write) that turn an investor profile into plain-language research briefs.
  Every claim must cite a retrieved article or a measured number. It may
  recommend nothing, and says why. "LLMs judge; Python computes." The model
  never writes a ticker.
- **Proof of care:** v1.0.0, pytest + GitHub Actions CI, a 15-page case study
  on 74 defects, 11 recorded runs in a public gallery. About 168 commits.
- **Links:** ai-investment-agent-gdjr.onrender.com · repo
  `patharearya/ai-investment-agent`.
- **Assets:** `brag-output/brag.mp4` (20 s) and `brag.jpg`;
  `frontend/static/paper-p1.png`.

### 4. Excel Voice — not on resume
- **What:** a free voice side panel for desktop Excel. Say "make column C
  currency and bold the header row", see a preview with the cells selected,
  press Enter. Office.js + Groq Whisper + Groq LLM. Nothing changes until
  approved; keeps its own undo because Excel's Ctrl+Z can't undo add-in
  changes. Never guesses at commands it doesn't know.
- **Status:** early working prototype. About 18 commits.
- **Links:** repo `patharearya/excel-voice`; installer on GitHub Pages.
- **Assets:** `brag-output/brag.mp4` (21 s) and `brag.jpg`; add-in icons.

## Experience

- **AI Intern, Fucient Consulting** (Pune, India), Jun – Jul 2026. Integrated
  LLM APIs into AI application exercises with secure key management; compared
  approaches and debugged with a team of interns.
- **Private Math Tutor**, self-employed, Apex NC, 2021 – present. Grades 6–12
  and SAT/ACT prep, five years.

## Leadership and activities

- **Club Swimming**, UNC, 2025 – present.
- **Varsity Swim Team, Enloe High School**, 2021 – 2025. Team captain;
  school-record 200-yard medley relay; regionals and states; 18 hours a week.
- **National Honor Society**, Wake Early College, 2023 – 2025. Chapter
  president, previously parliamentarian.

## A theme across the work

Every project shows its work instead of asking to be trusted:

- the agent cites a source for every claim and may answer "nothing";
- the finder logs every rejection with its reason and labels its suggestions
  as suggestions;
- Excel Voice previews every change and refuses to guess;
- Aqua Static's assistant cites its sources, says when it doesn't know, and
  "does not fake live buses".

Possible positioning: *builds AI tools that show their work.*

## From LinkedIn only

- **Headline:** "UNC–Chapel Hill | Full-Stack AI Programmer | Computer Science
  Major | Data Science Minor".
- **Summary:** interested in applying programming, data analysis and AI to
  real-world **health** and business problems; values collaboration,
  continuous learning and community impact.
- **Top skills:** Full-Stack Development, Google Gemini, ElevenLabs.
- **Spanish:** limited working proficiency.
- **Certifications:** EMT – Specialist, OSHA 10-Hour, Python Essentials 1,
  Virtual Etiquette Micro Credential (plus PCEP and PCAP, on the resume).
- **Awards:** President's List, National Community Service Awards, Health
  Occupations Students of America awards, 200-yard medley relay school record.
- **American Red Cross**, member, Aug 2023 – present: MapSwipe, mapping
  locations for disaster relief.
- **District C**, summer internship, 2023 – Jan 2026, Wake County: analysed
  The Junkluggers' digital presence and advertising challenges, with
  recommendations for its growth goals.
- **HOSA – Future Health Professionals**, 2021 – 2024: member, then
  Sophomore Representative, then Historian on the executive board. Led three
  health education events (first aid; childhood abuse and dementia risk;
  academic burnout and risky behaviour), each with a public website.
  Qualified for the international competition. Raised over $115 for the JED
  Foundation.
- **National Honor Society:** Parliamentarian, Sep 2023 – Jun 2024 (the resume
  adds chapter President later).
- **Education extras:** UNC from Aug 2025; Durham Technical Community College
  (May 2024); Wake Early College of Health and Sciences diploma 2021 – 2025.

A second thread: a health background (health-sciences early college, EMT,
HOSA, Red Cross) alongside the AI work.

## Conflicts between resume and LinkedIn

| Item | Resume | LinkedIn |
|---|---|---|
| Fucient role | AI Intern, Pune, India, Jun – Jul 2026 | Intern, United States, Sep 2025 – present, "trainee programmer" |
| Major | B.S. Computer Science, minor Data Science | Headline agrees; Summary says "planning to major in Data Science" |
| Wake Tech | 60 credits transferred, GPA 3.87 | No details |

The site should follow whichever is current. LinkedIn may also need updating.
