import type { PrimitiveConstructorMapping } from './primitive-constructor-mapping'

export type Narrowed<C, T> = T & PrimitiveConstructorMapping<C>
