import { type Option, Some } from '../../option'
import { type ValueIfCovered, typeName } from '../helpers'

export class ValueMatchTail<T, R> {
  constructor(
    private value: T,
    private result: Option<R>
  ) {}

  assertCovered(): ValueIfCovered<T, R> {
    if (this.result.isNone()) {
      throw new Error(
        `match: Not all paths were covered (value could be ${typeName(
          this.value
        )})`
      )
    }
    return this.result.orThrow() as ValueIfCovered<T, R>
  }

  else<L>(then: (value: T) => L): L | R {
    return this.result.or(() => Some(then(this.value))).orThrow()
  }

  when<U extends T, L>(
    pred: (value: T) => value is U,
    then: (value: T & U) => L
  ): ValueMatchTail<Exclude<T, U>, R | L>
  when<U extends T, L>(
    pred: (value: T) => value is U,
    guard: (value: T & U) => true,
    then: (value: T & U) => L
  ): ValueMatchTail<Exclude<T, U>, R | L>
  when<U extends T, L>(
    pred: (value: T) => value is U,
    guard: (value: T & U) => boolean,
    then: (value: T & U) => L
  ): ValueMatchTail<T, R | L>
  when<U extends T, L>(
    pred: (value: T) => value is U,
    guardOrThen: (value: T & U) => boolean | L,
    then?: (value: T & U) => L
  ) {
    if (typeof then === 'undefined') {
      return new ValueMatchTail<Exclude<T, U>, R | L>(
        this.value as Exclude<T, U>,
        this.result.or(() =>
          Some(this.value)
            .narrow(pred)
            .map(guardOrThen as (value: T & U) => L)
        )
      )
    }
    return new ValueMatchTail<T, R | L>(
      this.value,
      this.result.or(() =>
        Some(this.value)
          .narrow(pred)
          .filter(guardOrThen as (value: T & U) => boolean)
          .map(then)
      )
    )
  }
}
