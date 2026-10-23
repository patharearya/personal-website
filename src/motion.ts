import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// Full scenes only on wide screens with motion allowed (BRIEF.md D7). Everywhere
// else the CSS default is the finished layout, so content never waits on JS.
const FULL = '(min-width: 900px) and (prefers-reduced-motion: no-preference)'

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

  const mm = gsap.matchMedia()
  mm.add(FULL, () => {
    root.classList.add('has-motion')
    const intro = document.querySelector('.preloader') ? 1.05 : 0.15

    // Claim, then proof: the lines set, and each blue mark lands last and hard.
    gsap
      .timeline({ delay: intro })
      .from('.hero .line__in', { yPercent: 70, clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.out', stagger: 0.09 })
      .from('.portrait', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.1, ease: 'expo.out' }, 0.1)
      .from('.hero__intro', { opacity: 0, y: 14, duration: 0.6, ease: 'power2.out' }, 0.5)
      .from('.hero .mark', { scale: 2.6, opacity: 0, duration: 0.26, ease: 'expo.in', stagger: 0.14 }, 0.95)
      .from('.proofs li', { opacity: 0, y: 12, duration: 0.5, ease: 'power3.out', stagger: 0.14 }, 1.05)

    // Display type blurs vertically with scroll speed (an SVG blur whose y deviation
    // follows Lenis velocity), plus faint echoes in the direction of travel. The
    // filter is only attached while moving, so still text renders unfiltered.
    const blur = document.querySelector('#vblur feGaussianBlur')!
    const ghost = { v: 0 }
    let moving = false
    const ghostTick = () => {
      const target = gsap.utils.clamp(-1, 1, (lenis?.velocity ?? 0) / 45)
      ghost.v += (target - ghost.v) * 0.18
      const a = Math.abs(ghost.v)
      root.style.setProperty('--v', a < 0.002 ? '0' : ghost.v.toFixed(3))
      if (a > 0.04 !== moving) root.classList.toggle('is-moving', (moving = a > 0.04))
      if (moving) blur.setAttribute('stdDeviation', `0 ${(a * 7).toFixed(2)}`)
    }
    gsap.ticker.add(ghostTick)

    // Each project pins under the bar while its frame opens and its figure is measured.
    gsap.utils.toArray<HTMLElement>('.project').forEach((article) => {
      const measure = article.querySelector<HTMLElement>('.measure')!
      const num = article.querySelector<HTMLElement>('.measure__num')!
      const end = Number(num.dataset.value)
      const n = { v: 0 }
      gsap
        .timeline({ scrollTrigger: { trigger: article, start: 'top 64px', end: '+=55%', pin: true, scrub: 0.6 } })
        .fromTo(article.querySelector('.frame'), { clipPath: 'inset(14% 12% 14% 12%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', duration: 0.6 })
        .from(measure, { '--at': 0, ease: 'power2.out', duration: 0.6 }, 0.25)
        .fromTo(n, { v: 0 }, { v: end, ease: 'power2.out', duration: 0.6, onUpdate: () => (num.textContent = Math.round(n.v).toLocaleString('en-US')) }, 0.25)
    })

    // ABOUT ME: the small water plate grows to fill the stage while the words part.
    // The words start as one centred "ABOUT ME"; offsets come from their laid-out
    // widths (offsetLeft ignores transforms, so refreshes measure the CSS layout).
    const title = document.querySelector<HTMLElement>('.about__title')!
    const [w1, w2] = title.querySelectorAll<HTMLElement>('span')
    const space = () => parseFloat(getComputedStyle(title).fontSize) * 0.28
    const startX = () => (title.clientWidth - (w1.offsetWidth + space() + w2.offsetWidth)) / 2
    gsap
      .timeline({ scrollTrigger: { trigger: '.about', start: 'top top', end: '+=140%', pin: '.about__stage', scrub: 0.8, invalidateOnRefresh: true } })
      .from('.about__plate', { clipPath: 'inset(32% 36% 32% 36%)', ease: 'power2.inOut', duration: 1 })
      .from(w1, { x: () => startX() - w1.offsetLeft, y: '34vh', ease: 'power2.inOut', duration: 1 }, 0)
      .from(w2, { x: () => startX() + w1.offsetWidth + space() - w2.offsetLeft, y: '34vh', ease: 'power2.inOut', duration: 1 }, 0)
      .from('.about__body', { opacity: 0, y: 40, ease: 'power2.out', duration: 0.45 }, 0.75)

    // Where I've been runs left to right while its ghost line drifts slower behind.
    const track = document.querySelector<HTMLElement>('.track')!
    const distance = () => track.scrollWidth - window.innerWidth + track.getBoundingClientRect().left * 2
    const st = { trigger: '.experience', start: 'top top', end: () => `+=${distance()}`, pin: '.experience__pin', scrub: 0.8, invalidateOnRefresh: true }
    gsap.to(track, { x: () => -distance(), ease: 'none', scrollTrigger: st })
    gsap.to('.experience__ghost', { xPercent: -28, ease: 'none', scrollTrigger: { ...st, pin: false } })

    gsap.from('.contact__title', { yPercent: 40, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.contact', start: 'top 70%' } })

    return () => {
      gsap.ticker.remove(ghostTick)
      root.classList.remove('has-motion', 'is-moving')
      root.style.removeProperty('--v')
    }
  })

  // The bar turns ink while an ink section sits under it (any width, any motion
  // setting). Observes a thin strip at the top of the viewport, so pin spacing and
  // trigger order don't matter (two toggleClass triggers on one class fought; DEVLOG).
  const bar = document.querySelector('.bar')!
  const under = new Set<Element>()
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => (e.isIntersecting ? under.add(e.target) : under.delete(e.target)))
      bar.classList.toggle('bar--ink', under.size > 0)
    },
    { rootMargin: '0px 0px -96% 0px' },
  )
  document.querySelectorAll('.experience, .contact').forEach((s) => io.observe(s))

  return () => {
    io.disconnect()
    mm.revert()
    if (tick) gsap.ticker.remove(tick)
    lenis?.destroy()
  }
}
