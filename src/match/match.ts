import { Option } from '../option'
import { Result } from '../result'
import { OptionMatch } from './option-match'
import { ResultMatch } from './result-match'
import { ValueMatch } from './value-match/value-match'

type Match<T> =
  T extends Option<infer TT>
    ? OptionMatch<TT>
    : T extends Result<infer TT, infer TE>
      ? ResultMatch<TT, TE>
      : ValueMatch<T>

export function match<T>(value: T): Match<T> {
  if (Option.isOption(value)) {
    return new OptionMatch(value) as Match<T>
  }
  if (Result.isResult(value)) {
    return new ResultMatch(value) as Match<T>
  }
  return new ValueMatch(value) as Match<T>
}
