import { Observable } from 'rxjs';

import { ChainingStrategyFieldsMap } from '../../../domain/public_api';
import { Query } from './query';
import { Predicate } from './grammar/predicate';
import { QueryService } from './query.service';

export class QueryBuilder<TModel extends {}> {
    /**
     * @hidden - predicate which defines filter criteria.
     */
    protected _predicate: Predicate<TModel>;

    /**
     * @hidden - keyword for search.
     */
    protected _keyword: string;

    /**
     * @hidden - request chaining strategy
     */
    protected chainingStrategyMap: ChainingStrategyFieldsMap<TModel> | null = null;

    /**
     * @param service Query service to delegate request to
     *
     * @hidden
     */
    constructor(private readonly service: QueryService<TModel>) {}

    byId(id: string): Observable<TModel> {
        return this.service.getByKey(id);
    }

    /**
     * Add predicate to builder.
     * @param predicate Predicate which defines filter
     */
    where(predicate: Predicate<TModel>): QueryBuilder<TModel> {
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
     * Apply Chaining Strategy on Query level.
     * @param chainingStrategyMap Chaining strategy fields map. The map consists of Entity fields that refer to the sub Entities
     */
    withChainingStrategy(chainingStrategyMap: ChainingStrategyFieldsMap<TModel>): QueryBuilder<TModel> {
        this.chainingStrategyMap = chainingStrategyMap;
        return this;
    }

    /**
     * Create new Query object
     */
    build(): Query<TModel> {
        const query = new Query<TModel>(this.service, this.chainingStrategyMap);
        query.where(this._predicate).keyword(this._keyword);
        return query;
    }
}
