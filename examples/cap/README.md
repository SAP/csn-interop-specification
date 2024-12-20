## Description

```sh
# Export to CSN Interop Effective:
cdsc forEffective --beta effectiveCsn ./ariba/srv/supplier-service.cds -o tmp/ariba-supplier-service.cds
# Add `"csnInteropEffective": "1.0",` to the JSON root object.

#Export to OpenAPI:
cds c -2 openapi ./ariba/srv/supplier-service.cds -o ./tmp/openapi
```
