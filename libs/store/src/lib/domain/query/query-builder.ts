import {
    Type
} from '@angular/core';
import {
    Query
} from './query';
import {
    Predicate
} from './predicate';


/**
 * This could be part of some common functionality shared with EntityStore where we
 * create entity store out of type.
 *
 * This is where my original unitof works could jump in. a usecase  => unitof work untill its completed.
 * all is cached as part of this.
 *
 *
 */
export function newQueryBuilder < TModel > (resultType: Type < TModel > ): QueryBuilder < TModel > {
    return new QueryBuilder < TModel > (resultType);
}


export class QueryBuilder < TModel > {

    constructor(private resultType: Type < TModel > ) {}

    byId(id: string): QueryBuilder < TModel > {

        return this;
    }

    where < TP extends keyof TModel,
    TPT extends TModel[TP] > (predicate: Predicate < TModel > ): QueryBuilder < TModel > {
        return this;
    }


    newSubQuery < TSubModel > (withId: string, resultType: Type < TSubModel > ): QueryBuilder < TModel > {

        return this;
    }

    newQuery(): Query < TModel > {
        return null;
    }


}

/*
const query = this.entityStore.queryBuilder.where(
    and(
        eq('currency', 'USD')
        gt('amount.value', 300)
    )
);

this.req$ = this.query.orderBy(..).firstResult(15).maxResult(100).select();

this.query.next();
 */
