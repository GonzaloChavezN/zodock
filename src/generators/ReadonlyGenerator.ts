import type * as z from 'zod/v4/core';
import MockGenerator from '../MockGenerator';
import type BaseGenerator from './BaseGenerator';

export default class ReadonlyGenerator<T extends z.$ZodType, U extends z.$ZodReadonly<T>> implements BaseGenerator<U> {
  public generate(schema: U) {
    const mockGenerator = new MockGenerator(schema._zod.def.innerType);
    return Object.freeze(mockGenerator.generate()) as z.infer<U>;
  }
}
