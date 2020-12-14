import { CollectionDateFilterStrategy, CollectionNumberFilterStrategy, CollectionStringFilterStrategy } from '../enums';

export interface CollectionStringFilter {
    field: string;
    value: string;
    value2?: string;
    strategy: CollectionStringFilterStrategy;
}

export interface CollectionNumberFilter {
    field: string;
    value: number;
    value2?: number;
    strategy: CollectionNumberFilterStrategy;
}

export interface CollectionDateFilter {
    field: string;
    value: Date;
    value2?: Date;
    strategy: CollectionDateFilterStrategy;
}

export interface CollectionBooleanFilter {
    field: string;
    value: boolean;
}

export interface CollectionSelectFilter {
    field: string;
    value: any[];
}

export interface CollectionCustomFilter {
    field: string;
    value: { [key: string]: any };
}

export type CollectionFilter =
    | CollectionStringFilter
    | CollectionNumberFilter
    | CollectionDateFilter
    | CollectionSelectFilter
    | CollectionBooleanFilter
    | CollectionCustomFilter;
