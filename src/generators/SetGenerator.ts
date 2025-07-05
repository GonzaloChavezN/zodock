import * as z from 'zod/v4/core';
import MockGenerator from '../MockGenerator';
import type BaseGenerator from './BaseGenerator';

export default class SetGenerator<T extends z.$ZodSet> implements BaseGenerator<T> {
  public generate(schema: T) {
    const valueGenerator = new MockGenerator(schema._zod.def.valueType);
    const generatedValue = valueGenerator.generate();

    const { checks } = schema._zod.def;

    const minSizeCheck = checks?.find((check) => {
      return (check instanceof z.$ZodCheckMinSize);
    });

    const sizeCheck = checks?.find((check) => {
      return (check instanceof z.$ZodCheckSizeEquals);
    });

    const minimumSize = minSizeCheck?._zod.def.minimum || sizeCheck?._zod.def.size || 0;

    if (minimumSize) {
      const set = new Set([generatedValue]);
      while (set.size < minimumSize) {
        set.add(valueGenerator.generate());
      }
      return set;
    }

    const maxSizeCheck = checks?.find((check) => {
      return (check instanceof z.$ZodCheckMaxSize);
    });
    if (maxSizeCheck) {
      const set = new Set();
      while (set.size < maxSizeCheck._zod.def.maximum) {
        set.add(valueGenerator.generate());
      }
      return set;
    }

    return new Set([generatedValue]);
  }
}
