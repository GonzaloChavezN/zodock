import * as z from 'zod/v4/core';
import MockGenerator from '../MockGenerator';
import type BaseGenerator from './BaseGenerator';

export default class UnionGenerator<const TOptions extends z.$ZodType[], const T extends z.$ZodUnion<TOptions>> implements BaseGenerator<T> {
  public generate(schema: T) {
    const { options } = schema._zod.def;

    const filteredOptions = options.filter((option) => {
      if (!(option instanceof z.$ZodUnion)) {
        return true;
      }
      return option._zod.def.options.length > 0;
    });

    if (filteredOptions.length === 0) {
      throw new Error('No valid options available for UnionGenerator');
    }

    const randomIndex = Math.floor(Math.random() * filteredOptions.length);
    const randomOption = filteredOptions[randomIndex];

    const mockGenerator = new MockGenerator(randomOption);
    return mockGenerator.generate() as z.infer<T>;
  }
}
