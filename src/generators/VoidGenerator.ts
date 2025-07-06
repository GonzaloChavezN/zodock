import type { z } from 'zod/v4';
import type BaseGenerator from './BaseGenerator';

export default class VoidGenerator<T extends z.ZodVoid> implements BaseGenerator<T> {
  // @ts-expect-error it's a void type, so it should not have any properties
  public generate() {
    void 0;
  }
}
