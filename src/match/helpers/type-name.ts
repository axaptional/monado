export function typeName(value: unknown): string {
  if (value === null) {
    return 'null'
  }
  if (
    ['bigint', 'boolean', 'number', 'string', 'symbol', 'undefined'].includes(
      typeof value
    )
  ) {
    return typeof value
  }
  if (typeof value === 'object') {
    if (typeof value.constructor === 'function') {
      return value.constructor.name
    }
    const entriesText = Object.entries(value)
      .map(([key, value]) => `${key}: ${typeName(value)}`)
      .join(', ')
    return `{ ${entriesText} }`
  }
  if (typeof value === 'function') {
    const paramText = Array.from(
      { length: value.length },
      (i) => `arg${i}: any`
    ).join(', ')
    return `(${paramText}) => any`
  }
  return 'any'
}
