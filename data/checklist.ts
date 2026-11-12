// Permivo readiness checklist data.
// Each item explains what it is, why it matters, and how to do it, and carries a source and status.
// Mark an item "verified" only when an official county or city page, or a written agency reply, supports it.
// Items marked "unverified" are typical plan contents. Replace them with the county’s own
// Project Submittal Requirements list once you have it.

import type { Location, ProjectType, Status } from "./rules";

export type ChecklistGroup = "before" | "application" | "plans";

export const GROUP_LABELS: Record<ChecklistGroup, string> = {
  before: "Before you start",
  application: "Application and forms",
  plans: "Plans and details",
};

export const GROUP_ORDER: ChecklistGroup[] = ["before", "application", "plans"];

export interface ChecklistItem {
  id: string;
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
const TYPICAL_NOTE = "Typical item, not confirmed for Mecklenburg. Check the county’s Project Submittal Requirements.";

const ALL3: ProjectType[] = ["deck", "addition", "garage"];

export const CHECKLIST: ChecklistItem[] = [
  {
    id: "B1",
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
    group: "before",
    projects: ALL3,
    where: "any",
    title: "Confirm whether your project goes through plan review",
    what: "The county says plan review applies to new construction, remodels, additions, and accessory buildings and structures. Decks are not named.",
    why: "Plan review changes what you must submit and how long it takes.",
    how: "Call the county’s Plan Review Facilitator Line, 980-314-2633, option 2-1-1-2, and describe your project in one sentence. Write down the answer and the date.",
    sourceLabel: "Mecklenburg Code Enforcement, Residential Plan Review",
    sourceUrl: PLAN_REVIEW,
    status: "partly",
  },
  {
    id: "B3",
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
    group: "application",
    projects: ALL3,
    where: "any",
    title: "Online permit application",
    what: "The application you file in the county’s online permit system.",
    why: "It opens the record that your plans, forms, and review all attach to.",
    how: "Submit the application online. When plan review applies, choose the RTAC Plan Review Path option on the plan option screen.",
    sourceLabel: "Mecklenburg Code Enforcement, Residential Plan Review",
    sourceUrl: PLAN_REVIEW,
    status: "verified",
  },
  {
    id: "A2",
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
    group: "application",
    projects: ALL3,
    where: "any",
    title: "Project plans as PDF files",
    what: "Your drawings, uploaded with the application.",
    why: "The county checks that a submittal has enough information for a code review before it accepts the plans, and its review-time goal starts at acceptance.",
    how: "Upload clear PDF drawings. The county states a 150-page, 40 MB limit for master plans. Ask what applies to your project type.",
    sourceLabel: "Mecklenburg Code Enforcement, Residential Plan Review and Master Plan pages",
    sourceUrl: PLAN_REVIEW,
    status: "partly",
  },
  {
    id: "A4",
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

export function itemsFor(project: ProjectType, location: Location): ChecklistItem[] {
  return CHECKLIST.filter(
    (item) => item.projects.includes(project) && (item.where === "any" || location === "city")
  );
}
