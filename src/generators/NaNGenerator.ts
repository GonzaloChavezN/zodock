import type { z } from 'zod/v4';
import type BaseGenerator from './BaseGenerator';

export default class NaNGenerator<T extends z.ZodNaN> implements BaseGenerator<T> {
  public generate() {
    return NaN as z.infer<T>;
  }
}
