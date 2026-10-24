// Regression check: the About portrait must be fully visible again after scrolling
// down and back up. Usage: node scripts/check-portrait.mjs [url]
import { chromium } from 'playwright-core';
const url = process.argv[2] || 'http://localhost:5173/';
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(3500);
const read = () => p.evaluate(() => +getComputedStyle(document.querySelector('.about__portrait')).opacity);
const start = await read();
for (let i = 0; i < 10; i++) { await p.mouse.wheel(0, 200); await p.waitForTimeout(50); }
await p.waitForTimeout(1500);
const down = await read();
for (let i = 0; i < 14; i++) { await p.mouse.wheel(0, -200); await p.waitForTimeout(50); }
await p.waitForTimeout(2000);
const back = await read();
await b.close();
console.log({ start, down, back });
if (start < 0.99 || back < 0.99) { console.log('FAIL: portrait not visible at the top'); process.exit(1); }
console.log('PASS');
