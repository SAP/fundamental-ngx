import { Observable } from 'rxjs';

import { BaseEntity, ChainingStrategyFieldsMap, EntityDTOType } from '../../../domain/public_api';
import { Query } from './query';
import { Predicate } from './grammar/predicate';
import { QueryService } from './query.service';

export class QueryBuilder<Entity extends BaseEntity<EntityDTOType<Entity>>> {
    /**
     * @hidden - predicate which defines filter criteria.
     */
    protected _predicate: Predicate<EntityDTOType<Entity>>;

    /**
     * @hidden - keyword for search.
     */
    protected _keyword: string;

    /**
     * @hidden - request chaining strategy
     */
    protected chainingStrategyMap: ChainingStrategyFieldsMap<Entity> | null = null;

    /**
     * @param service Query service to delegate request to
     *
     * @hidden
     */
    constructor(
        private readonly service: QueryService<Entity>) {}

    byId(id: string): Observable<Entity> {
        return this.service.getByKey(id);
    }

    /**
     * Add predicate to builder.
     * @param predicate Predicate which defines filter
     */
    where(predicate: Predicate<EntityDTOType<Entity>>): QueryBuilder<Entity> {
        this._predicate = predicate;
        return this;
    }

    /**
     * Add keyword to builder.
     * @param keyword Keyword for search
     */
    keyword(keyword: string): QueryBuilder<Entity> {
        this._keyword = keyword;
        return this;
    }

    /**
     * Apply Chaining Strategy on Query level.
     * @param chainingStrategyMap Chaining strategy fields map. The map consists of Entity fields that refer to the sub Entities
     */
    withChainingStrategy(chainingStrategyMap: ChainingStrategyFieldsMap<Entity>): QueryBuilder<Entity> {
        this.chainingStrategyMap = chainingStrategyMap;
        return this;
    }

    /**
     * Create new Query object
     */
    build(): Query<Entity> {
        const query = new Query<Entity>(this.service, this.chainingStrategyMap);
        query.where(this._predicate).keyword(this._keyword);
        return query;
    }
}
