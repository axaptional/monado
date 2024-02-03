export type ValueIfCovered<E, R> = Exclude<E, never> extends never ? R : never
