// Compile this to CDS:
// Closest to CSN Interop Effective (but not fully there yet)
// cdsc forEffective --beta effectiveCsn .\examples\TestEntity.cds -o tmp/test.cds.json
// Regular CAP CSN with inferred (effective) flavor
// cds c -f inferred .\examples\TestEntity.cds -o tmp/test.cds.json

namespace foo.bar;

/**
 * Code comment description
 */
@description : '@description annotation'
@title : '@title annotation'
entity foo.bar.EntityA {
  compositionProp: composition of one foo.bar.EntityB;
  associationProp: Association to many foo.bar.EntityB;
}

entity foo.bar.EntityB {
  associationProp: Association to many foo.bar.EntityA;
}

service ServiceA {
  entity EntityA as projection on foo.bar.EntityA;
  entity EntityB as projection on foo.bar.EntityB;
}
