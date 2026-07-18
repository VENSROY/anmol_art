// One-off asset optimizer: converts the oversized source PNGs in src/assets
// into compressed WebP files at a sane max width. Run with `node scripts/optimize-images.mjs`.
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, "..", "src", "assets");

// { fileName: { maxWidth, quality } }
const TARGETS = {
  "CRAFT.png": { maxWidth: 1200, quality: 80 },
  "DECOR_SCULPTURES.png": { maxWidth: 1200, quality: 80 },
  "FURNITURE_ROYAL_WOOD_ART.png": { maxWidth: 1200, quality: 80 },
  "PAINTING_HAND_PAINTED_WOOD.png": { maxWidth: 1200, quality: 80 },
  "about.png": { maxWidth: 1920, quality: 80 },
};

async function run() {
  for (const [fileName, { maxWidth, quality }] of Object.entries(TARGETS)) {
    const inputPath = path.join(assetsDir, fileName);
    const outputPath = path.join(assetsDir, fileName.replace(/\.png$/i, ".webp"));

    const before = (await stat(inputPath)).size;
    await sharp(inputPath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toFile(outputPath);
    const after = (await stat(outputPath)).size;

    console.log(
      `${fileName} -> ${path.basename(outputPath)}: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024).toFixed(0)}KB`
    );
  }

  const files = await readdir(assetsDir);
  console.log("\nDone. Assets dir now contains:", files.join(", "));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
