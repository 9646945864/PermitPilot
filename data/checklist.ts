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
    checkedOn: "2026-11-12",
    group: "application",
    projects: ALL3,
    where: "city",
    title: "City lot review (separate submittal)",
    what: "A separate application to the City of Charlotte covering drainage, trees, and zoning.",
    why: "Since June 2023 the city reviews these for individual residential lot projects. The county says its own plan review runs alongside the city’s zoning review.",
    how: "Submit through the City’s Accela Citizen Access and pay the review fee. Check the city’s Residential Permitting Guidelines graphic to see whether your project is covered. Whether decks are covered is not confirmed.",
    sourceLabel: "City of Charlotte, Individual Residential Lot Reviews",
    sourceUrl: CITY_PAGE,
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
