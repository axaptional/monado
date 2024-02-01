import type { Option } from '../option'
import type { SomeType } from './some-type'

/**
 * Represents the array type resulting from mapping the given array type's
 * <code>{@link Option}</code> types to their Some types.
 * @since 0.1.0
 */
export type SomeTypes<T extends ReadonlyArray<Option<any>>> = {
  -readonly [P in keyof T]: SomeType<T[P]>
}
