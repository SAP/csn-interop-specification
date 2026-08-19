---
name: add-annotation
description: Add or change an annotation in the CSN Interop spec (files under spec/v1/annotations/), including creating a whole new annotation vocabulary. Use when the user wants to add/edit an `@Something` annotation, introduce a new `@Vocabulary`, or asks how annotations are authored in this repo. Encodes the repo's conventions (the `{ "#": "VALUE" }` enum wrapper, flat dot-qualified keys, mandatory changelog + regenerate) so the result passes CI on the first try.
---

# Add an annotation to the CSN Interop specification

This is the recipe for adding or changing an annotation vocabulary in this repo.
Annotations live in `spec/v1/annotations/{vocabulary}.yaml`, are documented in a
sibling `{vocabulary}.md`, and are merged into the effective schema by
`npm run generate`.

## When to use

- Adding a new annotation to an existing vocabulary (e.g. a new `@ObjectModel.*`).
- Creating a brand-new vocabulary (e.g. `@DataIntegration`) — see the branch below.
- Editing/deprecating an existing annotation.

Not for: changing the core CSN schema (`spec/v1/CSN-Interop-Effective.schema.yaml`),
or consuming/validating CSN documents (that's the separate `csn-interop` reference skill).

## First decision: existing vocabulary or new one?

- The `@Prefix` already has a file in `spec/v1/annotations/` → **existing vocabulary**,
  just edit that YAML. Go to "Steps — existing vocabulary".
- No file for the `@Prefix` yet → **new vocabulary**. Do "Steps — new vocabulary" first,
  then the existing-vocabulary steps.

## Conventions (this is what CI enforces)

The rules below are enforced by `src/__tests__/spec-v1/annotationPatterns.test.ts` and
`scripts/validate-annotations.mjs`. Getting them right up front means green CI.

### 1. Annotations are flat, dot-qualified keys

Keys are fully-qualified names like `@ObjectModel.custom`. Related values become
**separate flat annotations**, not one nested object.

```yaml
# GOOD — two flat annotations
"@ObjectModel.origin.layer": { type: string, x-extension-targets: [Type] }
"@ObjectModel.origin.codes": { type: array, x-extension-targets: [Type] }

# BAD — a structured object with nested properties
"@ObjectModel.origin":
  type: object
  properties: { layer: {...}, codes: {...} }   # split this into .layer + .codes
```

(Rationale: `docs/primer.md` — annotations are "flat lists of key-value pairs with keys
being fully qualified property names". The only tolerated structured annotations are the
deprecated `@API.element` and the cohesive `@Semantics.valueRange`; both are on an explicit
allowlist in the test — do not copy that shape by default.)

**Exception — DDD value objects.** A structured object is only justified when the nested
properties form what Domain-Driven Design calls a *value object*: the values are meaningless
on their own and only make sense provided **together as one object** (e.g. a min/max range
where a lone minimum is incomplete). Splitting such a set into separate flat annotations
would let callers set one without the other and produce an invalid partial state.

If — and only if — that genuinely applies:

1. Add the annotation name to `ALLOWED_STRUCTURED_ANNOTATIONS` in
   `src/__tests__/spec-v1/annotationPatterns.test.ts`, with a comment justifying why the
   properties are cohesive (follow the `@Semantics.valueRange` example).
2. **Call it out explicitly in the PR description / review** as a conscious design decision —
   "this is a structured annotation because it is a DDD value object (X and Y only have
   meaning together)" — so a reviewer can approve/verify it rather than have it slip in
   silently. Do not treat the allowlist as a rubber stamp; it exists to force this
   conversation.

### 2. Enumerations use the `{ "#": "VALUE" }` wrapper

Never a bare string `enum` on the annotation. Wrap it in a `#` property, set
`type: string`, and lock the object with `additionalProperties: false` + `required: ["#"]`.
This wrapper shape **is enforced by CI** (`annotationPatterns.test.ts`).

**Recommended default: `oneOf` + `const` with a per-value `description`, over a bare
`enum: [...]`.** This is best practice — not CI-enforced (the repo still has some bare-enum
wrappers), but the pattern to reach for by default in new work and worth requesting in
review. It lets every allowed value carry its own documentation, which flows into the
generated schema and docs; a bare `enum: ["FOO", "BAR"]` is just a list of opaque tokens.
The same applies to non-`#` value sets — prefer `oneOf`/`anyOf` of described `const`s so
each choice is self-documenting.

```yaml
# GOOD — reference implementation is @Aggregation.default
"@MyVocab.kind":
  type: object
  description: |-
    What this annotation means.
  properties:
    "#":
      type: string
      description: |-
        Provide the value in `{ "#": "<value>" }` enum notation.
      oneOf:
        - const: "FOO"
          description: Meaning of FOO.
        - const: "BAR"
          description: Meaning of BAR.
  additionalProperties: false
  required:
    - "#"
  x-extension-targets:
    - Type
  examples:
    - { "#": "FOO" }

# BAD — direct string enum (this is what PR #116 got wrong)
"@MyVocab.kind":
  type: string
  enum: ["FOO", "BAR"]

# TOLERATED but not preferred — correct wrapper, but opaque bare enum with no per-value docs.
# Prefer the oneOf + const + description form above.
"@MyVocab.kind":
  type: object
  properties:
    "#": { type: string, enum: ["FOO", "BAR"] }
  additionalProperties: false
  required: ["#"]
```

### 3. Every annotation has a description and valid extension targets

- Provide a non-empty `description`.
- `x-extension-targets` must be from: `Type`, `Entity`, `Service`, `Context`,
  `EnumDictionaryEntry`, and the concrete element types (`IntegerType`, `StringType`, …).
- For annotations whose value is an element reference, use `x-ref-to-doc` pointing at
  `#/definitions/ElementReference` (see `@ODM.oid`) instead of an inline description of the
  ref shape — the generator collapses these to a `$ref`, and the test exempts them.
- Add an `examples:` entry when it clarifies usage.

## Steps — new vocabulary

Smallest complete reference: `spec/v1/annotations/dataintegration.yaml` + `.md`.

1. Create `spec/v1/annotations/{name}.yaml`:
   ```yaml
   $schema: "http://json-schema.org/draft-07/schema#"
   $id: "https://sap.github.io/csn-interop-specification/spec-v1/{name}.schema.json#"
   title: {Name} Document
   description: This is the interface description of @{Name}.
   type: object
   definitions:
     "@{Name}.myAnnotation":
       type: boolean            # or object with the # wrapper, array, etc.
       description: |-
         What it means.
       x-extension-targets:
         - Type
         - Entity
   ```
2. Create `spec/v1/annotations/{name}.md` (short intro; add the BETA banner
   `> <span className="feature-status-beta">BETA</span> ...` if not yet stable).
3. Wire it into `spec-toolkit.config.json` — add to the `docsConfig` array:
   ```json
   {
     "type": "specExtension",
     "id": "{name}",
     "sourceFilePath": "./spec/v1/annotations/{name}.yaml",
     "sourceIntroFilePath": "./spec/v1/annotations/{name}.md",
     "targetDocumentId": "csn-interop-effective",
     "mdFrontmatter": {
       "title": "@{Name}",
       "sidebar_position": "<next free number>",
       "description": "@{Name} annotations."
     }
   }
   ```
   `sidebar_position` is the next integer after the current highest entry.
4. Continue with the existing-vocabulary steps below.

## Steps — existing vocabulary

1. Edit `spec/v1/annotations/{vocabulary}.yaml`, following the conventions above.
2. **Add a `CHANGELOG.md` entry** under `## [unreleased]` (Added / Changed / Fixed).
   This is mandatory — describe the annotation and any behavior.
3. Regenerate types + docs: `npm run generate`
   (do this after ANY change under `spec/`; regenerates TypeScript and docs).
4. Fast source/wiring check: `node scripts/validate-annotations.mjs`
   (or `npm run validate:annotations`).
5. Full verification: `npm run test` (runs build + unit tests, incl. the annotation
   pattern tests) and `npm run ci` (Biome).
6. If you edited the validator script or any JS/TS, run `npm run format`
   (Biome: formats, organizes imports, and applies safe lint fixes).

## Review checklist

- [ ] Annotation keys are flat and `@`-dot-qualified. Any new structured object is a
      genuine DDD value object, is on the test allowlist, and is called out in the PR as a
      conscious design decision to be approved.
- [ ] Enums use `{ "#": "VALUE" }` with `type: string`, `additionalProperties: false`,
      `required: ["#"]` (enforced). Prefer `oneOf`+`const` with a per-value `description`
      over a bare `enum` (recommended default — flag bare enums in review).
- [ ] Every annotation has a `description`; `x-extension-targets` are all valid.
- [ ] New vocabulary: `{name}.yaml` + `{name}.md` + `spec-toolkit.config.json` entry.
- [ ] `CHANGELOG.md` `## [unreleased]` updated.
- [ ] `npm run generate` run and generated output committed.
- [ ] `node scripts/validate-annotations.mjs`, `npm run test`, `npm run ci` all green.
