---
permalink: false
eleventyExcludeFromCollections: true
---
# Building precast plant landing page

Route: `/solutions/precast-concrete-plant/`.

The English page covers building wall panels and floor slabs. It follows the REALJET Notion PRD dated 2026-10-12 and uses the REALJET brand throughout. The footer does not link to other production lines. It is excluded from Eleventy collections and is deliberately not added to the sitemap.

## Content and images

- Page: `site/precast-concrete-plant/index.njk`.
- Content arrays: `site/_data/buildingPrecast.json`.
- Scoped styles and interactions: `site/assets/building-precast.css` and `.js`.
- Content images: `public/images/building-precast/`.
- Inter fonts: `public/fonts/`, redistributed under the accompanying SIL Open Font License.

The user confirmed strategic-cooperation authorization in the source PRD. Photographs and equipment renders come from the authorized technology partner's PC factory materials, not competing suppliers. Images are extracted content assets, not full PDF page screenshots.

| Asset | Source PDF / page |
| --- | --- |
| Hero long-line workshop | PC factory overall solution (2023), p19 |
| Dual-circulation line | Overall solution, p11 |
| Long-line photo | Overall solution, p20 |
| Slab configuration | PC product catalogue, PDF p6 |
| Distributor, curing, stacker, flying bucket | Overall solution, p12–15 |
| Compaction, tilting, rebar equipment | PC product catalogue, PDF p9, p8, p11 |
| Shuttering automation | Overall solution, p18 |
| Factory reference photos | Overall solution, p48 |

Public copy follows the user’s approved REALJET promotional branding and does not mention the authorized supplier or technology partner. The authorization and source provenance above are retained for internal asset records only. Factory photos illustrate technical arrangements without invented delivery years or measured performance. The digital block is a readable integration concept, not a claimed software deployment screenshot. Replace PDF-derived images with approved high-resolution originals when available.

## Enquiry behavior

The page uses the existing Netlify Forms `universal-enquiry` form. The visitor-facing fields are exactly **name, country, email and message**, all required. Email keeps `type="email" name="email"` for Netlify Reply-To. The entered message is submitted unchanged; it is not overwritten by an automatically generated technical summary. A privacy notice links to the applicable policy without adding a fifth input.

Hidden routing fields retain `page_type=building_precast_plant`, a random submission ID and any configuration context selected by a CTA. The inline form retains inputs after errors, blocks concurrent submissions, uses a timeout, and shows success only after the POST receives a successful response. Local static preview explicitly refuses to fake successful receipt. WhatsApp is a direct button in the hero and enquiry area, with an additional mobile bottom action.

The hero uses a full-width production-photo background with a dark overlay, consistent with the existing product landing pages. Visible section, process, card and delivery numbering is removed. The footer logo retains its intrinsic 1351:184 aspect ratio and does not stretch to the grid-row height.

The random `submission_id` remains the same across retries in the current page session. Server-side deduplication across reloads and CRM offline qualification are not implemented by this static page; Netlify submission acceptance alone is not evidence of CRM delivery. Verify actual Netlify notification/CRM receipt after deployment with an authorized test enquiry.

Optional analytics respect the existing cookie preference. Events include only fixed category values and a random identifier. No name, email, phone, notes or drawings are sent to analytics. The mobile contact bar hides while the form is visible or the keyboard is active, and the consent notice is positioned above it.

## Validation

Run `npm run build` and `node --check site/assets/building-precast.js`. Review widths 320, 375, 390 and desktop; check menu, FAQ, the four-field form, direct WhatsApp buttons, logo aspect ratio, validation and failed-submit recovery. The sitemap source and built XML must retain their previous checksums.
