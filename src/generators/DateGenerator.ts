import * as z from 'zod/v4/core';
import type BaseGenerator from './BaseGenerator';

export default class DateGenerator<T extends z.$ZodDate> implements BaseGenerator<T> {
  public generate(schema: T) {
    let date = new Date();

    if (schema._zod.def.checks && schema._zod.def.checks.length > 0) {
      for (const check of schema._zod.def.checks) {
        if (check instanceof z.$ZodCheckGreaterThan) {
          if (check._zod.def.value instanceof Date) {
            date = new Date(check._zod.def.value);
          }
          else if (typeof check._zod.def.value === 'number') {
            date = new Date(check._zod.def.value);
          }
        }
        else if (check instanceof z.$ZodCheckLessThan) {
          if (check._zod.def.value instanceof Date) {
            const maxDate = new Date(check._zod.def.value);
            if (date > maxDate) {
              date = maxDate;
            }
          }
          else if (typeof check._zod.def.value === 'number') {
            const maxDate = new Date(check._zod.def.value);
            if (date > maxDate) {
              date = maxDate;
            }
          }
        }
      }
    }

    return date as z.infer<T>;
  }
}
