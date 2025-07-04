import type { z } from 'zod/v4';
import type BaseGenerator from './BaseGenerator';

export default class BooleanGenerator<T extends z.ZodBoolean> implements BaseGenerator<T> {
  public generate() {
    return Math.random() >= 0.5;
  }
}
