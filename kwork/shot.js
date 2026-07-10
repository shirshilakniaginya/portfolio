const { chromium } = require('playwright');

const MAX_W = 6000;
const MAX_H = 10000;

async function prep(page) {
  // disable transform-based smooth scroll (GSAP ScrollSmoother / Lenis / Locomotive)
  // gently: kill the engine and clear only the leftover transform — do NOT touch
  // position/height/overflow, which would break dashboard column layouts.
  await page.evaluate(() => {
    try { if (window.ScrollSmoother && ScrollSmoother.get && ScrollSmoother.get()) ScrollSmoother.get().kill(); } catch (e) {}
    try { if (window.lenis && window.lenis.destroy) window.lenis.destroy(); } catch (e) {}
    try { if (window.locoScroll && window.locoScroll.destroy) window.locoScroll.destroy(); } catch (e) {}
    document.querySelectorAll('.smooth-content,#smooth-content,.smooth-wrapper,#smooth-wrapper,[data-scroll-container]').forEach((e) => {
      const t = getComputedStyle(e).transform;
      if (t && t !== 'none') e.style.transform = 'none';
    });
  });
  await page.waitForTimeout(300);

  // force lazy images to load
  await page.evaluate(() => {
    document.querySelectorAll('img').forEach((i) => {
      i.loading = 'eager';
      if (i.dataset.src) i.src = i.dataset.src;
      if (i.dataset.srcset) i.srcset = i.dataset.srcset;
    });
  });
  // scroll through page to trigger reveal animations + lazy loading
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const step = () => {
        window.scrollBy(0, 600);
        y += 600;
        if (y >= document.body.scrollHeight + 1000) res();
        else setTimeout(step, 150);
      };
      step();
    });
  });
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  // freeze motion only — keep opacity/visibility/transform untouched so design is intact
  await page.addStyleTag({
    content: '*{animation:none !important;transition:none !important}',
  });
  await page.waitForTimeout(600);
}

(async () => {
  const url = process.argv[2];
  const out = process.argv[3] || 'fullpage.png';
  const width = Number(process.argv[4] || 1920);

  const browser = await chromium.launch();

  // pass 1: measure full CSS height at scale 1
  const m = await browser.newContext({ viewport: { width, height: 1080 }, deviceScaleFactor: 1 });
  const mp = await m.newPage();
  try { await mp.goto(url, { waitUntil: 'load', timeout: 60000 }); } catch (e) { console.log('goto warning:', e.message); }
  await mp.waitForTimeout(1500);
  await prep(mp);
  const cssH = await mp.evaluate(() => document.documentElement.scrollHeight);
  await m.close();

  // choose largest scale <= 2 that keeps output within KWORK limits
  let scale = Math.min(2, MAX_W / width, MAX_H / cssH);
  scale = Math.floor(scale * 100) / 100; // round down to be safe
  if (scale < 1) scale = 1; // never go below 1; if still too tall we'll cap height
  console.log(`cssH=${cssH}  scale=${scale}  -> ~${Math.round(width*scale)}x${Math.round(cssH*scale)}`);

  // pass 2: render at chosen scale
  const ctx = await browser.newContext({ viewport: { width, height: 1080 }, deviceScaleFactor: scale });
  const page = await ctx.newPage();
  try { await page.goto(url, { waitUntil: 'load', timeout: 60000 }); } catch (e) { console.log('goto warning:', e.message); }
  await page.waitForTimeout(1500);
  await prep(page);

  await page.screenshot({ path: out, fullPage: true });
  const jpg = out.replace(/\.png$/i, '.jpg');
  await page.screenshot({ path: jpg, fullPage: true, type: 'jpeg', quality: 90 });
  console.log('saved', out, '+', jpg);
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
