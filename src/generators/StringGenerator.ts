import * as z from 'zod/v4/core';
import type BaseGenerator from './BaseGenerator';

export default class StringGenerator<T extends z.$ZodString> implements BaseGenerator<T> {
  public generate(schema: T) {
    let string = this.getRandomString();

    if (schema instanceof z.$ZodUUID) {
      string = this.getRandomUUID();
    }
    else if (schema instanceof z.$ZodEmail) {
      string = this.getRandomEmail();
    }
    else if (schema instanceof z.$ZodISODateTime) {
      string = new Date().toISOString();
    }
    else if (schema instanceof z.$ZodURL) {
      string = `https://${this.getRandomString()}.com`;
    }
    else if (schema instanceof z.$ZodEmoji) {
      string = '😀';
    }
    else if (schema instanceof z.$ZodIPv4 || schema instanceof z.$ZodIPv6) {
      string = this.getRandomIP(schema._zod.def.version!);
    }

    if (schema._zod.def.checks && schema._zod.def.checks.length > 0) {
      for (const check of schema._zod.def.checks) {
        if (check instanceof z.$ZodCheckStartsWith) {
          string = `${check._zod.def.prefix}${string}`;
        }
        else if (check instanceof z.$ZodCheckEndsWith) {
          string = `${string}${check._zod.def.suffix}`;
        }
        else if (check instanceof z.$ZodCheckIncludes) {
          string = `${check._zod.def.includes}${string}`;
        }
        if (check instanceof z.$ZodCheckMinLength) {
          string = string.padEnd(check._zod.def.minimum, 'x');
        }
        if (check instanceof z.$ZodCheckMaxLength) {
          string = string.slice(0, check._zod.def.maximum);
        }
        if (check instanceof z.$ZodCheckLengthEquals) {
          string = string.slice(0, check._zod.def.length);
          string = string.padEnd(check._zod.def.length, 'x');
        }
      }
    }

    return string as z.infer<T>;
  }

  public getRandomEmail(): string {
    const email = `${this.getRandomString()}@${this.getRandomString()}.com`;
    return email;
  }

  public getRandomString(): string {
    return Array.from({ length: 50 }, () => Math.floor(Math.random() * 36).toString(36)).join('');
  }

  public getRandomUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  public getRandomIP(version: 'v4' | 'v6'): string {
    if (version === 'v4') {
      return [0, 0, 0, 0].map(() => Math.floor(Math.random() * 256)).join('.');
    }
    return [0, 0, 0, 0, 0, 0, 0, 0].map(() => Math.floor(Math.random() * 65536).toString(16)).join(':');
  }
}
