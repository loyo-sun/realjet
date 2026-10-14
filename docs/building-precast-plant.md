---
permalink: false
eleventyExcludeFromCollections: true
---
# Building precast plant landing page

Route: `/solutions/precast-concrete-plant/`.

The English page covers building wall panels and floor slabs. It follows the REALJET Notion PRD dated 2026-10-12 and uses the REALJET brand throughout. The footer does not link to other production lines. It is excluded from Eleventy collections. Its canonical URL is included in the sitemap following the user request on 2026-10-14.

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
| Dual-Circulation Production Line | User-supplied image 1, 2026-10-13; catalogue PDF p6 / printed p08 |
| Long-Line Casting Table Production Line | User-supplied image 3, 2026-10-13; catalogue PDF p7 / printed p10 |
| Prestressed Composite Slab Production Line | User-supplied image 2, 2026-10-13; catalogue PDF p6 / printed p09 |
| Distributor, curing, stacker, flying bucket | Overall solution, p12–15 |
| Compaction, tilting, rebar equipment | PC product catalogue, PDF p9, p8, p11 |
| Shuttering automation | Overall solution, p18 |
| Project case photos: Huai’an / Yuxi / Hefei | Supplied PPTX slide 48: image87.jpeg / image91.jpeg / image88.png |

Public copy follows the user’s approved REALJET promotional branding and does not mention the authorized supplier or technology partner. The authorization and source provenance above are retained for internal asset records only. Factory photos illustrate technical arrangements without invented delivery years or measured performance. The digital block is a readable integration concept, not a claimed software deployment screenshot. Replace PDF-derived images with approved high-resolution originals when available.

The production-line cards follow the source names and display order: dual-circulation, prestressed composite slab, long-line casting table. The three user-supplied images replace the earlier extracted card assets and use WebP delivery. On 2026-10-13, the built-in imagegen tool removed in-image logos and company names and standardized the canvases; delivery assets are uniformly 1200 × 675 pixels, with matching 16:9 card frames. Editing brief: remove all brand markings, preserve equipment, plant structures, colors, perspective and composition; no replacement logos or text. These cleaned promotional renders are derived illustrations, not unedited source images. The slab card describes the dedicated prestressed composite slab line rather than a generic slab configuration.

## Enquiry behavior

The page uses the existing Netlify Forms `universal-enquiry` form. The visitor-facing fields are exactly **name, country, email and message**, all required. Email keeps `type="email" name="email"` for Netlify Reply-To. The entered message is submitted unchanged; it is not overwritten by an automatically generated technical summary. Each field occupies its own row, without redundant required asterisks. The enquiry section uses compact spacing and a three-row message box. A privacy notice links to the applicable policy without adding a fifth input. Production-line, equipment (image or title), single-machine and digital-integration links prefill Message with the selected topic. Selecting another topic replaces only the previous generated introduction and preserves visitor-written notes; general enquiry links leave the message unchanged.

Hidden routing fields retain `page_type=building_precast_plant`, a random submission ID and any configuration context selected by a CTA. The inline form retains inputs after errors, blocks concurrent submissions, uses a timeout, and shows success only after the POST receives a successful response. Local static preview explicitly refuses to fake successful receipt. WhatsApp is a direct button in the hero and enquiry area, with an additional mobile bottom action.

The hero uses a full-width production-photo background with a dark overlay, consistent with the existing product landing pages. Visible section, process, card and delivery numbering is removed. The footer logo retains its intrinsic 1351:184 aspect ratio and does not stretch to the grid-row height.

The random `submission_id` remains the same across retries in the current page session. Server-side deduplication across reloads and CRM offline qualification are not implemented by this static page; Netlify submission acceptance alone is not evidence of CRM delivery. Verify actual Netlify notification/CRM receipt after deployment with an authorized test enquiry.

Optional analytics respect the existing cookie preference. Events include only fixed category values and a random identifier. No name, email, phone, notes or drawings are sent to analytics. The mobile contact bar hides while the form is visible or the keyboard is active, and the consent notice is positioned above it.

## Validation

Run `npm run build` and `node --check site/assets/building-precast.js`. Review widths 320, 375, 390 and desktop; check menu, FAQ, the four-field form, direct WhatsApp buttons, logo aspect ratio, validation and failed-submit recovery. Verify the canonical landing-page URL appears exactly once in the built sitemap XML.

## Equipment image cleanup (2026-10-13)

Eight equipment images use uniform 1200 × 750 WebP canvases and 8:5 display frames with contain fitting, including the former cover-fit shuttering photograph. Built-in imagegen cleaned visible branding from distributor, bucket, curing, stacker, tilting and rebar assets. Compaction and shuttering had no visible company logos and retain their original imagery with size normalization only. Editing brief: remove company logos and names, including tiny brand marks on warning-sticker margins; preserve the original equipment structures, configuration, perspective, colors, equipment numbers and safety pictograms/instructions. Cleaned assets remain promotional illustrations. Files are in `public/images/building-precast/` under their existing equipment names.

## Project case selection (2026-10-13)

Source: `01_市场调研/1.6.PC 构件厂/01【筑友智能科技】PC工厂整体解决合作方案（2023）.pptx`, slides 46–49, “工厂承建案例”. Read all 50 slides and extracted the case labels and original embedded photographs. The deck identifies 20 locations but does not provide case-specific line types, capacities, delivery dates, contract scopes or measured improvements. Public copy therefore uses verified locations plus short descriptions of visible plant arrangements; it does not invent performance or attribute unsupported delivery claims.

The page displays all 20 projects from slides 46–49, in slide reading order. Each has its matched original photo and verified location. A single horizontal carousel shows four cards on desktop, two on tablet and one main card with a preview of the next on phones. Navigation reads “Case Studies”; the existing `#projects` anchor remains stable. The enquiry CTA pre-fills a request for a similar precast plant, preserving visitor notes. Photos were re-extracted directly from the PPTX to correct earlier asset-name/location mismatches. No supplier identity is shown in the case copy.

| PPT slide | Location | Embedded photo |
| --- | --- | --- |
| 46 | 郑州，河南 | image80.jpeg |
| 46 | 银川，宁夏 | image81.png |
| 46 | 烟台，山东 | image79.png |
| 46 | 昆明，云南 | image82.jpeg |
| 47 | 中新，天津 | image83.jpeg |
| 47 | 杭州，浙江 | image85.jpeg |
| 47 | 长沙，湖南 | image84.jpeg |
| 47 | 周口，河南 | image86.jpeg |
| 48 | 淮安，江苏 | image87.jpeg |
| 48 | 玉溪，云南 | image91.jpeg |
| 48 | 合肥，安徽 | image88.png |
| 48 | 佛山，广东 | image90.png |
| 48 | 衡阳，湖南 | image89.png |
| 48 | 临安，浙江 | image92.jpeg |
| 49 | 湘潭，湖南 | image93.png |
| 49 | 焦作，河南 | image98.png |
| 49 | 胶州，山东 | image94.jpeg |
| 49 | 綦江，重庆 | image96.jpeg |
| 49 | 洛阳，河南 | image97.jpeg |
| 49 | 驻马店，河南 | image95.jpeg |

## Complete case carousel (2026-10-14)

All 20 source locations are included, without selecting a subset. The carousel advances one card every five seconds only while visible; it pauses on hover, keyboard focus, manual arrows, touch interaction, hidden tabs and a user Pause action. A Play button resumes it. Reduced-motion preferences disable autoplay. Native horizontal scrolling, scroll snapping, keyboard arrows and previous/next controls remain available. The end wraps to the beginning without duplicated case cards. A range counter shows the current position. Individual project titles prefill an enquiry for a similar plant in that location. The existing navigation and `#projects` URL anchor are retained.

Nine added photographs (Zhengzhou, Yantai, Yinchuan, Kunming, Zhongxin/Tianjin, Hangzhou, Zhoukou, Foshan and Jiaozhou) use built-in imagegen brand cleanup. Editing brief: remove company logos/names and branded slogans only; retain original plant structures, equipment, people, camera perspective and safety markings; add no replacement text. These are retouched promotional case photographs. Other source case images retain their original content. All final assets live in `public/images/building-precast/project-*.webp`.

## Scroll email offer (2026-10-14)

After a visitor has seen Production Lines and scrolls downward past its bottom, a centered non-modal offer asks only for email: “Leave Your Email for the Complete Solution”. No automatic focus or keyboard opening. It appears on every downward crossing after viewing Production Lines. Closing does not suppress future crossings or visits; continued scrolling below the section does not immediately reopen it. Returning to Production Lines arms the next crossing. After a successful request, the next crossing restores the email form for a new explicit submission. The mobile contact bar hides while the offer is open; it centers within the available viewport, accounting for the cookie notice and mobile keyboard.

A separate static `universal-enquiry` form submits `name=Name`, the visitor's `email`, and `message=客户通过滚动留下了邮箱信息。`, with `enquiry_source=scroll_email` and `project_need=Complete solution`. Country is not invented or required. Existing four-field enquiries stay unchanged. It uses Netlify's existing POST flow, validates email, blocks double submission, retains entered email and submission ID after errors, and confirms receipt only on an accepted response. Local static previews never send/fake successful receipt. No automatic document email delivery is implemented; the lead requests follow-up from the team. No popup frequency flag or visitor email is stored in session storage. Optional conversion analytics include a random lead ID and fixed source labels only.

Validate the scroll offer with `node scripts/test-precast-scroll-email.mjs`; tests use mocked requests and never create live enquiries.

## Case privacy and side navigation (2026-10-14)

The case section explains that customer and company names are omitted to protect privacy; verified geographic labels remain. Previous/next buttons flank the carousel on desktop and sit at the image edges on mobile; the footer retains the pause/play control, range counter and enquiry CTA. The canonical landing-page URL is now listed in the sitemap.

## Equipment catalogue refresh (2026-10-14)

Replaced the equipment list with all 12 items requested by the user, in screenshot order. Source: PC product manual PDF, file pages 7–10 (printed pages 10–17). Feature copy translates the supplied screenshots; titles use generic industry terminology. Specifications use legible, unambiguous source figures; uncertain dimension strings in the original catalogue are omitted rather than reproduced. All equipment frames remain 1200 × 750, white-backed and contain-fit; the retractable cover retains its source factory photograph. Existing cleaned stacker and concrete-bucket images are reused after visual comparison. The former vibration and tilting image mappings were incorrect and are replaced with the correct screenshot subjects. New images are edited with the built-in image tool to remove brands and preserve geometry.

Removed the digital-factory section, navigation link, digital support claim and software FAQ. Sitemap entry remains present. Common English transfer terminology checked against Elematic's official wall and half-slab brochures; all feature and specification claims come from the supplied manual, not other manufacturers.

Image prompt set: precise-object-edit; erase company names/logos with matching underlying materials; preserve machinery, perspective, colors, equipment numbers and safety markings; centered complete render on white 8:5 canvas, retain the curing-cover photograph. New assets: pallet-transfer, tensioning, reinforcement-film, surface-roughening, pallet-ferry and retractable-curing under public/images/building-precast/.

## Equipment specifications layout (2026-10-14)

Desktop equipment layout is four columns by three rows, with two columns on tablet and one on phones. Specifications use a semantic definition list: muted labels above emphasized values in a pale panel with a cyan top border. Long dimensions and storage arrangements span both internal columns. No source values changed during this style revision.

## Equipment row alignment (2026-10-14)

Each desktop or tablet equipment row shares image, title, description and specification row heights through CSS subgrid. Descriptions and specification panels begin at the same vertical position within each row, regardless of copy length; phones remain naturally sized single-column cards.
