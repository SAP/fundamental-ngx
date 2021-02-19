import {
    Type
} from '@angular/core';
import {
    Observable,
    of
} from 'rxjs';
import {
    EntityCollectionService,
    QueryParams
} from '@ngrx/data';

import { Predicate } from './grammer/predicate';
import { QueryAdapter } from './query-adapter';

export interface OrderBy <TModel, TProperty extends keyof TModel> {
    field: TProperty;
    order?: 'ASCENDING' | 'DESCENDING';
}


export class Query<TModel> {

    /** @hidden - stores current keyword */
    _keyword: string;

    /** @hidden - stores current predicate */
    _predicate: Predicate<TModel>;

    /** @hidden - stores current page size */
    _pageSize: number;

    /** @hidden - stores current index offset */
    _offset: number;

    /** @hidden - stores curernt order bys */
    _orderByFields: Array<OrderBy<TModel, keyof TModel>>;

    /** @hidden - stores current enable count flag */
    _includeCount: boolean;

    constructor(
        private resultType: Type<TModel>,
        private service: EntityCollectionService<TModel>,
        private adapter: QueryAdapter<TModel>
    ) {}

    /**
     * Replace current filter settings.
     * @param predicate Predicate object which contains new filter criteria.
     */
    where(predicate: Predicate<TModel>): Query<TModel> {
        this._predicate = predicate;
        return this;
    }

    /**
     * Set order by rules for query.
     * @param orderBys Set of OrderBy objects.
     */
    orderBy<TProperty extends keyof TModel> (...orderBys: Array < OrderBy < TModel, TProperty >> ): Query < TModel > {
        this._orderByFields = orderBys;
        return this;
    }

    /**
     * Set first index of result set for paging.
     * @param offset Index number of first result.
     */
    firstResult(offset: number): Query<TModel> {
        this._offset = offset;
        return this;
    }

    /**
     * Set page size for result set.
     * @param pageSize Number of items returned per page
     */
    maxResults(pageSize: number): Query<TModel> {
        this._pageSize = pageSize;
        return this;
    }

    /**
     * Set flag to include "count" in response.
     * If "true" the query string will include parameter "$count=true".
     * If "false" the parameter will not be included.
     * @param flag
     */
    includeCount(flag: boolean): Query<TModel> {
        this._includeCount = flag;
        return this;
    }

    project<TP extends keyof TModel> (...property: Array < TP > ): Query < TModel > {
        return this;
    }

    find(): Observable < TModel | Array < TModel >> {
        return of(null);
    }

    /**
     * Initiate query and return observable
     */
    select(): Observable < TModel | Array < TModel >> {
        const params = this._createQueryParams();
        const query = this.adapter.createQueryString(params);
        return this.service.getWithQuery(query);
    }

    /**
     * Count of items in collection
     *
     * @todo Will this work with paging?
     */
    count(): Observable<number> {
        return this.service.count$;
    }

    /**
     * Get previous page of collection
     */
    previous(): void {
        this._offset = (this._offset > this._pageSize) ? this._offset - this._pageSize : 0;
        this.select();
    }

    /**
     * Get next page of collection
     */
    next(): void {
        this._offset = this._offset + this._pageSize;
        this.select();
    }

    /**
     * Create QueryParams from current Query properties.
     * @hidden
     */
    private _createQueryParams(): QueryParams {
        let params: QueryParams = {};
        if (this._predicate) {
            params = {
                ...params,
                filter: this.adapter.parsePredicate(this._predicate)
            };
        }
        if (this._pageSize) {
            params = {
                ...params,
                pageSize: this._pageSize.toString()
            };
        }
        if (this._offset !== undefined) {
            params = {
                ...params,
                offset: this._offset.toString()
            };
        }
        if (this._orderByFields) {
            params = {
                ...params,
                orderby: this.adapter.parseOrderBys(this._orderByFields)
            };
        }
        if (this._includeCount) {
            params = {
                ...params,
                count: 'true'
            };
        }
        return params;
    }
}
