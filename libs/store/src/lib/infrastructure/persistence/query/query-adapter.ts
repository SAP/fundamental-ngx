import { Injectable } from '@angular/core';
import { EntityType } from '../../../domain/public_api';
import {
    Predicate,
    EqPredicate,
    GePredicate,
    GtPredicate,
    LePredicate,
    LtPredicate,
    AndPredicate,
    OrPredicate
} from './grammar/predicate';
import { isQuerySnapshot, OrderBy, QuerySnapshot } from './query';

export { QuerySnapshot };

export interface QueryParams {
    [name: string]: string | string[];
}

/**
 * Query REST API Adapter.
 *
 * Converts Query to REST API query string
 */
export abstract class QueryAdapter<T> {
    /**
     * Check if passed data is query snapshot
     * @param payload Possible Query Snapshot to check
     */
    static isQuerySnapshot<K>(payload: any): payload is QuerySnapshot<K> {
        return isQuerySnapshot(payload);
    }

    /**
     * Parses a Predicate object and forms the query value for the "$filter"
     * property.
     *
     * @param predicate Predicate tree object.
     */
    abstract parsePredicate(predicate?: Predicate<T>): string;

    /**
     * Creates value string for "$orderby" query parameter from set of OrderBy objects.
     * @param orderBys Set of OrderBy objects
     */
    abstract parseOrderBys(orderBys?: OrderBy<T> | OrderBy<T>[]): string;

    /**
     * Creates value string for "$select" query parameter from a list of select strings.
     * @param selects List of select fields
     */
    abstract parseSelect(selects?: Array<keyof T>): string;

    /**
     * Creates value string for "$expand" query parameter from a list of expand strings.
     * @param expands List of expand fields
     */
    abstract parseExpand(expands?: Array<keyof T>): string;

    /**
     * Composes final query string.
     * @param params QueryParams object composed of key-value pairs.
     */
    abstract createQueryStringFromQueryParams(params?: QueryParams): string;

    /**
     * Composes final query string from Query snapshot object.
     * @param params Query snapshot object.
     */
    abstract createQueryStringFromQuery(query: QuerySnapshot<T>): string;
}

export class DefaultQueryAdapter<T> extends QueryAdapter<T> {
    parsePredicate(predicate?: Predicate<T>): string {
        if (predicate instanceof EqPredicate) {
            return predicate.property + ' eq ' + this._prepareValue(predicate.value);
        } else if (predicate instanceof GePredicate) {
            return predicate.property + ' ge ' + this._prepareValue(predicate.value);
        } else if (predicate instanceof GtPredicate) {
            return predicate.property + ' gt ' + this._prepareValue(predicate.value);
        } else if (predicate instanceof LePredicate) {
            return predicate.property + ' le ' + this._prepareValue(predicate.value);
        } else if (predicate instanceof LtPredicate) {
            return predicate.property + ' lt ' + this._prepareValue(predicate.value);
        } else if (predicate instanceof AndPredicate) {
            const operands = predicate.operands.map((op) => {
                return this.parsePredicate(op);
            });
            return '(' + operands.join(' and ') + ')';
        } else if (predicate instanceof OrPredicate) {
            const operands = predicate.operands.map((op) => {
                return this.parsePredicate(op);
            });
            return '(' + operands.join(' or ') + ')';
        }
        return '';
    }

    parseOrderBys(orderBys?: OrderBy<T> | OrderBy<T>[]): string {
        if (!orderBys) {
            return '';
        }
        if (Array.isArray(orderBys)) {
            const parts: string[] = orderBys.map((order) => {
                return this._prepareOrderBy(order);
            });
            return parts.join(',');
        } else {
            return this._prepareOrderBy(orderBys);
        }
    }

    parseSelect(selects?: Array<keyof T>): string {
        if (!Array.isArray(selects)) {
            return '';
        }
        return selects.join(',');
    }

    parseExpand(expands?: Array<keyof T>): string {
        if (!Array.isArray(expands)) {
            return '';
        }
        return expands.join(',');
    }

    createQueryStringFromQuery(query: QuerySnapshot<T>): string {
        let params: QueryParams = {};
        if (query.keyword) {
            params = {
                ...params,
                search: query.keyword
            };
        }
        if (query.predicate) {
            params = {
                ...params,
                filter: this.parsePredicate(query.predicate)
            };
        }
        if (!isNaN(query.top)) {
            params = {
                ...params,
                top: query.top.toString()
            };
        }
        if (!isNaN(query.skip)) {
            params = {
                ...params,
                skip: query.skip.toString()
            };
        }
        if (query.orderby) {
            params = {
                ...params,
                orderby: this.parseOrderBys(query.orderby)
            };
        }
        if (query.includeCount) {
            params = {
                ...params,
                count: 'true'
            };
        }
        if (query.select) {
            params = {
                ...params,
                select: this.parseSelect(query.select)
            };
        }
        if (query.expand) {
            params = {
                ...params,
                expand: this.parseExpand(query.expand)
            };
        }
        return this.createQueryStringFromQueryParams(params);
    }

    createQueryStringFromQueryParams(params: QueryParams): string {
        const parts: string[] = [];
        for (const key in params) {
            if (params.hasOwnProperty(key) && params[key]) {
                if (key === 'filter') {
                    parts.push('$filter=' + params[key]);
                } else if (key === 'search') {
                    parts.push('$search=' + params[key]);
                } else if (key === 'select') {
                    parts.push('$select=' + params[key]);
                } else if (key === 'expand') {
                    parts.push('$expand=' + params[key]);
                } else if (key === 'skip') {
                    parts.push('$skip=' + params[key]);
                } else if (key === 'top') {
                    parts.push('$top=' + params[key]);
                } else if (key === 'orderby') {
                    parts.push('$orderby=' + params[key]);
                } else if (key === 'count') {
                    parts.push('$count=' + params[key]);
                } else {
                    parts.push(key + '=' + params[key]);
                }
            }
        }
        return parts.join('&');
    }

    /** @hidden */
    _prepareOrderBy(orderBy: OrderBy<T>): string {
        if (!orderBy || !orderBy.field) {
            return '';
        }
        const field = orderBy.field as string;
        if (!orderBy.order) {
            return field;
        }
        return field + (orderBy.order === 'DESCENDING' ? ':desc' : ':asc');
    }

    /** @hidden */
    _prepareValue(value: string | number): string {
        if (typeof value === 'number') {
            return value.toString();
        }
        return "'" + value + "'";
    }
}

/**
 * Query Adapter Factory
 */
@Injectable()
export class QueryAdapterFactory {
    create<T>(entityTypeOrEntityName: EntityType<T> | string): QueryAdapter<T> {
        return new DefaultQueryAdapter();
    }
}

export abstract class QueryAdapterService {
    abstract getAdapter<T>(entityName: string): QueryAdapter<T>;
    abstract registerAdapter<T>(entityName: string, adapter: QueryAdapter<T>): void;
}

/**
 * Registry of Query Adapters
 *
 */
@Injectable()
export class DefaultQueryAdapterService implements QueryAdapterService {
    private adaptersMap: Map<string, QueryAdapter<any>> = new Map();

    constructor(private defaultQueryAdapterFactory: QueryAdapterFactory) {}

    /**
     * Get (or create) query adapter for entity type
     * @param entityName - the name of the type
     *
     */
    getAdapter<T>(entityName: string): QueryAdapter<T> {
        entityName = entityName.trim();
        let adapter = this.adaptersMap.get(entityName);
        if (!adapter) {
            adapter = this.defaultQueryAdapterFactory.create(entityName);
            this.adaptersMap.set(entityName, adapter);
        }
        return adapter;
    }

    /**
     * Register an Query Adapter for an entity type
     * @param entityName - the name of the entity type
     * @param adapter - query adapter for that entity type
     *
     */
    registerAdapter<T>(entityName: string, adapter: QueryAdapter<T>): void {
        this.adaptersMap[entityName.trim()] = adapter;
    }
}
