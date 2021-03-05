import { Observable } from 'rxjs';
import {
    Query
} from './query';
import {
    Predicate
} from './grammar/predicate';
import { QueryService } from './query.service';

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
        private service: QueryService<TModel>,
    ) { }

    byId(id: string): Observable<TModel> {
        return this.service.getByKey(id);
    }

    /**
     * Add predicate to builder.
     * @param predicate Predicate which defines filter
     */
    where(predicate: Predicate<TModel> ): QueryBuilder<TModel> {
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

    /**
     * Create new Query object
     */
    build(): Query<TModel> {
        const query = new Query<TModel>(this.service);
        query._predicate = this._predicate;
        query._keyword = this._keyword;
        return query;
    }

}
