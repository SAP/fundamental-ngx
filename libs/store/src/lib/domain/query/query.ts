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


export class Query <TModel> {

    predicate: Predicate<TModel>;

    // we definitely replace this with some OrderBy object
    orderByFields: Array < string > ;

    constructor(
        private resultType: Type<TModel>,
        private service: EntityCollectionService<TModel>,
        private adapter: QueryAdapter<TModel>
    ) {}

    orderBy < TProperty extends keyof TModel > (...segments: Array < OrderBy < TModel, TProperty >> ): Query < TModel > {
        return this;
    }

    project < TP extends keyof TModel > (...property: Array < TP > ): Query < TModel > {
        return this;
    }

    firstResult(offset: number): Query < TModel > {
        return this;
    }

    maxResult(limit: number): Query < TModel > {
        return this;
    }

    find(): Observable < TModel | Array < TModel >> {
        return of(null);
    }

    select(): Observable < TModel | Array < TModel >> {
        const params = this._createQueryParams();
        return this.service.getWithQuery(params);
    }

    count(): number {
        return 0;
    }

    previous(): void {

    }

    next(): void {

    }

    private _createQueryParams(): QueryParams {
        const filter = this.adapter.parsePredicate(this.predicate);
        return { filter: filter };
    }
}
