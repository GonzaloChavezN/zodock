import type { z } from 'zod/v4';
import type BaseGenerator from './BaseGenerator';

export default class EnumGenerator<T extends z.ZodEnum<any>> implements BaseGenerator<T> {
  public generate(schema: T) {
    const { values } = schema._def;
    return values[Math.floor(Math.random() * values.length)];
  }
}
