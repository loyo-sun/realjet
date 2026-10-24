import { manufacturingFaqs } from '../../src/pages/contract-manufacturing/content.js';
const products = [
  ['Aerial Work Platform Turntable','contract-manufactured-aerial-work-platform-turntable','welded-turntable','Welded structure','Fabricated platform structures with specified joint and equipment mounting interfaces.'],
  ['Crane Boom Head','crane-boom-head-contract-manufacturing-machining','crane-boom-real','Crane component','Structural weldments with drawing-defined connections and machined features.'],
  ['Concrete Pump Chassis','concrete-pump-chassis-contract-manufacturing','machinery-chassis','Machine chassis','Welded chassis and approved attachments built around the equipment layout.'],
  ['Hydraulic Oil Tank','hydraulic-oil-tank-contract-manufacturing','oil-tank-real','Fabricated tank','Tank structures and mounting interfaces, with testing specified for the order.'],
  ['Fuel Tank','fabricated-fuel-tank-contract-manufacturing','fabricated-fuel-tank','Fabricated tank','Formed and welded tank bodies manufactured to the approved drawing and acceptance plan.'],
  ['Railway Multifunction Vehicle Structure','railway-multifunction-vehicle-structure-contract-manufacturing','tunnel-platform-real','Equipment structure','Mechanical structures with defined assembly and equipment connections.'],
  ['Chain Conveyor','industrial-chain-conveyor-contract-manufacturing','production-line-real','Production equipment','Conveyor structures and mechanical assemblies within the agreed supply scope.'],
  ['Crane Jib Arm','crane-jib-arm-contract-manufacturing-machining','crane-jib-real','Crane component','Welded structural members with specified mating geometry and finishing.'],
  ['Crane Mast','crane-mast-contract-manufacturing','crane-mast-real','Welded structure','Structural weldments manufactured and inspected against the customer drawing.'],
].map(([title,slug,image,category,description])=>({title,url:`/products/${slug}.html`,image:`/images/manufacturing-split/core/${image}.webp`,alt:title,category,description}));
const processes = [
{title:'Cutting & forming', image:'laser-cutting.jpg', alt:'Laser cutting equipment from REALJET company profile', label:'01 / Prepare the parts', text:'Laser, plasma or flame cutting prepares profiles and openings. Forming and levelling follow the material and approved geometry.', checks:'Profiles · bend access · edge requirements'},
{title:'Welded structures', image:'welding-workshop.jpg', alt:'Robot welding stations in the company profile workshop photograph', label:'02 / Build the structure', text:'Frames, chassis and fabricated tanks are planned around joint access, fixtures and weld sequence.', checks:'Joint preparation · fixtures · distortion control'},
{title:'CNC machining', image:'machined-structure.jpg', alt:'A structural component positioned for machining in the company profile', label:'03 / Finish the interfaces', text:'Milling, boring, drilling and tapping locate the faces and holes needed for your equipment assembly.', checks:'Datums · locating bores · mounting faces'},
{title:'Finishing & assembly', image:'large-part-paint-line.jpg', alt:'Large-part paint line, labelled in the company profile', label:'04 / Complete the scope', text:'Agree the surface preparation, masking, finish, hardware and mating checks for the delivered component.', checks:'Finish · mating checks · packing protection'}
];
export default {products,processes,faqs:manufacturingFaqs};
