import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    CachePolicy,
    FetchPolicy,
    IdentityKey,
    ChainingStrategyFieldsMap,
} from '../../../domain/public_api';
import { Type } from '../../../domain/public_api';
import { QueryBuilder } from '../query/query-builder';
import { instanceForType } from '../domain/state-handler';
import { EntityCollectionService } from './entity-collection-service';
import { BaseEntity } from '../domain/base-classes/base-entity';

//#region Interfaces

/**
 * Entity Store interface
 */
export interface EntityStore<T extends BaseEntity> {
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
    createEntityInstance<K>(fromState?: K): T;
}

//#endregion

//#region Implementation

export interface EntityStoreOptions<T> {
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
        return this._entityService.getByKey(id).pipe(
            map(dto => this.createEntityInstance(dto))
        );
    }

    save(entity: T): Observable<T> {
        if (entity && entity.identity) {
            return this._entityService.update(entity);
        }
        return this._entityService.add(entity);
    }

    delete(entity: T): Observable<T> {
        return this._entityService.delete(entity).pipe(map(() => entity));
    }

    createEntityInstance<K>(fromState?: K): T {
        return instanceForType(this._entity, fromState);
    }
}

//#endregion
