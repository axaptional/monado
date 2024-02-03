import type { Option } from '../option'

/**
 * Represents the type of Some values the given <code>{@link Option}</code>
 * type would yield.
 * @since 0.1.0
 */
export type SomeType<T> = T extends Option<infer TT> ? TT : never
