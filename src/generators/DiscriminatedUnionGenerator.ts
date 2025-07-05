import type * as z from 'zod/v4/core';
import MockGenerator from '../MockGenerator';
import type BaseGenerator from './BaseGenerator';

export default class DiscriminatedUnionGenerator<T extends z.$ZodDiscriminatedUnion> implements BaseGenerator<T> {
  public generate(schema: T) {
    const { options } = schema._zod.def;
    const randomOption = options[Math.floor(Math.random() * options.length)];

    const mockGenerator = new MockGenerator(randomOption);
    return mockGenerator.generate() as z.infer<T>;
  }
}
