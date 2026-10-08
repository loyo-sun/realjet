---
title: "Robotic Welding in Contract Manufacturing: RFQ Inputs"
description: "Robotic welding suits repeated welded parts, but batch size, joint design and fixtures decide the outcome. See what a contract manufacturing RFQ must state."
date: 2026-10-08
updated: 2026-10-08
slug: "robotic-welding-contract-manufacturing-rfq"
image: "/images/insights/robotic-welding-contract-manufacturing-rfq.webp"
imageAlt: "Robotic welding arm joining a steel workpiece at a fabrication station in a machinery workshop"
ctaType: "manufacturing"
draft: false
---

## Why the welding method belongs in the enquiry

A buyer sourcing welded steel components usually sends a drawing, a quantity and a material grade, then waits for a price. The welding method rarely appears in that enquiry, even though it decides what the part has to look like before it reaches the welding station, how sensitive the job becomes to fit-up, and how much of the cost sits in tooling rather than in arc time.

This article sets out what a buyer should state or ask when a welded component may be produced with robotic welding, and which points belong in the RFQ even when the process decision stays with the supplier.

## What changes when the weld moves to a robot

A welding robot follows a programmed path along the joint. It repeats that path at a consistent travel speed and torch angle, so bead shape and penetration tend to vary less across a batch than they do in manual welding, provided each part is presented in the same position.

What a robot cannot do is compensate for a joint that is not where the drawing said it would be. It does not close a root gap that opens during fit-up, and without seam tracking or sensing it does not find a joint that has shifted. Robot welding trades flexibility for repeatability, so the dimensional state of the parts in front of the cell becomes the quality driver.

Three consequences follow for the buyer. First, the drawing has to describe each joint well enough to be programmed, with weld type, size and length. [ISO 2553:2019](https://www.iso.org/standard/72740.html) covers how welding symbols and their dimensions are represented on drawings, and the completed weld is then judged against a quality level such as those in [ISO 5817:2023](https://www.iso.org/standard/79466.html) for steel.

Second, the shop tolerances that position the joint matter as much as the weld detail. A weldment assembled to a general tolerance for overall size can still present variable root gaps at individual joints, and that variation is what forces a shop either to add sensing or to move the work to a manual station.

Third, quantity decides the economics. Programming and fixtures are one time costs. Over a single small batch they dominate the price; over repeat batches the buyer is paying mostly for arc time and consistency.

## When a robot cell is the wrong answer

Some parts should stay manual, and a buyer who understands why will read quotations more accurately. Robotic welding is a poor fit when joints sit in deep pockets or behind stiffeners that restrict torch access, when the weld volume is too small to justify fixtures, when the batch is a one off with no likely repeat, or when the assembly is too large or heavy to present to the robot without a positioner that the project does not need for anything else.

Short, interrupted welds in awkward positions, root passes on site, and repair work also tend to stay manual. A supplier who quotes a cell for that kind of work either carries a tooling cost the part cannot support or intends to weld manually in any case.

## Drawing detail that decides whether the part can be welded automatically

Before asking for a price, check that the drawing package supports the process. The items that matter most are:

- joint type and weld size for every connection, with symbols to a stated standard and edition;
- the datum and locating features the fixture will use, which are often fewer than the drawing's inspection datums;
- the dimensional tolerances on the components that set joint position, not only the finished part tolerance;
- an unrestricted torch route to each joint, including clearance for the gas nozzle and the wrist;
- the position of tack welds, backing strips and any temporary attachments that must be removed later;
- the material grade and thickness range, since both set the welding parameters that will be programmed.

When two of these conflict, the drawing wins over convenience. Changing a joint to suit a robot after the design is fixed costs more than stating the constraint early.

## Fixtures, clamps and the supply boundary

Fixtures are where robotic welding projects are usually won or lost, and they are the item most often left ambiguous in an enquiry. A fixture locates the components repeatably, holds them against distortion, and gives the robot the same joint position on every part.

The RFQ should state whether fixtures are included, and if so for which part numbers, how many assemblies the fixture must support, whether it covers the full quantity or a pilot batch, and who keeps it afterwards. Where the buyer owns the design, the fixture drawing and its datum strategy need to be in the package. Where the supplier develops them, the buyer should ask for the fixture concept with the quotation instead of discovering it during first article.

Also settle the smaller items that create arguments later: who supplies the trial parts and how many, who approves a fixture change, and what happens to fixtures when the design revision changes.

## Welding procedure and personnel evidence to ask for

Ask what welding procedure applies to your joints and how it was qualified. A procedure is normally qualified by test to [ISO 15614-1](https://www.iso.org/standard/59726.html), or under a code such as [AWS D1.1](https://www.aws.org/standards/technical/d11-structure-welding-code-steel) where American structural practice governs. Where the shop works to a welding quality system, [ISO 3834-2:2021](https://www.iso.org/standard/81651.html) defines the comprehensive level of requirements for fusion welding.

Mechanised and automatic welding adds a personnel question that manual welding does not raise in the same way. The people who program, set up and adjust a welding unit are covered by [ISO 14732:2025](https://www.iso.org/standard/82980.html), which addresses welding operators and weld setters separately from the welder qualification covered by ISO 9606. A buyer auditing a shop can ask which certificate applies to the cell that will run the work, rather than assuming the welder certificate covers it.

Safety of the cell is the supplier's responsibility, not a clause the buyer writes. The relevant references are [ISO 10218-2:2025](https://www.iso.org/standard/73934.html) for industrial robot applications and cells, with ISO 12100 for the general risk assessment method. For machinery placed on the European market, [Machinery Regulation (EU) 2023/1230](https://osha.europa.eu/en/legislation/directive/regulation-20231230eu-machinery) applies. What the buyer needs to settle is who signs the declaration for the completed installation, especially where the fabrication supplier builds the cell and another party integrates it on site.

## Inspection: what to check on the first parts

A programmed process earns its value only if the first parts are checked properly. Agree the inspection scope before production, not after the first batch. Typically that means a dimensional report against the drawing for the first assembly, visual examination of every weld to the stated quality level, and any non destructive testing that the drawing or the application standard requires. Our note on [welding procedure and NDT scope](/insights/contract-manufacturing-welding-procedure-ndt/) covers how to allocate that work between visual, surface and volumetric methods.

Distortion is the second thing to watch. Robotic welding holds heat input more consistently than manual welding, but consistent heat input still bows a long weldment if the sequence and the restraint are wrong. The methods for controlling that are set out in our note on [welding distortion control](/insights/contract-manufacturing-welding-distortion-control/), and the practical response is a first article inspection that measures flatness and joint positions before the batch runs, as described in our guide to [first article inspection for contract manufacturing](/insights/contract-manufacturing-first-article-inspection-rfq/).

## Comparing quotations on the same basis

Two quotations for the same welded component can differ by a wide margin without either being wrong, because the welding method, the fixture position and the inspection scope all move the price. Ask each bidder to separate the one time elements from the recurring elements: programming hours, fixture design and build, trial parts and approval, then the per part price at the stated annual volume.

Require the quotation to name the minimum batch at which the quoted process makes sense, the changeover cost when the design revision changes, and whether spare fixtures, clamps and consumables are included. A quotation that shows a lower unit price at a volume below the stated minimum is a signal that the process in the offer is not the process in the shop.

## Next step

Realjet manufactures welded steel components and machinery parts to customer drawings. Its welding capability includes robotic welding lines for arc welding and gas metal arc welding alongside manual stations, working under an ISO 3834-2 welding quality system. The useful starting point for an enquiry is the drawing set, the quantity and the welding standard that governs the work. When the joint details, the dimensional tolerances around each joint and the expected repeat volume are on the table, a supplier can say which process suits the part and price the tooling honestly. Realjet's [contract manufacturing services](/marketing/contract_manufacturing/) page describes the route from drawing review to delivered components.
