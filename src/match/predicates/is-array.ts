import type { NarrowedArray, PrimitiveConstructor } from '../helpers'
import { is } from './is'

export function isArray<C extends PrimitiveConstructor>(
  elementConstructor: C
): <T>(value: T) => value is NarrowedArray<C, T> {
  return <T>(value: T): value is NarrowedArray<C, T> => {
    if (Array.isArray(value)) {
      return value.length === 0 ? true : is(elementConstructor)(value[0])
    }
    return false
  }
}
