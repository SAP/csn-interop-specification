# AGENTS.md

Quick reference for AI agents working on this project.

## Verify Loop

Run this command to check everything is in order for green CI/CD:

```bash
npm run ci && npm run test
```

## Spec Development

### Always Generate After Schema Changes

```bash
npm run generate
```

Run this after ANY changes to files in `spec/` directory. This regenerates TypeScript types and documentation.

### Changelog Entries (Mandatory)

Add entries to `CHANGELOG.md` under `## [unreleased]` for any significant changes:

- New annotations or vocabularies
- Breaking changes
- Bug fixes
- API modifications

Format: Keep a Changelog style with Added/Changed/Fixed sections.

### Adding or Changing Annotations

For adding/editing an annotation or introducing a new vocabulary, use the
**`add-annotation` skill** (`.claude/skills/add-annotation/SKILL.md`). It encodes the
repo's conventions (flat dot-qualified keys, the `{ "#": "VALUE" }` enum wrapper,
mandatory changelog + regenerate) so the result passes CI on the first try.

Quick source/wiring check before the full verify loop:

```bash
npm run validate:annotations
```

This checks that every vocabulary YAML is wired into `spec-toolkit.config.json` and has a
sibling `.md`, that `CHANGELOG.md` has a pending `[unreleased]` entry, plus a cheap
per-annotation lint. Schema-shape correctness is enforced by `npm run test`
(`src/__tests__/spec-v1/annotationPatterns.test.ts`).

New vocabulary (e.g., `@DataIntegration`) in short — see the skill for the full recipe:

1. Create files in `spec/v1/annotations/`:
   - `{name}.yaml` - schema definition
   - `{name}.md` - introduction/documentation

2. **Required:** Add configuration entry to `spec-toolkit.config.json` in the `docsConfig` array (follow existing patterns)

3. Run `npm run generate` to regenerate types

4. Add changelog entry describing the new vocabulary

## Pre-commit Hooks

Lefthook automatically runs:

- `npm run generate` on changes to `spec/*/*.yaml`
- `npm run format` on JSON/JS/TS files

Changes are auto-staged if hooks succeed.
