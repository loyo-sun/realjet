---
title: "Contract Manufacturing Welding Procedure and NDT Scope for RFQ"
description: "What to specify in a contract manufacturing RFQ for welded parts: welding procedure qualification, drawing symbols, NDT extent and who owns each record."
date: 2026-08-29
updated: 2026-08-29
slug: "contract-manufacturing-welding-procedure-ndt"
image: "/images/insights/contract-manufacturing-welding-procedure-ndt.webp"
imageAlt: "Welded steel machinery frame fabricated to customer drawings in a contract manufacturing workshop"
ctaType: "manufacturing"
draft: false
---

## Why welding records belong in the RFQ

When you send a welded fabrication to a contract manufacturer, the weld is not just a joint on a drawing. It is a structural feature with a defined quality level, a qualified procedure behind it, and an inspection record that proves it was made correctly. Buyers who leave welding details out of the RFQ usually meet the gap during final inspection, when rework is expensive and delivery is already committed.

Realjet's [contract manufacturing services](/marketing/contract_manufacturing/) build custom machinery components and welded assemblies to customer drawings and specifications. This article covers what a procurement team should put in the RFQ so the welding scope is clear before the order, not argued over after the parts are built. It separates what your engineering owns from what the supplier owns.

## Welding procedure specification and qualification record

A welding procedure specification (WPS) describes how a joint is welded: process, filler, preheat, interpass temperature, travel speed and position. The procedure qualification record (PQR) proves that a WPS produces sound welds for the thicknesses and materials used. Standards such as ISO 15614-1 for metallic materials and the AWS D1.1 structural welding code define how procedures are qualified.

As the buyer, you do not normally write the WPS. You decide which welds need a qualified procedure and to which code. A structural frame built to AWS D1.1 carries different evidence than a non-structural bracket. State the governing code and the joints that are load bearing, then let the supplier confirm or prepare the WPS and PQR. If your project already approves a specific WPS, attach it so the shop does not qualify a second one.

## Reading the welding symbols on your drawings

Welding symbols are the shortest way to tell the shop what you expect. [ISO 2553:2019](https://www.iso.org/standard/72740.html) sets the rules for welding symbols on technical drawings, including weld type, size, length, finish and inspection marks. A clear symbol removes guesswork about leg length, intermittent versus continuous welds, and which side of the plate is welded.

Your drawings should carry the symbols, not a separate paragraph the welder has to interpret. When a symbol is missing, the supplier either stops to ask or fills the gap with a default that may not match your design intent. Before releasing the RFQ, confirm that every structural weld has a symbol and that the size matches the load case. Symbols are your responsibility as the design owner; the supplier's job is to meet them.

## Non-destructive testing extent and acceptance

Non-destructive testing (NDT) confirms that a weld meets its quality level without cutting the part. [ISO 17635](https://www.iso.org/standard/66754.html) gives the general rules for selecting NDT methods for welds, and ISO 5817 defines the quality levels (moderate, intermediate, stringent) for imperfections in steel welds. Visual testing (ISO 17637), magnetic particle, penetrant, radiographic (RT) and ultrasonic (UT) testing are the common methods, each suited to different defect types and thicknesses.

The RFQ should state how much of the welding gets tested, not just that it gets tested. A 10 percent spot check costs far less than 100 percent RT but leaves more uninspected. You set the extent and the acceptance level against the consequence of failure: a safety-related weld earns full volumetric testing, a secondary bracket may need visual only. ISO 17635 links the acceptance level to the ISO 5817 quality level on a general basis, so name both in the RFQ.

## Welder and quality-system evidence

A qualified procedure means little if the person at the torch is not qualified for it. [ISO 9606-1](https://www.iso.org/standard/54936.html) covers qualification testing of welders for fusion welding of steels, defining the ranges a certificate covers (process, position, thickness, material group). Ask the supplier for valid welder certificates that match the joints in your order, and check the six-month confirmation rule that keeps a certificate alive.

Beyond the individual, the shop's welding quality system matters. [ISO 3834-1](https://www.iso.org/standard/81650.html) sets the quality requirements for fusion welding of metallic materials, and for structural steelwork EN 1090-2 defines the execution requirements and execution classes. A supplier holding ISO 3834-2 or -3 and working to an EN 1090 execution class can keep welder qualifications valid through documented production evidence rather than repeated re-testing. State in the RFQ which certificates you expect to see at first article and at shipment.

## Dividing responsibility in the RFQ

| Item | Your engineering | Contract manufacturer |
| --- | --- | --- |
| Welding symbols and sizes | Provide on drawings | Follow and query gaps |
| Governing code (AWS D1.1, ISO 3834) | Specify | Confirm capability |
| WPS and PQR | Approve or accept supplier's | Prepare or confirm |
| Welder qualifications (ISO 9606-1) | Request evidence | Provide and maintain |
| NDT extent and acceptance (ISO 17635, ISO 5817) | Define by risk | Perform and report |
| Quality system (ISO 3834, EN 1090-2) | Request class | Hold and evidence |

This split keeps the design authority with you and the production evidence with the supplier. Disputes drop when the RFQ names who owns each record.

## What to attach to the RFQ

A complete welding RFQ for contract manufacturing usually includes the drawings with welding symbols, the material certificates, the governing code and execution class, the list of critical joints, the NDT extent and acceptance levels, and any approved WPS you want reused. Realjet reviews these inputs against its welding and machining capability and returns a build plan with the inspection points.

Send the package early. Welding procedure qualification can take weeks, and a missing material grade or an unclear symbol is the most common reason a fabricated frame misses its date. Clear inputs at RFQ stage are cheaper than a welding review after the steel is cut.
