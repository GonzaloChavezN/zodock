import type * as z from 'zod/v4/core';
import type BaseGenerator from './BaseGenerator';

export default class EnumGenerator<T extends z.$ZodEnum<any>> implements BaseGenerator<T> {
  public generate(schema: T) {
    const { entries } = schema._zod.def;
    const options = Object.values(entries);

    return options[Math.floor(Math.random() * options.length)] as z.infer<T>;
  }
}
