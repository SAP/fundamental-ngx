export type TreeLike<T> = T & {
    _children?: TreeLike<T>[];
};

export interface GroupTableRowValueType {
    field: string;
    value: unknown;
    count: number;
}
