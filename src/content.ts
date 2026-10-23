// Every fact here comes from the resume (BRIEF.md D18) or the project's own README.
// Change a number here only after checking it against its source.

export const person = {
  name: 'Arya Pathare',
  email: 'patharearya@gmail.com',
  linkedin: 'https://www.linkedin.com/in/arya-pathare',
  github: 'https://github.com/patharearya',
  cv: '/Arya-Pathare-Resume.pdf',
  seeking: 'Looking for a Summer 2027 internship in software or AI engineering.',
}

export type Proof = { n: number; text: string; source: string; href: string }

// Hero footnotes: one per headline line (direction contract, FIRST VIEWPORT).
export const heroProofs: Proof[] = [
  {
    n: 1,
    text: 'Every recommendation cites a retrieved article or a measured number. Anything grounded in neither is discarded and counted.',
    source: 'AI Investment Research Agent',
    href: '#agent',
  },
  {
    n: 2,
    text: 'Every rejected posting is logged with the rule that rejected it, across ~11,000 live internships.',
    source: 'Internship & Research Finder',
    href: '#finder',
  },
  {
    n: 3,
    text: 'Every change is previewed with its cells selected. Nothing happens until you press Enter.',
    source: 'Excel Voice',
    href: '#voice',
  },
]

export type Link = { label: string; href: string }

export type Project = {
  id: string
  title: string
  when: string
  claim: string
  award?: string
  part: string[]
  stack: string
  links: Link[]
  image: string
  imageAlt: string
  video?: string
  // The measured figure, drawn on its own scale (raise from the oscilloscope bench).
  figure: { value: number; max: number; display: string; label: string; ticks?: number[] }
}

export const projects: Project[] = [
  {
    id: 'aqua',
    title: 'Aqua Static',
    when: 'Oct 2026 · HackNC 2026',
    award: 'Winner, MLH Best Use of ElevenLabs',
    claim:
      'A live 3D map of UNC where students post what they need in plain English, plus an AI campus radio station voiced by ElevenLabs.',
    part: [
      'Proposed the winning concept for a team of four.',
      'Built the full-stack foundation: the Next.js app, API routes and database.',
      'Built the 3D campus map with MapLibre GL and Three.js, refined the UI and produced the demo video.',
    ],
    stack: 'TypeScript · Next.js · Gemini API · ElevenLabs · Tiger Data',
    links: [
      { label: 'Live demo', href: 'https://aqua-static-hack-nc-2026-pied.vercel.app' },
      { label: 'Code', href: 'https://github.com/arham-hi/AquaStatic-HackNC2026' },
    ],
    image: '/media/aqua.png',
    imageAlt: 'Aqua Static home screen: "Your campus. In real time." beside Aqua, a cartoon radio mascot.',
    figure: { value: 22, max: 47, display: '22', label: 'of 47 commits, the most on the team', ticks: [0, 10, 20, 30, 40, 47] },
  },
  {
    id: 'finder',
    title: 'Internship & Research Finder',
    when: 'Oct 2026',
    claim:
      'Live internships and funded research programmes, read straight from employers’ own job boards and federal APIs, grouped by major.',
    part: [
      'A Java pipeline collects ~11,000 live internships from 2,200+ job boards and federal APIs, refreshed several times a day by GitHub Actions.',
      'A GitHub Pages site with live filters and an application planner that syncs to the student’s own Google Drive.',
      'Classification tested against a 297-posting hand-labelled sample and 39 JUnit tests.',
    ],
    stack: 'Java · JavaScript · GitHub Actions · Google Drive API',
    links: [
      { label: 'Live site', href: 'https://patharearya.github.io/internship-tracker/' },
      { label: 'Code', href: 'https://github.com/patharearya/internship-tracker' },
    ],
    image: '/media/finder.jpg',
    imageAlt: 'Internship & Research Finder: a river of coloured points, one per open posting, over the headline "Internships in your field, straight from the source."',
    video: '/media/finder.mp4',
    figure: { value: 11000, max: 12000, display: '11,000', label: 'live postings from 2,200+ boards', ticks: [0, 3000, 6000, 9000, 12000] },
  },
  {
    id: 'agent',
    title: 'AI Investment Research Agent',
    when: 'Jul – Aug 2026',
    claim:
      'Five LangGraph agents turn an investor profile into plain-language research briefs, and may recommend nothing, saying why.',
    part: [
      'Built a five-agent pipeline: validate, research, screen, critique, write. Models judge; Python computes.',
      'Deployed a public web app on Render with live streaming output and a gallery of 11 recorded runs.',
      'Shipped v1.0.0 with pytest and GitHub Actions CI, and wrote a 15-page case study on 74 defects.',
    ],
    stack: 'Python · LangGraph · FastAPI · Render',
    links: [
      { label: 'Live demo', href: 'https://ai-investment-agent-gdjr.onrender.com' },
      { label: 'Code', href: 'https://github.com/patharearya/ai-investment-agent' },
    ],
    image: '/media/agent.jpg',
    imageAlt: 'A research brief with one condition highlighted and its source: "Every claim cites what it read."',
    video: '/media/agent.mp4',
    figure: { value: 74, max: 80, display: '74', label: 'defects found and written up in a 15-page case study', ticks: [0, 20, 40, 60, 80] },
  },
  {
    id: 'voice',
    title: 'Excel Voice',
    when: 'Oct 2026 · prototype',
    claim:
      'Talk to desktop Excel. Say “make column C currency and bold the header row”, check the preview, press Enter.',
    part: [
      'An Office.js side panel using Groq Whisper for speech and a Groq LLM to turn speech into commands.',
      'Every command is previewed with the affected cells selected; it keeps its own undo because Excel’s Ctrl+Z can’t undo add-in changes.',
      'Anything outside its command list gets “I didn’t catch a command in that.” It never guesses.',
    ],
    stack: 'TypeScript · Office.js · Groq',
    links: [{ label: 'Code', href: 'https://github.com/patharearya/excel-voice' }],
    image: '/media/voice.jpg',
    imageAlt: 'Excel with the Excel Voice panel showing "Will change" before applying: "Nothing changes until you approve it."',
    video: '/media/voice.mp4',
    // Counted from the README's 'What you can say' table (15 rows). No scale: there is no meaningful maximum.
    figure: { value: 15, max: 15, display: '15', label: 'kinds of command, each previewed before it runs' },
  },
]

export type Stop = { when: string; where: string; role: string; place: string; lines: string[] }

// Newest first. Horizontal track (raise from the racing league).
export const experience: Stop[] = [
  {
    when: 'Oct 2026',
    where: 'HackNC 2026',
    role: 'Winner, MLH Best Use of ElevenLabs',
    place: 'Chapel Hill, NC',
    lines: ['Aqua Static, built with a team of four.'],
  },
  {
    when: 'Jun – Jul 2026',
    where: 'Fucient Consulting',
    role: 'AI Intern',
    place: 'Pune, India',
    lines: [
      'Integrated LLM APIs into AI application exercises with secure API key management.',
      'Compared implementation approaches and debugged issues with a team of interns.',
    ],
  },
  {
    when: 'Expected May 2028',
    where: 'UNC Chapel Hill',
    role: 'B.S. Computer Science, minor in Data Science',
    place: 'Chapel Hill, NC',
    lines: [
      'GPA 3.59. Data Structures and Analysis, Systems Fundamentals, Computer Organization, Discrete Math, Linear Algebra, Intro to Data Science, Ethics of AI.',
    ],
  },
  {
    when: 'Aug 2022 – May 2025',
    where: 'Wake Technical Community College',
    role: 'Associate in Science',
    place: 'Raleigh, NC',
    lines: ['GPA 3.87, President’s List. 60 credits transferred to UNC.'],
  },
  {
    when: '2021 – present',
    where: 'Self-employed',
    role: 'Private Math Tutor',
    place: 'Apex, NC',
    lines: [
      'Grades 6–12 math, including SAT and ACT prep, for five years.',
      'Sessions built around each student’s pace and gaps.',
    ],
  },
]

export type Principle = { rule: string; detail: string; source: Link }

// Replaces ECHO's "Services" (D2): how Arya works, each with where it shows.
export const principles: Principle[] = [
  {
    rule: 'Models judge; code computes.',
    detail:
      'In the investment agent every score, screen and ranking is deterministic Python. The model extracts company names; tickers come from a market database, because a guessed symbol silently returns another company’s numbers.',
    source: { label: 'Design notes', href: 'https://github.com/patharearya/ai-investment-agent/blob/HEAD/docs/DESIGN.md' },
  },
  {
    rule: 'Every rejection gets a reason.',
    detail:
      'The internship finder writes each posting it filters out to a log with the rule that removed it. Good filtering and a broken lookup look identical from outside; the log tells them apart.',
    source: { label: 'Pipeline', href: 'https://github.com/patharearya/internship-tracker#how-it-works' },
  },
  {
    rule: 'Nothing is a real answer.',
    detail:
      'When no company survives its own critique, the agent recommends nothing and shows why, instead of a blank screen or a forced pick.',
    source: { label: 'Past runs', href: 'https://ai-investment-agent-gdjr.onrender.com' },
  },
  {
    rule: 'Preview before change.',
    detail:
      'Excel Voice shows every change with the cells selected and waits for Enter, then keeps its own one-step undo.',
    source: { label: 'README', href: 'https://github.com/patharearya/excel-voice#use-it' },
  },
  {
    rule: 'Check it against people.',
    detail:
      'The finder’s classifier was tested against 297 postings labelled by hand, plus 39 JUnit tests. The agent shipped with pytest in CI and a write-up of all 74 defects it hit.',
    source: { label: 'Tests', href: 'https://github.com/patharearya/internship-tracker' },
  },
]

export const skills: { group: string; items: string }[] = [
  { group: 'Languages', items: 'Python, Java, C, JavaScript, TypeScript, HTML/CSS' },
  { group: 'Frameworks', items: 'LangGraph, FastAPI, Pydantic, Next.js, pytest, JUnit' },
  { group: 'Platforms', items: 'Git, GitHub Actions, GitHub Pages, Maven, Render, Vercel' },
  { group: 'APIs and data', items: 'Gemini, ElevenLabs, Google Drive (OAuth), Tiger Data (PostgreSQL)' },
  { group: 'Certified', items: 'PCAP and PCEP, Python Institute, 2026' },
]

export const about = {
  lead:
    'I’m a computer science student at UNC Chapel Hill, minor in Data Science, graduating May 2028. I build AI and data tools that show their work: they cite what they read, log what they reject, and say when they don’t know.',
  facts: [
    'Varsity swim captain at Enloe High School; school-record 200-yard medley relay. Now swimming for UNC Club Swimming.',
    'Five years tutoring grades 6–12 math, including SAT and ACT prep.',
    'Chapter President, National Honor Society, Wake Early College of Health and Sciences.',
    'Fluent in English, Hindi and Marathi.',
  ],
}
