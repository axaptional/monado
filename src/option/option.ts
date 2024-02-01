import type { AnySomeType, SomeTypes, TruthyOption } from './helpers'
import { type None, OptionImpl, type Some } from './impl'
import { None as OuterNone } from './none'
import { Some as OuterSome } from './some'

export type Option<T> = Some<T> | None

export namespace Option {
  const UndefinedSome = OuterSome(void 0)

  type OptionArray = ReadonlyArray<Option<any>>

  export function isOption<T = any>(
    value: any,
    someCheck?: ((value: any) => value is T) | null
  ): value is Option<T> {
    if (!(value instanceof OptionImpl)) {
      return false
    }
    const option = value as Option<any>
    if (option.isSome() && typeof someCheck === 'function') {
      return someCheck(option.value)
    }
    return true
  }

  export function isSome<T>(option: Option<T>): option is Some<T> {
    return option.isSome()
  }

  export function isNone<T>(option: Option<T>): option is None {
    return option.isNone()
  }

  export function fromNullable<T>(value: T): Option<NonNullable<T>> {
    return value != null ? OuterSome(value) : OuterNone
  }

  export function fromBoolean(value: boolean): Option<void> {
    return value ? UndefinedSome : OuterNone
  }

  export function fromFalsifiable<T>(value: T): TruthyOption<T> {
    return (Boolean(value) ? OuterSome(value) : OuterNone) as TruthyOption<T>
  }

  export function fromCall<T>(callback: () => T): Option<T> {
    try {
      return OuterSome(callback())
    } catch {
      return OuterNone
    }
  }

  export function filterSome<T extends OptionArray>(
    options: T
  ): Array<AnySomeType<T>> {
    return options.filter(isSome).map((some) => some.value)
  }

  export function all<T extends OptionArray>(options: T): Option<SomeTypes<T>> {
    const values: Array<AnySomeType<T>> = []
    for (const option of options) {
      if (option.isNone()) {
        return OuterNone
      }
      values.push(option.value)
    }
    return OuterSome(values as SomeTypes<T>)
  }

  export function any<T extends OptionArray>(
    options: T
  ): Option<AnySomeType<T>> {
    return options.find(isSome) ?? OuterNone
  }

  export function fold<T extends OptionArray>(
    options: T,
    func: (
      c: AnySomeType<T>,
      v: AnySomeType<T>,
      i: number,
      a: Array<AnySomeType<T>>
    ) => AnySomeType<T>
  ): Option<AnySomeType<T>> {
    const values = filterSome(options)
    if (values.length === 0) {
      return OuterNone
    }
    return OuterSome(values.reduce(func))
  }

  export function reduce<T extends OptionArray, U>(
    options: T,
    func: (c: U, v: AnySomeType<T>, i: number, a: Array<AnySomeType<T>>) => U,
    init: U
  ): U {
    return filterSome(options).reduce(func, init)
  }
}
