import { Some as SomeImpl } from './impl'

export interface Some<T> extends SomeImpl<T> {}

export function Some<T>(value: T): Some<T> {
  return new SomeImpl(value)
}
