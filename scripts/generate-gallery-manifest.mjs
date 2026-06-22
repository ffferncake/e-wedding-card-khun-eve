import { readdir, writeFile } from "fs/promises";
import path from "path";

const galleryRoot = path.join(process.cwd(), "public", "images", "gallery");
const outputFile = path.join(process.cwd(), "src", "app", "data", "gallery.ts");

function sortByImageNumber(a, b) {
  const aNumber = Number.parseInt(a, 10);
  const bNumber = Number.parseInt(b, 10);

  if (Number.isNaN(aNumber) || Number.isNaN(bNumber)) {
    return a.localeCompare(b);
  }

  return aNumber - bNumber;
}

async function collectImages(folder, publicBase) {
  const entries = await readdir(folder, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(folder, entry.name);
      const publicPath = `${publicBase}/${entry.name}`;

      if (entry.isDirectory()) {
        return collectImages(fullPath, publicPath);
      }

      if (!entry.isFile() || !/\.(jpe?g|png|webp)$/i.test(entry.name)) {
        return [];
      }

      return [publicPath];
    }),
  );

  return files.flat().sort(sortByImageNumber);
}

const gallery = {
  all: await collectImages(galleryRoot, "/images/gallery"),
};

await writeFile(
  outputFile,
  `export const galleryImages = ${JSON.stringify(gallery, null, 2)} as const;\n`,
);

console.log(`Generated ${path.relative(process.cwd(), outputFile)}`);
