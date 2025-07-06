import type * as z from 'zod/v4/core';
import type BaseGenerator from './BaseGenerator';

export default class NullGenerator<T extends z.$ZodNull> implements BaseGenerator<T> {
  public generate() {
    return null as z.infer<T>;
  }
}
