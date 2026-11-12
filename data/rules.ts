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
    checkedOn: "2026-11-12",
    kind: "step",
    projects: ["deck"],
    where: "city",
    title: "City lot review (drainage, trees, zoning)",
    statedTime: CITY_TIMES,
    sourceLabel: "City of Charlotte, Individual Residential Lot Reviews",
    sourceUrl: CITY_PAGE,
    status: "partly",
    note: "Times are on the city’s page. Whether decks are covered is not confirmed.",
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
    checkedOn: "2026-11-12",
    kind: "step",
    projects: ["addition"],
    where: "city",
    title: "City lot review (drainage, trees, zoning)",
    statedTime: CITY_TIMES,
    sourceLabel: "City of Charlotte page; REBIC 2023 post",
    sourceUrl: CITY_PAGE,
    status: "likely",
    note: "Additions that expand the footprint were named when these reviews were introduced. Confirm with the city.",
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
    checkedOn: "2026-11-12",
    kind: "step",
    projects: ["garage"],
    where: "city",
    title: "City lot review (drainage, trees, zoning)",
    statedTime: CITY_TIMES,
    sourceLabel: "REBIC 2023 post",
    sourceUrl: REBIC_2023,
    status: "likely",
    note: "Detached garages were named when these reviews were introduced. Confirm with the city.",
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
    checkedOn: "2026-11-12",
    kind: "step",
    projects: ["deck", "addition", "garage", "trade"],
    where: "city",
    title: "City zoning review runs alongside county plan review",
    statedTime: "Concurrent",
    sourceLabel: "CIRC email, Nov 2026; REBIC 2023 post",
    sourceUrl: CITY_PAGE,
    status: "verified",
    note: "The county confirmed zoning review is concurrent. A 2023 announcement said stormwater and tree reviews are too. Holds can still delay county permits (REBIC, May 2026).",
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
