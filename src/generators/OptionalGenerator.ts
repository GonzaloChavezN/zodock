import type { z } from 'zod/v4';
import type BaseGenerator from './BaseGenerator';

export default class OptionalGenerator<TOptional extends z.ZodTypeAny, T extends z.ZodOptional<TOptional>> implements BaseGenerator<T> {
  public generate() {
    return undefined as z.infer<T>;
  }
}
