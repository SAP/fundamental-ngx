import { Observable } from 'rxjs';
import {
    EntityActionOptions,
    EntityCollection,
    EntityCollectionService as NgrxEntityCollectionService,
    EntityCollectionServiceFactory as NgrxEntityCollectionServiceFactory,
    EntityServices
} from '@ngrx/data';

import { QuerySnapshot, QuerySnapshotModel } from '../query/query';
import { BaseEntity } from './entity-server/interfaces';
import { EntityMetaOptions, EntityType, IdentityKey } from '../../../domain/public_api';
import { EntityMetaOptionsService } from '../utils/entity-options.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

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
    readonly collection$: Observable<EntityCollection> | Store<EntityCollection>;
    /** Observable of count of entities in the cached collection. */
    readonly count$: Observable<number> | Store<number>;
    /** Observable of all entities in the cached collection. */
    readonly entities$: Observable<T[]> | Store<T[]>;
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

/**
 * Default EntityCollectionService implementation.
 *
 * The main idea of this service
 *
 * That is a wrapper for NgRx EntityCollectionService
 * it delegates all heavy work to ngrx-data
 *
 */
export class DefaultEntityCollectionService<T extends BaseEntity> implements EntityCollectionService<T> {
    readonly name: string;

    get collection$(): Observable<EntityCollection<T>> | Store<EntityCollection<T>> {
        return this.entityCollectionService.collection$;
    }

    get count$(): Observable<number> | Store<number> {
        return this.entityCollectionService.count$;
    }

    get entities$(): Observable<T[]> | Store<T[]> {
        return this.entityCollectionService.entities$;
    }

    protected readonly entityCollectionService: NgrxEntityCollectionService<T>;
    
    protected readonly entityMetaOptions: EntityMetaOptions<T>;

    constructor(
        protected readonly entity: EntityType<T>,
        protected readonly entityServices: EntityServices,
        protected readonly entityMetaOptionsService: EntityMetaOptionsService
    ) {
        this.entityMetaOptions = entityMetaOptionsService.getEntityMetadata(entity);
        const { name } = this.entityMetaOptions;
        this.name = `${name} DefaultEntityCollectionService`;
        this.entityCollectionService = entityServices.getEntityCollectionService(name);
    }

    add(entity: T): Observable<T> {
        return this.entityCollectionService.add(entity);
    }
    
    delete(entity: T): Observable<string | number> {
        return this.delete(entity);
    }
    
    getAll(): Observable<T[]> {
        return this.entityCollectionService.getAll();
    }
    
    getByKey(key: IdentityKey): Observable<T> {
        return this.entityCollectionService.getByKey(key);
    }
    
    getWithQuery(querySnapshot: Readonly<QuerySnapshotModel<T>>): Observable<T[]> {
        return this.entityCollectionService.getWithQuery(querySnapshot as any);
    }
    
    update(entity: Partial<T>): Observable<T> {
        return this.entityCollectionService.update(entity);
    }

    upsert(entity: T): Observable<T> {
        return this.entityCollectionService.upsert(entity);
    }
}

@Injectable()
export class EntityCollectionServiceFactory {
    constructor(
        protected readonly entityServices: EntityServices,
        protected readonly entityMetaOptionsService: EntityMetaOptionsService
    ) {}

    create<T extends BaseEntity>(entity: EntityType<T>): EntityCollectionService<T> {
        return new DefaultEntityCollectionService(entity, this.entityServices, this.entityMetaOptionsService);
    }
}
