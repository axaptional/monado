import type { Err, Result } from '../../result'
import { ResultMatchErrHead } from './result-match-err-head'
import { ResultMatchOk } from './result-match-ok'

export class ResultMatch<T, E extends Error> {
  constructor(private value: Result<T, E>) {}

  case<U extends T, L>(
    pred: (value: T) => value is U,
    then: (value: T & U) => L
  ): ResultMatchOk<Exclude<T, U>, E, L>
  case<U extends T, L>(
    pred: (value: T) => value is U,
    guard: (value: T & U) => true,
    then: (value: T & U) => L
  ): ResultMatchOk<Exclude<T, U>, E, L>
  case<U extends T, L>(
    pred: (value: T) => value is U,
    guard: (value: T & U) => boolean,
    then: (value: T & U) => L
  ): ResultMatchOk<T, E, L>
  case<U extends T, L>(
    pred: (value: T) => value is U,
    guardOrThen: (value: T & U) => boolean | L,
    then?: (value: T & U) => L
  ) {
    if (typeof then === 'undefined') {
      return new ResultMatchOk<Exclude<T, U>, E, L>(
        this.value as Result<Exclude<T, U>, E>,
        this.value
          .toOption()
          .narrow(pred)
          .map(guardOrThen as (value: T & U) => L)
      )
    }
    return new ResultMatchOk<T, E, L>(
      this.value,
      this.value
        .toOption()
        .narrow(pred)
        .filter(guardOrThen as (value: T & U) => boolean)
        .map(then)
    )
  }

  caseAny<L>(then: (value: T) => L): ResultMatchErrHead<E, L> {
    return new ResultMatchErrHead<E, L>(
      this.value as Err<E>,
      this.value.toOption().map(then)
    )
  }
}
