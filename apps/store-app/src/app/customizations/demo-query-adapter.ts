import { Injectable, Type } from '@angular/core';
import {
    QueryAdapter,
    Predicate,
    EqPredicate,
    GePredicate,
    LePredicate,
    AndPredicate,
    OrderBy,
    QueryParams
} from '@fundamental-ngx/store';

@Injectable()
export class DemoQueryAdapterFactory {
    create<T>(entity: Type<T>): QueryAdapter<T> {
        return new DemoQueryAdapter<T>();
    }
}

export class DemoQueryAdapter<T> extends QueryAdapter<T> {

    parsePredicate(predicate?: Predicate<T>): string {
        if (predicate instanceof EqPredicate) {
            return predicate.property + '=' + this._prepareValue(predicate.value);
        } else if (predicate instanceof GePredicate) {
            return predicate.property + '_gte=' + this._prepareValue(predicate.value);
        } else if (predicate instanceof LePredicate) {
            return predicate.property + '_lte=' + this._prepareValue(predicate.value);
        } else if (predicate instanceof AndPredicate) {
            const operands = predicate.operands.map(op => {
               return this.parsePredicate(op);
            }).filter(op => op);
            return operands.join('&');
        }
        return '';
    }

    parseOrderBys(orderBys?: OrderBy<T> | OrderBy<T>[]): string {
        if (!orderBys) {
            return '';
        }
        const fields: string[] = [];
        const orders: string[] = [];
        if (Array.isArray(orderBys)) {
            orderBys.forEach(order => {
                fields.push(order.field as string);
                orders.push(order.order === 'DESCENDING' ? 'desc' : 'asc');
            });
        } else {
            fields.push(orderBys.field as string);
            orders.push(orderBys.order === 'DESCENDING' ? 'desc' : 'asc');
        }
        return '_sort=' + fields.join(',') + '&_order=' + orders.join(',');
    }

    createQueryString(params: QueryParams): string {
        const parts: string[] = [];
        for (const key in params) {
            if (params.hasOwnProperty(key) && params[key]) {
                if (key === 'filter') {
                    const filter: string = (Array.isArray(params[key]))
                        ? (params[key] as string[]).join('&')
                        : params[key] as string;
                    parts.push(filter);
                } else if (key === 'search') {
                    parts.push('q=' + params[key]);
                } else if (key === 'select') {
                    // do nothing - not implemented
                } else if (key === 'expand') {
                    // do nothing - not implemented
                } else if (key === 'skip') {
                    parts.push('_limit=' + params[key]);
                } else if (key === 'top') {
                    parts.push('_start=' + params[key]);
                } else if (key === 'orderby') {
                    parts.push(params[key] as string);
                } else if (key === 'count') {
                    // do nothing - not implemented
                } else {
                    parts.push(key + '=' + params[key]);
                }
            }
        }
        return parts.join('&');
    }

    parseSelect(selects?: Array<keyof T>): string {
        return '';
    }

    parseExpand(expands?: Array<keyof T>): string {
        return '';
    }

    /** @hidden */
    _prepareValue(value: string | number): string {
        if (typeof value === 'number') {
            return value.toString();
        }
        return value;
    }

}
