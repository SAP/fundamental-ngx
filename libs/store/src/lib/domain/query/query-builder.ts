import {
    Type
} from '@angular/core';
import {
    EntityCollectionService
} from '@ngrx/data';
import {
    Query
} from './query';
import {
    Predicate
} from './grammer/predicate';
import { Observable, of } from 'rxjs';
import { QueryAdapter } from './query-adapter';


/**
 * This could be part of some common functionality shared with EntityStore where we
 * create entity store out of type.
 *
 * This is where my original unitof works could jump in. a usecase  => unitof work untill its completed.
 * all is cached as part of this.
 *
 *
 */
// export function newQueryBuilder < TModel > (resultType: Type < TModel > ): QueryBuilder < TModel > {
//     return new QueryBuilder < TModel > (resultType);
// }


export class QueryBuilder <TModel> {

    /**
     * Predicate which defines filter criteria
     */
    predicate: Predicate<TModel>;

    constructor(
        private resultType: Type<TModel>,
        private service: EntityCollectionService<TModel>,
        private adapter: QueryAdapter<TModel>
    ) { }

    byId(id: string): QueryBuilder<TModel> {
        return this;
    }

    /**
     * Add predicate to builder.
     * @param predicate Predicate which defines filter
     */
    where < TP extends keyof TModel,
    TPT extends TModel[TP] > (predicate: Predicate <TModel> ): QueryBuilder <TModel> {
        this.predicate = predicate;
        return this;
    }


    newSubQuery <TSubModel> (withId: string, resultType: Type < TSubModel > ): QueryBuilder < TModel > {
        return this;
    }

    /**
     * Create new Query object
     */
    newQuery(): Query < TModel > {
        const query = new Query<TModel>(this.resultType, this.service, this.adapter);
        query._predicate = this.predicate;
        return query;
    }

}
