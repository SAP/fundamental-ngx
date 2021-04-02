import { BehaviorSubject, forkJoin, merge, Observable, Subject, zip } from 'rxjs';
import { EntityCollection, EntityCollectionService as NgrxEntityCollectionService, EntityServices } from '@ngrx/data';
import { Store } from '@ngrx/store';

import { QuerySnapshotModel } from '../query/query';
import { BaseEntity } from './entity-server/interfaces';
import { EntityMetaOptions, EntityType, IdentityKey, Type } from '../../../domain/public_api';
import { EntityMetaOptionsService } from '../utils/entity-options.service';
import { EntityCollectionService } from './entity-collection-service';
import { EntityCollectionsService } from './entity-collections-service';
import { ChainingPolicy, ChainingPolicyFieldOptions, ChainingStrategy } from '../../../domain/chaining-policy';
import { map, skip, switchMap, takeUntil } from 'rxjs/operators';

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
        let source = this.entityCollectionService.getByKey(key);
        // Add chaining pipe
        source = this.handleRequestChaining(source);
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

    /**
     * Adds chaining request to the current pipe if needed
     * @param entitySource Primary Entity stream
     * @param chainingPolicy Chaining policy options for the given entity
     * @returns Observable which conditionally includes chaining requests to the given pipe
     */
    private handleRequestChaining(
        entitySource: Observable<T>,
        chainingPolicy: ChainingPolicy<T> = this.entityMetaOptions.chainingPolicy
    ): Observable<T> {
        const fieldsForChaining: [string, ChainingPolicyFieldOptions<T, any>][] = Object.entries<any>(
            chainingPolicy?.fields || {}
        );

        if (!fieldsForChaining.length) {
            return entitySource;
        }
        /**
         *
         * It's needed to treat two strategies:
         * 1. 'block'
         * 2. 'non-block
         *
         * --------------------
         * NGRX EntityCollectionService returns live entity stream which is
         * connected to the store and listen for entity changes.
         * So once an entity changed in the store this stream
         * will push updated "entity" instance.
         *
         * We do not want to trigger "chaining request" every time when primary entity
         * is changed in the store. Since so need to hit sub entity request only once
         * and keep stream of this.
         *
         *
         */

        // Blocked chaining
        const blockedChainingEntries = fieldsForChaining.filter(([_, { strategy }]) => strategy === 'block');
        // Non-blocked chaining
        const nonBlockedChainingEntries = fieldsForChaining.filter(([_, { strategy }]) => strategy === 'non-block');

        if (blockedChainingEntries.length) {
            entitySource = entitySource.pipe(
                switchMap((entity) => {
                    const innerRequests = this.createChainingRequests(blockedChainingEntries, entity);
                    // Load all sub resources and extend the entity with retrieved sub entities
                    // Can't use forkJoin since innerRequests is alive stream that listens for entity store changes 
                    return zip(...innerRequests).pipe(
                        map(
                            (extensions) =>
                                extensions.reduce((entity, extension) => ({ ...entity, ...extension }), entity) as T
                        )
                    );
                })
            );
        }

        if (nonBlockedChainingEntries.length) {
            entitySource = entitySource.pipe(
                switchMap((entity) => {
                    // SubEntity subject to inject sub entity payload later once we get it loaded
                    const subEntitiesSubject = new BehaviorSubject(entity);
                    // Since we are in switchMap previous subject will be completed automatically
                    // so need to listed for complete event to terminate "innerRequests"
                    const subRequestCompletedSubject = new Subject<void>();

                    const innerRequests = this.createChainingRequests(nonBlockedChainingEntries, entity);

                    merge(...innerRequests)
                        .pipe(takeUntil(subRequestCompletedSubject))
                        .subscribe((keyRequestResultMap) => {
                            subEntitiesSubject.next({
                                ...subEntitiesSubject.getValue(),
                                ...keyRequestResultMap
                            });
                        });

                    subEntitiesSubject.subscribe({
                        complete: () => {
                            subRequestCompletedSubject.next();
                            subRequestCompletedSubject.complete();
                        }
                    });

                    // Return subject so we are able to inject required data later
                    return subEntitiesSubject;
                })
            );
        }

        return entitySource;
    }

    /** @hidden */
    private getSubEntityPrimaryKey<K extends BaseEntity>(
        { key: keyOrFunction }: ChainingPolicyFieldOptions<T, K>,
        entity: T
    ): IdentityKey {
        if (typeof keyOrFunction === 'function') {
            return keyOrFunction(entity);
        }
        return (entity as T & { [key: string]: IdentityKey })[keyOrFunction];
    }

    /**
     * Make request to Sub Entity and get back alive stream of this entity 
     * 
     * @param chainingEntries [keyToSubEntity: string, SubEntityChainingPolicy]
     * @param entity Primary entity instance
     * @returns sub entity alive stream
     */
    private createChainingRequests(
        chainingEntries: [string, ChainingPolicyFieldOptions<T, any>][],
        entity: T
    ): Observable<{
        [x: string]: any;
    }>[] {
        const requests = chainingEntries.map(([key, chainingOptions]) => {
            const SubEntityClass = Array.isArray(chainingOptions.type) ? chainingOptions.type[0] : chainingOptions.type;

            const subEntityService = this.entityCollectionsService.getEntityCollectionService(SubEntityClass);

            // One entity is needed so use getByKey()
            if (!Array.isArray(chainingOptions.type)) {
                // get primary key
                const subEntityKey = this.getSubEntityPrimaryKey(chainingOptions, entity);
                return subEntityService.getByKey(subEntityKey).pipe(
                    map((subEntity) => ({
                        [key]: subEntity
                    }))
                );
            }
            // If it's array we have to request collection of entities
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

        return requests;
    }
}
