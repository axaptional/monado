import type { Result } from '../result'

export type OkType<T> = T extends Result<infer TT, any> ? TT : never
