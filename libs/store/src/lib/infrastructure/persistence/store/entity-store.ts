import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    CachePolicy,
    FetchPolicy,
    IdentityKey,
    ChainingStrategyFieldsMap
} from '../../../domain/public_api';
import { Type } from '../../../domain/public_api';
import { QueryService } from '../query/query.service';
import { QueryBuilder } from '../query/query-builder';
import { QuerySnapshot } from '../query/query';
import { instanceForType } from '../domain/state-handler';
import { BaseEntity } from '../../../domain/entity';
import { EntityCollectionService } from './entity-collection-service';

//#region Interfaces

/**
 * Entity Store interface
 */
export interface EntityStore<T> {
    /**
     * Query builder reference.
     * Use it to create a query to underlying entity collection
     */
    readonly queryBuilder: QueryBuilder<T>;
    /**
     * Get entity by id
     * @param id identity key
     */
    get(id: IdentityKey): Observable<T>;
    /**
     * Save or Create Entity.
     * @param entity If entity has identity key it will update entity otherwise create new one
     */
    save(entity: T): Observable<T>;
    /**
     * Delete Entity
     * @param entity Entity to be deleted
     */
    delete(entity: T): Observable<T>;

    /**
     * Create new entity instance wrapped Proxy
     * @param fromState initial state
     */
    createEntityInstance(fromState?: any): T;
}

//#endregion

//#region Implementation

export interface EntityStoreOptions<T extends BaseEntity> {
    cachePolicy: CachePolicy;
    fetchPolicy: FetchPolicy;
    chainingStrategy: ChainingStrategyFieldsMap<T>;
}

/**
 * Entity Store default implementation
 */
export class DefaultEntityStore<T extends BaseEntity> implements EntityStore<T> {
    get queryBuilder(): QueryBuilder<T> {
        return this._queryBuilder;
    }

    constructor(
        protected readonly _entity: Type<T>,
        protected readonly _entityService: EntityCollectionService<T>,
        protected readonly _queryBuilder: QueryBuilder<T>,
        protected readonly _options?: EntityStoreOptions<T>
    ) {
        // TODO: do something with options?
    }

    get(id: IdentityKey): Observable<T> {
        return this._entityService.getByKey(id);
    }

    save(entity: T): Observable<T> {
        if (entity.id) {
            return this._entityService.update(entity);
        }
        return this._entityService.add(entity);
    }

    delete(entity: T): Observable<T> {
        return this._entityService.delete(entity).pipe(map(() => entity));
    }

    createEntityInstance(fromState?: T): T {
        return instanceForType(this._entity, fromState);
    }
}

export class DefaultQueryService<TModel> extends QueryService<TModel> {
    constructor(private service: EntityCollectionService<TModel>) {
        super();
    }

    getByKey(id: string): Observable<TModel> {
        return this.service.getByKey(id);
    }

    getWithQuery(query: QuerySnapshot<TModel>): Observable<TModel[]> {
        // Pass query payload instead of QueryParams
        // TODO: Should we override EntityCollectionService interface for that?
        return this.service.getWithQuery(query as any);
    }

    count(): Observable<number> {
        return this.service.count$;
    }
}

//#endregion
