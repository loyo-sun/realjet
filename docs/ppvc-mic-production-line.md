# PPVC / MiC Production Line — implementation notes

- Public page: `/marketing/ppvc-mic-production-line/` (English only).
- Confirmation: `/marketing/ppvc-mic-production-line/thank-you/` (`noindex`, excluded from sitemap).
- Page: `site/ppvc-mic-production-line/index.njk`; station/specification content: `site/_data/ppvc.json`.
- Styling and behavior: `site/assets/ppvc.css` and `site/assets/ppvc.js`.
- Shared Solutions submenu updated for all Eleventy pages; sitemap and llms.txt updated.

## Assets

See `docs/ppvc-mic-image-replacement.md`. Images use independent, stable WebP filenames under `public/images/ppvc-line/`. Existing repository imagery is explicitly captioned as equipment/service references. Search references are provided for art direction; competitor photos were not presented as Realjet installations.

The modal provides a playable five-stage illustrated walkthrough. A verified 1:45 Realjet PPVC machine video was not supplied or present in the repository. Replace the walkthrough with an approved local video when available; update the CTA duration and `demo_type` accordingly. Current event retains the requested name `open_video_demo` with `demo_type: schematic_walkthrough`.

## Form and tracking

`ppvc-plant-lead` is a static, detectable Netlify Form with multipart POST, a honeypot, required project fields, one attachment, a drawing URL and campaign fields. Success emits `submit_plant_lead` only after an OK response and redirects to the confirmation page. Failure preserves entered data. Analytics payloads contain no name, email, company, drawing link or file data. Existing consent defaults are retained.

Netlify Forms has an **8 MB total request limit**: https://docs.netlify.com/manage/forms/setup/#file-uploads . The file picker allows PDF/DWG/ZIP up to **7 MiB** to leave room for multipart overhead. A secure URL field supports larger drawing packages, including 25 MB files. Direct 25 MB uploads require a separately provisioned upload/storage service; the UI does not falsely advertise unsupported uploads.

`view_technical_specs` fires once per page after the comparison table is visible for 5 continuous seconds, pauses/resets when offscreen or in a hidden tab. `open_video_demo` fires when the overview dialog opens. `submit_plant_lead` fires on accepted form submission; direct visits or refreshes of the thank-you page do not emit it.

**Account-side setup:** confirm Netlify form detection/notifications after deployment. In GA4, mark `submit_plant_lead` as a key event, then import it into the linked Google Ads account and set it as a primary conversion if this is the chosen attribution route. No Ads conversion label was available in the repository, so no fabricated `AW-…` destination was added. Do not simultaneously import and fire an equivalent direct Ads conversion without a deduplication plan.

## Content boundaries and validation

The user's requested `/marketing/…/` route overrides the root-level URL in the attached PRD. Dimensions, tolerances, speeds and cycle times are presented as planning/design targets subject to engineering and acceptance tests. Local BCA/BD approvals are distinguished from machinery supply; unsupported patent, unconditional approval, instrument-accuracy, 16 m gantry and automatic NDA guarantees are not asserted.

Run `npm run build` with Node 22+ (the Netlify runtime). Build validation checks all generated pages, new routes, form detection markup, station panels, assets, canonical URL and sitemap exclusions.

The hero is a 150 KB WebP with preload/high fetch priority; station and QA images are lazy-loaded with fixed dimensions. The specs table scrolls horizontally with a sticky first column. No third-party media is loaded on page open. LCP <2 s and CLS <0.05 remain performance targets requiring a real-browser/network measurement; static checks cannot certify these values.

## Checked in this change

- Complete production build and generated-page reference validation passed.
- DOM-based interaction checks passed: all five tabs, keyboard navigation, timer reset and one-shot specs event, walkthrough controls, brief transfer, campaign fields, file extension/size validation, duplicate-submit protection and accepted/rejected response handling. Form POSTs were mocked; no real sales enquiry was created.
- Local browser preview was blocked by the computer-use browser layer (`ERR_BLOCKED_BY_CLIENT`). No real-browser layout or Core Web Vitals result is claimed.
