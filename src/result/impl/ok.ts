import { ConditionError } from '../../core/error'
import { None, Some } from '../../option'
import type { FlatResult } from '../helpers'
import type { Result } from '../result'
import type { ResultMatcher } from '../result-matcher'
import { Err } from './err'
import { ResultImpl } from './result'

export class Ok<T> extends ResultImpl<T, never> {
  constructor(public readonly value: T) {
    super()
  }

  override filter(pred: (value: T) => boolean): Result<T, ConditionError>
  override filter<F extends Error>(
    pred: (value: T) => boolean,
    ifFalse: () => F
  ): Result<T, F>
  override filter<F extends Error>(
    pred: (value: T) => boolean,
    ifFalse?: () => F
  ): Result<T, F | ConditionError> {
    if (pred(this.value)) {
      return this
    }
    if (typeof ifFalse === 'function') {
      return new Err(ifFalse())
    }
    return this.getConditionErr(pred.name)
  }

  override flatMap<U, F extends Error>(
    func: (value: T) => Result<U, F>
  ): Result<U, F> {
    return func(this.value)
  }

  override flatten(): FlatResult<Ok<T>> {
    if (this.value instanceof ResultImpl) {
      return this.value.flatten() as unknown as FlatResult<Ok<T>>
    }
    return this as unknown as FlatResult<Ok<T>>
  }

  override fold<O, R>(ifOk: (value: T) => O, _ifErr: (error: never) => R): O {
    return ifOk(this.value)
  }

  override isErr(): this is Err<never> {
    return false
  }

  override isOk(): this is Ok<T> {
    return true
  }

  override map<U>(transform: (value: T) => U): Ok<U> {
    return new Ok(transform(this.value))
  }

  override mapError<F extends Error>(_transform: (error: never) => F): Ok<T> {
    return this
  }

  override mapIf<U>(
    pred: (value: T) => boolean,
    transform: (value: T) => U
  ): Ok<T | U> {
    return pred(this.value) ? this.map(transform) : this
  }

  override mapPick<K extends keyof T>(key: K): Result<T[K]> {
    return new Ok(this.value[key])
  }

  override match<O, R>(matcher: ResultMatcher<T, never, O, R>): O {
    return matcher.Ok(this.value)
  }

  override narrow<U extends T>(
    pred: (value: T) => value is U
  ): Result<U, ConditionError> {
    return this.filter(pred) as Result<U, ConditionError>
  }

  override or<U, F extends Error>(
    _func: (error: never) => Result<U, F>
  ): Ok<T> {
    return this
  }

  override orElse<U>(_defaultValue: U): T {
    return this.value
  }

  override orMap<U>(_ifErr: (error: never) => U): T {
    return this.value
  }

  override orNull(): T {
    return this.value
  }

  override orThrow(_func?: (error: never) => Error): T {
    return this.value
  }

  override orUndefined(): T {
    return this.value
  }

  override tap(func: (value: T) => void): Ok<T> {
    func(this.value)
    return this
  }

  override tapError(_func: (error: never) => void): Ok<T> {
    return this
  }

  override toError(): None {
    return None
  }

  override toOption(): Some<T> {
    return Some(this.value)
  }

  override async toPromise(): Promise<T> {
    return this.value
  }

  override toResult(): Ok<T> {
    return this
  }

  override toString(): string {
    return String(this.value)
  }

  private getConditionErr(name: string): Err<ConditionError> {
    const conditionText = ['', 'anonymous'].includes(name)
      ? 'anonymous condition'
      : `condition "${name}"`
    return new Err(
      new ConditionError(
        `Expected Ok value to match ${conditionText} but was ${this.value}`
      )
    )
  }
}
