import { readFileSync } from 'node:fs';

export default function () {
  const landing = JSON.parse(readFileSync(new URL('./industryLandingData.json', import.meta.url), 'utf8'));
  const topics = {};
  for (const market of ['ai', 'energy']) {
    for (const item of landing[market].items) {
      (topics[item.slug] ||= []);
      if (!topics[item.slug].includes(market)) topics[item.slug].push(market);
    }
  }
  return topics;
}
