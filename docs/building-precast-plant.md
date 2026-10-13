---
permalink: false
eleventyExcludeFromCollections: true
---
# Building precast plant landing page

Route: `/solutions/precast-concrete-plant/`.

The English page covers building wall panels and floor slabs. It follows the REALJET Notion PRD dated 2026-10-12 and keeps bridge girders, spun piles and PPVC/MiC as separate linked solutions. It is excluded from Eleventy collections and is deliberately not added to the sitemap.

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

Partner reference captions are displayed on the page. Factory photos illustrate technical arrangements; they do not claim direct REALJET deliveries, confirmed years or measured performance. The digital block is a readable integration concept, not a claimed software deployment screenshot. Replace PDF-derived images with approved high-resolution originals when available.

## Enquiry behavior

The page uses the existing Netlify Forms `universal-enquiry` form and includes `page_type=building_precast_plant`, the chosen line and a readable `message`. This preserves the established notification route; it does not introduce a separate form-notification setup. Email keeps `type="email" name="email"` for Netlify Reply-To. WhatsApp can be selected instead, in which case email is disabled and optional. Only one reachable channel is required.

Technical details are optional and preserve original units. Selecting a configuration preselects `line_interest`, which remains editable. Single-equipment enquiries preselect the matching need. The inline form retains inputs after errors, blocks concurrent submissions, uses a timeout, and shows success only after the POST receives a successful response. Local static preview explicitly refuses to fake successful receipt.

The random `submission_id` remains the same across retries in the current page session. Server-side deduplication across reloads and CRM offline qualification are not implemented by this static page; Netlify submission acceptance alone is not evidence of CRM delivery. Verify actual Netlify notification/CRM receipt after deployment with an authorized test enquiry.

Optional analytics respect the existing cookie preference. Events include only fixed category values and a random identifier. No name, email, phone, notes or drawings are sent to analytics. The mobile contact bar hides while the form is visible or the keyboard is active, and the consent notice is positioned above it.

## Validation

Run `npm run build` and `node --check site/assets/building-precast.js`. Review widths 320, 375, 390 and desktop; check menu, FAQ, line preselection, optional fields, single-channel contact, validation and failed-submit recovery. The sitemap source and built XML must retain their previous checksums.
