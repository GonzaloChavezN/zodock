import type * as z from 'zod/v4/core';
import MockGenerator from '../MockGenerator';
import type BaseGenerator from './BaseGenerator';

export default class NullableGenerator<T extends z.$ZodNullable> implements BaseGenerator<T> {
  public generate(schema: T) {
    if (Math.random() > 0.5) {
      return null;
    }

    const generator = new MockGenerator(schema._zod.def.innerType);
    return generator.generate() as any;
  }
}
