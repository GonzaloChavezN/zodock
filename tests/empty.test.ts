import { describe, test } from 'vitest';
import { z } from 'zod/v4';
import { expect } from './utils/expect';

describe('Empty types', () => {
  test('null', () => {
    const schema = z.null();

    expect(schema);
  });
  test('undefined', () => {
    const schema = z.undefined();

    expect(schema);
  });
});
