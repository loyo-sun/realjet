# Production Enquiry Form Acceptance Checklist

Date: 2026-08-12  
Production site: <https://realjetech.com/>  
Historical form-field fix: [`f1118e7`](https://github.com/loyo-sun/realjet/commit/f1118e7) — retained only for defect traceability
Minimum production acceptance baseline: [`32b08cf`](https://github.com/loyo-sun/realjet/commit/32b08cf) or later

## Purpose

Use this checklist to verify that production enquiry forms submit complete visitor input to Netlify, show accurate UI states, preserve product attribution, and send the correct GA4 conversion events.

## Confirmed defect and scope

The defect was present in production code before commit `f1118e7`.

The affected handlers disabled their `<fieldset>` before constructing `FormData`. Browsers exclude disabled controls from `FormData`, so Netlify could accept a submission while receiving blank visitor fields.

Affected fields included:

- Universal enquiry form: `name`, `email`, and `message`.
- Contact form: `company`, `contact_name`, `country`, `email`, `inquiry_topic`, `project_details`, and `privacy_acknowledgement`.

Affected surfaces included:

- `/precast-concrete-molds/`
- Four precast mould application category pages
- Fourteen precast mould product detail pages
- Other product detail pages using the universal enquiry modal
- `/contact/`

The multilingual precast production-line forms and the contract-manufacturing form already capture `FormData` before entering the submitting state and did not contain the same defect.

The corrected order is:

1. Capture and serialize all successful form controls.
2. Disable the controls to prevent duplicate interaction.
3. send the captured request body to Netlify.
4. Show success and fire `generate_lead` only after a successful response.

## Pre-test preparation

- [ ] Confirm the GitHub `main` branch is at `32b08cf` or later.
- [ ] Confirm the latest Netlify Production deploy is published from `32b08cf` or later.
- [ ] Test the Production URL, not only a Deploy Preview.
- [ ] Use a private window or hard refresh to avoid a cached copy of `site.js`.
- [ ] Prepare a recognizable test email address.
- [ ] Give each test message a unique marker, such as `PROD-MOULD-YYYYMMDD-01`.
- [ ] Open Netlify: Forms → the relevant form → Submissions.
- [ ] Open GA4 DebugView or Tag Assistant and confirm Measurement ID `G-3QJM0NS91N`.
- [ ] Grant Analytics consent when testing GA4. No analytics events after denial is expected behavior.

Do not use real customer data, passwords, quotations, or other sensitive information in tests.

## Screenshot confirmation gates

Items marked **📷 Send screenshots for confirmation** are review gates. Finish the gate, send the required screenshots, and wait for confirmation before starting the next test group.

Screenshot rules:

- Include the browser URL, page or dashboard name, relevant fields, and result.
- Netlify screenshots may redact the middle of the test name and email, but must preserve field names, non-empty status, keyword, subject, submission time, and Submission ID.
- GA4 screenshots must not contain names, email addresses, messages, or other personal information.
- Use numbered parts when one screenshot is insufficient, for example `G1-1/2` and `G1-2/2`.
- If a test fails, preserve the state and send page, Netlify, and GA4 screenshots before retrying.

| Gate | When complete | Required screenshots | Review objective |
|---|---|---|---|
| G0 | Netlify Production deploy | `Published`, Production, deploy time, commit `32b08cf` or later | Verify the minimum accepted production version |
| G1 | Catalogue enquiry | Success UI and matching Netlify fields | Content and product attribution |
| G2 | Category enquiry | Success UI and matching Netlify fields | Shared component and category flow |
| G3 | Product-detail enquiry | Product CTAs, success UI, and Netlify fields | Entry points, content, attribution |
| G4 | Contact-page enquiry | Success UI and complete Netlify fields | Contact-form integrity |
| G5 | Beam-factory enquiry | Success UI and complete `universal-enquiry` fields | Beam-factory form integrity |
| G6 | Successful GA4 enquiry funnel | DebugView sequence and `generate_lead` parameters | Event order and success semantics |
| G7 | Product E-mail/WhatsApp clicks | `product_conversion_click` parameter details | Channel, position, product slug |
| G8 | Beam-factory mould heading link | H3 state, destination, event parameters | H3 link and cross-page analytics |
| G9 | Mobile checks | Product actions, modal, keyboard-open form | No obstruction and usable submission |
| G10 | End of testing | Completed result table and final decision | Final production acceptance |

Send G0 screenshots for confirmation before submitting test enquiries.

## Universal product enquiry form

### Entry-point coverage

Test at least these three entry points:

- [ ] A product card on `/precast-concrete-molds/`
- [ ] A product card on one mould category page
- [ ] The enquiry button on one product detail page

### UI and submission flow

For each entry point:

- [ ] Click `Enquire Now` or `Enquire`.
- [ ] Confirm the modal opens without an unexpected navigation.
- [ ] Confirm `Enquiry about` identifies the selected product or enquiry context.
- [ ] Enter a unique Name.
- [ ] Enter a valid test E-mail.
- [ ] Enter a Message containing the unique test marker.
- [ ] Click `Send Enquiry` once.
- [ ] Confirm the button shows `Sending…` while the request is active.
- [ ] Confirm the fields cannot be changed during submission.
- [ ] Confirm the modal shows `Enquiry Sent` after success.
- [ ] Confirm there is no blank page, script error, or unexpected redirect.

### Netlify submission verification

Open the latest `universal-enquiry` submission and verify:

- [ ] `form-name` equals `universal-enquiry`.
- [ ] `name` exactly matches the entered value and is not blank.
- [ ] `email` exactly matches the entered value and is not blank.
- [ ] `message` exactly matches the entered value and is not blank.
- [ ] `keyword` identifies the correct product or enquiry entry point.
- [ ] `subject` includes `Website enquiry:` and the correct keyword.
- [ ] `bot-field` is blank.
- [ ] One click created only one Netlify submission.
- [ ] The recorded submission time matches the test.

**📷 Send screenshots for confirmation (G1/G2/G3):** for each entry point, send the success state and matching Netlify Submission details. The product-detail screenshot must show the product name, `Enquire`, `WhatsApp`, and the three floating contact actions.

| Test ID | Entry point | Expected keyword | Complete Netlify fields | Success UI | Result |
|---|---|---|---|---|---|
| M-01 | Mould catalogue product card | `Product enquiry: Product name` |  |  |  |
| M-02 | Mould category product card | `Product enquiry: Product name` |  |  |  |
| M-03 | Mould product detail page | `Product enquiry: Product name` |  |  |  |

## Contact page form

Test URL: <https://realjetech.com/contact/>

### UI and submission flow

- [ ] Confirm the visible form contains only Name, E-mail, and Message.
- [ ] Enter Name.
- [ ] Enter E-mail.
- [ ] Enter a Message containing a unique test marker.
- [ ] Click `Submit Enquiry` once.
- [ ] Confirm the button shows `Submitting…` while the request is active.
- [ ] Confirm the page shows `Your Project Enquiry Has Been Submitted` after success.
- [ ] Confirm there is no blank page, script error, or unexpected redirect.

### Netlify submission verification

Open the latest `universal-enquiry` submission and verify:

- [ ] `form-name` equals `universal-enquiry`.
- [ ] `name` exactly matches the entered Name and is not blank.
- [ ] `email` exactly matches the entered value and is not blank.
- [ ] `keyword` identifies the Contact page; a supported `topic` query parameter may add automatic routing context without adding a visible field.
- [ ] `subject` begins with `Website enquiry:` and includes the keyword.
- [ ] `message` exactly matches the entered Message and is not blank.
- [ ] `bot-field` is blank.
- [ ] One click created only one Netlify submission.

**📷 Send screenshots for confirmation (G4):** send the contact-page success state and the matching Netlify Submission details showing every business field is populated correctly.

## Precast beam factory form

Test URL: <https://realjetech.com/marketing/precast-beam-factory/en/>

- [ ] Confirm the visible form contains only Name, E-mail, and Message.
- [ ] Complete Name, E-mail, and Message.
- [ ] Submit once and confirm the success state appears.
- [ ] Open the latest `universal-enquiry` submission.
- [ ] Confirm `form-name`, `name`, `email`, `keyword`, `subject`, `message`, and `bot-field` follow the same standard contract above.
- [ ] Confirm `keyword` identifies the beam-factory locale and page title.
- [ ] Confirm `message` exactly matches the entered Message.

**📷 Send screenshots for confirmation (G5):** send the beam-factory success state and its matching `universal-enquiry` Submission details.

## Validation and failure paths

The following cases must not create a valid Netlify submission or fire `generate_lead`:

- [ ] Submit an empty form: required-field validation appears and no success state is shown.
- [ ] Omit Name: submission is blocked.
- [ ] Omit E-mail: submission is blocked.
- [ ] Enter an invalid email format: submission is blocked.
- [ ] Omit Message in the universal enquiry form: submission is blocked.
- [ ] Click the submit button rapidly: only one submission is created.
- [ ] Close the modal or press Escape during submission: no second request is created.
- [ ] Submit while offline: an error message appears and retry is possible after reconnecting.
- [ ] After a failed request, the visitor's input remains available.
- [ ] A failed request fires `lead_form_submit_error`, not `generate_lead`.

Send screenshots immediately when any failure-path result differs from the expectation. No per-item screenshots are required when all failure tests pass.

## Product detail conversion actions

- [ ] The overview shows `Enquire` and `WhatsApp`.
- [ ] The right-hand floating group shows Enquiry, E-mail, and WhatsApp.
- [ ] Overview Enquire opens the modal with the current product name.
- [ ] Overview WhatsApp includes the current product name and URL.
- [ ] Floating E-mail includes the current product name and URL.
- [ ] Floating WhatsApp includes the current product name and URL.
- [ ] All five actions fire `product_conversion_click`.
- [ ] `conversion_type` is `enquiry`, `email`, or `whatsapp` as appropriate.
- [ ] `cta_position` is `overview` or `floating` as appropriate.
- [ ] `product_slug` matches the current product.

**📷 Send screenshots for confirmation (G7):** send one product-detail action-layout screenshot and GA4 parameter-detail screenshots for at least one E-mail and one WhatsApp click.

## Beam-factory mould catalogue link

Test: <https://realjetech.com/marketing/precast-beam-factory/en/>

- [ ] The `High-Precision Hydraulic Moulds` H3 heading itself is clickable.
- [ ] No separate `Explore Precast Moulds` link is present.
- [ ] The H3 opens `/precast-concrete-molds/`.
- [ ] GA4 receives `equipment_catalogue_click`.
- [ ] `equipment_name` equals `High-Precision Hydraulic Moulds`.
- [ ] `destination_path` equals `/precast-concrete-molds/`.

**📷 Send screenshots for confirmation (G8):** send the H3 card, the destination URL, and the GA4 event parameter details.

## GA4 event verification

### Successful universal enquiry sequence

Verify these events in the visitor-action order:

- [ ] `page_view`
- [ ] The page-specific view event, such as `precast_moulds_page_view` or `product_view`
- [ ] `universal_enquiry_open`
- [ ] `lead_form_start`
- [ ] Three `lead_form_field_complete` events, with `field_name` values `name`, `email`, and `message`
- [ ] `lead_form_submit_click`
- [ ] `lead_form_submit_attempt`
- [ ] `generate_lead`

DebugView may display the newest event first, so its visual order can appear reversed.

### Event parameters and privacy

- [ ] `form_id` identifies `universal-enquiry` or the contact form.
- [ ] `keyword` matches the clicked enquiry entry point.
- [ ] Product detail events contain the correct `product_slug`.
- [ ] A successful event contains `lead_source`.
- [ ] `page_path` matches the current URL.
- [ ] `page_type` matches the page type.
- [ ] The completed form reports `field_count = 3`, `completed_fields = 3`, and `required_fields_completed = 3`.
- [ ] GA4 receives no Name, E-mail, Message, company name, or other personal data.
- [ ] One successful submission fires exactly one `generate_lead`.
- [ ] `generate_lead` is marked as a GA4 key event.

**📷 Send screenshots for confirmation (G6):** send the complete event sequence, then the expanded `generate_lead` parameters showing `form_id`, `keyword`, `product_slug`, `lead_source`, `page_path`, and `page_type`, with no personal information.

## Device and browser coverage

| Device | Browser | Product enquiry | Contact page | Result |
|---|---|---|---|---|
| macOS or Windows desktop | Chrome |  |  |  |
| macOS desktop | Safari |  |  |  |
| iPhone | Safari |  |  |  |
| Android | Chrome |  |  |  |

For each test combination:

- [ ] The modal remains within the viewport and can scroll to the submit button.
- [ ] The active field and submit button remain usable with the mobile keyboard open.
- [ ] Closing the modal returns focus to the originating enquiry button.
- [ ] Mobile sticky actions do not cover the form submit button.
- [ ] English text, non-Latin characters, spaces, hyphens, and common punctuation reach Netlify correctly.

**📷 Send screenshots for confirmation (G9):** send at least three iPhone Safari or Android Chrome screenshots: product-page main and floating actions, the full enquiry modal, and the form while the keyboard is open with submission controls still usable.

## Acceptance criteria

Production passes only when all of the following are true:

- [ ] GitHub commit `32b08cf` or later is published in Netlify Production.
- [ ] Catalogue, category, and product detail entry points each pass one successful test.
- [ ] `/contact/` passes one successful test.
- [ ] All required visitor fields contain the correct values in Netlify.
- [ ] Product keywords match the actual clicked entry points.
- [ ] The UI shows success only after a successful Netlify response.
- [ ] GA4 fires exactly one `generate_lead` after success.
- [ ] Validation and network failures do not create a successful lead.
- [ ] At least one desktop and one mobile browser pass.

Final decision:

- [ ] Pass — keep the release live.
- [ ] Conditional pass — record non-blocking issues and schedule corrections.
- [ ] Fail — stop paid traffic and repair the enquiry path before resuming.

**📷 Send screenshots for confirmation (G10):** send the completed result table and final decision. Mark production validation complete only after review.

## Issue log

| ID | Date/time | Page URL | Device/browser | Steps | Actual result | Netlify submission | GA4 events | Severity | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 |  |  |  |  |  |  |  |  |  |
| 2 |  |  |  |  |  |  |  |  |  |
| 3 |  |  |  |  |  |  |  |  |  |

Severity guide:

- **P0:** Submission failure, blank visitor fields, false success, or lost contact information.
- **P1:** Incorrect attribution, duplicate submissions, or incorrect GA4 success events.
- **P2:** Mobile usability, status-message, or visual-state issue.
- **P3:** Minor display issue with no impact on submission or attribution.
