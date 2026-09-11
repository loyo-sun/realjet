---
title: "First Article Inspection for Contract Manufacturing Components"
description: "How to specify first article inspection for contract manufacturing: the dimensional report, datum checks and acceptance criteria the buyer should require."
date: 2026-09-11
updated: 2026-09-11
slug: "contract-manufacturing-first-article-inspection-rfq"
image: "/images/insights/contract-manufacturing-first-article-inspection-rfq.webp"
imageAlt: "Dimensional inspection of a machined steel component on a workshop bench"
ctaType: "manufacturing"
draft: false
---

## Why require a first article inspection

When you outsource machined or welded machinery parts to drawing, the drawing is the contract. A first article inspection checks the first produced part against that drawing before the supplier runs the whole batch. It catches datum errors, wrong tolerances and missing certifications while one piece is at risk, not a full shipment. Buyers who skip it often receive a batch that looks conforming and fails at assembly. A first article also gives the buyer a measured baseline for every later part, so incoming inspection can check a few key characteristics instead of repeating the full layout.

## What to put in the RFQ

State the controlling standard by name. Most drawings follow ASME Y14.5 for dimensioning and tolerancing, or the ISO GPS series such as ISO 8015 and ISO 1101. Name the standard in the RFQ so the supplier inspects against the same rules you designed to. Add the general tolerance block, usually ISO 2768 for linear and angular dimensions that have no individual tolerance.

The RFQ should also ask for:

- a ballooned drawing or inspection plan that lists every checked characteristic;
- the datum reference frame, with primary, secondary and tertiary datums in the stated order;
- the GD&T callouts that need measured reports instead of only linear sizes;
- material certificates to EN 10204 3.1 or 3.2, cross-referenced to the heat or lot;
- any surface treatment with its thickness and coverage requirements;
- the measurement method and the acceptance criteria for each characteristic.

## What the dimensional report should show

The supplier returns a dimensional report tied to the drawing. Each controlled feature gets a measured value, the tolerance and a pass or fail against the stated standard. For GD&T characteristics, the report should record the datum setup, because the same feature can read pass or fail depending on which datum is used first. ASME Y14.45 sets out how measurement data for GD&T is reported, and a capable supplier follows that structure even when the contract does not name it.

Coordinate measuring machines produce most of these reports. The report should state the datum reference frame, the measured deviation and the method, so your team can repeat the check if a dispute arises.

## Datum order and the ASME versus ISO gap

Datum order is not decoration. Under ASME Y14.5, feature control frames that share a datum reference frame are evaluated together by default. Under the ISO GPS independency principle in ISO 8015, each specification is met on its own unless the drawing says otherwise. Identical hardware can pass an ISO-default inspection and fail an ASME one. Name one standard in the title block and keep that convention through every linked drawing.

For thin, large or flexible parts, ask for datum targets and, where the drawing calls for it, restrained-state inspection that clamps the part as it sits in assembly. Without that note, free-state measurements can reject good parts or pass bad ones.

## Material and coating evidence

The dimensional report is only half the file. The RFQ should require material certificates that name the grade, the heat number and the issuing party, matched to EN 10204. Where the part is welded, the welding procedure and any non-destructive testing records belong in the same first article package. Coated parts need a thickness or coverage report that ties back to the specification. Keep the certificate, the dimensional report and the welding records in one numbered package so a later audit can trace any non-conformance back to the source lot.

## First article versus trial assembly

A first article inspection verifies the part against the drawing. A trial assembly, where several parts are fitted together, verifies the interfaces between them. They answer different questions. A buyer who needs both should ask for them as separate line items, because one does not replace the other. The first article is the gate before a full run starts; the trial assembly is the gate before a matched set ships.

## Common RFQ gaps that cause rework

Most rework starts with a missing input, not a bad machine. Typical gaps are an unnamed tolerancing standard, a datum scheme left to the supplier, general tolerances that contradict the GD&T, and certification levels that were never specified. Each gap forces the supplier to assume, and assumptions are where batches go wrong. Spend the effort on the first article package so the production order runs from a fixed baseline.

## Set the responsibility boundary

Decide who performs the CMM work and who pays for it. Some buyers send the first article to an independent lab; others accept the supplier's in-house report with the raw data attached. State the split in the RFQ so the quote compares like for like. The supplier designs and builds to the approved drawing; the buyer confirms the standard, the acceptance criteria and the evidence format. Final inspection scope is fixed through the project documents, not assumed.

The [contract manufacturing page](https://realjetech.com/marketing/contract_manufacturing/) explains how Realjet works from customer drawings, specifications and delivery requirements. A clear first article requirement gives both sides a stable basis before a production order starts.
