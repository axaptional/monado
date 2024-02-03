import type { None, Option } from '../../option'
import { OptionMatchNone } from './option-match-none'
import { OptionMatchSome } from './option-match-some'

export class OptionMatch<S> {
  constructor(private value: Option<S>) {}

  some<T extends S, U>(
    pred: (value: S) => value is T,
    then: (value: S & T) => U
  ): OptionMatchSome<Exclude<S, T>, U>
  some<T extends S, U>(
    pred: (value: S) => value is T,
    guard: (value: S & T) => true,
    then: (value: S & T) => U
  ): OptionMatchSome<Exclude<S, T>, U>
  some<T extends S, U>(
    pred: (value: S) => value is T,
    guard: (value: S & T) => boolean,
    then: (value: S & T) => U
  ): OptionMatchSome<S, U>
  some<T extends S, U>(
    pred: (value: S) => value is T,
    guardOrThen: (value: S & T) => boolean | U,
    then?: (value: S & T) => U
  ) {
    if (typeof then === 'undefined') {
      return new OptionMatchSome<Exclude<S, T>, U>(
        this.value as Option<Exclude<S, T>>,
        this.value.narrow(pred).map(guardOrThen as (value: S & T) => U)
      )
    }
    return new OptionMatchSome<S, U>(
      this.value,
      this.value
        .narrow(pred)
        .filter(guardOrThen as (value: S & T) => boolean)
        .map(then)
    )
  }

  someAny<U>(then: (value: S) => U): OptionMatchNone<U> {
    return new OptionMatchNone<U>(this.value as None, this.value.map(then))
  }
}
