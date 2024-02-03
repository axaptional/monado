/**
 * Represents the union of types whose instances are always falsy.
 * Commonly used in conditional types to strengthen return value postconditions.
 * @since 0.1.0
 */
export type Falsy = false | 0 | 0n | '' | null | undefined
