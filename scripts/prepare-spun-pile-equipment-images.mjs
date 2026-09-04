import { createRequire } from "node:module";
const sharp = createRequire(import.meta.url)("sharp");
import { mkdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const sources = [
  ["batching-plant", "../imagess/1.PNG"],
  ["friction-wheel-drive", "../imagess/第2页-4.PNG"],
  ["bar-processing-machine", "../imagess/第6页-12.PNG"],
  ["cage-welding-machine", "src/assets/image/spun-pipe-piles-line/cage-welding.webp"],
  ["skirt-forming-machine", "../imagess/第6页-14.PNG"],
  ["wire-drawing-machine", "../imagess/第7页-20.PNG"],
  ["tensioning-machine", "../imagess/第6页-15.PNG"],
  ["pile-steel-mould", "src/assets/image/spun-pipe-piles-line/pile-mould.webp"],
  ["spinning-machine", "../imagess/第7页-21.PNG"],
  ["curing-control-cabinet", "../imagess/第3页-6.PNG"],
  ["twin-hook-overhead-crane", "../imagess/第4页-7.PNG"],
  ["steam-boiler", "../imagess/第6页-16.PNG"],
  ["screw-air-compressor", "../imagess/第7页-17.PNG"],
  ["winch", "../imagess/第7页-18.PNG"],
  ["pile-sawing-trolley", "../imagess/第7页-19.PNG"],
  ["pneumatic-impact-wrench", "../imagess/第8页-22.PNG"],
];
const destination = path.join(root, "src/assets/image/spun-pipe-piles-line/core-products");
await mkdir(destination, { recursive: true });
for (const [name, source] of sources) {
  const input = path.resolve(root, source);
  const output = path.join(destination, name + ".webp");
  let done = false;
  for (const width of [960, 800, 640, 560, 480, 400]) {
    for (const quality of [86, 78, 68, 58]) {
      await sharp(input).rotate().resize({ width, height: width, fit: "inside", withoutEnlargement: true }).webp({ quality, effort: 6 }).toFile(output);
      const { size } = await stat(output);
      if (size < 80000) {
        console.log(JSON.stringify({ name, bytes: size, quality, ...(await sharp(output).metadata()) }));
        done = true;
        break;
      }
    }
    if (done) break;
  }
  if (!done) throw new Error(name + " exceeds 80,000 bytes");
}
