import type { z } from 'zod/v4';
import type BaseGenerator from './BaseGenerator';

export default class UndefinedGenerator<T extends z.ZodUndefined> implements BaseGenerator<T> {
  public generate() {
    return undefined;
  }
}
