export type PrimitiveConstructorMapping<C> = C extends NumberConstructor
  ? number
  : C extends StringConstructor
    ? string
    : C extends BooleanConstructor
      ? boolean
      : C extends SymbolConstructor
        ? symbol
        : C extends BigIntConstructor
          ? bigint
          : C extends ArrayConstructor
            ? any[]
            : C extends ObjectConstructor
              ? object
              : C extends null
                ? null
                : C extends undefined
                  ? undefined
                  : never
