import { Ok } from '../../result'
import type { FlatOption } from '../helpers'
import type { Option } from '../option'
import type { OptionMatcher } from '../option-matcher'
import { None } from './none'
import { OptionImpl } from './option'

export class Some<T> extends OptionImpl<T> {
  constructor(public readonly value: T) {
    super()
  }

  override filter(pred: (value: T) => boolean): Option<T> {
    return pred(this.value) ? this : None.INSTANCE
  }

  override flatMap<U>(func: (value: T) => Option<U>): Option<U> {
    return func(this.value)
  }

  override flatten(): FlatOption<Some<T>> {
    if (this.value instanceof OptionImpl) {
      return this.value.flatten() as FlatOption<Some<T>>
    }
    return this as unknown as FlatOption<Some<T>>
  }

  override fold<S, N>(ifSome: (value: T) => S, _ifNone: () => N): S {
    return ifSome(this.value)
  }

  override isNone(): this is None {
    return false
  }

  override isSome(): this is Some<T> {
    return true
  }

  override map<U>(transform: (value: T) => U): Some<U> {
    return new Some(transform(this.value))
  }

  override mapIf<U>(
    pred: (value: T) => boolean,
    transform: (value: T) => U
  ): Option<T | U> {
    if (pred(this.value)) {
      return this.map(transform)
    }
    return this
  }

  override mapPick<K extends keyof T>(key: K): Some<T[K]> {
    return new Some(this.value[key])
  }

  override match<S, N>(matcher: OptionMatcher<T, S, N>): S {
    return matcher.Some(this.value)
  }

  override narrow<U extends T>(pred: (value: T) => value is U): Option<U> {
    return this.filter(pred) as Option<U>
  }

  override or<U>(_func: () => Option<U>): Some<T> {
    return this
  }

  override orElse<U>(_defaultValue: U): T {
    return this.value
  }

  override orMap<U>(_ifNone: () => U): T {
    return this.value
  }

  override orNull(): T {
    return this.value
  }

  override orThrow(_func?: () => Error): T {
    return this.value
  }

  override orUndefined(): T {
    return this.value
  }

  override tap(func: (value: T) => void): Some<T> {
    func(this.value)
    return this
  }

  override tapNone(_func: () => void): Some<T> {
    return this
  }

  override toOption(): Some<T> {
    return this
  }

  override async toPromise(): Promise<T> {
    return this.value
  }

  override toResult(): Ok<T> {
    return Ok(this.value)
  }

  override toString(): string {
    return String(this.value)
  }
}
