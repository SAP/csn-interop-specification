// Compile this to CDS:
// cds c -f inferred .\examples\TestEntity.cds -o tmp/test.cds.json
// cdsc forEffective --beta effectiveCsn

namespace foo.bar;

/**
 * Code comment description
 */
@description : '@description annotation'
@title : '@title annotation'
entity EntityA {
  compositionProp: composition of one EntityB;
  associatinoProp: Association to many EntityB;
}

entity EntityB {

}
