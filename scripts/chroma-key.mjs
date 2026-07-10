// One-off: remove greenscreen from generated hero portraits.
// Usage: node scripts/chroma-key.mjs <input.png> <output.png>
import sharp from "sharp";

const [, , input, output] = process.argv;
if (!input || !output) {
  console.error("usage: node scripts/chroma-key.mjs <input> <output>");
  process.exit(1);
}

const img = sharp(input).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const LO = 24; // greenness below → fully opaque
const HI = 88; // greenness above → fully transparent

for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const greenness = g - Math.max(r, b);

  if (greenness >= HI) {
    data[i + 3] = 0;
  } else if (greenness > LO) {
    const t = (greenness - LO) / (HI - LO);
    data[i + 3] = Math.round(data[i + 3] * (1 - t));
  }

  // Despill: clamp green to the max of r/b so hair/hood edges lose the fringe
  if (data[i + 3] > 0 && g > Math.max(r, b)) {
    data[i + 1] = Math.max(r, b);
  }
}

// Bounding box of visible pixels for a tight crop (with margin)
let minX = width, minY = height, maxX = 0, maxY = 0;
for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const a = data[(y * width + x) * channels + 3];
    if (a > 8) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const pad = 12;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad);
maxY = Math.min(height - 1, maxY + pad);

await sharp(data, { raw: { width, height, channels } })
  .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
  .png()
  .toFile(output);

console.log(`ok: ${output} (${maxX - minX + 1}x${maxY - minY + 1})`);
