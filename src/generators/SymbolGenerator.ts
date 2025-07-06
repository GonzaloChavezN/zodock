import type { z } from 'zod/v4';
import type BaseGenerator from './BaseGenerator';

export default class SymbolGenerator<T extends z.ZodSymbol> implements BaseGenerator<T> {
  public generate() {
    return Symbol('symbol') as z.infer<T>;
  }
}
