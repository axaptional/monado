import { NoValueError, type TypedAggregateError } from '../core/error'
import { None, type Option, Some } from '../option'
import { Err as OuterErr } from './err'
import type {
  AnyErrType,
  AnyOkType,
  ErrTypes,
  OkTypes,
  TruthyResult,
} from './helpers'
import { type Err, type Ok, ResultImpl } from './impl'
import { Ok as OuterOk } from './ok'

export type Result<T, E extends Error = Error> = Ok<T> | Err<E>

export namespace Result {
  const NoValueErr = OuterErr(
    new NoValueError('Attempted to unwrap Result but it was Err')
  )
  const UndefinedOk = OuterOk(void 0)

  type ResultArray = ReadonlyArray<Result<any, any>>

  export function isResult<T = any, E extends Error = Error>(
    value: any,
    okCheck?: ((value: any) => value is T) | null,
    errCheck?: ((error: Error) => error is E) | null
  ): value is Result<T, E> {
    if (!(value instanceof ResultImpl)) {
      return false
    }
    const result = value as Result<any, any>
    if (result.isOk() && typeof okCheck === 'function') {
      return okCheck(result.value)
    }
    if (result.isErr() && typeof errCheck === 'function') {
      return errCheck(result.error)
    }
    return true
  }

  export function isOk<T>(result: Result<T, any>): result is Ok<T> {
    return result.isOk()
  }

  export function isErr<E extends Error>(
    result: Result<any, E>
  ): result is Err<E> {
    return result.isErr()
  }

  export function fromNullable<T>(
    value: T
  ): Result<NonNullable<T>, NoValueError> {
    return value != null ? OuterOk(value) : NoValueErr
  }

  export function fromBoolean(value: boolean): Result<void, NoValueError> {
    return value ? UndefinedOk : NoValueErr
  }

  export function fromFalsifiable<T>(value: T): TruthyResult<T> {
    return (Boolean(value) ? OuterOk(value) : NoValueErr) as TruthyResult<T>
  }

  export function fromCall<T>(callback: () => T): Result<T> {
    try {
      return OuterOk(callback())
    } catch (e) {
      return OuterErr.fromThrowable(e)
    }
  }

  export function filterOk<T extends ResultArray>(
    results: T
  ): Array<AnyOkType<T>> {
    return results.filter(isOk).map((ok) => ok.value)
  }

  export function filterErr<T extends ResultArray>(
    results: T
  ): Array<AnyErrType<T>> {
    return results.filter(isErr).map((err) => err.error)
  }

  export function all<T extends ResultArray>(
    results: T
  ): Result<OkTypes<T>, AnyErrType<T>> {
    const values: Array<AnyOkType<T>> = []
    for (const result of results) {
      if (result.isErr()) {
        return result
      }
      values.push(result.value)
    }
    return OuterOk(values as OkTypes<T>)
  }

  export function any<T extends ResultArray>(
    results: T
  ): Result<AnyOkType<T>, TypedAggregateError<ErrTypes<T>>> {
    const errors: Array<AnyErrType<T>> = []
    for (const result of results) {
      if (result.isOk()) {
        return result
      }
      errors.push(result.error)
    }
    return OuterErr.aggregate(errors as ErrTypes<T>)
  }

  export function fold<T extends ResultArray>(
    results: T,
    func: (
      c: AnyOkType<T>,
      v: AnyOkType<T>,
      i: number,
      a: Array<AnyOkType<T>>
    ) => AnyOkType<T>
  ): Option<AnyOkType<T>> {
    const values = filterOk(results)
    if (values.length === 0) {
      return None
    }
    return Some(values.reduce(func))
  }

  export function reduce<T extends ResultArray, U>(
    results: T,
    func: (c: U, v: AnyOkType<T>, i: number, a: Array<AnyOkType<T>>) => U,
    init: U
  ): U {
    return filterOk(results).reduce(func, init)
  }

  export async function promise<T>(
    promise: PromiseLike<T>
  ): Promise<Result<T>> {
    return promise.then(OuterOk, OuterErr.fromThrowable)
  }
}
