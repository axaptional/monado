import {
  type Narrowed,
  type PrimitiveConstructor,
  typeofMappings,
} from '../helpers'

export function is<C extends PrimitiveConstructor>(
  constructor: C
): <T>(value: T) => value is Narrowed<C, T> {
  if (constructor === null) {
    return <T>(value: T): value is Narrowed<C, T> => value === null
  }
  if (typeofMappings.has(constructor)) {
    return <T>(value: T): value is Narrowed<C, T> =>
      typeof value === typeofMappings.get(constructor)
  }
  if (constructor === Array) {
    return <T>(value: T): value is Narrowed<C, T> => Array.isArray(value)
  }
  throw new Error(
    `is: Invalid constructor "${
      typeof constructor === 'function' ? constructor.name : constructor
    }"`
  )
}
