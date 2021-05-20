import { Observable } from 'rxjs';
import { EntityCollection } from '@ngrx/data';

import { QuerySnapshot } from '../query/query';

/**
 * EntityCollectionService is intendant to generate actions
 * for Entity CRUD operations.
 *
 * This service is dedicated for each particular Entity.
 *
 */
export interface EntityCollectionService<T> {
    /** Entity service name  */
    readonly name: string;
    
    /** Observable of the collection as a whole */
    readonly collection$: Observable<EntityCollection>;
    
    /** Observable of count of entities in the cached collection. */
    readonly count$: Observable<number>;
    
    /** Observable of all entities in the cached collection. */
    readonly entities$: Observable<T[]>;

    /** Observable of error related to this entity type. */
    readonly errors$: Observable<Error>;

    /** Observable true when the collection has been loaded */
    readonly loaded$: Observable<boolean>;

    /** Observable true when a multi-entity query command is in progress. */
    readonly loading$: Observable<boolean>;

    /**
     * Create Entity on remote server
     * @param entity Entity to create
     */
    add(entity: T): Observable<T>;
    /**
     * Delete entity on remote server
     * @param entity Entity to delete
     */
    delete(entity: T): Observable<number | string>;
    /**
     * Get All Entities
     */
    getAll(): Observable<T[]>;
    /**
     * Query remote storage for the entity with this primary key.
     * @param key The primary key of the entity to get.
     */
    getByKey(key: any): Observable<T>;
    /**
     * Query remote storage for the entities that satisfy a query
     * @param querySnapshot the query in a form understood by the server
     */
    getWithQuery(querySnapshot: QuerySnapshot<T>): Observable<T[]>;
    /**
     * Update Entity at remote server
     * @param entity
     */
    update(entity: Partial<T>): Observable<T>;
    /**
     * Save a new or update an existing entity at remote storage.
     * Only dispatch this action if your server supports upsert.
     * @param entity entity to upsert
     */
    upsert(entity: T): Observable<T>;
}
