import { describe, test } from 'vitest';
import { z } from 'zod/v4';
import { expect } from './utils/expect';

describe('Union', () => {
  test('base', () => {
    const schema = z.union([z.string(), z.number(), z.boolean(), z.literal('')]);

    expect(schema);
  });

  test('union with empty union', () => {
    const schema = z.union([z.string(), z.number(), z.boolean(), z.literal(''), z.union([])]);

    expect(schema);
  });
});
