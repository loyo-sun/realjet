# PPVC / MiC Production Line

- English URL: `/marketing/ppvc-mic-production-line/`.
- Page: `site/ppvc-mic-production-line/index.njk`; content and image dimensions: `site/_data/ppvc.json`.
- Styling / behavior: `site/assets/ppvc.css` and `site/assets/ppvc.js`.

## Standard Realjet enquiries

Both hero and bottom sections use `components/ppvc-standard-enquiry.njk`, with Name, E-mail and Message plus the standard privacy consent checkbox. They submit the existing `universal-enquiry` schema (`form-name`, `keyword`, `subject`, `bot-field`, `name`, `email`, `message`, `privacy_consent`) to the standard URL-encoded POST `/` endpoint. No separate plant-lead form, extra qualification fields or file uploader remains.

Submission confirms success inline, matching the standard enquiry experience. The two forms maintain independent pending, error and success states, protect against duplicate submission, and preserve entered values after failure. Accepted responses emit the standard `generate_lead` event with hero/bottom CTA context; no personal field content is passed into analytics. Form start, invalid, attempted, error and abandonment events use the existing event naming. The previous thank-you route remains noindex for backwards compatibility and is no longer a form destination.

## Photography and layout

All hero, bottleneck, station and QA photos are newly sourced online industry examples. See `docs/ppvc-mic-image-replacement.md` and the machine-readable source manifest. Visible source credits and links have been removed at the user’s request; original photo pixels remain unchanged. Provenance is retained in the internal source manifest. The imagery is for the user-requested demonstration, not evidence of Realjet installations.

The three bottleneck cards use photographs instead of SVG drawings. Station images use 39% of the desktop layout, with a 440 px maximum width and natural aspect ratio; text uses 61%. The old fixed 430/455/760 px station minimum heights were removed. QA image frames use 4:3 with `object-fit: contain`, preserving the full original photo without stretching or cropping. All images have intrinsic width/height values matching their actual files.

## Other behavior

`view_technical_specs` fires once after five continuous visible seconds and resets when the table leaves view or the tab is hidden. The production-cycle CTA, schematic dialog and its JavaScript were removed at the user’s request. Existing site consent handling is retained.

## Validation

`npm run build` (Node 22+) passes all generated-page validation. DOM interaction checks cover both enquiry schemas, required fields, encoded payloads, independent success states, failure recovery, duplicate prevention, event privacy, five station tabs and keyboard controls, and specs-view timing. POSTs are mocked: no real sales enquiries are sent by automated testing. Source photographs were visually inspected before selection.

The computer-use browser currently blocks localhost with `ERR_BLOCKED_BY_CLIENT`. Real-browser layout and Core Web Vitals results cannot be inferred from DOM tests.
