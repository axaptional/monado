import type { PrimitiveConstructor } from './primitive-constructor'

export const typeofMappings = new Map<PrimitiveConstructor, string>([
  [Number, 'number'],
  [String, 'string'],
  [Boolean, 'boolean'],
  [Symbol, 'symbol'],
  [BigInt, 'bigint'],
  [Object, 'object'],
  [void 0, 'undefined'],
])
