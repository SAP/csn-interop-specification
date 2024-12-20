## Notational Conventions

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

## Consumer Requirements

- Consumers MUST ignore unknown properties / structures of the document.
  This allows the spec to be extended compatibly in the future.

## Provider Requirements

An application / service that exposes or exports CSN Effective Interop:

- MUST follow the described interface description. This SHOULD be validated via [JSON Schema interface](https://sap.github.io/csn-interop-specification/spec-v1/csn-interop-effective.schema.json) compliance and in the future SHOULD use of the API Metadata Validator, which supports validation beyond structural JSON Schema based constraints.
