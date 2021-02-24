import { Injectable } from '@angular/core';
import {
    Predicate,
    EqPredicate,
    GePredicate,
    GtPredicate,
    LePredicate,
    LtPredicate,
    AndPredicate,
    OrPredicate,
} from './grammer/predicate';
import { OrderBy } from './query';

export interface QueryParams {
    [name: string]: string | string[];
}

export abstract class QueryAdapter<T> {
    abstract parsePredicate(predicate?: Predicate<T>): string;
    abstract parseOrderBys(orderBys?: OrderBy<T> | OrderBy<T>[]): string
    abstract parseSelect(select?: string[]): string;
    abstract parseExpand(select?: string[]): string;
    abstract createQueryString(params?: QueryParams): string;
}

@Injectable()
export class DefaultQueryAdapter<T> extends QueryAdapter<T> {

    /**
     * Parses a Predicate object and forms the query value for the "$filter"
     * property.
     *
     * @param predicate Predicate tree object.
     */
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
            const operands = predicate.operands.map(op => {
               return this.parsePredicate(op);
            });
            return '(' + operands.join(' and ') + ')';
        } else if (predicate instanceof OrPredicate) {
            const operands = predicate.operands.map(op => {
               return this.parsePredicate(op);
            });
            return '(' + operands.join(' or ') + ')';
        }
        return '';
    }

    /**
     * Creates value string for "$orderby" query parameter from set of OrderBy objects.
     * @param orderBys Set of OrderBy objects
     */
    parseOrderBys(orderBys?: OrderBy<T> | OrderBy<T>[]): string {
        if (!orderBys) {
            return '';
        }
        if (Array.isArray(orderBys)) {
            const parts: string[] = orderBys.map(order => {
                return this._prepareOrderBy(order);
            });
            return parts.join(',');
        } else {
            return this._prepareOrderBy(orderBys);
        }
    }

    /**
     * Creates value string for "$select" query parameter from a list of select strings.
     * @param selects List of select fields
     */
    parseSelect(selects?: string[]): string {
        if (!Array.isArray(selects)) {
            return '';
        }
        return selects.join(',');
    }

    /**
     * Creates value string for "$expand" query parameter from a list of expand strings.
     * @param expands List of expand fields
     */
    parseExpand(expands?: string[]): string {
        if (!Array.isArray(expands)) {
            return '';
        }
        return expands.join(',');
    }

    /**
     * Composes final query string.
     * @param params QueryParams object composed of key-value pairs.
     */
    createQueryString(params: QueryParams): string {
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
                    parts.push('$expand=' + params[key])
                } else if (key === 'pageSize') {
                    parts.push('$skip=' + params[key]);
                } else if (key === 'offset') {
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
        return field + ((orderBy.order === 'DESCENDING') ? ':desc' : ':asc');
    }

    /** @hidden */
    _prepareValue(value: string | number): string {
        if (typeof value === 'number') {
            return value.toString();
        }
        return '\'' + value + '\'';
    }

}
