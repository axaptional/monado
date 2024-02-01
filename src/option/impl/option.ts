import { Ponad } from '../../core'
import type { NoValueError } from '../../core/error'
import type { Result } from '../../result'
import type { FlatOption } from '../helpers'
import type { Option } from '../option'
import type { OptionMatcher } from '../option-matcher'
import type { None } from './none'
import type { Some } from './some'

export abstract class OptionImpl<T> extends Ponad<T, void> {
  /**
   * Returns <code>None</code> if this <code>{@link Option}</code> is
   * <code>None</code> or does not match the given predicate,
   * this <code>Option</code> (which then must be <code>Some</code>) otherwise.
   * @param pred - The predicate to apply to the <code>Some</code> value
   * @since 0.1.0
   */
  abstract filter(pred: (value: T) => boolean): Option<T>

  /**
   * Returns a supplied <code>{@link Option}</code> if this <code>Option</code>
   * is <code>Some</code>, <code>None</code> otherwise.
   * @param func - The function supplying the <code>Option</code> to return if
   *               this <code>Option</code> is <code>Some</code>
   * @since 0.1.0
   */
  abstract flatMap<U>(func: (value: T) => Option<U>): Option<U>

  /**
   * Returns an <code>{@link Option}</code> resulting from recursively unnesting
   * this <code>Option</code>, mapping <code>Some(Some(x))</code> to
   * <code>Some(x)</code> and <code>Some(None)</code> to <code>None</code>,
   * with <code>None</code> instances returned as-is.
   * @since 0.1.0
   */
  abstract flatten(): FlatOption<Option<T>>

  /**
   * Returns <code>ifSome(value)</code> if this <code>{@link Option}</code> is
   * <code>Some(value)</code>, <code>ifNone()</code> otherwise.
   * @param ifSome - The function mapping <code>Some</code> values to target
   *                 values
   * @param ifNone - The function mapping <code>None</code> to target values
   * @since 0.1.0
   */
  abstract override fold<S, N>(ifSome: (value: T) => S, ifNone: () => N): S | N

  /**
   * Returns <code>true</code> and narrows down the type of this
   * <code>{@link Option}</code> to <code>None</code> if it is
   * <code>None</code>, else returns <code>false</code> and narrows it down to
   * <code>Some</code>.
   * @since 0.1.0
   */
  abstract isNone(): this is None

  /**
   * Returns <code>true</code> and narrows down the type of this
   * <code>{@link Option}</code> to <code>Some</code> if it is
   * <code>Some</code>, else returns <code>false</code> and narrows it down to
   * <code>None</code>.
   * @since 0.1.0
   */
  abstract isSome(): this is Some<T>

  /**
   * Returns <code>Some(transform(value))</code> if this
   * <code>{@link Option}</code> is <code>Some(value)</code>,
   * <code>None</code> otherwise.
   * @param transform - The function mapping <code>Some</code> values to target
   *                    <code>Some</code> values
   * @since 0.1.0
   */
  abstract map<U>(transform: (value: T) => U): Option<U>

  /**
   * Returns <code>Some(transform(value))</code> if this
   * <code>{@link Option}</code> is <code>Some(value)</code> and
   * <code>pred(value)</code> is <code>true</code>,
   * this <code>Option</code> otherwise.
   *
   * Note that this is *not* semantically equivalent to calling
   * <code>filter</code> and <code>map</code> in succession
   * (which would instead return <code>None</code>
   * if the value failed the predicate test).
   * @param pred - The predicate that determines which values get mapped
   * @param transform - The function mapping <code>Some</code> values to target
   *                    <code>Some</code> values
   * @since 0.1.0
   */
  abstract mapIf<U>(
    pred: (value: T) => boolean,
    transform: (value: T) => U
  ): Option<T | U>

  /**
   * Returns <code>Some(value[key])</code> if this
   * <code>{@link Option}</code> is <code>Some(value)</code>,
   * <code>None</code> otherwise.
   *
   * This is a shorthand for <code>map((v) => v[key])</code>.
   * @param key - The key to use for the mapping.
   * @since 0.1.0
   */
  abstract mapPick<K extends keyof T>(key: K): Option<T[K]>

  /**
   * Uses the given matcher to determine the returned value.
   * This is often easier to read and maintain than using
   * <code>fold</code> or <code>map</code> and <code>orMap</code>.
   * @param matcher - The matcher to use.
   * @since 0.1.0
   */
  abstract match<S, N>(matcher: OptionMatcher<T, S, N>): S | N

  /**
   * Uses the given predicate to narrow down the type of this
   * <code>{@link Option}</code> value if it is <code>Some(value)</code>,
   * <code>None</code> otherwise.
   * @param pred - The type predicate for the target type
   * @since 0.1.0
   */
  abstract narrow<U extends T>(pred: (value: T) => value is U): Option<U>

  /**
   * Returns this <code>{@link Option}</code> if it is <code>Some</code>,
   * <code>func()</code> otherwise.
   * @param func - The function supplying the <code>Option</code> to return if
   *               this <code>Option</code> is <code>None</code>
   * @since 0.1.0
   */
  abstract or<U>(func: () => Option<U>): Option<T | U>

  /**
   * Returns <code>value</code> if this
   * <code>{@link Option}</code> is <code>Some(value)</code>,
   * <code>ifNone()</code> otherwise.
   * @param ifNone - The function mapping <code>None</code> to target values
   * @since 0.1.0
   */
  abstract override orMap<U>(ifNone: () => U): T | U

  /**
   * Calls the given function with <code>value</code> if and only if this
   * <code>{@link Option}</code> is <code>Some(value)</code>.
   * Returns this <code>Option</code> unchanged.
   * @param func - The function to call if this <code>Option</code> is
   *               <code>Some</code>
   * @since 0.1.0
   */
  abstract tap(func: (value: T) => void): Option<T>

  /**
   * Calls the given function if and only if this <code>{@link Option}</code> is
   * <code>None</code>. Returns this <code>Option</code> unchanged.
   * @param func - The function to call if this <code>Option</code> is
   *               <code>None</code>
   * @since 0.1.0
   */
  abstract tapNone(func: () => void): Option<T>

  /**
   * Returns a positive <code>{@link Result}</code> with this
   * <code>{@link Option}</code>'s <code>value</code> if it is
   * <code>Some(value)</code>, a negative <code>Result</code> with a
   * <code>{@link NoValueError}</code> otherwise.
   * @since 0.1.0
   */
  abstract toResult(): Result<T, NoValueError>
}
