import { describe, test } from 'vitest';
import { z } from 'zod/v4';
import { expect } from './utils/expect';

describe('Object', () => {
  test('base', () => {
    const schema = z.object({ foo: z.string(), bar: z.number() });

    expect(schema);
  });
  test('partial', () => {
    const schema = z.object({ foo: z.string(), bar: z.number() }).partial();

    expect(schema);
  });
  test('strict', () => {
    const schema = z.object({ foo: z.string(), bar: z.number() }).strict();

    expect(schema);
  });
  test('nonstrict', () => {
    const schema = z.object({ foo: z.string(), bar: z.number() }).strip();

    expect(schema);
  });
  test('passthrough', () => {
    const schema = z.looseObject({ foo: z.string(), bar: z.number() });

    expect(schema);
  });
  test('array', () => {
    const schema = z.object({ foo: z.string(), bar: z.number() }).array();

    expect(schema);
  });
});
