/**
 * An optional function, that identifies uniqueness of a particular row.
 * Table component uses it to be able to preserve selection when data list is changed.
 */
export type RowComparator<T = any> = (left: T, right: T) => boolean;
