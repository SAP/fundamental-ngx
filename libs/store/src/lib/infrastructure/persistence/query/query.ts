import { Observable } from 'rxjs';
import { BaseEntity, ChainingStrategyFieldsMap } from '../../../domain/public_api';

import { Predicate } from './grammar/predicate';
import { QueryService } from './query.service';

export interface OrderBy<TModel> {
    field: keyof TModel;
    order?: 'ASCENDING' | 'DESCENDING';
}

export class QuerySnapshotModel<T extends {}> {
    keyword: string;
    predicate: Predicate<T>;
    skip: number;
    top: number;
    orderby: Array<OrderBy<T>>;
    includeCount: boolean;
    select: Array<keyof T>;
    expand: Array<keyof T>;
    chainingStrategy?: ChainingStrategyFieldsMap<T>;
}

export type QuerySnapshot<T extends {}> = Readonly<QuerySnapshotModel<T>>;

export const isQuerySnapshot = <K extends BaseEntity>(data: any): data is QuerySnapshot<K> => {
    return data instanceof QuerySnapshotModel;
};

/**
 * @todo We may need a method for end-users to add custom query parameters.
 */
export class Query<TModel> {
    /** @hidden - stores current keyword */
    protected _keyword: string;

    /** @hidden - stores current predicate */
    protected _predicate: Predicate<TModel>;

    /** @hidden - stores current offset */
    protected _skip: number;

    /** @hidden - stores current page size */
    protected _top: number;

    /** @hidden - stores flag for suspending page reset on query change */
    protected _suppressPageReset: boolean;

    /** @hidden - stores current order bys */
    protected _orderByFields: Array<OrderBy<TModel>>;

    /** @hidden - stores current enable count flag */
    protected _includeCount: boolean;

    /** @hidden - stores current selection of properties */
    protected _select: Array<keyof TModel>;

    /** @hidden - stores current expand properties */
    protected _expand: Array<keyof TModel>;

    constructor(
        protected readonly service: QueryService<TModel>,
        protected readonly chainingStrategy?: ChainingStrategyFieldsMap<TModel>
    ) {}

    /**
     * Replace current filter settings.
     * @param predicate Predicate object which contains new filter criteria.
     */
    where(predicate: Predicate<TModel>): this {
        this._predicate = predicate;
        return this;
    }

    /**
     * Set keyword for search term.
     * @param keyword
     */
    keyword(keyword: string): this {
        this._keyword = keyword;
        return this;
    }

    /**
     * Set order by rules for query.
     * @param orderBys Set of OrderBy objects.
     */
    orderBy(...orderBys: Array<OrderBy<TModel>>): this {
        this._orderByFields = orderBys;
        return this;
    }

    /**
     * Set first index of result set for paging.
     * @param skip Index number of first result.
     */
    withFirstResult(skip: number): this {
        this._skip = skip;
        this._suppressPageReset = true;
        return this;
    }

    /**
     * Set page size for result set.
     * @param top Number of items returned per page
     */
    withMaxResults(top: number): this {
        this._top = top;
        return this;
    }

    /**
     * Suspends resetting of page index when query keyword, where, or
     * order by clauses have been changed.
     */
    suppressPageReset(): this {
        this._suppressPageReset = true;
        return this;
    }

    /**
     * Set flag to include "count" in response.
     * If "true" the query string will include parameter "$count=true".
     * If "false" the parameter will not be included.
     * @param flag
     */
    includeCount(flag: boolean): this {
        this._includeCount = flag;
        return this;
    }

    /**
     * Set list of select parameters. Select parameters are used to limit
     * the entity properties included in the return data.
     * @param select List of properties to include in response data
     */
    select<TP extends keyof TModel>(...select: Array<TP>): this {
        this._select = select;
        return this;
    }

    /**
     * Set list of expand parameters. Expand parameters are used to ask the server
     * to include relational data.
     * @param extend List of expanded properties to include in response data
     */
    expand<TP extends keyof TModel>(...expand: Array<TP>): this {
        this._expand = expand;
        return this;
    }

    /**
     * Initiate query and return observable
     */
    fetch(): Observable<Array<TModel>> {
        if (!this._suppressPageReset) {
            this._skip = 0;
        }
        this._suppressPageReset = false;

        const snapshot = this.createSnapshot();

        return this.service.getWithQuery(snapshot);
    }

    /**
     * Get observable for count of items in collection.
     *
     * @todo Need to parse count and item data from returned JSON data.
     * @todo Do we need to throw exception if "_includeCount" is not true?
     */
    count(): Observable<number> {
        return this.service.count();
    }

    /**
     * Get previous page of collection.
     */
    previous(): void {
        this._skip = Math.max(this._skip - this._top, 0);
        this._suppressPageReset = true;
        this.fetch();
    }

    /**
     * Get next page of collection
     */
    next(): void {
        this._skip = this._skip + this._top;
        this._suppressPageReset = true;
        this.fetch();
    }

    /**
     * Create current query state snapshot
     */
    createSnapshot(): QuerySnapshot<TModel> {
        const snapshot = new QuerySnapshotModel<TModel>();

        snapshot.keyword = this._keyword;
        snapshot.predicate = this._predicate;
        snapshot.top = this._top;
        snapshot.skip = this._top != null ? this._skip : undefined;
        snapshot.orderby = this._orderByFields;
        snapshot.includeCount = this._includeCount;
        snapshot.select = this._select;
        snapshot.expand = this._expand;
        snapshot.chainingStrategy = this.chainingStrategy;

        return Object.freeze(snapshot);
    }
}
