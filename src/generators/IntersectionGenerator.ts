import * as z from 'zod/v4/core';
import MockGenerator from '../MockGenerator';
import type BaseGenerator from './BaseGenerator';

export default class IntersectionGenerator<T extends z.$ZodIntersection> implements BaseGenerator<T> {
  public generate(schema: T) {
    const { left, right } = schema._zod.def;

    if (left instanceof z.$ZodUnion && right instanceof z.$ZodUnion) {
      const leftDef = left._zod.def;
      const rightDef = right._zod.def;
      const sharedOptions = leftDef.options.filter((leftOption: z.$ZodType) => {
        return rightDef.options.some((rightOption: z.$ZodType) => rightOption._zod.def.type === leftOption._zod.def.type);
      });
      const randomIndex = Math.floor(Math.random() * sharedOptions.length);
      const randomOption = sharedOptions[randomIndex];

      const mockGenerator = new MockGenerator(randomOption);
      return mockGenerator.generate();
    }

    const leftGenerated = new MockGenerator(schema._zod.def.left).generate();
    const rightGenerated = new MockGenerator(schema._zod.def.right).generate();
    const merged = this.mergeValues(leftGenerated, rightGenerated);
    return merged;
  }

  private mergeValues(a: any, b: any): any {
    if (Array.isArray(a) && Array.isArray(b)) {
      const newArray = [];
      for (let i = 0; i < a.length; i++) {
        newArray.push(this.mergeValues(a[i], b[i]));
      }
      return newArray;
    }
    else if (a instanceof Date && b instanceof Date) {
      return a;
    }
    else if (typeof a === 'object' && typeof b === 'object') {
      return { ...a, ...b };
    }
    else {
      return a;
    }
  }
}
