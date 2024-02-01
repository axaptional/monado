import type { Option } from '../option'

/**
 * A positive-or-negative-type monad-like object.
 * @since 0.1.0
 */
export abstract class Ponad<P, N> {
  constructor() {
    Object.freeze(this)
  }

  /**
   * If this wrapper is positive, returns <code>ifPos(positiveValue)</code>,
   * <code>ifNeg(negativeValue)</code> otherwise.
   * @param ifPos - A function mapping positive values to target values.
   * @param ifNeg - A function mapping negative values to target values.
   * @since 0.1.0
   */
  abstract fold<T, U>(ifPos: (value: P) => T, ifNeg: (value: N) => U): T | U

  /**
   * If this wrapper is positive, returns its positive value,
   * <code>defaultValue</code> otherwise.
   * @param defaultValue - A value to return if this is a negative instance.
   * @since 0.1.0
   */
  abstract orElse<U>(defaultValue: U): P | U

  /**
   * If this wrapper is positive, returns its positive value,
   * <code>ifNeg(negativeValue)</code> otherwise.
   * @param ifNeg - A function mapping negative values to target values.
   * @since 0.1.0
   */
  abstract orMap<U>(ifNeg: (value: N) => U): P | U

  /**
   * If this wrapper is positive, returns its positive value,
   * <code>null</code> otherwise.
   * @since 0.1.0
   */
  abstract orNull(): P | null

  /**
   * If this wrapper is positive, returns its positive value;
   * otherwise, throws an <code>{@link Error}</code>.
   * <p>
   * If no error mapping function is supplied, throws a
   * <code>{@link NoValueError}</code> by default.
   * @param [func] - An optional function supplying the error to throw.
   * @since 0.1.0
   */
  abstract orThrow(func?: () => Error): P | never

  /**
   * If this wrapper is positive, returns its positive value,
   * <code>undefined</code> otherwise.
   * @since 0.1.0
   */
  abstract orUndefined(): P | undefined

  /**
   * Returns this wrapper as an <code>{@link Option}</code>.
   * <p>
   * If this wrapper is negative, its negative value will be lost and mapped to
   * <code>None</code>.
   * @since 0.1.0
   */
  abstract toOption(): Option<P>

  /**
   * Returns this wrapper as a <code>{@link Promise}</code> that immediately
   * resolves with its positive value or rejects with its negative value.
   * @since 0.1.0
   */
  abstract toPromise(): Promise<P>

  /**
   * Returns a string representation of this wrapper.
   * <p>
   * This is equivalent to calling <code>toString()</code> on this wrapper's
   * values if they exist, otherwise a predetermined string will be returned.
   * @since 0.1.0
   */
  abstract toString(): string
}
