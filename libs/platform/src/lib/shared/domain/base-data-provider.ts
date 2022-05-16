/**
 * Default implementation for Observable Arrays and Arrays.
 */
import { Observable, of, isObservable } from 'rxjs';
import { map } from 'rxjs/operators';

import { isFunction, isJsObject, objectToName, objectValues } from '../utils/lang';
import { DataProvider, getMatchingStrategyStartsWithPerTermReqexp, MatchBy, MatchingStrategy } from './data-source';

/**
 * In Memory implementation of DataProvider that supports fulltext search
 */
export class BaseDataProvider<T> extends DataProvider<T> {
    constructor(protected values: Observable<T[]> | T[]) {
        super();
    }

    fetch(params: Map<string, any>): Observable<T[]> {
        const observable = isObservable(this.values) ? this.values : of(this.values);

        const queryString = params.get('query');
        const limit = params.get('limit') || 50;

        if (!queryString || queryString === '*') {
            return observable.pipe(map((items) => this.withLimit(items, limit)));
        }

        const toLowerPattern = queryString.toLowerCase();

        return observable.pipe(
            map((items) => {
                const result: any[] = [];

                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    if (this.matches(item, toLowerPattern)) {
                        result.push(item);
                        if (result.length >= limit) {
                            break;
                        }
                    }
                }

                return result;
            })
        );
    }

    /**
     * Warning: If you dont supply search Key and you want fulltext search and you use this
     * default implementation be aware that it can  perform poorly as it is naive implementation
     * that does not do deep compare.
     */
    matches(item: T, pattern: string): boolean {
        if (!this._matchingBy) {
            return false;
        }
        const { firstBy, secondaryBy } = this._matchingBy;

        let matched = this.matchesBy(item, pattern, firstBy);
        if (!matched && secondaryBy) {
            matched = this.matchesBy(item, pattern, secondaryBy);
        }

        return matched;
    }

    matchesBy(item: any, pattern: string, matchingBy: MatchBy): boolean {
        const value = isJsObject(item) && matchingBy ? matchingBy(item) : item;

        if (isFunction(value)) {
            return value.call(item);
        } else if (isJsObject(value)) {
            return this.hasObjectValue(item, pattern);
        } else if (this._matchingStrategy === MatchingStrategy.STARTS_WITH_PER_TERM) {
            const reqexp = getMatchingStrategyStartsWithPerTermReqexp(pattern);
            return !!pattern && !!value && !!value.match(reqexp);
        } else if (this._matchingStrategy === MatchingStrategy.STARTS_WITH) {
            return !!pattern && !!value && value.toString().toLowerCase().startsWith(pattern.toLowerCase());
        } else if (this._matchingStrategy === MatchingStrategy.CONTAINS) {
            return !!pattern && !!value && value.toString().toLowerCase().indexOf(pattern) > -1;
        } else {
            return !!pattern && !!value && value.toString().toLowerCase() === pattern;
        }
    }

    protected hasObjectValue(obj: any, pattern: string): boolean {
        const values = objectValues(obj);
        const parentObj = objectToName(obj);
        const length2 = values.filter((value: any) => {
            if (!value || Array.isArray(value)) {
                return false;
            } else if (!isJsObject(value) && !isFunction(value)) {
                return value.toString().toLowerCase().indexOf(pattern) !== -1;
            } else if (isJsObject(value) && objectToName(value) !== parentObj) {
                return this.hasObjectValue(value, pattern);
            }

            return false;
        }).length;
        return length2 > 0;
    }

    private withLimit(data: Array<T>, limit?: number): Array<T> {
        if (limit && data.length > limit) {
            return data.slice(0, limit);
        }
        return data;
    }
}
