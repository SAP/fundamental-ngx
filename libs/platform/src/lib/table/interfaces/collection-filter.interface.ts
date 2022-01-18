import {
    FilterStrategy,
    FilterDateStrategy,
    FilterNumberStrategy,
    FilterStringStrategy,
    FilterBooleanStrategy,
    FilterDefaultStrategy,
    FilterableColumnDataType
} from '../enums';

interface BaseCollectionFilter<T> {
    field: string;
    type?: FilterableColumnDataType;
    value: T;
    value2?: T;
    exclude?: boolean;
    strategy?: FilterStrategy;
}
export interface CollectionStringFilter extends BaseCollectionFilter<string> {
    strategy: FilterStringStrategy;
}

export interface CollectionNumberFilter extends BaseCollectionFilter<number> {
    strategy: FilterNumberStrategy;
}

export interface CollectionDateFilter<D = any> extends BaseCollectionFilter<D> {
    strategy: FilterDateStrategy;
}

export interface CollectionBooleanFilter extends BaseCollectionFilter<boolean> {
    strategy: FilterBooleanStrategy;
}

export interface CollectionSelectFilter extends BaseCollectionFilter<any[]> {
    strategy: FilterDefaultStrategy;
}

export interface CollectionCustomFilter extends BaseCollectionFilter<{ [key: string]: any }> {
    strategy: FilterDefaultStrategy;
}

export type CollectionFilter =
    | CollectionStringFilter
    | CollectionNumberFilter
    | CollectionDateFilter
    | CollectionSelectFilter
    | CollectionBooleanFilter
    | CollectionCustomFilter;

export type CollectionFilterGroupStrategy = 'and' | 'or';

export type CollectionFilterAndGroup = CollectionFilter | CollectionFilterGroup;

export interface CollectionFilterGroup {
    filters: CollectionFilter[];
    strategy: CollectionFilterGroupStrategy;
    field: string;
}
