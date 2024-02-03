import { Some } from '../../option'
import { ValueMatchTail } from './value-match-tail'

export class ValueMatch<T> {
  constructor(private value: T) {}

  when<U extends T, L>(
    pred: (value: T) => value is U,
    then: (value: T & U) => L
  ): ValueMatchTail<Exclude<T, U>, L>
  when<U extends T, L>(
    pred: (value: T) => value is U,
    guard: (value: T & U) => true,
    then: (value: T & U) => L
  ): ValueMatchTail<Exclude<T, U>, L>
  when<U extends T, L>(
    pred: (value: T) => value is U,
    guard: (value: T & U) => boolean,
    then: (value: T & U) => L
  ): ValueMatchTail<T, L>
  when<U extends T, L>(
    pred: (value: T) => value is U,
    guardOrThen: (value: T & U) => boolean | L,
    then?: (value: T & U) => L
  ) {
    if (typeof then === 'undefined') {
      return new ValueMatchTail<Exclude<T, U>, L>(
        this.value as Exclude<T, U>,
        Some(this.value)
          .narrow(pred)
          .map(guardOrThen as (value: T & U) => L)
      )
    }
    return new ValueMatchTail<T, L>(
      this.value,
      Some(this.value)
        .narrow(pred)
        .filter(guardOrThen as (value: T & U) => boolean)
        .map(then)
    )
  }

  whenAny<U>(then: (value: T) => U): U {
    return then(this.value)
  }
}
