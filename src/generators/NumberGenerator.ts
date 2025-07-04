import type { z } from 'zod/v4';
import type BaseGenerator from './BaseGenerator';

export default class NumberGenerator<T extends z.ZodNumber> implements BaseGenerator<T> {
  public generate(schema: T) {
    let number: z.infer<T> = this.randomInt();

    if (schema._def.checks && schema._def.checks.length > 0) {
      for (const check of schema._def.checks) {
        switch (check.kind) {
          case 'int':
          case 'finite':
            number = this.randomInt();
            break;
          case 'min':
            number = check.value + 1;
            break;
          case 'max':
            number = check.value - 1;
            break;
          case 'multipleOf':
            number = check.value;
            break;
        }
      }
    }

    return number;
  }

  private randomInt() {
    return Math.floor(Math.random() * 1000);
  }
}
