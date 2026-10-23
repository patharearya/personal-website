# Reference: "ECHO." portfolio (Instagram reel, @echo__builds)

Source: `Video.mov` (32.5 s, 220×480, a phone filming a monitor showing the site
on localhost). Frames: `frames/f001–f065.png` (2 fps); enlarged crops:
`frames/zsheet01–03.png`.

Limits: the footage is low resolution and filmed off a screen, so small text is
unreadable. The reel is edited, so its speed may not match the real site.
Easing and timing below are inferred from neighbouring frames, not measured.

## Sequence

| Time | Section | What happens |
|---|---|---|
| 0–3 s | Preloader | "ECHO." in wide-spaced, glowing white capitals on black. A thin line draws itself into a wobbly circle around the word, then pulls away (an SVG line being drawn). |
| 4–6 s | Hero | Light grey background. A huge bold grotesk headline, "EXPLORE MY / PORTFOLIO"; the second line fades from black to grey. A black-and-white cut-out portrait stands in front of the text. Thin nav at the top. On scroll the headline smears with motion blur. |
| 6–9 s | About | The page gives way to a full-bleed black-and-white Starry Night-style painting with a small card in the middle reading "ABOUT ME". As you scroll, the card grows while "ABOUT" and "ME" split to the left and right. The card fills the screen: a beam of light on a lone figure, small text and two pill buttons. A pinned, scroll-driven scale effect. |
| 10–15 s | Where I've been | Dark background, scrolls sideways while the page stays put. Huge faint background text ("CREATIVE TECHNOLOGIST", "2023 SELF-…", "PRESENT") moves slower than the bold white role titles in front ("Creative Technologist", "Full Stack Developer"). Titles blur and ghost while moving. Small tabs at the bottom. |
| 15–17 s | Featured project | White background. One project image in the middle, smaller ones at the edges. |
| 17–21 s | Landing pages | The cards bend into a 3D curved strip, like images on the inside of a cylinder, and scroll sideways. Probably WebGL. |
| 21–23 s | Works '26 | A hexagon ring of tilted 3D cards around "WORKS '26". It spins, then breaks apart. |
| 23–27 s | Project list | The cards fly back into a vertical stack, one project at a time, with its name on the left ("Aether AI", "Aether Protocol", "Maison Éleara") and an index at the top right. Each card tilts in 3D as it passes. |
| 27–29 s | Services | "THE SERVICES WE PROVIDE" with stacked ghost copies of the text that settle into one. An accordion list; the open item becomes a dark card. |
| 29–31 s | Let's talk | Black background. Huge silver gradient "LET'S TALK" and a row of pill links (socials, with "Contact me" highlighted). Small footer. |
| 31–32 s | Loop | Back to the preloader. |

## Why it feels expensive

1. **Almost no colour.** Black, white and greys only. The project images are
   the only colour, so they stand out.
2. **Two type sizes, far apart.** Huge, heavy, tight capitals for headlines;
   tiny text for everything else. No mid-sized text.
3. **Light and dark sections alternate.** Light hero, dark about, dark
   experience, light work, dark contact. Each switch feels like a scene change.
4. **Each section is a scene.** Sections hold in place while scrolling plays
   their animation, instead of the page just moving down.
5. **Motion has weight.** Text blurs and ghosts as it moves, background and
   foreground move at different speeds, and nothing moves at a constant speed.
6. **A few real 3D moments.** The curved gallery and the hexagon are the
   showpieces. Everything else is 2D done carefully.
7. **One strong image per section.** The silhouette portrait, the painting, the
   light beam. Not a grid of thumbnails.

## Likely technology (inferred, not verified)

- Pinning and scroll-driven scenes: GSAP ScrollTrigger.
- Smooth scrolling: Lenis or similar (the motion looks eased, not stepped).
- Curved gallery, hexagon ring and project stack: three.js / React Three Fiber,
  or CSS 3D transforms for the simpler parts.
- Preloader line: an SVG line drawn by animating its stroke.
- Headline blur and ghosting: CSS blur and stacked copies of the text, driven by
  scroll speed.

## Cost, roughly from cheapest to most expensive

1. Preloader, palette, type, light/dark switching, LET'S TALK: cheap.
2. ABOUT ME card growing to full screen, sideways experience section with
   layered text: medium (GSAP).
3. Headline motion blur tied to scroll speed: medium.
4. Project stack with 3D tilt: medium (CSS 3D).
5. Curved WebGL gallery, hexagon that breaks apart and re-forms: expensive. The
   hardest to make work on phones and with reduced motion.

## Caveats

- The creator offers the source in exchange for a comment, so this is a
  template that is already circulating. Copying it closely will look like that
  template. Keep the principles, not the sections.
- The painting, portrait and project images are theirs. Use your own.
- "The services we provide" is agency wording. Decide whether a personal
  portfolio needs it.
