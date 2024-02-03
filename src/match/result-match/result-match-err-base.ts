import { type Option, Some } from '../../option'
import type { Err } from '../../result'
import { ResultMatchErrTail } from './result-match-err-tail'

export class ResultMatchErrBase<E extends Error, R> {
  constructor(
    protected value: Err<E>,
    protected result: Option<R>
  ) {}

  catch<F extends E, L>(
    pred: (error: E) => error is F,
    then: (error: E & F) => L
  ): ResultMatchErrTail<Exclude<E, F>, R | L>
  catch<F extends E, L>(
    pred: (error: E) => error is F,
    guard: (error: E & F) => true,
    then: (error: E & F) => L
  ): ResultMatchErrTail<Exclude<E, F>, R | L>
  catch<F extends E, L>(
    pred: (error: E) => error is F,
    guard: (error: E & F) => boolean,
    then: (error: E & F) => L
  ): ResultMatchErrTail<E, R | L>
  catch<F extends E, L>(
    pred: (error: E) => error is F,
    guardOrThen: (error: E & F) => boolean | L,
    then?: (error: E & F) => L
  ) {
    if (typeof then === 'undefined') {
      return new ResultMatchErrTail<Exclude<E, F>, R | L>(
        this.value as Err<Exclude<E, F>>,
        this.result.or(() =>
          this.value
            .toError()
            .narrow(pred)
            .map(guardOrThen as (error: E & F) => L)
        )
      )
    }
    return new ResultMatchErrTail<E, R | L>(
      this.value,
      this.result.or(() =>
        this.value
          .toError()
          .narrow(pred)
          .filter(guardOrThen as (value: E & F) => boolean)
          .map(then)
      )
    )
  }
}
