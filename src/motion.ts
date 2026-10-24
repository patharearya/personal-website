import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// Full scenes only on wide screens with motion allowed (BRIEF.md D7). Everywhere
// else the CSS default is the finished layout: a sideways native scroller for the
// moments and the projects, so content never waits on JS.
const FULL = '(min-width: 900px) and (prefers-reduced-motion: no-preference)'

// 0..3 across About, Where I've been, Work, Contact: which section has reached the
// top of the viewport, plus how far through it. A pinned section's own height
// includes its pin spacer, so the phase only advances once its scene has played.
let sections: HTMLElement[] = []
export function scrollPhase(): number {
  if (!sections.length) sections = [...document.querySelectorAll<HTMLElement>('[data-phase]')]
  let p = 0
  sections.forEach((s, i) => {
    const r = s.getBoundingClientRect()
    if (r.top <= 0) p = i + Math.min(1, -r.top / r.height)
  })
  return Math.min(p, sections.length - 1)
}

export function initMotion(): () => void {
  const root = document.documentElement
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

  let lenis: Lenis | null = null
  let tick: ((t: number) => void) | null = null
  if (!reduce) {
    lenis = new Lenis({ anchors: true, autoRaf: false })
    lenis.on('scroll', ScrollTrigger.update)
    tick = (t) => lenis!.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
  }

  // One slide is "in view" at a time: it is marked gold and only its video plays.
  // Under reduced motion nothing autoplays; each video gets one drawn play button.
  const slides = gsap.utils.toArray<HTMLElement>('.slide')
  const counter = document.querySelector('.work__at')!
  let active = -1
  const setActive = (i: number) => {
    if (i === active) return
    active = i
    counter.textContent = String(i + 1)
    slides.forEach((s, j) => {
      s.classList.toggle('is-active', j === i)
      const v = s.querySelector('video')
      if (!v || reduce) return
      if (j === i) v.play().catch(() => {})
      else v.pause()
    })
  }

  const mm = gsap.matchMedia()

  mm.add(FULL, () => {
    root.classList.add('has-motion')

    // About surfaces out of the water once: lines rise and come into focus.
    gsap.from('.about__body > *', { y: 28, opacity: 0, filter: 'blur(8px)', duration: 1.6, ease: 'expo.out', stagger: 0.12, delay: 0.2, clearProps: 'filter' })
    gsap.from('.about__portrait', { y: 40, opacity: 0, filter: 'blur(14px)', duration: 2.2, ease: 'expo.out', delay: 0.1, clearProps: 'filter' })

    // The portrait drifts a few pixels with the pointer, and sinks back as you scroll on.
    const portrait = document.querySelector<HTMLElement>('.about__portrait')!
    const px = gsap.quickTo(portrait, 'x', { duration: 1.2, ease: 'power3.out' })
    const onPoint = (e: PointerEvent) => px((e.clientX / innerWidth - 0.5) * -18)
    addEventListener('pointermove', onPoint, { passive: true })
    // fromTo with explicit start values: a plain .to() would record the intro's
    // opacity 0 as its start, so scrolling back up would hide the portrait (DEVLOG).
    gsap.fromTo(
      portrait,
      { yPercent: 0, opacity: 1 },
      { yPercent: 14, opacity: 0.15, ease: 'none', immediateRender: false, scrollTrigger: { trigger: '.about', start: 'top top', end: 'bottom top', scrub: true } },
    )

    // Where I've been runs sideways while the page holds still.
    const track = document.querySelector<HTMLElement>('.been__track')!
    const distance = () => track.scrollWidth - window.innerWidth + track.getBoundingClientRect().left * 2
    gsap.to(track, {
      x: () => -Math.max(0, distance()),
      ease: 'none',
      scrollTrigger: { trigger: '.been', start: 'top top', end: () => `+=${Math.max(innerHeight * 0.6, distance())}`, pin: '.been__pin', scrub: 0.8, invalidateOnRefresh: true },
    })

    // Work: the slides sit on the inside of a large cylinder whose axis is near the
    // viewer, so the centre slide faces you flat and its neighbours bend in. Scroll
    // turns the cylinder; it always comes to rest on a slide.
    const n = slides.length
    const state = { pos: 0 }
    let R = 0
    let step = 0
    const measure = () => {
      R = innerWidth * 1.15
      step = (slides[0].offsetWidth + innerWidth * 0.05) / R
    }
    const place = () => {
      slides.forEach((s, i) => {
        const a = (i - state.pos) * step
        const far = Math.abs(a)
        s.style.transform = `translate(-50%, -50%) translateZ(${R}px) rotateY(${-a}rad) translateZ(${-R}px)`
        s.style.opacity = String(gsap.utils.clamp(0, 1, 1.15 - far * 1.7))
        s.style.visibility = far > 1.1 ? 'hidden' : 'visible'
      })
      setActive(Math.round(state.pos))
    }
    measure()
    place()
    const onResize = () => {
      measure()
      place()
    }
    addEventListener('resize', onResize)
    gsap.to(state, {
      pos: n - 1,
      ease: 'none',
      onUpdate: place,
      scrollTrigger: {
        trigger: '.work',
        start: 'top top',
        end: () => `+=${(n - 1) * innerHeight * 0.85}`,
        pin: '.work__pin',
        scrub: 0.9,
        snap: { snapTo: 1 / (n - 1), inertia: false, duration: { min: 0.3, max: 0.8 }, delay: 0.08, ease: 'power3.inOut' },
        invalidateOnRefresh: true,
      },
    })

    gsap.from('.contact__title', { y: 60, opacity: 0, filter: 'blur(10px)', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.contact', start: 'top 65%' } })

    return () => {
      removeEventListener('pointermove', onPoint)
      removeEventListener('resize', onResize)
      slides.forEach((s) => s.removeAttribute('style'))
      root.classList.remove('has-motion')
    }
  })

  // Flat layout: the slide most in view of the native scroller is the active one.
  mm.add(`not all and ${FULL}`, () => {
    const seen = slides.map(() => 0)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (seen[slides.indexOf(e.target as HTMLElement)] = e.intersectionRatio))
        setActive(seen.indexOf(Math.max(...seen)))
      },
      { root: document.querySelector('.strip'), threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    slides.forEach((s) => io.observe(s))
    return () => io.disconnect()
  })

  return () => {
    mm.revert()
    if (tick) gsap.ticker.remove(tick)
    lenis?.destroy()
  }
}
