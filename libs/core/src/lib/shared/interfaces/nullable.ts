/** Makes the provided type nullable */
export type Nullable<T> = T | null | undefined;

/** Makes each property of an object optional and nullable */
export type NullableObject<T> = { [P in keyof T]?: Nullable<T[P]>; }

