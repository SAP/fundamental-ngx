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

    /** @hidden - stores current predicate */
    predicate: Predicate<TModel>;

    /** @hidden - stores current page size */
    pageSize: number;

    /** @hidden - stores current index offset */
    offset: number;

    // we definitely replace this with some OrderBy object
    orderByFields: Array<string>;

    constructor(
        private resultType: Type<TModel>,
        private service: EntityCollectionService<TModel>,
        private adapter: QueryAdapter<TModel>
    ) {}

    orderBy<TProperty extends keyof TModel> (...segments: Array < OrderBy < TModel, TProperty >> ): Query < TModel > {
        return this;
    }

    project<TP extends keyof TModel> (...property: Array < TP > ): Query < TModel > {
        return this;
    }

    firstResult(offset: number): Query<TModel> {
        this.offset = offset;
        return this;
    }

    maxResults(limit: number): Query<TModel> {
        this.pageSize = limit;
        return this;
    }

    find(): Observable < TModel | Array < TModel >> {
        return of(null);
    }

    select(): Observable < TModel | Array < TModel >> {
        const params = this._createQueryParams();
        const query = this.adapter.createQueryString(params);
        return this.service.getWithQuery(query);
    }

    count(): number {
        return 0;
    }

    previous(): void {

    }

    next(): void {

    }

    _createQueryParams(): QueryParams {
        let params: QueryParams = {};
        if (this.predicate) {
            params = {
                ...params,
                filter: this.adapter.parsePredicate(this.predicate)
            };
        }
        if (this.pageSize) {
            params = {
                ...params,
                pageSize: this.pageSize.toString()
            };
        }
        if (this.offset) {
            params = {
                ...params,
                offset: this.offset.toString()
            };
        }
        return params;
    }
}
