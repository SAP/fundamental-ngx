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
import { Observable } from 'rxjs';
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


export class QueryBuilder<TModel> {

    /**
     * @hidden - predicate which defines filter criteria.
     */
    _predicate: Predicate<TModel>;

    /**
     * @hidden - keyword for search.
     */
    _keyword: string;

    constructor(
        private resultType: Type<TModel>,
        private service: EntityCollectionService<TModel>,
        private adapter: QueryAdapter<TModel>
    ) { }

    byId(id: string): Observable<TModel> {
        return this.service.getByKey(id);
    }

    /**
     * Add predicate to builder.
     * @param predicate Predicate which defines filter
     */
    where < TP extends keyof TModel,
    TPT extends TModel[TP] > (predicate: Predicate<TModel> ): QueryBuilder<TModel> {
        this._predicate = predicate;
        return this;
    }

    /**
     * Add keyword to builder.
     * @param keyword Keyword for search
     */
    keyword(keyword: string): QueryBuilder<TModel> {
        this._keyword = keyword;
        return this;
    }

    /*
    newSubQuery <TSubModel> (withId: string, resultType: Type < TSubModel > ): QueryBuilder < TModel > {
        return this;
    }
    */

    /**
     * Create new Query object
     */
    build(): Query<TModel> {
        const query = new Query<TModel>(this.resultType, this.service, this.adapter);
        query._predicate = this._predicate;
        query._keyword = this._keyword;
        return query;
    }

}
