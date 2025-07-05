import type * as z from 'zod/v4/core';
import type BaseGenerator from './BaseGenerator';

export default class LiteralGenerator<T extends z.$ZodLiteral> implements BaseGenerator<T> {
  public generate(schema: T) {
    const { values } = schema._zod.def;
    return values[Math.floor(Math.random() * values.length)] as z.infer<T>;
  }
}
