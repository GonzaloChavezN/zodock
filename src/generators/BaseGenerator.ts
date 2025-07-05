import type * as z from 'zod/v4/core';

export default abstract class BaseGenerator<T extends z.$ZodType> {
  public abstract generate(schema: T): z.infer<T>;
}
