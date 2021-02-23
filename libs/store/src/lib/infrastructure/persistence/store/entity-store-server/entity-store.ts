import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityCollectionService } from '@ngrx/data';

import { CachePolicy, FetchPolicy, IdentityKey } from '../../../../domain/public_api';

//#region Interfaces

export type QueryParams = { [name: string]: string | string[] } | string;

/**
 * Entity Store interface
 */
export interface EntityStore<T> {
    /**
     * Query builder reference.
     * Use it to create a query to underlying entity collection
     */
    readonly queryBuilder: any;
    /**
     * Get collection of entities
     */
    getAll(): Observable<T[]>;

    /**
     * Get collection of entities that match given query
     */
    getWithQuery(query: QueryParams): Observable<T[]>;
    /**
     * Get entity by id
     * @param id identity key
     */
    getBy(id: IdentityKey): Observable<T>;
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
}

//#endregion

//#region Implementation

export interface EntityStoreOptions {
    cachePolicy: CachePolicy;
    fetchPolicy: FetchPolicy;
    transient: boolean;
}

/**
 * Entity Store default implementation
 */
export class DefaultEntityStore<T> implements EntityStore<T> {
    readonly queryBuilder: any;

    constructor(
        protected readonly entityService: EntityCollectionService<T>,
        protected readonly options?: EntityStoreOptions
    ) {
        // TODO: do something with options
    }

    getAll(): Observable<T[]> {
        return this.entityService.getAll();
    }

    getWithQuery(query: QueryParams): Observable<T[]> {
        return this.entityService.getWithQuery(query);
    }

    getBy(id: IdentityKey): Observable<T> {
        return this.entityService.getByKey(id);
    }

    save(entity: T): Observable<T> {
        if (entity['id']) {
            // TODO: Should check if entity has id based on primary key settings
            return this.entityService.update(entity);
        }
        return this.entityService.add(entity);
    }

    delete(entity: T): Observable<T> {
        return this.entityService.delete(entity).pipe(map(() => entity));
    }
}

//#endregion
