# Permivo

An AI permitting assistant for small residential contractors in Mecklenburg County, NC.

**Status:** early prototype. Permit rules in this project are draft until marked verified. Always confirm requirements with Mecklenburg County Code Enforcement and the City of Charlotte before relying on anything here. This is not legal advice.

## The problem

Small contractors building decks, additions, and garages in Charlotte often deal with two agencies that do not share status: county plan review and, inside city limits, a separate city lot review (drainage, trees, zoning) introduced in 2023. Requirements are scattered across sites, third-party guides disagree with each other, and reviewer comments are hard to act on. Industry groups report long delays. Official stated review times are much shorter, and the gap has not been measured.

## Who it is for

Small residential contractors with no dedicated permitting staff. First customer area: Mecklenburg County.

## Version 1

1. **Route planner.** Choose a project type and whether it is inside Charlotte city limits. See which reviews apply, in what order, with stated timeframes and source links.
2. **Learn as you build.** Each requirement explained in three parts: what it is, why it exists, how to complete it.
3. **Correction explainer and tracker.** Paste a reviewer comment to get a plain explanation and a resubmission checklist. Log real dates for each step to compare stated versus actual time.

## Principles

- Every rule links to an official source and shows whether it is verified.
- When the answer is uncertain, say so and point to the agency.
- A person approves anything consequential.
- Test against real permits before trusting any output.
- No personal data or real addresses in this repository.

## Rules data

All permit rules live in one data file, separate from the screens. Each rule records: project type, location (city or county only), reviews that apply, order, stated timeframe, documents needed, source link, and verified (yes or no).

## Open questions

- Current dollar threshold below which residential work needs no permit ($15,000 or $40,000 in conflicting guides).
- Which small projects, such as decks, need a city lot review.
- Whether county review waits for city approval or can run at the same time.
- Current residential plan review times.

## Roadmap

1. Verified rules for decks, additions, and garages in Mecklenburg County.
2. Route planner, then tracker and comparison view.
3. Correction explainer, tested on real reviewer comments.
4. Pilot with three to five contractors.
5. Later: more jurisdictions, and tools for permitting departments.

## Tech

Next.js, TypeScript, Tailwind CSS.
