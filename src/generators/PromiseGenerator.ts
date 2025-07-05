import type * as z from 'zod/v4/core';
import MockGenerator from '../MockGenerator';
import type BaseGenerator from './BaseGenerator';

export default class PromiseGenerator<T extends z.$ZodPromise<z.$ZodType>> implements BaseGenerator<T> {
  public generate(schema: T) {
    const mockGenerator = new MockGenerator(schema._zod.def.innerType);
    const generated = mockGenerator.generate();
    return Promise.resolve(generated) as z.infer<T>;
  }
}
