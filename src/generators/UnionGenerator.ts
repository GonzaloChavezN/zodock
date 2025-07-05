import type * as z from 'zod/v4/core';
import MockGenerator from '../MockGenerator';
import type BaseGenerator from './BaseGenerator';

export default class UnionGenerator<const TOptions extends z.$ZodType[], const T extends z.$ZodUnion<TOptions>> implements BaseGenerator<T> {
  public generate(schema: T) {
    const { options } = schema._zod.def;
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomOption = options[randomIndex];

    const mockGenerator = new MockGenerator(randomOption);
    return mockGenerator.generate() as z.infer<T>;
  }
}
