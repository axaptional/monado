export function isString<L extends string>(
  literal: L
): (value: string) => value is L {
  return (value: string): value is L => value === literal
}
