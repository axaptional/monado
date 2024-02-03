/**
 * @typedef {import('../../result').Result} Result
 */

/**
 * Represents an <code>{@link AggregateError}</code> with a typed error
 * aggregation.
 * <p>
 * Commonly used with tuple types when dealing with <code>{@link Result}</code>
 * values.
 * <p>
 * <code>TypedAggregateError</code> is a subclass of
 * <code>AggregateError</code>.
 * @since 0.1.0
 */
export class TypedAggregateError<T extends any[]> extends AggregateError {
  /**
   * Instantiates a new <code>{@link TypedAggregateError}</code> with the given
   * errors and optional message.
   * @param errors - The array of element errors.
   * @param [message] - An optional message.
   * @since 0.1.0
   */
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(errors: T, message?: string) {
    super(errors, message)
  }

  /**
   * An array representing the typed aggregated errors.
   * <p>
   * To ensure type-compatibility, the underlying errors are still writable if
   * this instance is used as a normal <code>{@link AggregateError}</code>, so
   * be careful when using instances of this class as normal
   * <code>AggregateError</code> objects.
   * @since 0.1.0
   */
  override get errors(): T {
    return super.errors as T
  }
}
