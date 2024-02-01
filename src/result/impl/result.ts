import { Ponad } from '../../core'
import type { ConditionError } from '../../core/error'
import type { Option } from '../../option'
import type { FlatResult } from '../helpers'
import type { Result } from '../result'
import type { ResultMatcher } from '../result-matcher'
import type { Err } from './err'
import type { Ok } from './ok'

export abstract class ResultImpl<T, E extends Error = Error> extends Ponad<
  T,
  E
> {
  abstract filter(pred: (value: T) => boolean): Result<T, E | ConditionError>
  abstract filter<F extends Error>(
    pred: (value: T) => boolean,
    ifFalse: () => F
  ): Result<T, E | F>

  abstract flatMap<U, F extends Error>(
    func: (value: T) => Result<U, F>
  ): Result<U, E | F>

  abstract flatten(): FlatResult<Result<T, E>>

  abstract override fold<O, R>(
    ifOk: (value: T) => O,
    ifErr: (error: E) => R
  ): O | R

  abstract isErr(): this is Err<E>

  abstract isOk(): this is Ok<T>

  abstract map<U>(transform: (value: T) => U): Result<U, E>

  abstract mapError<F extends Error>(transform: (error: E) => F): Result<T, F>

  abstract mapIf<U>(
    pred: (value: T) => boolean,
    transform: (value: T) => U
  ): Result<T | U, E>

  abstract mapPick<K extends keyof T>(key: K): Result<T[K]>

  abstract match<O, R>(matcher: ResultMatcher<T, E, O, R>): O | R

  abstract narrow<U extends T>(
    pred: (value: T) => value is U
  ): Result<U, E | ConditionError>

  abstract or<U, F extends Error>(
    func: (error: E) => Result<U, F>
  ): Result<T | U, F>

  abstract override orMap<U>(ifErr: (error: E) => U): T | U

  abstract override orThrow(func?: (error: E) => Error): T

  abstract tap(func: (value: T) => void): Result<T, E>

  abstract tapError(func: (error: E) => void): Result<T, E>

  abstract toError(): Option<E>

  abstract toResult(): Result<T, E>
}
