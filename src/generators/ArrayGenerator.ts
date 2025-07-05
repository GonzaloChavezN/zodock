import * as z from 'zod/v4/core';
import MockGenerator from '../MockGenerator';
import { DepthLimitError } from '../errors/DepthLimitError';
import type BaseGenerator from './BaseGenerator';

const DEFAULT_LENGTH = 3;
export default class ArrayGenerator<T extends z.$ZodArray> implements BaseGenerator<T> {
  public generate(schema: T) {
    const length = this.getLength(schema);

    try {
      const mockGenerator = new MockGenerator(schema._zod.def.element);
      return Array.from({ length }, () => mockGenerator.generate()) as z.infer<T>;
    }
    catch (e) {
      if (e instanceof DepthLimitError) {
        return [] as z.infer<T>;
      }
      throw e;
    }
  }

  private getLength(schema: T): number {
    const checks = schema._zod.def.checks || [];

    for (const check of checks) {
      if (check instanceof z.$ZodCheckMinLength) {
        return Math.max(DEFAULT_LENGTH, check._zod.def.minimum);
      }
      else if (check instanceof z.$ZodCheckMaxLength) {
        return Math.min(DEFAULT_LENGTH, check._zod.def.maximum);
      }
      else if (check instanceof z.$ZodCheckLengthEquals) {
        return check._zod.def.length;
      }
    }

    return DEFAULT_LENGTH;
  }
}
