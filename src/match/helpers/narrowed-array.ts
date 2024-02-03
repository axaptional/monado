import type { PrimitiveConstructorMapping } from './primitive-constructor-mapping'

export type NarrowedArray<C, T> = T & Array<PrimitiveConstructorMapping<C>>
