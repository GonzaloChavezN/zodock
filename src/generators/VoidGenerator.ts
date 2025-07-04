import type { z } from 'zod/v4';
import type BaseGenerator from './BaseGenerator';

export default class VoidGenerator<T extends z.ZodVoid> implements BaseGenerator<T> {
  public generate() {
    void 0;
  }
}
