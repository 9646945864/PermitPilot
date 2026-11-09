// Permivo rules data.
// Every rule links to a source and carries a verification status.
// Only mark a rule "verified" when an official county or city page, or a written
// agency reply, supports it. Third-party guides are leads, not sources.
// Keep real addresses and personal data out of this public repository.
// Last updated: November 2026, after the reply from Mecklenburg County CIRC.

export type ProjectType = "deck" | "addition" | "garage" | "trade";
export type Location = "city" | "outside";
export type Status = "verified" | "partly" | "likely" | "unverified";

export interface Rule {
  id: string;
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
const COUNTY_SITE = "https://code.mecknc.gov";
const REBIC_2023 = "https://rebic.com/two-for-tuesday-may-2-2023";

const CITY_TIMES =
  "3 business days for the gateway check, 7 for review, 7 per follow-up review";
const COUNTY_AVG = "Typically averages about 3 weeks, first come first served";

export const RULES: Rule[] = [
  {
    id: "R1",
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
    kind: "question",
    projects: ["deck"],
    where: "county",
    title: "Does a deck go through county plan review?",
    statedTime: "Unknown",
    sourceLabel: "Ask the county’s residential code line (980-314-2633, follow the prompts)",
    sourceUrl: COUNTY_PERMITTING,
    status: "unverified",
    note: "The county’s Permitting page says residential new construction and additions require plan review. Decks are not named.",
  },
  {
    id: "R4",
    kind: "question",
    projects: ["deck"],
    where: "county",
    title: "What is the dollar threshold below which no permit is needed?",
    statedTime: "Unknown. Third-party guides say $15,000 or $40,000.",
    sourceLabel: "Ask the county’s residential code line (980-314-2633, follow the prompts)",
    sourceUrl: COUNTY_SITE,
    status: "unverified",
    note: "The county did not state a figure. A county bulletin of unclear date lists decks among load-bearing structures that need a permit. Confirm.",
  },
  {
    id: "R5",
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
    kind: "step",
    projects: ["addition"],
    where: "county",
    title: "County plan review",
    statedTime: COUNTY_AVG,
    sourceLabel: "Mecklenburg Permitting page; CIRC email, Nov 2026",
    sourceUrl: COUNTY_PERMITTING,
    status: "verified",
    note: "The county says residential additions require plan review. The 3-week figure is an average, not a guarantee.",
  },
  {
    id: "R7",
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
    kind: "step",
    projects: ["garage"],
    where: "county",
    title: "County building permit",
    statedTime: COUNTY_AVG + " (if plan review applies)",
    sourceLabel: "Mecklenburg Accela page; CIRC email, Nov 2026",
    sourceUrl: COUNTY_ACA,
    status: "partly",
    note: "Garages are listed among residential projects submitted in the county’s Accela system. Whether plan review applies is not confirmed.",
  },
];

export function rulesFor(project: ProjectType, location: Location): Rule[] {
  return RULES.filter(
    (r) =>
      r.projects.includes(project) &&
      (r.where === "county" || location === "city")
  );
}
