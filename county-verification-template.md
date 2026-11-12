# Permivo jurisdiction verification template

Use this once per county or city. The goal is a set of rules in `data/rules.ts` and `data/checklist.ts`, each with a source, a status and a `checkedOn` date. Mecklenburg County is the worked example.

## Rules for the work

- A rule is **verified** only if an official county or city page, or a written reply from the agency, supports it. Save the page URL or the email.
- Third-party guides (permit services, blogs, AI answers) are leads. Never mark a rule verified from them.
- Missing information stays **not confirmed**. Do not fill gaps with typical practice.
- Record the date checked. Re-check every 6 months or when the agency announces changes.
- Keep names, addresses and personal data out of the repository.

## Step 1. Find who issues permits

| Question | Answer | Source |
| --- | --- | --- |
| Is the building permit issued by the county, the city or town, or both? | | |
| Who handles zoning, and is it a separate office? | | |
| Is there a stormwater, tree or other review, and who runs it? | | |
| Are the systems separate (separate logins and applications)? | | |
| Office phone, email and hours | | |

## Step 2. Per project type (deck, addition, garage, trade work)

Answer each for all four types.

| Question | Deck | Addition | Garage | Trade work |
| --- | --- | --- | --- | --- |
| Is a permit required? Any dollar exemption? | | | | |
| Does it go through plan review, and what triggers it (size, stories, living space)? | | | | |
| If it skips plan review, how is it submitted? | | | | |
| Is a zoning or lot review required? | | | | |
| Is an engineer or architect seal ever required? | | | | |
| Which inspections apply? | | | | |

## Step 3. Process and timing

| Question | Answer | Source |
| --- | --- | --- |
| How is the application submitted (online system name)? | | |
| What must be uploaded, and in what format (file type, size, sheet size)? | | |
| Is the submittal checked for completeness before review starts? | | |
| Stated review time, and when the clock starts (application or acceptance) | | |
| Do reviews run at the same time or one after another? | | |
| Number of review rounds before extra fees | | |
| Fee amounts and where the fee schedule is published | | |

## Step 4. Contents of a complete submittal

List what the agency says drawings must show for each project type. Prefer the agency's own checklist. If it publishes none, ask. Items taken from general practice stay **not confirmed**.

## Step 5. Questions to ask when the website does not answer

1. Does a stand-alone deck need a permit and inspections if it does not need plan review?
2. Does a non-standard span or design need a sealed letter?
3. Which projects need the city or town zoning review?
4. Is the stated review time measured from application or from acceptance?
5. Is there a published list of what drawings must show, or a list of common reasons for corrections?

## Step 6. Enter it in the repository

1. Add the place to `JURISDICTIONS` in `data/rules.ts` and to the `JurisdictionId` type.
2. Add rules with `jurisdiction`, `status`, `sourceUrl` and `checkedOn`.
3. Add checklist items the same way.
4. Set `coverage` to `"verified"` only when Steps 1 to 3 are answered with sources. Otherwise use `"directory"`.

## Done checklist

- [ ] Every rule has a source URL or a saved email
- [ ] No rule is verified from a third-party source
- [ ] Open questions are listed as not confirmed
- [ ] `checkedOn` is set
- [ ] Phone and email of the office are listed
