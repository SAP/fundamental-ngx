export type FilterFields<Base, Condition> = {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

export type AllowedFields<Base, Condition> = FilterFields<Base, Condition>[keyof Base];

export type AllowedMapOrNothing<Base, Condition, ValueType = any> = Condition extends Base[keyof Base]
    ? {
          [EntityField in AllowedFields<Base, Condition>]: ValueType;
      }
    : never;

export type Type<T> = new (...args: any[]) => T;

type DictionaryValues<Dictionary> = Dictionary[keyof Dictionary];

type TargetIncludeConditionBooleanMap<Target extends {}, ConditionalFieldValue> = {
    [K in keyof Target]: Target[K] extends ConditionalFieldValue ? true : false;
};

export type IfTargetIncludeConditionType<
    Target extends {},
    ConditionalFieldValue,
    TypeIfTrue,
    TypeIfFalse
> = true extends DictionaryValues<TargetIncludeConditionBooleanMap<Target, ConditionalFieldValue>>
    ? TypeIfTrue
    : TypeIfFalse;
