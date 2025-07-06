import type * as z from 'zod/v4/core';
import MockGenerator from '../MockGenerator';
import type BaseGenerator from './BaseGenerator';

export default class LazyGenerator<T extends z.$ZodLazy> implements BaseGenerator<T> {
  public generate(schema: T): z.infer<T> {
    const mockGenerator = new MockGenerator(schema._zod.def.getter());
    return mockGenerator.generate() as z.infer<T>;
  }
}
