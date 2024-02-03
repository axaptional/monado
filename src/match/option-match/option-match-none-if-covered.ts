import type { OptionMatchNone } from './option-match-none'

export type OptionMatchNoneIfCovered<S, F> =
  Exclude<S, never> extends never ? OptionMatchNone<F> : never
