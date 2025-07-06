import type * as z from 'zod/v4/core';
import StringGenerator from './generators/StringGenerator';
import type BaseGenerator from './generators/BaseGenerator';
import NumberGenerator from './generators/NumberGenerator';
import BooleanGenerator from './generators/BooleanGenerator';
import LiteralGenerator from './generators/LiteralGenerator';
import DateGenerator from './generators/DateGenerator';
import NullGenerator from './generators/NullGenerator';
import UndefinedGenerator from './generators/UndefinedGenerator';
import ObjectGenerator from './generators/ObjectGenerator';
import ArrayGenerator from './generators/ArrayGenerator';
import UnionGenerator from './generators/UnionGenerator';
import TuppleGenerator from './generators/TuppleGenerator';
import OptionalGenerator from './generators/OptionalGenerator';
import NaNGenerator from './generators/NaNGenerator';
import BigIntGenerator from './generators/BigIntGenerator';
import SymbolGenerator from './generators/SymbolGenerator';
import VoidGenerator from './generators/VoidGenerator';
import EnumGenerator from './generators/EnumGenerator';
import NullableGenerator from './generators/NullableGenerator';
import IntersectionGenerator from './generators/IntersectionGenerator';
import DefaultGenerator from './generators/DefaultGenerator';
import CatchGenerator from './generators/CatchGenerator';
import MapGenerator from './generators/MapGenerator';
import SetGenerator from './generators/SetGenerator';
import RecordGenerator from './generators/RecordGenerator';
import PipelineGenerator from './generators/PipelineGenerator';
import LazyGenerator from './generators/LazyGenerator';
import ReadonlyGenerator from './generators/ReadonlyGenerator';
import { DepthLimitError } from './errors/DepthLimitError';

const _schemasCache = new WeakMap<z.$ZodType, any>();
export default class MockGenerator<T extends z.$ZodType> {
  private generator: BaseGenerator<T>;
  private schema: T;
  private readonly MAX_DEPTH = 3;

  constructor(schema: T) {
    this.schema = schema;

    const generatorMap: Partial<Record<z.$ZodType['_zod']['def']['type'], any>> = {
      string: StringGenerator,
      number: NumberGenerator,
      boolean: BooleanGenerator,
      literal: LiteralGenerator,
      date: DateGenerator,
      null: NullGenerator,
      undefined: UndefinedGenerator,
      any: StringGenerator,
      unknown: StringGenerator,
      object: ObjectGenerator,
      array: ArrayGenerator,
      union: UnionGenerator,
      tuple: TuppleGenerator,
      optional: OptionalGenerator,
      nan: NaNGenerator,
      bigint: BigIntGenerator,
      symbol: SymbolGenerator,
      void: VoidGenerator,
      enum: EnumGenerator,
      nullable: NullableGenerator,
      intersection: IntersectionGenerator,
      default: DefaultGenerator,
      catch: CatchGenerator,
      map: MapGenerator,
      set: SetGenerator,
      record: RecordGenerator,
      pipe: PipelineGenerator,
      lazy: LazyGenerator,
      readonly: ReadonlyGenerator,
    };

    if (this.schema._zod.def.type in generatorMap) {
      this.generator = new generatorMap[this.schema._zod.def.type]();
      return;
    }

    throw new TypeError(`Unsupported schema type: ${this.schema.constructor.name}`);
  }

  public generate(): z.infer<T> {
    this.incrementRecursionCount();

    try {
      const generated = this.generator.generate(this.schema);
      return generated;
    }
    finally {
      this.decrementRecursionCount();
    }
  }

  private incrementRecursionCount(): void {
    const recursionCount = _schemasCache.get(this.schema) ?? 0;
    if (recursionCount > this.MAX_DEPTH) {
      throw new DepthLimitError();
    }

    _schemasCache.set(this.schema, recursionCount + 1);
  }

  private decrementRecursionCount(): void {
    const recursionCount = _schemasCache.get(this.schema) ?? 0;
    _schemasCache.set(this.schema, recursionCount - 1);
  }
}
