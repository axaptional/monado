import type { ConditionError } from '../../core/error'
import { None, Some } from '../../option'
import type { FlatResult } from '../helpers'
import type { Result } from '../result'
import type { ResultMatcher } from '../result-matcher'
import type { Ok } from './ok'
import { ResultImpl } from './result'

export class Err<E extends Error> extends ResultImpl<never, E> {
  constructor(public readonly error: E) {
    super()
  }

  override filter(pred: (value: never) => boolean): Err<E>
  override filter<F extends Error>(
    pred: (value: never) => boolean,
    ifFalse: () => F
  ): Err<E>
  override filter<F extends Error>(
    _pred: (value: never) => boolean,
    _ifFalse?: () => F
  ): Err<E> {
    return this
  }

  override flatMap<U, F extends Error>(
    _func: (value: never) => Result<U, F>
  ): Err<E> {
    return this
  }

  override flatten(): FlatResult<Err<E>> {
    return this
  }

  override fold<O, R>(_ifOk: (value: never) => O, ifErr: (error: E) => R): R {
    return ifErr(this.error)
  }

  override isErr(): this is Err<E> {
    return true
  }

  override isOk(): this is Ok<never> {
    return false
  }

  override map<U>(_transform: (value: never) => U): Err<E> {
    return this
  }

  override mapError<F extends Error>(transform: (error: E) => F): Err<F> {
    return new Err(transform(this.error))
  }

  override mapIf<U>(
    _pred: (value: never) => boolean,
    _transform: (value: never) => U
  ): Err<E> {
    return this
  }

  override mapPick<K extends never>(_key: K): Err<E> {
    return this
  }

  override match<O, R>(matcher: ResultMatcher<never, E, O, R>): R {
    return matcher.Err(this.error)
  }

  override narrow(_pred: (value: never) => boolean): Err<ConditionError | E> {
    return this
  }

  override or<U, F extends Error>(
    func: (error: E) => Result<U, F>
  ): Result<U, F> {
    return func(this.error)
  }

  override orElse<U>(defaultValue: U): U {
    return defaultValue
  }

  override orMap<U>(ifErr: (error: E) => U): U {
    return ifErr(this.error)
  }

  override orNull(): null {
    return null
  }

  override orThrow(func?: (error: E) => Error): never {
    if (typeof func === 'function') {
      throw func(this.error)
    }
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw this.error
  }

  override orUndefined(): undefined {
    return void 0
  }

  override tap(_func: (value: never) => void): Err<E> {
    return this
  }

  override tapError(func: (error: E) => void): Err<E> {
    func(this.error)
    return this
  }

  override toError(): Some<E> {
    return Some(this.error)
  }

  override toOption(): None {
    return None
  }

  override async toPromise(): Promise<never> {
    return Promise.reject(this.error)
  }

  override toResult(): Err<E> {
    return this
  }

  override toString(): string {
    return this.error.name
  }
}
