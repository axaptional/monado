import { TypedAggregateError } from '../core/error'
import { Err as ErrImpl } from './impl'

export interface Err<E extends Error> extends ErrImpl<E> {}

function ErrConstructor<E extends Error>(error: E): Err<E> {
  return new ErrImpl(error)
}

function fromThrowable(throwable: any): Err<Error> {
  if (throwable instanceof Error) {
    return Err(throwable)
  }
  if (typeof throwable === 'string') {
    return Err.fromString(throwable)
  }
  return Err(new TypeError(throwable))
}

function aggregate<T extends Error[]>(errors: T): Err<TypedAggregateError<T>> {
  return Err(
    new TypedAggregateError(
      errors,
      'Attempted to unwrap Result but it was an aggregate Err'
    )
  )
}

function fromString(message: string): Err<Error> {
  return Err(new Error(message))
}

export const Err = Object.assign(ErrConstructor, {
  fromString,
  fromThrowable,
  aggregate,
})
