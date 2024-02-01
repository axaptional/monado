import { type Option, Some } from '../../option'
import type { Err, Result } from '../../result'
import { ResultMatchErrHead } from './result-match-err-head'

type ResultMatchErrIfCovered<T, E extends Error, R> =
  Exclude<T, never> extends never ? ResultMatchErrHead<E, R> : never

export class ResultMatchOk<T, E extends Error, R> {
  constructor(
    private value: Result<T, E>,
    private result: Option<R>
  ) {}

  assertCovered(): ResultMatchErrIfCovered<T, E, R> {
    if (this.value.isOk() && this.result.isNone()) {
      throw new Error('match: Not all paths were covered (Result could be Ok)')
    }
    return new ResultMatchErrHead<E, R>(
      this.value as Err<E>,
      this.result
    ) as ResultMatchErrIfCovered<T, E, R>
  }

  case<U extends T, L>(
    pred: (value: T) => value is U,
    then: (value: T & U) => L
  ): ResultMatchOk<Exclude<T, U>, E, R | L>
  case<U extends T, L>(
    pred: (value: T) => value is U,
    guard: (value: T & U) => true,
    then: (value: T & U) => L
  ): ResultMatchOk<Exclude<T, U>, E, R | L>
  case<U extends T, L>(
    pred: (value: T) => value is U,
    guard: (value: T & U) => boolean,
    then: (value: T & U) => L
  ): ResultMatchOk<T, E, R | L>
  case<U extends T, L>(
    pred: (value: T) => value is U,
    guardOrThen: (value: T & U) => boolean | L,
    then?: (value: T & U) => L
  ) {
    if (typeof then === 'undefined') {
      return new ResultMatchOk<Exclude<T, U>, E, R | L>(
        this.value as Result<Exclude<T, U>, E>,
        this.result.or(() =>
          this.value
            .toOption()
            .narrow(pred)
            .map(guardOrThen as (value: T & U) => L)
        )
      )
    }
    return new ResultMatchOk<T, E, R | L>(
      this.value,
      this.result.or(() =>
        this.value
          .toOption()
          .narrow(pred)
          .filter(guardOrThen as (value: T & U) => boolean)
          .map(then)
      )
    )
  }

  caseOther<L>(then: (value: T) => L): ResultMatchErrHead<E, R | L> {
    return new ResultMatchErrHead<E, R | L>(
      this.value as Err<E>,
      this.result.or(() => this.value.toOption().map(then))
    )
  }

  else<L>(then: (value: Result<T, E>) => L): R | L {
    return this.result.or(() => Some(then(this.value))).orThrow()
  }
}
