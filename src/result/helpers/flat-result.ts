import type { Err, Ok } from '../impl'
import type { Result } from '../result'

export type FlatResult<R extends Result<any, any>> =
  R extends Ok<infer T>
    ? T extends Result<any, any>
      ? FlatResult<T>
      : Ok<T>
    : R extends Err<infer E>
      ? Err<E>
      : never
