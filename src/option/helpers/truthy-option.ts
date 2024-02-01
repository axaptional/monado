import type { Falsy } from '../../core'
import type { None } from '../impl'
import type { Option } from '../option'

/**
 * Represents an <code>{@link Option}</code> subtype that is generic if the
 * given type has truthy instances, <code>None</code> otherwise.
 * @since 0.1.0
 */
export type TruthyOption<T> = T extends Falsy ? None : Option<T>
