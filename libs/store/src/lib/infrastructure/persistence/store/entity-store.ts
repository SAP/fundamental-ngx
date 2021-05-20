import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    CachePolicy,
    FetchPolicy,
    IdentityKey,
    ChainingStrategyFieldsMap,
    BaseEntity,
    EntityDTOType,
    Type
} from '../../../domain/public_api';
import { QueryBuilder } from '../query/query-builder';
import { instanceForType } from '../domain/state-handler';
import { EntityCollectionService } from './entity-collection-service';

//#region Interfaces

/**
 * Entity Store interface
 */
export interface EntityStore<T extends BaseEntity<EntityDTOType<T>>> {
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
    createEntityInstance(fromState?: EntityDTOType<T>): T;
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
export class DefaultEntityStore<T extends BaseEntity<EntityDTOType<T>>> implements EntityStore<T> {
    get queryBuilder(): QueryBuilder<T> {
        return this._queryBuilder;
    }

    constructor(
        protected readonly _entity: Type<T>,
        protected readonly _entityService: EntityCollectionService<EntityDTOType<T>>,
        protected readonly _queryBuilder: QueryBuilder<T>,
        protected readonly _options?: EntityStoreOptions<T>
    ) {
        // TODO: do something with options?
    }

    get(id: IdentityKey): Observable<T> {
        return this._entityService.getByKey(id).pipe(this._mapDTOtoEntityPipe());
    }

    save(entity: T): Observable<T> {
        if (entity && entity.identity) {
            return this._entityService.update(entity.value).pipe(this._mapDTOtoEntityPipe());
        }
        return this._entityService.add(entity.value).pipe(this._mapDTOtoEntityPipe());
    }

    delete(entity: T): Observable<T> {
        return this._entityService.delete(entity.value).pipe(map(() => entity));
    }

    createEntityInstance<K extends EntityDTOType<T>>(fromState?: K): T {
        return instanceForType(this._entity, fromState);
    }

    private _mapDTOtoEntityPipe<DTO extends EntityDTOType<T>>() {
        return pipe(map((dto: DTO) => this.createEntityInstance(dto)));
    }
}

//#endregion
