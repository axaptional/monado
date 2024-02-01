import { NoValueError } from '../../core/error'
import { Err } from '../../result'
import type { FlatOption } from '../helpers'
import type { Option } from '../option'
import type { OptionMatcher } from '../option-matcher'
import { OptionImpl } from './option'
import type { Some } from './some'

export class None extends OptionImpl<never> {
  static readonly INSTANCE: None = new None()

  private constructor() {
    super()
  }

  override filter(_pred: (value: never) => boolean): None {
    return this
  }

  override flatMap<U>(_func: (value: never) => Option<U>): None {
    return this
  }

  override flatten(): FlatOption<None> {
    return this
  }

  override fold<S, N>(_ifSome: (value: never) => S, ifNone: () => N): N {
    return ifNone()
  }

  override isNone(): this is None {
    return true
  }

  override isSome(): this is Some<never> {
    return false
  }

  override map<U>(_transform: (value: never) => U): None {
    return this
  }

  override mapIf<U>(
    _pred: (value: never) => boolean,
    _transform: (value: never) => U
  ): None {
    return this
  }

  override mapPick<K extends never>(_key: K): None {
    return this
  }

  override match<S, N>(matcher: OptionMatcher<never, S, N>): N {
    return matcher.None()
  }

  override narrow(_pred: (value: never) => boolean): None {
    return this
  }

  override or<U>(func: () => Option<U>): Option<U> {
    return func()
  }

  override orElse<U>(defaultValue: U): U {
    return defaultValue
  }

  override orMap<U>(ifNone: () => U): U {
    return ifNone()
  }

  override orNull(): null {
    return null
  }

  override orThrow(func?: () => Error): never {
    if (typeof func === 'function') {
      throw func()
    }
    throw this.toError()
  }

  override orUndefined(): undefined {
    return void 0
  }

  override tap(_func: (value: never) => void): None {
    return this
  }

  override tapNone(func: () => void): None {
    func()
    return this
  }

  override toOption(): None {
    return this
  }

  override async toPromise(): Promise<never> {
    return Promise.reject(this.toError())
  }

  override toResult(): Err<NoValueError> {
    return Err(this.toError())
  }

  override toString(): string {
    return 'None'
  }

  private toError(): NoValueError {
    return new NoValueError('Attempted to unwrap Option but it was None')
  }
}
