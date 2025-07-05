import type * as z from 'zod/v4/core';
import type BaseGenerator from './BaseGenerator';

export default class DefaultGenerator<T extends z.$ZodDefault> implements BaseGenerator<T> {
  generate(schema: T) {
    return schema._zod.def.defaultValue as z.infer<T>;
  }
}
