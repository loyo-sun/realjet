---
title: "Castings or Weldments: Choosing a Machine Frame Before RFQ"
description: "Cast or welded machine frame, compared for a buyer: tooling cost, damping, fatigue detail, stress relief, and the evidence to name in the RFQ."
date: 2026-10-24
updated: 2026-10-24
slug: "castings-or-weldments-machine-frame-rfq"
image: "/images/insights/castings-or-weldments-frame-rfq.webp"
imageAlt: "Welded black steel equipment frame with mounting rails standing on a plain background"
ctaType: "manufacturing"
draft: false
---

## The drawing rarely says which route to take

A machine frame drawing usually defines geometry, interfaces and load cases. It seldom states whether the frame should be poured as one casting or cut and welded from plate. That decision is often left to whoever quotes first, and it drives the tooling cost, the lead time, the weight, the fatigue detail and the evidence you can ask for at handover.

Buyers meet this question most often on frames for pumps, gearboxes, crushers, presses, machine tools and test rigs. The two routes are not interchangeable at the drawing level. A casting needs draft angles, wall thickness control and core access. A weldment needs joint access, distortion allowance and a post-weld machining step. Switching late is expensive in both directions.

This article sets out what changes between the two, and what a buyer should write into the enquiry so the comparison is fair.

## Where the cost actually sits

The commercial difference is dominated by tooling, and tooling is dominated by quantity.

A casting needs a pattern, and often a core box. That cost is fixed and has to be recovered across the order. For one frame it is hard to justify. For two hundred identical frames a year, the pattern cost per unit becomes small and the casting route usually wins on unit price, because the foundry is repeating a known process rather than fitting and welding plate.

A weldment has almost no tooling. Cutting programmes, a welding procedure and a jig are the only fixed costs, and the jig is often the largest of them. That is why fabricated frames dominate single machines, prototype rigs, replacement frames for old equipment and anything with a shape that may still change.

There is a middle case worth naming in the enquiry: a welded frame that later becomes a casting once the design settles. Buyers who expect volume should say so, because a fabricator can then keep weld access and datum faces in places that will survive the conversion.

## Weight and stiffness favour plate

A weldment puts steel only where the designer asked for it. Walls can be thick at a bearing seat and thin in a panel, with ribs added to control a specific mode of deflection. The result is usually lighter than a casting of equivalent stiffness, and the weight saving is not cosmetic. It reduces the load on the foundation, on the crane during assembly and on transport.

A casting distributes material according to what can be poured and cored. Wall thickness cannot vary freely, because thick and thin sections cool at different rates and shrink differently. The foundry can control this, but the designer has less freedom than with plate.

Neither route is stiffer by nature. Stiffness comes from the section and the load path. What changes is how easily the designer can put material exactly where the bending moment is highest.

## Damping is the argument for cast iron

Cast iron is used for machine tool beds and similar structures for one reason that has little to do with strength. The graphite in grey iron absorbs vibration, so a cast frame settles quickly after a cut or an impact. A steel weldment rings for longer unless something is done about it.

Buyers who need damping have three options on a welded frame: fill the structure with a damping material, add constrained-layer damping to large panels, or accept the behaviour and design the control system around it. Each of these is a cost line that disappears if a casting is chosen, and none of them appears on a drawing that only shows steel.

If the machine is a precision machine tool or a structure that sees repeated impact, damping belongs in the comparison. If it is a static support frame, it usually does not.

## Fatigue is where the two routes differ most

Welded joints are classified by detail, and the classification sets the stress range the joint can carry for a given number of cycles. The categories in EN 1993-1-9 run from 160 for plain rolled section with no attachment, down to 36 for a welded stiffener, each expressed as a stress range at two million cycles. A transverse fillet weld sits near 71. The [fatigue design guidance published by the Steel Construction Institute](https://steelconstruction.info/Fatigue_design_of_bridges) explains how the categories are applied and why a detail that has not been tested has to be assessed some other way.

At order stage the joint detail stops being a fabrication matter, because a welded frame has a finite fatigue life at any stress range above the cut-off limit. The quality class of the weld also changes the category: a butt weld made from both sides and ground flush can be classified higher than the same weld left as-welded, at the cost of more inspection.

A casting has no welds to classify, but it has its own failure modes. Shrinkage porosity, hot tears and inclusions concentrate stress in ways that a drawing cannot show. That is why casting standards work through inspection rather than through detail categories.

## Inspection follows a different logic

ISO 4990:2023 sets the general technical delivery requirements for steel, nickel and cobalt alloy castings, and it includes a group of supplementary requirements for additional testing. The point a buyer should notice is that those supplementary requirements [apply only when individually specified by the purchaser](https://www.iso.org/standard/84185.html). Silence in the purchase order means the basic requirements, not the extra radiography or ultrasonic testing you may have assumed.

On the welded side the equivalent lever is the quality requirement for welding. A fabricator working to ISO 3834-2 has a documented welding coordination system, qualified procedures and qualified welders, with inspection planned against the joint types. That is the system behind the welds, not a statement about any particular frame.

Both routes therefore need the buyer to name the inspection. A casting enquiry should say which areas get radiography or ultrasonic testing, and to which acceptance level. A weldment enquiry should say which joints are full penetration, which NDT method applies, and what proportion of each joint is examined.

## Stress relief and dimensional drift

Welding leaves residual stress, and a frame that is machined before that stress is released can move afterwards. Post-weld heat treatment is the usual answer for a weldment that carries machined interfaces, and it has to happen before final machining, not after.

A casting carries its own residual stress from cooling and from the phase change in the mould. Foundries deal with it by annealing, by controlled cooling, or by leaving the casting to weather. Whatever the method, the buyer needs to know it happened, because a frame that was not stress relieved may hold its dimensions for a year and then lose them.

The enquiry should ask where in the sequence stress relief happens, what the recorded cycle was, and whether the machining datums were established before or after it.

## Repair, lead time and the shape of the supply chain

A cracked weldment can usually be repaired: grind out the defect, re-weld, re-inspect. A cracked casting is a different problem, because a repair needs preheat, controlled cooling and a consumable matched to the iron or steel, and some foundries will not warrant the result.

Lead time runs the other way. A casting needs pattern making, moulding, pouring, cooling, fettling and inspection before machining starts. A weldment can begin cutting the week the drawing is released. For a replacement frame on a stopped line, that difference often decides the route on its own.

## What the enquiry should contain either way

| Item to state | On a casting route | On a weldment route |
| --- | --- | --- |
| Quantity and repeat pattern | Annual volume, so pattern cost can be amortised | Whether the design is expected to change |
| Material specification | Casting grade and standard, with any impact or temperature requirement | Plate grade, thickness and toughness requirement |
| Defect acceptance | Which areas are examined, by which method, to which level | Joint types, penetration, NDT method and coverage |
| Machined interfaces | Datum faces and the machining allowance left by the foundry | Whether machining happens after stress relief |
| Stress relief | Annealing or ageing cycle, and the record | Post-weld heat treatment cycle and the record |
| Dimensional evidence | Marked-up drawing with measured points | Marked-up drawing, plus trial assembly if the frame carries several components |
| Weight | Whether the quoted weight is calculated or weighed | Same, plus lifting points rated for the assembly |
| Surface preparation | As-cast condition, blasting, primer | Weld dressing, blasting, primer |

## Who carries which decision

| Decision | Owner | Why it sits there |
| --- | --- | --- |
| Route selection, cast or welded | Designer or buyer, with supplier input | It changes the geometry rules, not only the price |
| Pattern or jig cost | Supplier quotes it, buyer accepts it | A one-off cost tied to the order quantity |
| Fatigue detail and stress range | Designer | Comes from the load spectrum |
| Casting defect acceptance level | Buyer, in the purchase order | The standard applies it only when asked |
| Welding quality system and NDT coverage | Supplier proposes, buyer approves | Part of the quality plan for the order |
| Stress relief position in the sequence | Supplier, agreed by buyer | It decides whether the machined dimensions hold |
| Dimensional report content | Agreed at enquiry stage | Defines what can be disputed later |

## Where to take the question

The frame is usually the largest single item in a machine order and the one that decides how the rest of the machine can be assembled. Deciding cast or welded before the enquiry goes out saves a round of re-quoting and gives both suppliers the same basis for comparison.

Realjet builds welded machine frames, structures and equipment supports to customer drawings, with welding under an ISO 3834-2 quality system and machining of interfaces after fabrication. The [contract manufacturing service page](/marketing/contract_manufacturing/) sets out the scope, and the [custom structural steel equipment supports](/products/structural-steel-fabrication.html) page shows the frame family in more detail. If a casting remains the better answer for your volume, that is worth saying in the first message, because the drawing preparation differs from that point on.
