import { type None, type Option, Some } from '../../option'
import { OptionMatchNone } from './option-match-none'
import type { OptionMatchNoneIfCovered } from './option-match-none-if-covered'

export class OptionMatchSome<S, F> {
  constructor(
    private value: Option<S>,
    private result: Option<F>
  ) {}

  assertCovered(): OptionMatchNoneIfCovered<S, F> {
    if (this.value.isSome() && this.result.isNone()) {
      throw new Error(
        'match: Not all paths were covered (Option could be Some)'
      )
    }
    return new OptionMatchNone<F>(
      this.value as None,
      this.result
    ) as OptionMatchNoneIfCovered<S, F>
  }

  else<U>(then: (value: Option<S>) => U): F | U {
    return this.result.or(() => Some(then(this.value))).orThrow()
  }

  some<T extends S, U>(
    pred: (value: S) => value is T,
    then: (value: S & T) => U
  ): OptionMatchSome<Exclude<S, T>, F | U>
  some<T extends S, U>(
    pred: (value: S) => value is T,
    guard: (value: S & T) => true,
    then: (value: S & T) => U
  ): OptionMatchSome<Exclude<S, T>, F | U>
  some<T extends S, U>(
    pred: (value: S) => value is T,
    guard: (value: S & T) => boolean,
    then: (value: S & T) => U
  ): OptionMatchSome<S, F | U>
  some<T extends S, U>(
    pred: (value: S) => value is T,
    guardOrThen: (value: S & T) => boolean | U,
    then?: (value: S & T) => U
  ) {
    if (typeof then === 'undefined') {
      return new OptionMatchSome<Exclude<S, T>, F | U>(
        this.value as Option<Exclude<S, T>>,
        this.result.or(() =>
          this.value.narrow(pred).map(guardOrThen as (value: S & T) => U)
        )
      )
    }
    return new OptionMatchSome<S, F | U>(
      this.value,
      this.result.or(() =>
        this.value
          .narrow(pred)
          .filter(guardOrThen as (value: S & T) => boolean)
          .map(then)
      )
    )
  }

  someOther<U>(then: (value: S) => U): OptionMatchNone<F | U> {
    return new OptionMatchNone<F | U>(
      this.value as None,
      this.result.or(() => this.value.map(then))
    )
  }
}
