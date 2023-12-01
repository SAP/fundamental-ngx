export type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
        ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
        : `${Key}`;
}[keyof ObjectType & (string | number)];

export type ObjectPathType<T, K extends keyof T | string> = K extends keyof T
    ? T[K]
    : K extends `${infer First}.${infer Rest}`
      ? First extends keyof T
          ? ObjectPathType<T[First], Rest>
          : never
      : never;
