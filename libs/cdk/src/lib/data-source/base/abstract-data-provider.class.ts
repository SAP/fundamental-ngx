import { isFunction, isJsObject } from '@fundamental-ngx/cdk/utils';
import { isObservable, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    getMatchingStrategyStartsWithPerTermReqexp,
    objectToName,
    objectValues,
    ProviderParams
} from '../helpers/common';
import { MatchBy, MatchingBy, MatchingStrategy } from '../models/matching-strategy';

/**
 * Base data provider class.
 */
export abstract class AbstractDataProvider<T> {
    /** @hidden */
    protected _keyPath: string;

    /** @hidden */
    protected _matchingStrategy: MatchingStrategy = MatchingStrategy.STARTS_WITH;

    /** @hidden */
    protected _matchingBy: MatchingBy | null = null;

    abstract fetch(params: ProviderParams, start?: number, end?: number): Observable<T[]>;

    /** @hidden */
    setLookupKey(key: string): void {
        this._keyPath = key;
    }

    /** @hidden */
    setMatchingBy(matchingBy: MatchingBy): void {
        this._matchingBy = matchingBy;
    }

    /** @hidden */
    setMatchingStrategy(strategy: MatchingStrategy): void {
        this._matchingStrategy = strategy;
    }

    /** @hidden */
    abstract getTotalItems(params?: Map<string, any>): Observable<number>;
}

/**
 * Default data provider class used for other components to extend from.
 */
export class DataProvider<T> extends AbstractDataProvider<T> {
    /** Default limit for the pagination. */
    public defaultLimit = 50;
    /** @hidden */
    constructor(protected values: Observable<T[]> | T[]) {
        super();
    }

    /** @hidden */
    fetch(params: Map<string, any>): Observable<T[]> {
        const observable = isObservable(this.values) ? this.values : of(this.values);

        const queryString = params.get('query');
        const limit = params.get('limit') || this.defaultLimit;

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
     * Returns observable with the number of total items that satisfy the search query.
     * Warning: this is a naive implementation of the number of the filtered items.
     * For real-world scenarios, it is recommended to override this method with its own logic.
     */
    getTotalItems(params: Map<string, any>): Observable<number> {
        const observable = isObservable(this.values) ? this.values : of(this.values);
        const queryString = params.get('query');

        if (!queryString) {
            return observable.pipe(map((items) => items.length));
        }

        const toLowerPattern = queryString.toLowerCase();

        return observable.pipe(map((items) => items.filter((item) => this.matches(item, toLowerPattern)).length));
    }

    /**
     * Warning: If you don't supply search Key and you want fulltext search, and you use this
     * default implementation, be aware that it can perform poorly as it is a naive implementation
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

    /** @hidden */
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

    /** @hidden */
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

    /** @hidden */
    private withLimit(data: Array<T>, limit?: number): Array<T> {
        if (limit && data.length > limit) {
            return data.slice(0, limit);
        }
        return data;
    }
}
