import type { Result } from '../result'
import type { OkType } from './ok-type'

export type AnyOkType<T extends ReadonlyArray<Result<any, any>>> = OkType<
  T[number]
>
