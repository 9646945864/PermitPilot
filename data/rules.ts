// Permivo rules data.
// Every rule links to a source and carries a verification status.
// Only mark a rule "verified" when an official county or city page, or a written
// agency reply, supports it. Third-party guides are leads, not sources.
// Keep real addresses and personal data out of this public repository.

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
const COUNTY_SITE = "https://code.mecknc.gov";
const REBIC_2023 = "https://rebic.com/?p=2991";

const CITY_TIMES =
  "3 business days for the gateway check, 7 for review, 7 per follow-up review";

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
    statedTime: "Not published; varies with volume",
    sourceLabel: "Mecklenburg Code Enforcement, residential plan review",
    sourceUrl: COUNTY_PLAN_REVIEW,
    status: "partly",
    note: "The county says timeframes vary with volume. No fixed time found.",
  },
  {
    id: "R3",
    kind: "question",
    projects: ["deck"],
    where: "county",
    title: "Is county plan review required for a deck?",
    statedTime: "Unknown",
    sourceLabel: "Ask Mecklenburg Code Enforcement",
    sourceUrl: COUNTY_SITE,
    status: "unverified",
    note: "Not confirmed.",
  },
  {
    id: "R4",
    kind: "question",
    projects: ["deck"],
    where: "county",
    title: "What is the dollar threshold below which no permit is needed?",
    statedTime: "Unknown. Third-party guides say $15,000 or $40,000.",
    sourceLabel: "Ask Mecklenburg Code Enforcement",
    sourceUrl: COUNTY_SITE,
    status: "unverified",
    note: "Two third-party guides conflict. Ask the county.",
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
    statedTime: "Not published",
    sourceLabel: "Mecklenburg Code Enforcement, residential plan review",
    sourceUrl: COUNTY_PLAN_REVIEW,
    status: "likely",
    note: "Confirm with the county.",
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
    note: "The county describes an easy online process. Details and exceptions are not confirmed.",
  },
  {
    id: "R9",
    kind: "question",
    projects: ["deck", "addition", "garage", "trade"],
    where: "city",
    title: "Can county review run at the same time as the city lot review?",
    statedTime: "Unknown",
    sourceLabel: "City of Charlotte page",
    sourceUrl: CITY_PAGE,
    status: "partly",
    note: "The city says the lot review can be submitted before or alongside county review. A third-party guide says the county waits. Confirm with both.",
  },
];

export function rulesFor(project: ProjectType, location: Location): Rule[] {
  return RULES.filter(
    (r) =>
      r.projects.includes(project) &&
      (r.where === "county" || location === "city")
  );
}
