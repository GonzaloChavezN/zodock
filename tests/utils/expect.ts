import * as z from 'zod/v4/core';
import { expect as viExpect } from 'vitest';
import { createMock } from '../../src';

export function expect<T extends z.$ZodType>(schema: T) {
  const mock = createMock(schema);
  return viExpect(z.safeParse(schema, mock).success).toBe(true);
}
