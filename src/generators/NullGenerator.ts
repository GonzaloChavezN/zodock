import type { z } from 'zod/v4';
import type BaseGenerator from './BaseGenerator';

export default class NullGenerator<T extends z.ZodNull> implements BaseGenerator<T> {
  public generate() {
    return null;
  }
}
