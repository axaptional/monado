import { Some } from '../../option'
import { ResultMatchErrBase } from './result-match-err-base'

export class ResultMatchErrHead<E extends Error, R> extends ResultMatchErrBase<
  E,
  R
> {
  catchAll<L>(then: (error: E) => L): R | L {
    return this.result.or(() => Some(then(this.value.error))).orThrow()
  }
}
