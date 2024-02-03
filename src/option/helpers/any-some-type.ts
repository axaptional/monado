import type { Option } from '../option'
import type { SomeType } from './some-type'

/**
 * Represents the union of the Some types of all <code>{@link Option}</code>
 * items of the given array type.
 * @since 0.1.0
 */
export type AnySomeType<T extends ReadonlyArray<Option<any>>> = SomeType<
  T[number]
>
