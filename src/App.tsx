import { useEffect, useRef, useState } from 'react'
import { about, experience, heroProofs, person, principles, projects, skills, type Project } from './content'
import { initMotion } from './motion'
import { startCaustics } from './caustics'

const Arrow = () => (
  <svg className="icon" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
  </svg>
)

const Down = () => (
  <svg className="icon" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 2.5v9M4 8l4 4 4-4M3 14h10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
  </svg>
)

const Plus = () => (
  <svg className="icon icon--plus" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 2v12M2 8h12" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

function Out({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="out" href={href} target="_blank" rel="noreferrer">
      {children}
      <Arrow />
    </a>
  )
}

function Preloader() {
  // CSS-only intro, about one second; shown once per session, never under reduced motion.
  const [show] = useState(() => {
    try {
      if (sessionStorage.getItem('seen')) return false
      sessionStorage.setItem('seen', '1')
    } catch {}
    return !matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const [done, setDone] = useState(false)
  if (!show || done) return null
  return (
    <div className="preloader" aria-hidden="true" onAnimationEnd={(e) => e.target === e.currentTarget && setDone(true)}>
      <div className="preloader__mark">
        ARYA<span>.</span>
        <i className="preloader__lane" />
      </div>
    </div>
  )
}

function Measure({ f }: { f: Project['figure'] }) {
  return (
    <div className="measure" style={{ '--at': f.value / f.max } as React.CSSProperties}>
      <p className="measure__num" data-value={f.value}>
        {f.display}
      </p>
      <p className="measure__label">{f.label}</p>
      {f.ticks && (
        <div className="scale" aria-hidden="true">
          <i className="scale__marker" />
          {f.ticks.map((t) => (
            <span key={t} className="scale__tick" style={{ left: `${(t / f.max) * 100}%` }}>
              {t.toLocaleString('en-US')}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectScene({ p }: { p: Project }) {
  return (
    <article className="project" id={p.id} aria-labelledby={`${p.id}-title`}>
      <div className="project__text">
        <h3 className="display project__title" id={`${p.id}-title`}>
          {p.title}
        </h3>
        <p className="project__meta">
          {p.award && <span className="project__award">{p.award}</span>}
          <span className="project__when">{p.when}</span>
        </p>
        <p className="project__claim">{p.claim}</p>
        <ul className="project__part">
          {p.part.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <p className="project__stack">{p.stack}</p>
        <p className="project__links">
          {p.links.map((l) => (
            <Out key={l.href} href={l.href}>
              {l.label}
            </Out>
          ))}
        </p>
      </div>
      <div className="project__media">
        <div className="frame">
          {p.video ? (
            <video controls preload="none" poster={p.image} src={p.video} aria-label={`${p.title} launch video. ${p.imageAlt}`} />
          ) : (
            <img src={p.image} alt={p.imageAlt} loading="lazy" />
          )}
        </div>
        <Measure f={p.figure} />
      </div>
    </article>
  )
}

function Caustics() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => startCaustics(ref.current!, !matchMedia('(prefers-reduced-motion: reduce)').matches), [])
  return <canvas ref={ref} className="about__water" aria-hidden="true" />
}

export default function App() {
  useEffect(() => initMotion(), [])
  const live = projects.filter((p) => p.links.some((l) => l.label.startsWith('Live'))).length

  return (
    <>
      <Preloader />
      {/* Vertical motion blur for display type; motion.ts binds the y deviation to scroll speed. */}
      <svg className="defs" aria-hidden="true">
        <filter id="vblur" x="0" y="-20%" width="100%" height="140%">
          <feGaussianBlur stdDeviation="0 0" />
        </filter>
      </svg>
      <div className="grid-guides" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} />
        ))}
      </div>

      <header className="bar">
        <a className="bar__name" href="#top">
          Arya Pathare
        </a>
        <nav className="bar__nav" aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="bar__cv" href={person.cv} download>
          Résumé <Down />
        </a>
      </header>

      <main>
        <section className="hero" id="top" aria-label="Introduction">
          <h1 className="display hero__title">
            {['Tools that', 'show their', 'work.'].map((line, i) => (
              <span className="line" key={line}>
                <span className="line__in">{line}</span>
                <sup className="mark">
                  <a href={`#proof-${i + 1}`} aria-label={`Proof ${i + 1}`}>
                    {i + 1}
                  </a>
                </sup>
              </span>
            ))}
          </h1>

          <figure className="portrait">
            <div className="portrait__plate" />
            <figcaption>Portrait placeholder. Photo to come.</figcaption>
          </figure>

          <p className="hero__intro">
            <strong>Arya Pathare</strong> studies computer science at UNC Chapel Hill and builds AI and data tools that
            cite their sources, log their rejections and say when they don’t know. {person.seeking}
          </p>

          <ol className="proofs">
            {heroProofs.map((p) => (
              <li key={p.n} id={`proof-${p.n}`}>
                <span className="proofs__n">{p.n}</span>
                <p>{p.text}</p>
                <a href={p.href}>{p.source}</a>
              </li>
            ))}
          </ol>
        </section>

        <section className="work lane" id="work" aria-labelledby="work-title">
          <div className="section-head">
            <h2 className="display" id="work-title">
              Work
            </h2>
            <p className="section-head__count">
              {projects.length} projects, {live} live, 1 hackathon win
            </p>
          </div>
          {projects.map((p) => (
            <ProjectScene key={p.id} p={p} />
          ))}
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <div className="about__stage">
            <div className="about__plate">
              <Caustics />
            </div>
            <h2 className="display about__title" id="about-title">
              <span className="about__w1">About</span> <span className="about__w2">me</span>
            </h2>
            <div className="about__body">
              <p className="about__lead">{about.lead}</p>
              <ul className="about__facts">
                {about.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="experience" id="experience" aria-labelledby="exp-title">
          <div className="experience__pin">
            <p className="experience__ghost" aria-hidden="true">
              AI intern · hackathon winner · tutor · student ·
            </p>
            <h2 className="display experience__title" id="exp-title">
              Where I’ve been
            </h2>
            <ol className="track">
              {experience.map((s) => (
                <li className="stop" key={s.where + s.when}>
                  <h3 className="stop__role">{s.role}</h3>
                  <p className="stop__where">
                    {s.where}, {s.place}
                  </p>
                  <p className="stop__when">{s.when}</p>
                  {s.lines.map((l) => (
                    <p className="stop__line" key={l}>
                      {l}
                    </p>
                  ))}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="how lane" id="how" aria-labelledby="how-title">
          <div className="section-head">
            <h2 className="display" id="how-title">
              How I work
            </h2>
            <p className="section-head__count">{principles.length} rules, each with where it shows</p>
          </div>
          <div className="principles">
            {principles.map((p) => (
              <details className="principle" key={p.rule} name="principles">
                <summary>
                  <span>{p.rule}</span>
                  <Plus />
                </summary>
                <div className="principle__body">
                  <p>{p.detail}</p>
                  <Out href={p.source.href}>{p.source.label}</Out>
                </div>
              </details>
            ))}
          </div>
          <dl className="skills">
            {skills.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <h2 className="display contact__title" id="contact-title">
            Let’s talk.
          </h2>
          <p className="contact__line">{person.seeking}</p>
          <ul className="contact__links">
            <li>
              <a className="pill pill--solid" href={`mailto:${person.email}`}>
                {person.email}
              </a>
            </li>
            <li>
              <a className="pill" href={person.cv} download>
                Résumé (PDF) <Down />
              </a>
            </li>
            <li>
              <a className="pill" href={person.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <Arrow />
              </a>
            </li>
            <li>
              <a className="pill" href={person.github} target="_blank" rel="noreferrer">
                GitHub <Arrow />
              </a>
            </li>
          </ul>
          <footer className="foot">
            <p>© 2026 Arya Pathare</p>
            <p>Built with React, GSAP and Lenis. Every figure on this page is from my résumé or the project’s own README.</p>
          </footer>
        </section>
      </main>
    </>
  )
}
