import type { Result } from '../result'
import type { ErrType } from './err-type'

export type ErrTypes<T extends ReadonlyArray<Result<any, any>>> = {
  -readonly [P in keyof T]: ErrType<T[P]>
}
