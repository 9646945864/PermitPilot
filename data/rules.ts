// Permivo rules data.
// Every rule links to a source and carries a verification status.
// Only mark a rule "verified" when an official county or city page, or a written
// agency reply, supports it. Third-party guides are leads, not sources.
// Keep real addresses and personal data out of this public repository.
// Last updated: November 2026, after the reply from Mecklenburg County CIRC.

export type ProjectType = "deck" | "addition" | "garage" | "trade";
export type Location = "city" | "outside";
export type Status = "verified" | "partly" | "likely" | "unverified";
export type JurisdictionId = "mecklenburg"; // add an id here when a new place is added

export interface Jurisdiction {
  id: JurisdictionId;
  name: string;
  // "verified" = rules checked against official sources with dates.
  // "directory" = only the office and how to reach it, no verified rules yet.
  coverage: "verified" | "directory";
  officeLabel: string;
  officeUrl: string;
  officePhone?: string;
  note: string;
}

export const JURISDICTIONS: Record<JurisdictionId, Jurisdiction> = {
  mecklenburg: {
    id: "mecklenburg",
    name: "Mecklenburg County, NC",
    coverage: "verified",
    officeLabel: "Mecklenburg County Code Enforcement",
    officeUrl: "https://code.mecknc.gov",
    officePhone: "980-314-2633",
    note: "Includes the City of Charlotte lot review for projects inside city limits.",
  },
};

export const DEFAULT_JURISDICTION: JurisdictionId = "mecklenburg";

export interface Rule {
  id: string;
  jurisdiction: JurisdictionId;
  checkedOn: string; // YYYY-MM-DD, the last day this rule was checked against its source
  kind: "step" | "question"; // "question" = an open item that needs an agency answer
  projects: ProjectType[];
  where: "city" | "county"; // "city" = only inside Charlotte city limits; "county" = whole county
  title: string;
  statedTime: string;
  sourceLabel: string;
  sourceUrl: string;
  status: Status;
  note: string;
}

export const PROJECT_LABELS: Record<ProjectType, string> = {
  deck: "Deck",
  addition: "Room addition",
  garage: "Detached garage",
  trade: "Trade work (electrical, plumbing, HVAC)",
};

export const STATUS_LABELS: Record<Status, string> = {
  verified: "Verified",
  partly: "Partly verified",
  likely: "Likely, confirm",
  unverified: "Not confirmed",
};

const CITY_ZONING_PERMITTING =
  "https://charlottenc.gov/planning/ZoningAdministration/Pages/Zoning%20Permitting.aspx";
const CITY_GUIDE =
  "https://www.charlottenc.gov/files/sharedassets/city/v/1/growth-and-development/getting-started/documents/zoning/applicant-guide-ldirl.pdf";
const CITY_PAGE =
  "https://www.charlottenc.gov/Growth-and-Development/Getting-Started-on-Your-Project/Individual-Residential-Lot-Reviews";
const COUNTY_PLAN_REVIEW = "https://code.mecknc.gov/service/residential-plan-review-services";
const COUNTY_PERMITTING = "https://code.mecknc.gov/permitting";
const COUNTY_ACA = "https://code.mecknc.gov/customer-tools/aca";
const COUNTY_RPR = "https://code.mecknc.gov/plan-review/residential";
const COUNTY_SITE = "https://code.mecknc.gov";
const REBIC_2023 = "https://rebic.com/two-for-tuesday-may-2-2023";

const CITY_TIMES =
  "3 business days for the gateway check, 7 for review, 7 per follow-up review";
const COUNTY_AVG = "Typically averages about 3 weeks, first come first served";

export const RULES: Rule[] = [
  {
    id: "R1",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-13",
    kind: "step",
    projects: ["deck"],
    where: "city",
    title: "City lot review (drainage, trees, zoning)",
    statedTime: CITY_TIMES,
    sourceLabel: "City of Charlotte, Zoning: Permitting (list of projects needing the city LDIRL); Individual Residential Lot Reviews (times)",
    sourceUrl: CITY_ZONING_PERMITTING,
    status: "verified",
    note: "The city lists Deck among the projects that need the city LDIRL permit in addition to the county building permit, with no size or height threshold. For a deck, attached or detached, the city asks for a Plot Plan. The plot plan must be to scale, and it may be hand drawn.",
  },
  {
    id: "R2",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    kind: "step",
    projects: ["deck"],
    where: "county",
    title: "County building permit",
    statedTime: COUNTY_AVG + " (if plan review applies)",
    sourceLabel: "Mecklenburg Code Enforcement, residential plan review; CIRC email, Nov 2026",
    sourceUrl: COUNTY_PLAN_REVIEW,
    status: "partly",
    note: "The 3-week average is from the county’s written reply. Whether a deck goes through plan review is not confirmed.",
  },
  {
    id: "R3",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    kind: "step",
    projects: ["deck"],
    where: "county",
    title: "County plan review: a stand-alone deck is not on the county’s list",
    statedTime: "Not applicable if plan review is not required",
    sourceLabel: "Mecklenburg Code Enforcement, Residential Plan Review",
    sourceUrl: COUNTY_RPR,
    status: "partly",
    note: "The county’s plan review list excludes decks and screen porches from its enclosed-addition trigger and does not name decks otherwise. That is not a statement that decks need no permit or inspection. Converting a deck into an enclosed room does trigger plan review. Confirm with the county.",
  },
  {
    id: "R4",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    kind: "step",
    projects: ["deck", "addition", "garage", "trade"],
    where: "county",
    title: "Permit exemption: work costing $40,000 or less may not need a permit",
    statedTime: "Not a review step. A dollar threshold.",
    sourceLabel: "Mecklenburg Code Enforcement, Permitting page",
    sourceUrl: COUNTY_PERMITTING,
    status: "verified",
    note: "Does not apply if the work adds or changes load-bearing structures, plumbing, heating or air conditioning, or electrical systems, uses materials not permitted by code, or adds roofing. A deck is likely load-bearing, so expect a permit. Confirm for your project.",
  },
  {
    id: "R5",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-13",
    kind: "step",
    projects: ["addition"],
    where: "city",
    title: "City lot review (drainage, trees, zoning)",
    statedTime: CITY_TIMES,
    sourceLabel: "City of Charlotte, Zoning: Permitting; Individual Residential Lot Reviews",
    sourceUrl: CITY_ZONING_PERMITTING,
    status: "verified",
    note: "The city lists Addition among the projects that need the city LDIRL permit in addition to the county building permit, with no minimum size. The city asks for a Plot Plan and Plans with Building Elevations.",
  },
  {
    id: "R6",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    kind: "step",
    projects: ["addition"],
    where: "county",
    title: "County plan review",
    statedTime: COUNTY_AVG,
    sourceLabel: "Mecklenburg Residential Plan Review; CIRC email, Nov 2026",
    sourceUrl: COUNTY_RPR,
    status: "verified",
    note: "Plan review applies to an enclosed addition that adds 100 sq. ft. or more to the footprint, and to an added story. Smaller additions: confirm with the county. The county’s page states a goal of 7 days on average after acceptance, which differs from the 3-week average CIRC reported. The 3 weeks is an average, not a guarantee.",
  },
  {
    id: "R7",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-13",
    kind: "step",
    projects: ["garage"],
    where: "city",
    title: "City lot review (drainage, trees, zoning)",
    statedTime: CITY_TIMES,
    sourceLabel: "City of Charlotte, Zoning: Permitting; Individual Residential Lot Reviews",
    sourceUrl: CITY_ZONING_PERMITTING,
    status: "verified",
    note: "The city lists Garage, and detached accessory structures over 12 feet in any dimension, among the projects that need the LDIRL. A one-story garage needs a Plot Plan, a Building Height Form and an Accessory Structure or ADU Declaration. A two-story garage needs a Site Plan (not hand drawn), Plans with Building Elevations and the declaration.",
  },
  {
    id: "R8",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    kind: "step",
    projects: ["trade"],
    where: "county",
    title: "County trade permits (electrical, plumbing, HVAC)",
    statedTime: "Quick online for simple equipment changes (per county)",
    sourceLabel: "Mecklenburg Code Enforcement site",
    sourceUrl: COUNTY_SITE,
    status: "partly",
    note: "The county says separate permits are required for building, electrical, heating and air conditioning, and plumbing work. Details and exceptions are not confirmed.",
  },
  {
    id: "R9",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-13",
    kind: "step",
    projects: ["deck", "addition", "garage"],
    where: "city",
    title: "City LDIRL must be approved before the county approves; both can be filed together",
    statedTime: "City review about 15 days if complete (3 business-day gateway, 7 business-day review)",
    sourceLabel: "City of Charlotte, LDIRL Applicant Guide",
    sourceUrl: CITY_GUIDE,
    status: "verified",
    note: "The city says the city and county applications are independent and can be submitted together, but you must receive city approval before county approval. The city also reviews the county permit and disapproves it if there is no LDIRL or the county plans do not match. After approval the city releases its holds on the county permit, so city delays can hold up the county permit (REBIC, May 2026). The city’s Development Center page adds that the LDIRL must be approved before the city releases its hold in the county system, and that the county then does a cursory check that the plans match the approved LDIRL.",
  },
  {
    id: "R10",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    kind: "step",
    projects: ["garage"],
    where: "county",
    title: "County building permit (plan review only for multi-story garages or garages with living space)",
    statedTime: COUNTY_AVG + " (if plan review applies)",
    sourceLabel: "Mecklenburg Residential Plan Review",
    sourceUrl: COUNTY_RPR,
    status: "verified",
    note: "The county lists new multi-story detached garages and any garage with living space for plan review. A one-story detached garage with no living space is not on the list. It still needs a permit. Confirm with the county.",
  },
  {
    id: "R11",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    kind: "step",
    projects: ["addition", "garage"],
    where: "county",
    title: "Submittal is checked for completeness before review starts",
    statedTime: "Review goal of 7 days on average after acceptance (one- and two-family)",
    sourceLabel: "Mecklenburg Residential Plan Review",
    sourceUrl: COUNTY_RPR,
    status: "verified",
    note: "Plans are checked against the submittal requirements before acceptance. If information is missing, the county emails what is needed. The review clock starts at acceptance, so time before acceptance is not in the stated time.",
  },
  {
    id: "R12",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-12",
    kind: "step",
    projects: ["addition", "garage"],
    where: "county",
    title: "Re-review fee after three building review cycles",
    statedTime: "$145 per hour",
    sourceLabel: "Mecklenburg Residential Plan Review",
    sourceUrl: COUNTY_RPR,
    status: "verified",
    note: "The county says projects reviewed three or more cycles in the building discipline incur an hourly review fee of $145. Check the fee ordinance for details.",
  },
  {
    id: "R13",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-13",
    kind: "step",
    projects: ["deck", "addition", "garage"],
    where: "city",
    title: "County plans must match the approved city LDIRL",
    statedTime: "Not a review step",
    sourceLabel: "City of Charlotte, LDIRL Applicant Guide",
    sourceUrl: CITY_GUIDE,
    status: "verified",
    note: "If the approved county plans differ from the LDIRL, the city says a new LDIRL must be submitted. A change made during county review can therefore send you back through the city review.",
  },
  {
    id: "R14",
    jurisdiction: "mecklenburg",
    checkedOn: "2026-11-13",
    kind: "step",
    projects: ["deck", "addition", "garage"],
    where: "city",
    title: "City lot review fees (fiscal 2027)",
    statedTime: "Due when the application passes the gateway",
    sourceLabel: "City of Charlotte, FY2027 Individual Residential Lot Fee Schedule",
    sourceUrl: "https://www.charlottenc.gov/files/sharedassets/city/v/1/growth-and-development/documents/dev-center-fees/fee-schedules/irl-fee-schedule.pdf",
    status: "verified",
    note: "Zoning $155. Stormwater $55 for additions, decks, sheds and detached structures. Urban forestry $180 (Tier 1) or $350 (Tier 2). A stand-alone detached garage is not clearly listed. The fee schedule is for projects passing gateway July 1, 2026 to June 30, 2027.",
  },
];

export function rulesFor(
  project: ProjectType,
  location: Location,
  jurisdiction: JurisdictionId = DEFAULT_JURISDICTION
): Rule[] {
  return RULES.filter(
    (r) =>
      r.jurisdiction === jurisdiction &&
      r.projects.includes(project) &&
      (r.where === "county" || location === "city")
  );
}
