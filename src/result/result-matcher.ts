export type ResultMatcher<T, E, O, R> = {
  Ok: (value: T) => O
  Err: (error: E) => R
}
