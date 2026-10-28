---
name: release
description: Cut a new release of the CSN Interop specification (bump version, finalize CHANGELOG, tag, publish to NPM + GitHub). Use when the user wants to release version X.Y.Z, prepare a release/vX.Y.Z branch, or asks how releases are done in this repo. Encodes the repo's release ritual so the published docs never advertise unreleased features.
---

# Release the CSN Interop specification

This is the recipe for cutting a versioned release of this repo. A release
bumps `package.json` to `X.Y.Z`, finalizes the `CHANGELOG.md` section for that
version, merges via a dedicated `release/vX.Y.Z` PR into `main`, tags the merge
commit `vX.Y.Z`, and then publishes to NPM + GitHub via a manual workflow.

## The golden rule

**Never merge a contract-changing PR (new/changed annotations, schema changes)
to `main` without creating a new release immediately after.** The documentation site
is built from `main`, so an unreleased contract change means the published docs
advertise features that are not available in any release. Batch contract changes
behind a milestone and release them together.

## When to use

- The user asks to release `X.Y.Z`, or to prepare/finish a `release/vX.Y.Z` branch.
- A milestone's PRs have all merged and the version needs to go out.

Not for: adding an annotation (that's the `add-annotation` skill) or day-to-day
spec edits.

## Versioning

Semantic Versioning **including the patch level** in the spec version — the
CHANGELOG header says so. Pick the bump by consumer impact:

- **MAJOR** (`2.0.0`): a breaking contract change consumers must react to.
- **MINOR** (`1.3.0`): new backward-compatible annotations / schema additions.
- **PATCH** (`1.2.6`): backward-compatible fixes and clarifications.

`package.json` `version` and the `CHANGELOG.md` `## [X.Y.Z]` header must match,
and there must be a matching pushed git tag `vX.Y.Z`. (Historical gap to avoid:
`[1.2.2]` shipped in the CHANGELOG but was never tagged — don't repeat that.)

## Plan the release (milestone)

1. Create a GitHub **milestone** `X.Y.Z` and assign every PR that belongs in it.
2. Order the PRs sensibly (foundational/convention PRs before the annotation PRs
   that rely on them) so each merges cleanly on top of the last.
3. Bring every milestone PR up to date with `main` (merge `main` in — this repo
   favors non-destructive merges over force-push on shared PR branches) and make
   sure each is green (`Build`, `pr-preview`, CLA) and reviewed.

## Merge the milestone PRs

Merge all milestone PRs to `main` (each needs an approving review — branch
protection blocks self-merge). Do **not** fold the version bump into a feature
PR — v1.2.5 did that (#181) and it violates the golden rule. The version bump
belongs in its own release PR, below.

## Cut the release branch

From up-to-date `main`:

```bash
git fetch origin
git branch release/vX.Y.Z origin/main
git push -u origin release/vX.Y.Z
```

The `release/vX.Y.Z → main` PR is the model used by the last clean releases
(#151 for 1.2.3, #163 for 1.2.4). Tags end up on `main`.

## Check dependencies

A release is the moment to do a final dependency pass. Check what is outdated and
whether anything shipped is vulnerable:

```bash
npm outdated                 # direct deps behind their allowed latest
npm audit                    # all findings (includes the dev docs-site toolchain)
npm audit --omit=dev         # findings that actually affect the published package
```

Interpret before acting:

- **`npm audit --omit=dev` is the one that matters for consumers.** This repo has
  no runtime `dependencies` — everything is `devDependencies`, and most audit
  findings are transitive under `@docusaurus/core` (the docs site: `webpack-dev-server`,
  `ws`, …) which never ships in the NPM artifact. A dev-only finding is not a
  release blocker.
- `npm audit fix` (non-breaking) is safe to apply; `--force` is a major-version
  bump of a toolchain (e.g. Docusaurus) and is **not** an in-release change.

**Then ask the user whether to bundle the updates into this release or do them
separately** — this is a decision for them, not a default:

- **Recommend a separate follow-up PR** when the update requires further changes:
  a major-version bump, a breaking toolchain migration, anything needing its own
  smoke-test, or a batch of dev-dep bumps. Coupling that into the release PR is
  exactly the kind of risk the golden rule warns against, and per the changelog
  curation policy dev-tooling bumps get no changelog entry anyway.
- **Bundling into the release is fine** only for a trivial, non-breaking security
  fix on a shipped (non-dev) dependency that you want out with this version.

Either way, a pure dev-dependency/tooling bump is **not** a consumer-facing change:
no `CHANGELOG.md` entry (see the curation rules below).

## Finalize the CHANGELOG

On the release branch, turn the accumulated `## [unreleased]` notes into the
version section. This is the moment for the **final editorial pass**: the
CHANGELOG must be complete, **end-user focused**, and consistent.

1. Insert a new `## [X.Y.Z]` header directly **below** `## [unreleased]`, leaving
   `## [unreleased]` in place as an empty landing zone for the next cycle:

   ```markdown
   ## [unreleased]

   ## [X.Y.Z]

   ### Added
   ...
   ```

2. Move the pending entries under `## [X.Y.Z]`, grouped Keep-a-Changelog style
   (`Added` / `Changed` / `Fixed`, `BREAKING:` prefix for breaking items).

3. **Curate for the consumer.** The CHANGELOG records what a *spec consumer*
   observes, not the build log. Remove:
   - dev-tooling / dependency bumps (Biome, `@types/node`, `spec-toolkit`, npm
     deps, VS Code recommendations, format/CI scripts, unit tests, skills);
   - spec-*source* churn that is explicitly **not a contract change** (e.g. an
     `x-introduced-in-version` backfill, or an enum notation migration whose
     value-set is unchanged) — these don't change what a consumer can do;
   - internal plumbing ("regenerated the TypeScript types").
   Keep new annotations (Added) and behavioral schema changes consumers can
   observe (e.g. `minItems`, `additionalProperties: false`), and any true
   BREAKING change (Changed).

4. Sanity-check every `@Annotation` / type name and that each entry reads clearly
   to someone who does not know the codebase.

## Bump the version

```bash
npm version X.Y.Z --no-git-tag-version   # updates package.json (and package-lock.json)
```

(Or edit `package.json` `version` and refresh `package-lock.json`.) Do **not**
let `npm version` create the tag — the tag is created on the merge commit after
the PR lands, see below.

## Verify

```bash
npm ci
npm run ci && npm run test        # lint + full test suite
npm run generate:check            # committed generated output is up to date
npm run validate:annotations      # source/wiring + a pending unreleased entry
```

All green before opening the PR.

## Open the release PR

Open `release/vX.Y.Z → main`, assign it to the milestone, and give it a body
that copies the finalized `## [X.Y.Z]` CHANGELOG section (this text is reused for
the GitHub Release). Get it reviewed and merge it.

## Tag and publish

After the PR merges to `main`, publish via the **Release** GitHub Action
(`.github/workflows/release.yml`) — `workflow_dispatch` (manual) with two toggles:

```bash
gh workflow run release.yml -f npm=true -f githubRelease=true
```

- **NPMJS Package** (`npm` job) — `npm publish` in the
  `npmjs:@sap/csn-interop-specification` environment, which **needs manual
  approval** (approve the deployment in the run's page).
- **GitHub Release** (`githubRelease` job, runs after `npm`) — uses
  `open-resource-discovery/github-release`. This action **derives the version
  from `package.json`, creates the `vX.Y.Z` tag itself** (template `v<version>`),
  and **auto-generates the release notes** from commits since the last tag plus a
  contributor list.

So in the normal path you do **not** create or push the tag by hand — the action
does it. The published GitHub release ends up as a hybrid: the auto-generated
`## What's Changed` / `## New Contributors` / `**Full Changelog**` sections, with
the curated `## [X.Y.Z]` CHANGELOG block pasted on top (edit the release after it
is created if the toolchain didn't prepend it).

### Verify the automation actually ran

The workflow is not reliably green — it has failed outright before (three failed
dispatches on 2026-02-12) and around v1.2.6 was believed broken and done by hand.
**Always confirm the run succeeded and both artifacts show `X.Y.Z`:**

```bash
gh run list --workflow=release.yml --limit 3   # latest dispatch: success?
gh release view vX.Y.Z                          # tag + notes exist
npm view @sap/csn-interop-specification version  # == X.Y.Z
```

### Manual fallback (only if the action didn't run / failed)

If the workflow failed or didn't create the tag + release, create the release
by hand from the new-release page:

<https://github.com/SAP/csn-interop-specification/releases/new>

In the tag dropdown, **type `vX.Y.Z`** — GitHub creates the tag (on `main`, the
merge commit) when you publish, so there is no separate tagging step. Target
`main`, click "Generate release notes" for the `## What's Changed` block, then
paste the curated `## [X.Y.Z]` CHANGELOG section above it.

(You only need `git tag vX.Y.Z origin/main && git push origin vX.Y.Z` beforehand
if you want the tag to exist first, e.g. to select it rather than type it — the
release itself does not require a pre-existing tag.)

If NPM also didn't publish, re-dispatch with just `-f npm=true`, or `npm publish`
locally from a clean checkout of the tag.

## Notify the CSN Interop workstream

After the release is live (NPM + GitHub both show `X.Y.Z`), notify the workstream.
Prompt the user to send a mail to the CPA Distribution List (incl. Interested):

- **To:** CSN Interop Interested Contacts (the CPA distribution list incl. Interested)
- **Subject:** `CSN Interop Specification vX.Y.Z released`
- **Body:** the `## [X.Y.Z]` CHANGELOG highlights + link to the GitHub release
  (`https://github.com/SAP/csn-interop-specification/releases/tag/vX.Y.Z`).

## Checklist

- [ ] Milestone created, PRs assigned + ordered, all merged to `main`.
- [ ] `release/vX.Y.Z` branched from up-to-date `main`.
- [ ] Dependencies checked (`npm outdated` / `npm audit --omit=dev`); user asked whether to bundle updates or do them separately (separate PR recommended if they require further changes).
- [ ] `## [X.Y.Z]` header added; `## [unreleased]` kept as empty landing zone.
- [ ] CHANGELOG curated to consumer-relevant changes only.
- [ ] `package.json` version == `X.Y.Z`, lockfile refreshed.
- [ ] `npm run ci && npm run test && npm run generate:check` green.
- [ ] Release PR opened → `main`, on the milestone, body = changelog section.
- [ ] PR merged.
- [ ] Release workflow dispatched: NPM (approved) + GitHub Release. The action
      creates the `vX.Y.Z` tag itself — no manual tagging in the normal path.
- [ ] Verified the run succeeded: `gh release view vX.Y.Z` + `npm view … version` both `X.Y.Z`. Manual fallback via releases/new if not.
- [ ] Workstream notified: mail to the CSN Interop Interested Contacts list.
