import type { None, Some } from '../impl'
import type { Option } from '../option'

/**
 * Represents the type resulting from flattening the given
 * <code>{@link Option}</code>-of-<code>Option</code> type to a regular
 * <code>Option</code> type.
 * <p>
 * This type transformation behaves like an identity if the supplied
 * <code>Option</code> already has nesting depth 1.
 * @since 0.1.0
 */
export type FlatOption<O extends Option<any>> =
  O extends Some<infer T>
    ? T extends Option<any>
      ? FlatOption<T>
      : Some<T>
    : O extends None
      ? None
      : never
