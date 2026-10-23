// Usage: node scripts/shot.mjs <url> <out.png> [width] [height] [fullPage] [waitMs]
import { chromium } from 'playwright-core';
const [url, out, w = '1600', h = '1000', full = 'false', wait = '6000'] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
await page.waitForTimeout(+wait);
await page.screenshot({ path: out, fullPage: full === 'true' });
await browser.close();
console.log('saved', out);
