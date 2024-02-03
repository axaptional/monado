export type OptionMatcher<T, S, N> = {
  Some: (value: T) => S
  None: () => N
}
