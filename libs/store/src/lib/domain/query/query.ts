import {
    Type
} from '@angular/core';
import {
    Observable,
    of
} from 'rxjs';
import { Predicate } from './grammer/predicate';

export interface OrderBy <TModel, TProperty extends keyof TModel> {
    field: TProperty;
    order?: 'ASCENDING' | 'DESCENDING';
}


export class Query <TModel> {
    // we definitely replace this with some OrderBy object
    orderByFields: Array < string > ;


    constructor(private resultType: Type<TModel> ) {}

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
        return of(null);
    }

    count(): number {
        return 0;
    }

    previous(): void {

    }

    next(): void {

    }
}
