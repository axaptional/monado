import type { NarrowedArray, PrimitiveConstructor } from '../helpers'
import { is } from './is'

export function contains<C extends PrimitiveConstructor>(
  elementConstructor: C
): <T extends readonly any[]>(value: T) => value is NarrowedArray<C, T> {
  return <T extends readonly any[]>(value: T): value is NarrowedArray<C, T> => {
    return value.length === 0 ? true : is(elementConstructor)(value[0])
  }
}
