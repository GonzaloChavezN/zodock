import { describe, test } from 'vitest';
import { z } from 'zod/v4';
import { expect } from './utils/expect';

describe('Boolean', () => {
  test('base', () => {
    const schema = z.boolean();

    expect(schema);
  });
});
