import * as z from 'zod/v4/core';
import type BaseGenerator from './BaseGenerator';

export default class NumberGenerator<T extends z.$ZodNumber> implements BaseGenerator<T> {
  public generate(schema: T) {
    let number = this.randomInt();

    if (schema._zod.def.checks && schema._zod.def.checks.length > 0) {
      for (const check of schema._zod.def.checks) {
        if (check instanceof z.$ZodCheckGreaterThan) {
          const { value } = check._zod.def;
          if (typeof value === 'number') {
            number = Math.max(number, value + 1);
          }
        }
        else if (check instanceof z.$ZodCheckLessThan) {
          const { value } = check._zod.def;
          if (typeof value === 'number') {
            number = Math.min(number, value - 1);
          }
        }
        else if (check instanceof z.$ZodCheckMultipleOf) {
          const multiple = check._zod.def.value;
          if (typeof multiple === 'number') {
            number = number - (number % multiple);
          }
        }
      }
    }

    return number as z.infer<T>;
  }

  private randomInt() {
    return Math.floor(Math.random() * 1000);
  }
}
