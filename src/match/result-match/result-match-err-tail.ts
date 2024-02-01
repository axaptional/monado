import { Some } from '../../option'
import type { ValueIfCovered } from '../helpers'
import { ResultMatchErrBase } from './result-match-err-base'

export class ResultMatchErrTail<E extends Error, R> extends ResultMatchErrBase<
  E,
  R
> {
  assertAllCaught(): ValueIfCovered<E, R> {
    if (this.value.isErr() && this.result.isNone()) {
      throw new Error('match: Not all paths were covered (Result could be Err)')
    }
    return this.result.orThrow() as ValueIfCovered<E, R>
  }

  catchOther<L>(then: (error: E) => L): R | L {
    return this.result.or(() => Some(then(this.value.error))).orThrow()
  }
}
