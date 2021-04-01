import { forkJoin, Observable } from 'rxjs';
import { EntityCollection, EntityCollectionService as NgrxEntityCollectionService, EntityServices } from '@ngrx/data';
import { Store } from '@ngrx/store';

import { QuerySnapshotModel } from '../query/query';
import { BaseEntity } from './entity-server/interfaces';
import { EntityMetaOptions, EntityType, IdentityKey, Type } from '../../../domain/public_api';
import { EntityMetaOptionsService } from '../utils/entity-options.service';
import { EntityCollectionService } from './entity-collection-service';
import { EntityCollectionsService } from './entity-collections-service';
import { ChainingPolicyFieldOptions } from '../../../domain/chaining-policy';
import { map, switchMap } from 'rxjs/operators';

/**
 * Default EntityCollectionService implementation.
 *
 * The main idea of this service
 *
 * That is a wrapper for NgRx EntityCollectionService
 * it delegates all heavy work to ngrx-data.
 *
 * Also this service is responsible to perform request chaining
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
        // Еру primary entity stream
        let source = this.entityCollectionService.getByKey(key);
        // Check if there is any sub entity required
        if (this.entityMetaOptions.chainingPolicy?.fields) {
            const fieldsEntries: [string, ChainingPolicyFieldOptions<T, any>][] = Object.entries(
                this.entityMetaOptions.chainingPolicy?.fields
            );
            source = source.pipe(
                switchMap((entity) => {
                    const inners = fieldsEntries.map(([key, chainingOptions]) => {
                        const SubEntityClass = Array.isArray(chainingOptions.type)
                            ? chainingOptions.type[0]
                            : chainingOptions.type;
                        const subEntityService = this.getEntityCollectionServiceByEntityType(SubEntityClass);
                        // One entity needed so use getByKey()
                        if (!Array.isArray(chainingOptions.type)) {
                            // get primary key
                            const subEntityKey = this.getSubEntityPrimaryKey(chainingOptions, entity);
                            return subEntityService.getByKey(subEntityKey).pipe(
                                map((subEntity) => ({
                                    [key]: subEntity
                                }))
                            );
                        }
                        // If it's array we have to get collection
                        // TODO: how distinguish which one use getAll() or getWithQuery()?
                        // For now I use getAll() for simplicity
                        if (Array.isArray(chainingOptions.type)) {
                            return subEntityService.getAll().pipe(
                                map((subEntities) => ({
                                    [key]: subEntities
                                }))
                            );
                        }
                    });
                    // Load all sub resources and extend the entity with retrieved sub entities
                    return forkJoin(inners).pipe(
                        map(
                            (extensions) =>
                                extensions.reduce((entity, extension) => ({ ...entity, ...extension }), entity) as T
                        )
                    );
                })
            );
        }
        return source;
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

    private getEntityCollectionServiceByEntityType<K extends BaseEntity>(
        entityType: EntityType<K>
    ): EntityCollectionService<K> | null {
        return this.entityCollectionsService.getEntityCollectionService(entityType) || null;
    }

    private getSubEntityPrimaryKey<K extends BaseEntity>(
        { key: keyOrFunction }: ChainingPolicyFieldOptions<T, K>,
        entity: T
    ): IdentityKey {
        if (typeof keyOrFunction === 'function') {
            return keyOrFunction(entity);
        }
        return (entity as T & { [key: string]: IdentityKey })[keyOrFunction];
    }
}
