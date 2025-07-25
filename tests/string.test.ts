import { describe, test } from 'vitest';
import { z } from 'zod/v4';
import { expect } from './utils/expect';

describe('String', () => {
  test('base', () => {
    const schema = z.string();

    expect(schema);
  });
  test('uuid', () => {
    const schema = z.uuid();

    expect(schema);
  });
  test('email', () => {
    const schema = z.email();

    expect(schema);
  });
  test('min', () => {
    const schema = z.string().min(10);

    expect(schema);
  });
  test('max', () => {
    const schema = z.string().max(10);

    expect(schema);
  });
  test('array', () => {
    const schema = z.string().array();

    expect(schema);
  });
  test('datetime', () => {
    const schema = z.iso.datetime();

    expect(schema);
  });
  test('length', () => {
    const schema = z.string().length(10);

    expect(schema);
  });
  test('url', () => {
    const schema = z.url();

    expect(schema);
  });
  test('emoji', () => {
    const schema = z.emoji();

    expect(schema);
  });
  test('ip', () => {
    const schemaV4 = z.ipv4({ version: 'v4' });
    const schemaV6 = z.ipv6({ version: 'v6' });

    expect(schemaV4);
    expect(schemaV6);
  });
  test('startsWith', () => {
    const schema = z.string().startsWith('__MARK__');

    expect(schema);
  });
  test('endsWith', () => {
    const schema = z.string().endsWith('__MARK__');

    expect(schema);
  });
  test('includes', () => {
    const schema = z.string().includes('__MARK__');

    expect(schema);
  });
});
