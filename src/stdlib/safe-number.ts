import { ConversionError } from '../core/error'
import { Ok, type Result } from '../result'

export namespace SafeNumber {
  export function parseInt(
    string: string,
    radix: number | 'infer' = 10
  ): Result<number, ConversionError> {
    return Ok(
      global.parseInt(string, radix === 'infer' ? void 0 : radix)
    ).filter(
      (value) => !Number.isNaN(value),
      () => new ConversionError(`"${string}" does not start with an integer`)
    )
  }

  export function floatToInt(float: number): Result<number, ConversionError> {
    return Ok(float).filter(
      Number.isSafeInteger,
      () => new ConversionError(`${float} is not an integer`)
    )
  }
}
