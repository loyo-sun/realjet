# Production Enquiry Form Acceptance Checklist

Date: 2026-08-12  
Production site: <https://realjetech.com/>  
Fix commit: [`f1118e7`](https://github.com/loyo-sun/realjet/commit/f1118e7)

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

- [ ] Confirm the GitHub `main` branch contains commit `f1118e7` or a later commit.
- [ ] Confirm the latest Netlify Production deploy is published from that commit or later.
- [ ] Test the Production URL, not only a Deploy Preview.
- [ ] Use a private window or hard refresh to avoid a cached copy of `site.js`.
- [ ] Prepare a recognizable test email address.
- [ ] Give each test message a unique marker, such as `PROD-MOULD-YYYYMMDD-01`.
- [ ] Open Netlify: Forms → the relevant form → Submissions.
- [ ] Open GA4 DebugView or Tag Assistant and confirm Measurement ID `G-3QJM0NS91N`.
- [ ] Grant Analytics consent when testing GA4. No analytics events after denial is expected behavior.

Do not use real customer data, passwords, quotations, or other sensitive information in tests.

## Universal product enquiry form

### Entry-point coverage

Test at least these three entry points:

- [ ] A product card on `/precast-concrete-molds/`
- [ ] A product card on one mould category page
- [ ] The enquiry button on one product detail page

### UI and submission flow

For each entry point:

- [ ] Click `Enquire Now` or `Enquire About This Product`.
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

| Test ID | Entry point | Expected keyword | Complete Netlify fields | Success UI | Result |
|---|---|---|---|---|---|
| M-01 | Mould catalogue product card | `Product enquiry: Product name` |  |  |  |
| M-02 | Mould category product card | `Product enquiry: Product name` |  |  |  |
| M-03 | Mould product detail page | `Product enquiry: Product name` |  |  |  |

## Contact page form

Test URL: <https://realjetech.com/contact/>

### UI and submission flow

- [ ] Enter Company.
- [ ] Enter Contact Name.
- [ ] Enter Country / Region.
- [ ] Enter Business Email.
- [ ] Select the required Enquiry Type; test `Precast Concrete Moulds and Formwork` at minimum.
- [ ] Enter Project Details containing a unique test marker.
- [ ] Accept the privacy acknowledgement.
- [ ] Click `Submit Project Details` once.
- [ ] Confirm the button shows `Submitting…` while the request is active.
- [ ] Confirm the page shows `Your Project Enquiry Has Been Submitted` after success.
- [ ] Confirm there is no blank page, script error, or unexpected redirect.

### Netlify submission verification

Open the latest `precast-beam-factory-inquiry` submission and verify:

- [ ] `form-name` equals `precast-beam-factory-inquiry`.
- [ ] `company` exactly matches the entered value and is not blank.
- [ ] `contact_name` exactly matches the entered value and is not blank.
- [ ] `country` matches the entered value; it may be blank only when intentionally omitted.
- [ ] `email` exactly matches the entered value and is not blank.
- [ ] `inquiry_topic` matches the selected option.
- [ ] `project_details` exactly matches the entered value.
- [ ] `privacy_acknowledgement` equals `Privacy policy acknowledged`.
- [ ] `title` and `subject` contain the enquiry type, company, country, and contact name.
- [ ] `bot-field` is blank.
- [ ] One click created only one Netlify submission.

## Validation and failure paths

The following cases must not create a valid Netlify submission or fire `generate_lead`:

- [ ] Submit an empty form: required-field validation appears and no success state is shown.
- [ ] Omit Name or Contact Name: submission is blocked.
- [ ] Omit E-mail: submission is blocked.
- [ ] Enter an invalid email format: submission is blocked.
- [ ] Omit Message in the universal enquiry form: submission is blocked.
- [ ] Omit the privacy acknowledgement on the contact form: submission is blocked.
- [ ] Click the submit button rapidly: only one submission is created.
- [ ] Close the modal or press Escape during submission: no second request is created.
- [ ] Submit while offline: an error message appears and retry is possible after reconnecting.
- [ ] After a failed request, the visitor's input remains available.
- [ ] A failed request fires `lead_form_submit_error`, not `generate_lead`.

## GA4 event verification

### Successful universal enquiry sequence

Verify these events in the visitor-action order:

- [ ] `page_view`
- [ ] The page-specific view event, such as `precast_moulds_page_view` or `product_view`
- [ ] `universal_enquiry_open`
- [ ] `lead_form_start`
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
- [ ] GA4 receives no Name, E-mail, Message, company name, or other personal data.
- [ ] One successful submission fires exactly one `generate_lead`.
- [ ] `generate_lead` is marked as a GA4 key event.

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

## Acceptance criteria

Production passes only when all of the following are true:

- [ ] The fix is published in Netlify Production.
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
