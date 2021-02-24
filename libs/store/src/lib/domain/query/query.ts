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

export interface OrderBy <TModel> {
    field: keyof TModel;
    order?: 'ASCENDING' | 'DESCENDING';
}

/**
 * @todo We may need a method for end-users to add custom query parameters.
 */
export class Query<TModel> {

    /** @hidden - stores current keyword */
    _keyword: string;

    /** @hidden - stores current predicate */
    _predicate: Predicate<TModel>;

    /** @hidden - stores current page size */
    _pageSize: number;

    /** @hidden - stores current index offset */
    _offset: number;

    /** @hidden - stores flag for suspending page reset on query change */
    _suppressPageReset: boolean;

    /** @hidden - stores curernt order bys */
    _orderByFields: Array<OrderBy<TModel>>;

    /** @hidden - stores current enable count flag */
    _includeCount: boolean;

    /** @hidden - stores current selection of properties */
    _select: string[];

    /** @hidden - stores current expand properties */
    _expand: string[];

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
     * Set keyword for search term.
     * @param keyword
     */
    keyword(keyword: string): Query<TModel> {
        this._keyword = keyword;
        return this;
    }

    /**
     * Set order by rules for query.
     * @param orderBys Set of OrderBy objects.
     */
    orderBy<TProperty extends keyof TModel> (...orderBys: Array<OrderBy<TModel>> ): Query < TModel > {
        this._orderByFields = orderBys;
        return this;
    }

    /**
     * Set first index of result set for paging.
     * @param offset Index number of first result.
     */
    firstResult(offset: number): Query<TModel> {
        this._offset = offset;
        this._suppressPageReset = true;
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
     * Suspends resetting of page index when query keyword, where, or
     * order by clauses have been changed.
     */
    suppressPageReset(): Query<TModel> {
        this._suppressPageReset = true;
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

    /**
     * Set list of select parameters. Select parameters are used to limit
     * the enitity properties included in the return data.
     * @param select List of properties to include in response data
     */
    select<TP extends keyof TModel> (...select: Array<TP> ): Query<TModel> {
        this._select = select as string[];
        return this;
    }

    /**
     * Set list of expand parameters. Expand parameters are used to ask the server
     * to include relational data.
     * @param extend List of expanded properties to include in response data
     */
    expand<TP extends keyof TModel> (...expand: Array<TP> ): Query<TModel> {
        this._expand = expand as string[];
        return this;
    }

    /**
     * Initiate query and return observable
     */
    fetch(): Observable<TModel | Array<TModel>> {
        if (!this._suppressPageReset) {
            this._offset = 0;
        }
        this._suppressPageReset = false;

        const params = this._createQueryParams();
        const query = this.adapter.createQueryString(params);
        return this.service.getWithQuery(query);
    }

    /**
     * Get observable for count of items in collection.
     *
     * @todo Need to parse count and item data from returned JSON data.
     * @todo Do we need to throw exception if "_includeCount" is not true?
     */
    count(): Observable<number> {
        return this.service.count$;
    }

    /**
     * Get previous page of collection.
     */
    previous(): void {
        this._offset = (this._offset > this._pageSize) ? this._offset - this._pageSize : 0;
        this._suppressPageReset = true;
        this.fetch();
    }

    /**
     * Get next page of collection
     */
    next(): void {
        this._offset = this._offset + this._pageSize;
        this._suppressPageReset = true;
        this.fetch();
    }

    /**
     * Create QueryParams from current Query properties.
     * @hidden
     */
    private _createQueryParams(): QueryParams {
        let params: QueryParams = {};
        if (this._keyword) {
            params = {
                ...params,
                search: this._keyword
            };
        }
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
        if (this._pageSize && this._offset !== undefined) {
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
        if (this._select) {
            params = {
                ...params,
                select: this.adapter.parseSelect(this._select)
            };
        }
        if (this._expand) {
            params = {
                ...params,
                expand: this.adapter.parseExpand(this._expand)
            };
        }
        return params;
    }
}
