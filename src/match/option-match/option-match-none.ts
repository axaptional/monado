import { None, type Option, Some } from '../../option'

export class OptionMatchNone<F> {
  constructor(
    private value: None,
    private result: Option<F>
  ) {}

  none<U>(then: () => U): F | U {
    return this.result
      .or(() => (this.value.isNone() ? Some(then()) : None))
      .orThrow()
  }
}
