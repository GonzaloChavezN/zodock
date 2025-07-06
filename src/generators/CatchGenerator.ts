import type * as z from 'zod/v4/core';
import MockGenerator from '../MockGenerator';
import type BaseGenerator from './BaseGenerator';

export default class CatchGenerator<T extends z.$ZodCatch> implements BaseGenerator<T> {
  public generate(schema: T) {
    const mockGenerator = new MockGenerator(schema._zod.def.innerType);
    return mockGenerator.generate() as z.infer<T>;
  }
}
