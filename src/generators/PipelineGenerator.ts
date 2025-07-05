import type * as z from 'zod/v4/core';
import MockGenerator from '../MockGenerator';
import type BaseGenerator from './BaseGenerator';

export default class PipelineGenerator<T extends z.$ZodPipe> implements BaseGenerator<T> {
  public generate(schema: T) {
    const { out: outSchema, in: inSchema } = schema._zod.def;
    if (outSchema._zod.def.type === 'transform') {
      const inGenerated = new MockGenerator(inSchema).generate();
      return inGenerated as z.infer<T>;
    }
    const outGenerated = new MockGenerator(outSchema).generate();
    return outGenerated as z.infer<T>;
  }
}
