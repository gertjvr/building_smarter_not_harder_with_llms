import fs from 'fs';
import path from 'path';

function readSlides(dir) {
  const slidesContent = [];
  const entries = fs.readdirSync(dir);
  entries.forEach((entry) => {
    const filePath = path.join(dir, entry);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      slidesContent.push(...readSlides(filePath));
    } else if (stat.isFile() && /\.(html|md)$/.test(entry)) {
      slidesContent.push(fs.readFileSync(filePath, 'utf-8'));
    }
  });
  return slidesContent;
}

export function getSlides() {
  const slidesDir = path.resolve(process.cwd(), 'slides');
  if (!fs.existsSync(slidesDir)) {
    console.log('[slides-loader] No slides directory found, skipping.');
    return [];
  }
  return readSlides(slidesDir);
}
