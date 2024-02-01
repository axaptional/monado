import { Ok as OkImpl } from './impl'

export interface Ok<T> extends OkImpl<T> {}

export function Ok<T>(value: T): Ok<T> {
  return new OkImpl(value)
}
