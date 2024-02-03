import type { Result } from '../result'
import type { OkType } from './ok-type'

export type OkTypes<T extends ReadonlyArray<Result<any, any>>> = {
  -readonly [P in keyof T]: OkType<T[P]>
}
