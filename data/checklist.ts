// Permivo readiness checklist data.
// Each item explains what it is, why it matters, and how to do it, and carries a source and status.
// Mark an item "verified" only when an official county or city page, or a written agency reply, supports it.
// Items marked "unverified" are typical plan contents. The county’s Project Submittal Requirements
// cover file and drawing format only, not what each project type must show. Still need that list.

import { DEFAULT_JURISDICTION } from "./rules";
import type { JurisdictionId, Location, ProjectType, Status } from "./rules";

export type ChecklistGroup = "before" | "application" | "plans";

export const GROUP_LABELS: Record<ChecklistGroup, string> = {
  before: "Before you start",
  application: "Application and forms",
  plans: "Plans and details",
};

export const GROUP_ORDER: ChecklistGroup[] = ["before", "application", "plans"];

export interface ChecklistItem {
  id: string;
  jurisdiction: JurisdictionId;
  checkedOn: string; // YYYY-MM-DD, the last day this item was checked against its source
  group: ChecklistGroup;
  projects: ProjectType[];
  where: "city" | "any"; // "city" = only inside Charlotte city limits
  title: string;
  what: string;
  why: string;
  how: string;
  sourceLabel: string;
  sourceUrl: string;
  status: Status;
}

const PLAN_REVIEW = "https://code.mecknc.gov/plan-review/residential";
const PERMITTING = "https://code.mecknc.gov/permitting";
const CITY_GUIDE =
  "https://www.charlottenc.gov/files/sharedassets/city/v/1/growth-and-development/getting-started/documents/zoning/applicant-guide-ldirl.pdf";
const CITY_GATEWAY =
  "https://www.charlottenc.gov/files/sharedassets/city/v/1/growth-and-development/getting-started/documents/zoning/zoning-ldirl-zoning-gateway-checklist.pdf";
const CITY_STORMWATER =
  "https://www.charlottenc.gov/files/sharedassets/city/v/1/growth-and-development/getting-started/documents/stormwater/individual-residential-lot-ldirl-plan-checklist.pdf";
const CITY_UF_TIER1 =
  "https://www.charlottenc.gov/files/sharedassets/city/v/1/growth-and-development/getting-started/documents/urban-forestry/uf-tier-1-submittal-guide.pdf";
const CITY_IRL_FEES =
  "https://www.charlottenc.gov/files/sharedassets/city/v/1/growth-and-development/documents/dev-center-fees/fee-schedules/irl-fee-schedule.pdf";
const CITY_DEVCENTER = "https://charlottenc.gov/ld/pages/default.aspx";
const CITY_PAGE =
  "https://www.charlottenc.gov/Growth-and-Development/Getting-Started-on-Your-Project/Individual-Residential-Lot-Reviews";
const TYPICAL_NOTE = "Typical item, not confirmed for Mecklenburg. Ask the county what it requires for your project type.";

const ALL3: ProjectType[] = ["deck", "addition", "garage"];

export const CHECKLIST: ChecklistItem[] = [
  {
    id: "B1",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    group: "before",
    projects: ALL3,
    where: "any",
    title: "Check whether the work needs a permit at all",
    what: "The county says residential work costing $40,000 or less may not need a permit, with exceptions.",
    why: "It tells you whether to start the permit process or not.",
    how: "Exceptions include load-bearing structures, plumbing, heating or air conditioning, electrical work, materials not permitted by code, and added roofing. A deck is likely load-bearing, so expect to need a permit. Confirm for your project.",
    sourceLabel: "Mecklenburg Code Enforcement, Permitting page",
    sourceUrl: PERMITTING,
    status: "verified",
  },
  {
    id: "B2",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    group: "before",
    projects: ALL3,
    where: "any",
    title: "Find out whether your project goes through plan review",
    what: "The county lists when it does a building code plan review. Among them: an enclosed addition that adds 100 sq. ft. or more to the footprint (decks and screen porches excluded), a new story, a multi-story detached garage or any garage with living space, and accessory buildings of more than one level.",
    why: "Plan review changes what you submit and how long it takes. A deck, or a one-story garage with no living space, is not named in the county’s list.",
    how: "Match your project to the county’s list. If it is not named, or you are close to a line (for example, an addition near 100 sq. ft.), call the Plan Review Facilitator Line, 980-314-2633, option 2-1-1-2, and write down the answer and the date.",
    sourceLabel: "Mecklenburg Code Enforcement, Residential Plan Review",
    sourceUrl: PLAN_REVIEW,
    status: "verified",
  },
  {
    id: "B3",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    group: "before",
    projects: ALL3,
    where: "any",
    title: "HOA approval, if the property has one",
    what: "Written approval from the homeowners’ association for the work.",
    why: "It is not a county requirement, but an HOA can stop a project that already has a permit.",
    how: "Ask the homeowner or the HOA for its approval process and get the approval in writing before you submit.",
    sourceLabel: "General practice, not a county requirement",
    sourceUrl: PLAN_REVIEW,
    status: "unverified",
  },
  {
    id: "A1",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    group: "application",
    projects: ALL3,
    where: "any",
    title: "Online permit application",
    what: "The application you file in the county’s online permit system.",
    why: "It opens the record that your plans, forms, and review all attach to.",
    how: "Log in to your contractor or homeowner account, choose New Building Permit, and select the address. When plan review applies, pick “RTAC Plan Review Path” and describe the work in “Expanded Scope of Work”. Do not upload plans on this screen. Click submit only once, since extra clicks create duplicate permits. Add emails for the applicant and designer, because plan upload links are sent there.",
    sourceLabel: "Mecklenburg Code Enforcement, Residential Plan Review",
    sourceUrl: PLAN_REVIEW,
    status: "verified",
  },
  {
    id: "A2",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    group: "application",
    projects: ALL3,
    where: "any",
    title: "Zoning and erosion control forms, saved as PDFs",
    what: "Forms the county asks you to complete and upload along with your plans.",
    why: "Reviewers use them to check zoning and erosion control requirements next to the building plans.",
    how: "Get the current forms from the county, fill them in completely, and save each as a PDF before uploading.",
    sourceLabel: "Mecklenburg Code Enforcement, Residential Plan Review",
    sourceUrl: PLAN_REVIEW,
    status: "verified",
  },
  {
    id: "A3",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    group: "application",
    projects: ALL3,
    where: "any",
    title: "Upload plans in the right place, then release for review",
    what: "After you submit the application you get a submittal number and a personal plan upload link (also in the confirmation email and as “Upload Plan Documents” on your permit).",
    why: "The county says that link is the only correct place for plans. Uploading anywhere else delays processing. Plans are checked for completeness before they are accepted, and the review clock starts at acceptance.",
    how: "Upload the plans and forms, then click Release for Review. No error message means it went through. If information is missing, the county emails what it needs. Once accepted you get a project number to track progress.",
    sourceLabel: "Mecklenburg Code Enforcement, Residential Plan Review",
    sourceUrl: PLAN_REVIEW,
    status: "verified",
  },
  {
    id: "A5",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    group: "application",
    projects: ALL3,
    where: "any",
    title: "Drawing and file format rules",
    what: "The county’s submittal requirements for how plans are prepared.",
    why: "A submittal is checked against these before it is accepted, so format mistakes can delay you before review even starts.",
    how: "Put all plans in one PDF (40 MB limit). Draw in landscape, to scale, on at least 17 x 11 in. for projects over 500 sq. ft. or 8.5 x 11 in. for projects under 500 sq. ft. Name the designer, architect or engineer, with address and contact. State heated and unheated sq. ft. for each story and the total. Number sheets with CAD-style names (A-1.0, S-2.1). Bookmark the pages. Keep supporting documents as separate attachments. Put any professional seal in the upper two-thirds of the title block. Include all trade contractors on the application. Keep emails in HTML format so links work.",
    sourceLabel: "Mecklenburg Code Enforcement, Project Submittal Requirements",
    sourceUrl: PLAN_REVIEW,
    status: "verified",
  },
  {
    id: "A6",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    group: "application",
    projects: ["addition", "garage"],
    where: "any",
    title: "Know the re-review fee",
    what: "The county charges $145.00 per hour for projects reviewed three or more cycles in the building discipline.",
    why: "Each correction round that does not fully fix the comments moves you toward that fee.",
    how: "Answer every reviewer comment completely and recheck the redlines before you resubmit.",
    sourceLabel: "Mecklenburg Code Enforcement, Residential Plan Review",
    sourceUrl: PLAN_REVIEW,
    status: "verified",
  },
  {
    id: "A4",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-13",
    group: "application",
    projects: ALL3,
    where: "city",
    title: "City lot review (separate submittal)",
    what: "A separate City of Charlotte permit, the LDIRL, required in addition to the county building permit.",
    why: "The city lists decks, additions and garages among projects that need it, and it reviews drainage, trees and zoning. You must have city approval before the county approves your permit, though you can file both together.",
    how: "In the City’s Accela Citizen Access, register, choose Land Development, then Individual Residential Lot. Enter the parcel, scope of work and project type, pick an urban forestry review and a stormwater tier, and enter building width, depth, height, stories and square footage. Submit, then upload each document as a separate PDF and choose its document type. The 3-business-day gateway checks that the use is permitted and the forms are uploaded, not zoning compliance. If forms are missing it is denied and a new 3-day cycle starts. After the gateway you get an email to pay the fee, and the 7-business-day review starts after payment. The city estimates about 15 days in total when complete. Include the county Accela project number, if you have one, on the LDIRL application or the plan cover sheet. Charlotte Water real estate staff now also review LDIRL projects for conflicts with water easements and underground pipes, and contact you directly if they find one.",
    sourceLabel: "City of Charlotte, LDIRL Applicant Guide",
    sourceUrl: CITY_GUIDE,
    status: "verified",
  },
  {
    id: "A7",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-13",
    group: "application",
    projects: ["deck"],
    where: "city",
    title: "City documents for a deck: a Plot Plan",
    what: "A scaled plan of the lot showing the deck. The city accepts a hand-drawn plot plan if it is to scale, or a professionally prepared plan or survey.",
    why: "The city’s gateway passes a deck application when the plot plan is uploaded and the use is permitted. Missing documents get the gateway denied and restart the 3-day clock.",
    how: "Upload the Plot Plan as its own PDF with the Plot Plan document type. This applies to an attached or a detached deck.",
    sourceLabel: "City of Charlotte, LDIRL Zoning Gateway Checklist",
    sourceUrl: CITY_GATEWAY,
    status: "verified",
  },
  {
    id: "A8",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-13",
    group: "application",
    projects: ["addition"],
    where: "city",
    title: "City documents for an addition: Plot Plan and Plans with Building Elevations",
    what: "A scaled plot plan plus plans showing the building elevations.",
    why: "These are the documents the city’s gateway checks for an addition before the detailed review starts.",
    how: "Upload each as its own PDF with the matching document type. Show the building height from grade on each elevation, since the application also asks for it.",
    sourceLabel: "City of Charlotte, LDIRL Zoning Gateway Checklist and Applicant Guide",
    sourceUrl: CITY_GATEWAY,
    status: "verified",
  },
  {
    id: "A9",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-13",
    group: "application",
    projects: ["garage"],
    where: "city",
    title: "City documents for a detached garage",
    what: "One-story garage: a Plot Plan, a Building Height Form and an Accessory Structure or ADU Declaration. Two-story garage: a Site Plan, Plans with Building Elevations and the declaration.",
    why: "The gateway checks for these documents. A site plan must be professionally prepared or a survey and cannot be hand drawn.",
    how: "Choose the list that matches the number of stories and upload each document as its own PDF. A GIS Addressing form is only needed for an ADU, not for a garage. The city’s accessory structure form says the combined area of all accessory structures may not exceed the heated first-floor area of the main building, and that accessory structures 24 feet or more in height need a rear setback of at least 15 feet. The form’s table is hard to read, so check the UDO or ask the city.",
    sourceLabel: "City of Charlotte, LDIRL Zoning Gateway Checklist and Applicant Guide",
    sourceUrl: CITY_GATEWAY,
    status: "verified",
  },
  {
    id: "A10",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-13",
    group: "application",
    projects: ALL3,
    where: "city",
    title: "Choose the tree and stormwater review levels",
    what: "The city application asks you to choose an urban forestry review type and a stormwater tier.",
    why: "The tree tier depends on whether the property has protected trees, and a wrong choice can mean a rework.",
    how: "Tree Tier 1 is for projects other than a new home on a property with no code-required or protected trees and no tree save. Tier 2 applies if there are heritage trees, trees in the right-of-way or a tree save. Tier 1 needs a landscape style plan showing property lines, the building location and what is being done. For stormwater, choose Tier 1, 2 or 3. Tier 3 needs a flood study. The city page does not say which tier fits a deck, so ask the city. Stormwater services: 704-336-4456. On the city’s live application form the urban forestry review type list includes None, and Tier 1 stormwater is described as minimal or no impact to existing drainage patterns or infrastructure. These come from a public Accela record, not from the city’s guidance, so confirm which options fit your project.",
    sourceLabel: "City of Charlotte, Urban Forestry Tier 1 guide and LDIRL Applicant Guide",
    sourceUrl: CITY_UF_TIER1,
    status: "partly",
  },
  {
    id: "A11",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-13",
    group: "application",
    projects: ALL3,
    where: "city",
    title: "Keep the county plans the same as the approved city plans",
    what: "The county permit has to match the city-approved LDIRL.",
    why: "The city also reviews the county permit and disapproves it if no LDIRL exists or the plans do not match. If the approved county plans differ from the LDIRL, the city says a new LDIRL must be submitted.",
    how: "Hold design changes until both approvals are done, or resubmit to the city when a change affects the lot, height or footprint.",
    sourceLabel: "City of Charlotte, LDIRL Applicant Guide",
    sourceUrl: CITY_GUIDE,
    status: "verified",
  },
  {
    id: "A12",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-13",
    group: "application",
    projects: ALL3,
    where: "city",
    title: "Budget the city review fees",
    what: "The city’s fiscal 2027 fees (projects passing gateway July 1, 2026 to June 30, 2027): zoning $155, and stormwater $55 for additions, decks, sheds and detached structures. Urban forestry is $180 for Tier 1 or $350 for Tier 2.",
    why: "Fees are due when the application passes the gateway, and the detailed review starts after payment. If each of the three reviews applies, a deck or addition would come to about $390 with a Tier 1 tree review or $560 with Tier 2.",
    how: "Wait for the email after the gateway for the exact total. A stand-alone detached garage is not clearly listed: the $455 stormwater fee is for ADU, ADU and garage, and single-family types, while sheds and detached structures are $55. The county’s own building permit fees are separate. The application form lets an applicant choose None for the urban forestry review. The fee schedule does not say whether a tree fee applies then, so the total could be lower.",
    sourceLabel: "City of Charlotte, FY2027 Individual Residential Lot Fee Schedule",
    sourceUrl: CITY_IRL_FEES,
    status: "partly",
  },
  {
    id: "P0",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-13",
    group: "plans",
    projects: ALL3,
    where: "city",
    title: "What the city checks on the plot or site plan",
    what: "The city’s checklists list what the plan must show: address and parcel number, property lines with the street right-of-way dimensioned, existing easements and structures, property area, the proposed construction with dimensions, and any proposed land disturbance.",
    why: "Stormwater and zoning reviewers work from these. For zoning they also check setbacks, building coverage, maximum height shown on the elevations, and the location of HVAC or mechanical equipment.",
    how: "Show the required setbacks and the distances, label the maximum height, and mark equipment locations. Stormwater says buildings, additions and accessory structures may not be within 7.5 feet of the centerline of a pipe carrying public street runoff, or 10 feet of the centerline of a ditch or swale carrying it. Impervious area and floodplain items apply on some lots. The city’s checklists do not mention decks or garages specifically. The city’s zoning supplement also asks for the building height from grade on the front, right and left elevations (or an average-grade calculation), and the proposed impervious or built-upon area. Attached decks, porches and garages must be shown on the plot plan.",
    sourceLabel: "City of Charlotte, Stormwater LDIRL Plan Checklist and Zoning Detailed Review Checklist",
    sourceUrl: CITY_STORMWATER,
    status: "partly",
  },
  {
    id: "P1",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    group: "plans",
    projects: ALL3,
    where: "any",
    title: "Site plan",
    what: "A drawing of the lot showing property lines, existing buildings, and where the new work goes, with distances to each property line.",
    why: "Reviewers use it to check where the project sits on the lot and whether it fits zoning setbacks.",
    how: "Draw it to scale from the survey or plat, mark the new work, and label every distance to the property lines. " + TYPICAL_NOTE,
    sourceLabel: "Typical plan contents",
    sourceUrl: PLAN_REVIEW,
    status: "unverified",
  },
  {
    id: "P2",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    group: "plans",
    projects: ALL3,
    where: "any",
    title: "Plan view with dimensions",
    what: "A drawing from above showing the size and shape of the new work. For a deck, the size and height above the ground. For an addition or garage, a floor plan with labeled spaces.",
    why: "It shows reviewers exactly what is being built so they can check every other detail against it.",
    how: "Dimension every side and label each space or feature. Make sure the numbers match the site plan. " + TYPICAL_NOTE,
    sourceLabel: "Typical plan contents",
    sourceUrl: PLAN_REVIEW,
    status: "unverified",
  },
  {
    id: "P3",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    group: "plans",
    projects: ALL3,
    where: "any",
    title: "Footing and foundation details",
    what: "Footing sizes and depths for a deck, or the foundation plan and footing details for an addition or garage.",
    why: "The structure’s weight has to reach stable ground, and reviewers check that the footings can carry it.",
    how: "Show footing size, depth, and spacing on the plan, with a detail drawing. " + TYPICAL_NOTE,
    sourceLabel: "Typical plan contents",
    sourceUrl: PLAN_REVIEW,
    status: "unverified",
  },
  {
    id: "P4",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    group: "plans",
    projects: ALL3,
    where: "any",
    title: "Framing details",
    what: "For a deck, joist, beam, and post sizes with spans, and how it attaches to the house if it is attached. For an addition or garage, floor, wall, and roof framing.",
    why: "Reviewers check that every member is sized to carry its load, and that the connection to the house is detailed.",
    how: "Label every member with size, spacing, and span, and draw the attachment detail. " + TYPICAL_NOTE,
    sourceLabel: "Typical plan contents",
    sourceUrl: PLAN_REVIEW,
    status: "unverified",
  },
  {
    id: "P5",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    group: "plans",
    projects: ["deck"],
    where: "any",
    title: "Guards, stairs, and railings",
    what: "Details for the railing height and strength, and for stairs if the deck has them.",
    why: "These are safety features, and reviewers check them because people fall from decks.",
    how: "Draw a railing detail and a stair section with dimensions. " + TYPICAL_NOTE,
    sourceLabel: "Typical plan contents",
    sourceUrl: PLAN_REVIEW,
    status: "unverified",
  },
  {
    id: "P6",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    group: "plans",
    projects: ["addition", "garage"],
    where: "any",
    title: "Elevations and a building section",
    what: "Side views of the finished work and a cut-through showing the heights and layers.",
    why: "Reviewers use them to check heights, roof pitch, and how the new work meets the existing building.",
    how: "Draw each side with heights labeled, plus one section through the main structure. " + TYPICAL_NOTE,
    sourceLabel: "Typical plan contents",
    sourceUrl: PLAN_REVIEW,
    status: "unverified",
  },
  {
    id: "P7",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    group: "plans",
    projects: ["addition", "garage"],
    where: "any",
    title: "Window, door, and header details",
    what: "A schedule of windows and doors, plus header sizes over openings such as a garage door.",
    why: "Openings interrupt the wall, and the header carries the load above them.",
    how: "List each opening with size and type and show the header size on the framing plan. " + TYPICAL_NOTE,
    sourceLabel: "Typical plan contents",
    sourceUrl: PLAN_REVIEW,
    status: "unverified",
  },
  {
    id: "P8",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    group: "plans",
    projects: ["addition"],
    where: "any",
    title: "Energy code compliance documents",
    what: "Documentation that heated and cooled space meets the state energy code.",
    why: "Additions that add conditioned space have to meet the energy requirements.",
    how: "Ask the county which form or report it accepts and attach it. " + TYPICAL_NOTE,
    sourceLabel: "Typical plan contents",
    sourceUrl: PLAN_REVIEW,
    status: "unverified",
  },
  {
    id: "P9",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    group: "plans",
    projects: ALL3,
    where: "any",
    title: "Engineer’s letter or calculations, if needed",
    what: "A sealed letter or calculations when the design goes beyond standard details, such as a long beam span.",
    why: "Standard details only cover standard cases. Anything else needs an engineer to confirm it works.",
    how: "Ask the county whether your design needs sealed drawings, and get the engineer involved early. " + TYPICAL_NOTE,
    sourceLabel: "Typical plan contents",
    sourceUrl: PLAN_REVIEW,
    status: "unverified",
  },
];

export function itemsFor(
  project: ProjectType,
  location: Location,
  jurisdiction: JurisdictionId = DEFAULT_JURISDICTION
): ChecklistItem[] {
  return CHECKLIST.filter(
    (item) =>
      item.jurisdiction === jurisdiction &&
      item.projects.includes(project) &&
      (item.where === "any" || location === "city")
  );
}
