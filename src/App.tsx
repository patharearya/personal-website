import { useEffect, useRef, useState } from 'react'
import { about, moments, person, projects, type Project } from './content'
import { initMotion, scrollPhase } from './motion'
import { startWater } from './water'

const Arrow = () => (
  <svg className="icon" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
)

const Down = () => (
  <svg className="icon" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 2.5v9M4 8l4 4 4-4M3 14h10" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
)

function Water() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => startWater(ref.current!, !matchMedia('(prefers-reduced-motion: reduce)').matches, scrollPhase), [])
  return <canvas ref={ref} className="water" aria-hidden="true" />
}

// Shown only under reduced motion, where nothing autoplays.
function Play({ video }: { video: React.RefObject<HTMLVideoElement | null> }) {
  const [playing, setPlaying] = useState(false)
  const toggle = () => {
    const v = video.current!
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }
  useEffect(() => {
    const v = video.current!
    const on = () => setPlaying(!v.paused)
    v.addEventListener('play', on)
    v.addEventListener('pause', on)
    return () => {
      v.removeEventListener('play', on)
      v.removeEventListener('pause', on)
    }
  }, [video])
  return (
    <button className="play" type="button" onClick={toggle} aria-label={playing ? 'Pause video' : 'Play video'}>
      <svg viewBox="0 0 16 16" aria-hidden="true">
        {playing ? <path d="M5 3.5v9M11 3.5v9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /> : <path d="M5.5 3.5v9l7-4.5z" fill="currentColor" />}
      </svg>
    </button>
  )
}

function Slide({ p, i }: { p: Project; i: number }) {
  const video = useRef<HTMLVideoElement>(null)
  // Loops back to `start`, not 0, so a clip's intro plays once at most.
  const again = () => {
    const v = video.current!
    v.currentTime = p.start ?? 0
    v.play().catch(() => {})
  }
  return (
    <li className="slide" id={p.id} aria-roledescription="slide" aria-label={`${i + 1} of ${projects.length}: ${p.title}`}>
      <div className="slide__media">
        {p.video ? (
          <>
            <video ref={video} muted playsInline preload="none" poster={p.image} src={p.start ? `${p.video}#t=${p.start}` : p.video} onEnded={again} aria-label={p.imageAlt} />
            <Play video={video} />
          </>
        ) : (
          <img src={p.image} alt={p.imageAlt} loading="lazy" />
        )}
      </div>
      <div className="slide__text">
        <h3 className="slide__title">{p.title}</h3>
        <p className="slide__when">
          {p.award && <span className="slide__award">{p.award}</span>}
          {p.when}
        </p>
        <p className="slide__claim">{p.claim}</p>
        <p className="slide__note">{p.note}</p>
        <p className="slide__foot">
          <span className="slide__stack">{p.stack}</span>
          <span className="slide__links">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                {l.label}
                <Arrow />
              </a>
            ))}
          </span>
        </p>
      </div>
    </li>
  )
}

export default function App() {
  useEffect(() => initMotion(), [])

  return (
    <>
      <Water />

      <header className="bar">
        <a className="bar__name" href="#about">
          Arya Pathare
        </a>
        <nav className="bar__nav" aria-label="Sections">
          <a href="#about">About</a>
          <a href="#been">Where I’ve been</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="bar__cv" href={person.cv} download>
          Résumé <Down />
        </a>
      </header>

      <main>
        <section className="about" id="about" aria-labelledby="about-title" data-phase>
          <h1 className="visually-hidden">Arya Pathare</h1>
          <img className="about__portrait" src="/media/arya.png" alt="Arya Pathare, in black and white." width={440} height={410} />
          <div className="about__body">
            <h2 className="display about__title" id="about-title">
              About me
            </h2>
            <p className="about__lead">{about.lead}</p>
            {about.more.map((l) => (
              <p className="about__more" key={l}>
                {l}
              </p>
            ))}
          </div>
        </section>

        <section className="been" id="been" aria-labelledby="been-title" data-phase>
          <div className="been__pin">
            <h2 className="display been__title" id="been-title">
              Where I’ve been
            </h2>
            <ol className="been__track">
              {moments.map((m) => (
                <li className="moment" key={m.title}>
                  <h3 className="moment__title">{m.title}</h3>
                  <p className="moment__where">
                    {m.where} · {m.when}
                  </p>
                  <p className="moment__line">{m.line}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="work" id="work" aria-labelledby="work-title" data-phase>
          <div className="work__pin">
            <div className="work__head">
              <h2 className="display work__title" id="work-title">
                Work
              </h2>
              <p className="work__count" aria-hidden="true">
                <span className="work__at">1</span> / {projects.length}
              </p>
            </div>
            <div className="strip" aria-roledescription="carousel" aria-label="Projects">
              <ol className="strip__ring">
                {projects.map((p, i) => (
                  <Slide key={p.id} p={p} i={i} />
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title" data-phase>
          <h2 className="display contact__title" id="contact-title">
            Let’s talk.
          </h2>
          <p className="contact__line">{person.seeking}</p>
          <ul className="contact__links">
            <li>
              <a className="pill pill--gold" href={`mailto:${person.email}`}>
                {person.email}
              </a>
            </li>
            <li>
              <a className="pill" href={person.cv} download>
                Résumé <Down />
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
            <p>Every figure here is from my résumé or the project’s own README.</p>
          </footer>
        </section>
      </main>
    </>
  )
}
