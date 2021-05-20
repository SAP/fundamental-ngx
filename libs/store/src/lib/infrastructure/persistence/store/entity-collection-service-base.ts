import { BehaviorSubject, merge, Observable, Subject, ReplaySubject, zip } from 'rxjs';
import { EntityCollection, EntityCollectionService as NgrxEntityCollectionService, EntityServices } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import {
    BaseEntity,
    EntityMetaOptions,
    EntityType,
    IdentityKey,
    ChainingPolicy,
    ChainingPolicyFieldOptions
} from '../../../domain/public_api';
import { QuerySnapshotModel } from '../query/query';
import { EntityMetaOptionsService } from '../utils/entity-options.service';
import { EntityCollectionService } from './entity-collection-service';
import { EntityCollectionsService } from './entity-collections-service';

/**
 * Default EntityCollectionService implementation.
 *
 * That is a wrapper for NgRx EntityCollectionService
 * it delegates all heavy work to ngrx-data entity collection service.
 *
 * This service is responsible to perform request chaining.
 *
 */
export class DefaultEntityCollectionService<T> implements EntityCollectionService<T> {
    readonly name: string;

    readonly collection$: Observable<EntityCollection<T>> | Store<EntityCollection<T>>;

    readonly count$: Observable<number>;

    readonly entities$: Observable<T[]>;

    readonly errors$: Observable<Error>;

    readonly loading$: Observable<boolean>;

    readonly loaded$: Observable<boolean>;

    /**
     * @hidden
     * ngrx entity collection service
     */
    protected readonly entityCollectionService: NgrxEntityCollectionService<T>;
    /**
     * @hidden
     * Meta options associated with Entity
     */
    protected readonly entityMetaOptions: EntityMetaOptions<BaseEntity<T>>;

    constructor(
        protected readonly entity: EntityType<BaseEntity<T>>,
        protected readonly entityServices: EntityServices,
        protected readonly entityMetaOptionsService: EntityMetaOptionsService,
        protected readonly entityCollectionsService: EntityCollectionsService
    ) {
        this.entityMetaOptions = entityMetaOptionsService.getEntityMetadata(entity);
        const { name } = this.entityMetaOptions;
        this.name = `${name} DefaultEntityCollectionService`;
        this.entityCollectionService = entityServices.getEntityCollectionService(name);

        this.collection$ = this.entityCollectionService.collection$;
        this.count$ = this.entityCollectionService.count$;
        this.entities$ = this.entityCollectionService.entities$;
        this.errors$ = this.entityCollectionService.errors$.pipe(map((action) => action.payload.error));
        this.loading$ = this.entityCollectionService.loading$;
        this.loaded$ = this.entityCollectionService.loaded$;
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
        chainingPolicy: ChainingPolicy<BaseEntity<T>> = this.entityMetaOptions.chainingPolicy
    ): Observable<T> {
        const fieldsForChaining: [string, ChainingPolicyFieldOptions<T, any>][] = Object.entries<any>(
            chainingPolicy?.fields || {}
        );
        // Blocked chaining
        const blockedChainingEntries = fieldsForChaining.filter(([_, { strategy }]) => strategy === 'block');
        // Non-blocked chaining
        const nonBlockedChainingEntries = fieldsForChaining.filter(([_, { strategy }]) => strategy === 'non-block');

        if (!blockedChainingEntries.length && !nonBlockedChainingEntries.length) {
            return entitySource;
        }
        /**
         *
         * It's needed to treat two strategies:
         * 1. block
         * 2. non-block
         *
         * entitySource is a stream retrieved from ngRxEntityCollectionService
         * this stream is not alive, that means it gets completed once entity is gotten
         * from remote server and updated in the store.
         * Since so we can safely append new pipe logic to get sub resources
         * without side effects
         *
         */

        // Data that should block entity response until it's resolved
        if (blockedChainingEntries.length) {
            entitySource = entitySource.pipe(
                switchMap((entity) => {
                    const innerRequests = this.createChainingRequests(blockedChainingEntries, entity);
                    // Load all sub resources and extend the entity with retrieved sub entities
                    return zip(...innerRequests).pipe(
                        map(
                            (extensions) =>
                                extensions.reduce((extended, extension) => ({ ...extended, ...extension }), entity) as T
                        )
                    );
                })
            );
        }

        // Non-block sub resources
        if (nonBlockedChainingEntries.length) {
            entitySource = entitySource.pipe(
                // Not sure if we really need SwitchMap as it looks like
                // entitySource can not be fired more than once.
                // use it to keep it safe
                switchMap((entity) => {
                    // Use a dedicated subject to inject extended entity model once we get sub-entity loaded
                    const entitySubject = new BehaviorSubject(entity);
                    // Since we are in switchMap previous subject will be completed automatically
                    // so it's needed to listen for complete event to terminate "innerRequests"
                    const subRequestCompletedSubject = new Subject<void>();

                    const innerRequests = this.createChainingRequests(nonBlockedChainingEntries, entity);

                    merge(...innerRequests)
                        .pipe(takeUntil(subRequestCompletedSubject))
                        .subscribe({
                            next: (keyRequestResultMap) => {
                                entitySubject.next({
                                    ...entitySubject.getValue(),
                                    ...keyRequestResultMap
                                });
                            },
                            error: (error) => {
                                // How should we react on it?
                                // entitySubject.error(error)
                            },
                            complete: () => {
                                entitySubject.complete();
                            }
                        });

                    // Listen to complete event in order to unsubscribe from "merge" stream above
                    entitySubject.subscribe({
                        complete: () => {
                            subRequestCompletedSubject.next();
                            subRequestCompletedSubject.complete();
                        }
                    });

                    // Return subject so we are able to inject required data later
                    return entitySubject;
                })
            );
        }

        // Proxy result subject.
        const resultSubject$ = new ReplaySubject<T>(1);

        // In order to run Request Chaining pipe it's needed to subscribe to it
        // and push values in proxy subject.
        // Once all sub entities are loaded this subscription will be completed automatically
        entitySource.subscribe(resultSubject$);

        return resultSubject$.asObservable();
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

            // One entity requires using getByKey()
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
            // TODO: how distinguish which one to use: getAll() or getWithQuery()?
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
