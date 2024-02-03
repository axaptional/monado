import { None as NoneImpl } from './impl'

export interface None extends NoneImpl {}

export const None: None = NoneImpl.INSTANCE
