// Compile this to CDS:
// Closest to CSN Interop Effective (but not fully there yet)
// cdsc forEffective --beta effectiveCsn .\spec\v1\examples\TestEntity.cds -o tmp/TestEntity
// Regular CAP CSN with inferred (effective) flavor
// cds c -f inferred .\examples\TestEntity.cds -o tmp/test.cds.json

context foo.bar;

/**
 * Code comment description
 */
@description : '@description annotation'
@title : '@title annotation'
entity foo.bar.EntityA { // Assignment to context "foo.bar"
  compositionProp: Composition of one foo.bar.EntityB;
  associationProp: Association to many foo.bar.EntityB;
  test: String(100) @title : 'Test Title' @description : 'Test Description';
}

entity foo.bar.EntityB {
  associationProp: Association to many foo.bar.EntityA;
  test: String(100) @title : 'Test Title' @description : 'Test Description';
}

service foo.bar.ServiceA {
  entity EntityA as projection on foo.bar.EntityA; // foo.bar.ServiceA.EntityA
  entity EntityB as projection on foo.bar.EntityB;
}
