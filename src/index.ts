import * as z from 'zod/v4/core';
import MockGenerator from './MockGenerator';

function createMock<Schema extends z.$ZodType>(schema: Schema): z.infer<Schema> {
  if (typeof schema === 'function') {
    throw new TypeError('You must pass a schema to createMock');
  }

  const mockGenerator = new MockGenerator(schema);
  return z.parse(schema, mockGenerator.generate(), {});
}

export { createMock };
