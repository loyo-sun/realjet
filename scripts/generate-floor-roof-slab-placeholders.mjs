import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDir = path.resolve(
  "public/images/products/precast-moulds/floor-roof-slab-moulds",
);

const placeholders = [
  {
    file: "01-precast-floor-roof-slab-mould.webp",
    width: 1600,
    height: 900,
    number: "01",
    title: "HERO — PRECAST SLAB MOULD",
    detail: "Replace with a real horizontal steel casting table in a factory",
  },
  {
    file: "02-fixed-horizontal-slab-casting-table.webp",
    width: 1200,
    height: 675,
    number: "02",
    title: "FIXED HORIZONTAL CASTING TABLE",
    detail: "Show the full table, mould surface, edge forms and working access",
  },
  {
    file: "03-precast-solid-floor-slab.webp",
    width: 1200,
    height: 675,
    number: "03",
    title: "FINISHED PRECAST FLOOR SLAB",
    detail: "Show a structural solid floor slab during lifting or installation",
  },
  {
    file: "04-precast-roof-slab.webp",
    width: 1200,
    height: 675,
    number: "04",
    title: "FINISHED PRECAST ROOF SLAB",
    detail: "Show a roof slab on an industrial or building structure",
  },
  {
    file: "05-slab-openings-cast-in-details.webp",
    width: 1200,
    height: 675,
    number: "05",
    title: "OPENINGS AND CAST-IN DETAILS",
    detail: "Show edge profiles, penetrations, sockets, plates or lifting anchors",
  },
  {
    file: "06-movable-slab-production-pallet.webp",
    width: 1200,
    height: 675,
    number: "06",
    title: "MOVABLE PRODUCTION PALLET",
    detail: "Show a genuine movable pallet or station-integrated casting table",
  },
  {
    file: "07-slab-mould-inspection.webp",
    width: 1200,
    height: 675,
    number: "07",
    title: "SLAB MOULD INSPECTION",
    detail: "Show assembly, surface, dimensional or flatness inspection",
  },
];

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

await fs.mkdir(outputDir, { recursive: true });

for (const item of placeholders) {
  const { width, height } = item;
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#061e34"/>
          <stop offset="0.56" stop-color="#0b3855"/>
          <stop offset="1" stop-color="#0d4b68"/>
        </linearGradient>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#75dce4" stroke-opacity="0.08" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)"/>
      <rect width="${width}" height="${height}" fill="url(#grid)"/>
      <rect x="${width * 0.07}" y="${height * 0.1}" width="${width * 0.86}" height="${height * 0.8}" rx="20" fill="none" stroke="#75dce4" stroke-opacity="0.42" stroke-width="2" stroke-dasharray="12 12"/>
      <text x="${width * 0.1}" y="${height * 0.28}" fill="#75dce4" font-family="Arial, sans-serif" font-size="${height * 0.17}" font-weight="800">${escapeXml(item.number)}</text>
      <text x="${width * 0.1}" y="${height * 0.52}" fill="#ffffff" font-family="Arial, sans-serif" font-size="${height * 0.058}" font-weight="800" letter-spacing="1">${escapeXml(item.title)}</text>
      <text x="${width * 0.1}" y="${height * 0.63}" fill="#ffffff" fill-opacity="0.7" font-family="Arial, sans-serif" font-size="${height * 0.031}">${escapeXml(item.detail)}</text>
      <text x="${width * 0.1}" y="${height * 0.79}" fill="#ffffff" fill-opacity="0.46" font-family="Arial, sans-serif" font-size="${height * 0.024}" letter-spacing="2">16:9 IMAGE PLACEHOLDER • REPLACE BEFORE LAUNCH</text>
    </svg>`;

  await sharp(Buffer.from(svg))
    .webp({ quality: 88 })
    .toFile(path.join(outputDir, item.file));
}

console.log(`Generated ${placeholders.length} slab LP placeholders in ${outputDir}`);
