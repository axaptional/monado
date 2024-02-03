import type { Result } from '../result'
import type { ErrType } from './err-type'

export type AnyErrType<T extends ReadonlyArray<Result<any, any>>> = ErrType<
  T[number]
>
