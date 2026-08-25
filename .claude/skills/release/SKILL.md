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
to `main` without cutting a release immediately after.** The documentation site
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

1. After the PR merges, tag the merge commit on `main` and push the tag:

   ```bash
   git fetch origin
   git tag vX.Y.Z origin/main
   git push origin vX.Y.Z
   ```

2. Publish via the **Release** GitHub Action (`.github/workflows/release.yml`),
   which is `workflow_dispatch` (manual) with two toggles:
   - **NPMJS Package** — publishes to NPM; runs in the
     `npmjs:@sap/csn-interop-specification` environment and **needs manual
     approval**.
   - **GitHub Release** — creates the GitHub release via
     `open-resource-discovery/github-release`. If it doesn't run, create the
     GitHub release by hand from the tag and paste in the `## [X.Y.Z]` CHANGELOG
     section as the release notes.

   ```bash
   gh workflow run release.yml -f npm=true -f githubRelease=true
   ```

3. Confirm the NPM package version and the GitHub release both show `X.Y.Z`.

## Checklist

- [ ] Milestone created, PRs assigned + ordered, all merged to `main`.
- [ ] `release/vX.Y.Z` branched from up-to-date `main`.
- [ ] `## [X.Y.Z]` header added; `## [unreleased]` kept as empty landing zone.
- [ ] CHANGELOG curated to consumer-relevant changes only.
- [ ] `package.json` version == `X.Y.Z`, lockfile refreshed.
- [ ] `npm run ci && npm run test && npm run generate:check` green.
- [ ] Release PR opened → `main`, on the milestone, body = changelog section.
- [ ] PR merged; `vX.Y.Z` tag created on the merge commit and pushed.
- [ ] Release workflow dispatched: NPM (approved) + GitHub Release published.
