import * as z from 'zod/v4/core';
import type BaseGenerator from './BaseGenerator';

export default class BigIntGenerator<T extends z.$ZodBigInt> implements BaseGenerator<T> {
  public generate(schema: T) {
    let bigInt = BigInt(1);

    if (schema._zod.def.checks && schema._zod.def.checks.length > 0) {
      for (const check of schema._zod.def.checks) {
        if (check instanceof z.$ZodCheckGreaterThan) {
          const { value } = check._zod.def;
          if (typeof value === 'bigint') {
            bigInt = BigInt(value) + 1n;
          }
          else if (typeof value === 'number') {
            bigInt = BigInt(value) + 1n;
          }
        }
        else if (check instanceof z.$ZodCheckLessThan) {
          const { value } = check._zod.def;

          if (typeof value === 'bigint') {
            const maxBigInt = BigInt(value) - 1n;
            bigInt = maxBigInt;
          }
          else if (typeof value === 'number') {
            const maxBigInt = BigInt(value) - 1n;
            bigInt = maxBigInt;
          }
        }
        else if (check instanceof z.$ZodCheckMultipleOf) {
          if (typeof check._zod.def.value === 'bigint') {
            bigInt = BigInt(bigInt % check._zod.def.value === 0n ? bigInt : bigInt - (bigInt % check._zod.def.value));
          }
          else if (typeof check._zod.def.value === 'number') {
            bigInt = BigInt(bigInt % BigInt(check._zod.def.value) === 0n ? bigInt : bigInt - (bigInt % BigInt(check._zod.def.value)));
          }
        }
      }
    }

    return bigInt as z.infer<T>;
  }
}
