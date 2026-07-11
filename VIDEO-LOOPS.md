# Making a portrait/hero video loop invisibly

Used for `public/about/hero-portrait-dima-loop.mp4` (the hero background
video in `components/sections/hero/Hero.tsx`). Keep this around for the
next time a new hero/portrait clip needs to loop with `<video loop>`.

## The problem

`<video loop>` does an instant hard cut back to `currentTime = 0` — no
blend, no easing. If the source clip wasn't shot/edited as a deliberate
seamless loop, the first and last frames almost never match exactly
(slightly different head position, camera exposure flicker, compression
noise), and that mismatch reads as a visible "pop" right at the point
where the subject is mid-motion.

Two tempting fixes that turned out **worse**, not better:
- **Reverse/boomerang** (play forward, then play the reverse, repeat):
  technically zero seam, but a person's motion played backwards looks
  wrong and is very noticeable.
- **Long crossfade** (dissolve the last ~1s into the first ~1s): if the
  subject is moving during that window, you get a blurry double-exposure
  ghosting effect instead of a hidden cut — often more distracting than
  the original hard cut.

## What actually works: find the two most similar frames, then hard-cut there

Most short "living portrait" clips have a moment near the end where the
motion settles back close to the starting pose (a natural pause/return).
Instead of guessing, scan the clip for the (start, end) timestamp pair
whose frames are pixel-wise closest to each other, then trim exactly
there with a plain cut — no crossfade, no reverse. If the match is very
close but not perfect, a very short (~0.15s) crossfade on top removes
just the residual compression noise without causing ghosting.

### 1. Scan for the best-matching frame pair

Requires `ffmpeg`/`ffprobe` on PATH and Node.js (both already available
in this project). Save as a throwaway script (e.g. in the OS temp dir,
not in the repo) and run with `node`:

```js
// scan.mjs — compares candidate start/end frames, prints the closest pair
import { spawnSync } from "node:child_process";

const SRC = "C:\\path\\to\\source-clip.mp4"; // Windows path, ffmpeg.exe needs it native
const W = 160, H = 90; // small downscale = fast + still accurate enough
const FPS = 24;        // match the source's frame rate
const STEP = 1 / FPS;

function grabFrame(t) {
  const out = spawnSync("ffmpeg", [
    "-y", "-ss", t.toFixed(5), "-i", SRC,
    "-vf", `scale=${W}:${H}`,
    "-frames:v", "1",
    "-f", "rawvideo", "-pix_fmt", "rgb24",
    "-"
  ], { maxBuffer: 1024 * 1024 * 20 });
  if (out.status !== 0) throw new Error("ffmpeg failed at t=" + t);
  return out.stdout;
}

function diff(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += Math.abs(a[i] - b[i]);
  return sum / a.length; // 0 = identical, >5 = visibly different
}

// Search near the very start and very end of the clip — adjust ranges
// to the clip's own duration.
const starts = [];
for (let t = 0; t <= 1.3; t += STEP) starts.push(+t.toFixed(5));
const ends = [];
for (let t = 4.6; t <= 5.97; t += STEP) ends.push(+t.toFixed(5));

const startFrames = starts.map(t => ({ t, buf: grabFrame(t) }));
const endFrames = ends.map(t => ({ t, buf: grabFrame(t) }));

let best = null;
for (const s of startFrames) {
  for (const e of endFrames) {
    if (e.t <= s.t) continue;
    const d = diff(s.buf, e.buf);
    if (!best || d < best.d) best = { start: s.t, end: e.t, d };
  }
}
console.log("BEST:", best);
```

Run it: `node scan.mjs`. It prints the `{ start, end, d }` pair with the
lowest pixel difference — that's your trim range. A `d` below ~1.0 (at
this downscale) is generally imperceptible as a cut.

### 2. Trim to that exact pair — plain hard cut, no filters

```bash
ffmpeg -y -ss <start> -to <end> -i source-clip.mp4 \
  -an -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -movflags +faststart \
  hero-portrait-loop.mp4
```

- `-an` — hero background videos are muted anyway, drop the audio track.
- `-movflags +faststart` — moves metadata to the front so the video
  starts playing before the whole file downloads.
- Regenerate the poster frame from the new file so it matches the actual
  first frame:
  ```bash
  ffmpeg -y -i hero-portrait-loop.mp4 -update 1 -frames:v 1 -q:v 2 hero-portrait.png
  ```

### 3. Optional: short crossfade if there's still a faint flicker

Only reach for this if the hard cut from step 2 still shows a tiny bit
of noise — keep the duration short (~0.15s) so it just smooths grain
between two already-similar frames rather than blending distinct poses:

```bash
ffmpeg -y -i source-clip.mp4 -filter_complex \
"[0:v]trim=start=<start>:end=<end>,setpts=PTS-STARTPTS[full]; \
[full]split[a][b]; \
[a]trim=start=0.15,setpts=PTS-STARTPTS[main]; \
[b]trim=end=0.15,setpts=PTS-STARTPTS[head]; \
[main][head]xfade=transition=fade:duration=0.15:offset=<end-start-0.15-0.15>[out]" \
-map "[out]" -an -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -movflags +faststart \
hero-portrait-loop.mp4
```

## What we tried and rejected for this video

- **Fade-through-black via JS** (`requestAnimationFrame`-driven opacity,
  restart the video while invisible, `timeupdate`/`ended` listeners).
  This is a legitimate, commonly-used technique and hides the seam
  completely regardless of the source footage — but it changes the
  visual behavior (a brief dim-to-black pulse every loop) and was
  reverted here because the plain frame-matched hard cut looked cleaner
  for this specific clip. Worth revisiting if a future clip has no good
  matching frame pair at all (continuous motion throughout, no natural
  pause).

## Reference: this file's actual numbers

- Source: `Dima.mp4` (1280×720, 24fps, 6s).
- Best-matching pair found: `start=0s`, `end=5.6s` (near-zero pixel diff).
- Final trim + 0.15s micro-crossfade → `hero-portrait-dima-loop.mp4`,
  ~5.5s, no visible seam.
