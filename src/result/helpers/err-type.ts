import type { Result } from '../result'

export type ErrType<T> =
  T extends Result<any, infer E extends Error> ? E : never
