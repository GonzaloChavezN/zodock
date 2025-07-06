import type * as z from 'zod/v4/core';
import MockGenerator from '../MockGenerator';
import type BaseGenerator from './BaseGenerator';

export default class RecordGenerator<T extends z.$ZodRecord> implements BaseGenerator<T> {
  public generate(schema: T) {
    const keyGenerated = new MockGenerator(schema._zod.def.keyType).generate();
    const valueGenerated = new MockGenerator(schema._zod.def.valueType).generate();

    return { [keyGenerated]: valueGenerated } as z.infer<T>;
  }
}
