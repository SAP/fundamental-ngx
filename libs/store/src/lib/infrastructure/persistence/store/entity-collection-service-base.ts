import { Observable } from 'rxjs';
import { EntityCollection, EntityCollectionService as NgrxEntityCollectionService, EntityServices } from '@ngrx/data';
import { Store } from '@ngrx/store';

import { QuerySnapshotModel } from '../query/query';
import { BaseEntity } from './entity-server/interfaces';
import { EntityMetaOptions, EntityType, IdentityKey } from '../../../domain/public_api';
import { EntityMetaOptionsService } from '../utils/entity-options.service';
import { EntityCollectionService } from './entity-collection-service';
import { EntityCollectionsService } from './entity-collections-service';

/**
 * Default EntityCollectionService implementation.
 *
 * The main idea of this service
 *
 * That is a wrapper for NgRx EntityCollectionService
 * it delegates all heavy work to ngrx-data.
 *
 * Also this service is responsible to chain requests for sub resources
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
        protected readonly entityMetaOptionsService: EntityMetaOptionsService,
        protected readonly entityCollectionsService: EntityCollectionsService
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
        return this.entityCollectionService.delete(entity);
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
