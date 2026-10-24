// Captures review screenshots from the local preview (npx vite preview --port 4173).
// desktop.png / mobile-N.png: full page, reduced motion. scroll/dNN.png: motion build at 1440x900.
import { chromium } from 'playwright-core';
const URL = process.argv[2] || 'http://localhost:4173/';
const OUT = '.impeccable/review';
const browser = await chromium.launch({ channel: 'chrome', args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'] });
const errors = [];

const shoot = async (opts, fn) => {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL, { waitUntil: 'networkidle' });
  await fn(page);
  await ctx.close();
};

await shoot({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }, async (p) => {
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}/desktop.png`, fullPage: true });
});
await shoot({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'reduce' }, async (p) => {
  await p.waitForTimeout(800);
  // Chrome caps one capture at 16,384 device px; at 2x the page is taller, so it is split.
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  const seg = 8000;
  for (let y = 0, i = 1; y < H; y += seg, i++) {
    await p.screenshot({ path: `${OUT}/mobile-${i}.png`, fullPage: true, clip: { x: 0, y, width: 390, height: Math.min(seg, H - y) } });
  }
});
await shoot({ viewport: { width: 1440, height: 900 } }, async (p) => {
  await p.waitForTimeout(2600);
  await p.mouse.move(900, 380);
  await p.mouse.move(1000, 420, { steps: 8 });
  await p.screenshot({ path: `${OUT}/scroll/d00.png` });
  const h = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const n = 12;
  for (let i = 1; i <= n; i++) {
    // Real wheel steps (not scrollTo), so snapping sees ordinary scroll speeds.
    for (let k = 0; k < 8; k++) {
      await p.mouse.wheel(0, h / n / 8);
      await p.waitForTimeout(60);
    }
    await p.waitForTimeout(1800);
    await p.screenshot({ path: `${OUT}/scroll/d${String(i).padStart(2, '0')}.png` });
  }
});
await browser.close();
console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'no console errors');
