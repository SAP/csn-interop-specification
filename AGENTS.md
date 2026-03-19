# AGENTS.md

Quick reference for AI agents working on this project.

## Verify Loop

Run this command to check everything is in order for green CI/CD:

```bash
npm run prettier && npm run eslint && npm run test
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

### Adding New Vocabulary Extensions

When adding a new annotation vocabulary (e.g., `@DataIntegration`):

1. Create files in `spec/v1/annotations/`:
   - `{name}.yaml` - schema definition
   - `{name}.md` - introduction/documentation

2. **Required:** Add configuration entry to `spec-toolkit.config.json` in the `docsConfig` array (follow existing patterns)

3. Run `npm run generate` to regenerate types

4. Add changelog entry describing the new vocabulary

## Pre-commit Hooks

Lefthook automatically runs:

- `npm run generate` on changes to `spec/*/*.yaml`
- `npm run prettier` on markdown/JSON/YAML files

Changes are auto-staged if hooks succeed.
