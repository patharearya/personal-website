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

export const about = {
  lead:
    'I’m Arya. I study computer science at UNC Chapel Hill, with a minor in data science, and I build AI and data tools that show their work: they cite what they read, log what they throw away, and say so when they don’t know.',
  more: [
    'Before most of that, there was the pool. I captained the varsity swim team at Enloe High School, swam on its school-record 200-yard medley relay, and still swim with UNC Club Swimming.',
    'I’ve also spent five years tutoring math, grades 6 to 12, including SAT and ACT prep.',
  ],
}

// A few moments, newest first; one line each (not a resume).
export type Moment = { when: string; title: string; where: string; line: string }

export const moments: Moment[] = [
  {
    when: 'Oct 2026',
    title: 'Won at HackNC',
    where: 'MLH Best Use of ElevenLabs',
    line: 'Pitched the idea that became Aqua Static, then built it with a team of four.',
  },
  {
    when: 'Jun – Jul 2026',
    title: 'AI intern',
    where: 'Fucient Consulting, Pune',
    line: 'Wired LLM APIs into working exercises with secure key handling, and debugged alongside the other interns.',
  },
  {
    when: 'Class of 2028',
    title: 'Computer science',
    where: 'UNC Chapel Hill',
    line: 'B.S. with a minor in data science, after an associate degree at Wake Tech.',
  },
  {
    when: 'Since 2021',
    title: 'Math tutor',
    where: 'Apex, NC',
    line: 'Five years of grades 6–12 math, paced to each student’s gaps.',
  },
]

export type Link = { label: string; href: string }

export type Project = {
  id: string
  title: string
  when: string
  award?: string
  claim: string
  note: string
  stack: string
  links: Link[]
  image: string
  imageAlt: string
  video?: string
  // Seconds to skip at the start of the clip (the finder's opens on a count-up).
  start?: number
}

export const projects: Project[] = [
  {
    id: 'voice',
    title: 'Excel Voice',
    when: 'Oct 2026 · prototype',
    claim:
      'Talk to desktop Excel. Say “make column C currency and bold the header row”, check the preview, press Enter.',
    note: 'Every change is previewed with its cells selected, and anything it doesn’t understand gets “I didn’t catch a command in that.”',
    stack: 'TypeScript · Office.js · Groq',
    links: [{ label: 'Code', href: 'https://github.com/patharearya/excel-voice' }],
    image: '/media/voice.jpg',
    imageAlt: 'Excel with the Excel Voice panel showing "Will change" before applying: "Nothing changes until you approve it."',
    video: '/media/voice.mp4',
  },
  {
    id: 'agent',
    title: 'AI Investment Research Agent',
    when: 'Jul – Aug 2026',
    claim:
      'Five LangGraph agents turn an investor profile into plain-language research briefs, and may recommend nothing, saying why.',
    note: 'Models judge; Python computes. Every claim cites what it read, and I wrote up all 74 defects it hit.',
    stack: 'Python · LangGraph · FastAPI · Render',
    links: [
      { label: 'Live demo', href: 'https://ai-investment-agent-gdjr.onrender.com' },
      { label: 'Code', href: 'https://github.com/patharearya/ai-investment-agent' },
    ],
    image: '/media/agent.jpg',
    imageAlt: 'A research brief with one condition highlighted and its source: "Every claim cites what it read."',
    video: '/media/agent.mp4',
  },
  {
    id: 'aqua',
    title: 'Aqua Static',
    when: 'Oct 2026 · HackNC 2026',
    award: 'Winner, MLH Best Use of ElevenLabs',
    claim:
      'A live 3D map of UNC where students post what they need in plain English, plus an AI campus radio station voiced by ElevenLabs.',
    note: 'I proposed the concept, built the Next.js app, API and database, and made the 3D campus map.',
    stack: 'TypeScript · Next.js · Three.js · Gemini · ElevenLabs',
    links: [
      { label: 'Live demo', href: 'https://aqua-static-hack-nc-2026-pied.vercel.app' },
      { label: 'Code', href: 'https://github.com/arham-hi/AquaStatic-HackNC2026' },
    ],
    image: '/media/aqua.png',
    imageAlt: 'Aqua Static home screen: "Your campus. In real time." beside Aqua, a cartoon radio mascot.',
  },
  {
    id: 'finder',
    title: 'Internship & Research Finder',
    when: 'Oct 2026',
    claim:
      'Live internships and funded research programmes, read straight from employers’ own job boards and federal APIs, grouped by major.',
    note: 'A Java pipeline pulls about 11,000 postings from 2,200+ boards several times a day, and logs every one it rejects.',
    stack: 'Java · JavaScript · GitHub Actions · Google Drive API',
    links: [
      { label: 'Live site', href: 'https://patharearya.github.io/internship-tracker/' },
      { label: 'Code', href: 'https://github.com/patharearya/internship-tracker' },
    ],
    image: '/media/finder.jpg',
    imageAlt: 'Internship & Research Finder: a river of coloured points, one per open posting, over the headline "Internships in your field, straight from the source."',
    video: '/media/finder.mp4',
    start: 4,
  },
]
