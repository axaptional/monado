import type { Falsy } from '../../core'
import type { NoValueError } from '../../core/error'
import type { Err } from '../impl'
import type { Result } from '../result'

export type TruthyResult<T> = T extends Falsy
  ? Err<NoValueError>
  : Result<T, NoValueError>
