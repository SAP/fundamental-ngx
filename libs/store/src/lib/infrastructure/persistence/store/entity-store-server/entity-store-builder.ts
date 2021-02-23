import { Injectable } from '@angular/core';
import { EntityCollectionServiceFactory } from '@ngrx/data';

import { FetchPolicy, CachePolicy, Type } from '../../../../domain/public_api';
import { DefaultEntityStore, EntityStore, EntityStoreOptions } from './entity-store';
import { EntityMetaOptionsService } from '../../entity-options.service';

//#region Interfaces

/**
 * Entity Store Builder interface
 */
export interface EntityStoreBuilder<T> {
    /**
     * Apply Cache Policy
     * @param policy CachePolicy settings
     */
    useCachePolicy(policy: CachePolicy): this;
    /**
     * Apply Fetch Policy
     * @param policy FetchPolicy settings
     */
    useFetchPolicy(policy: FetchPolicy): this;
    /**
     * Created store will not be persisted
     */
    isTransient(): this;
    /**
     * Create new store
     */
    create(): EntityStore<T>;
}

/**
 * Entity Store Builder Factory interface
 */
export abstract class EntityStoreBuilderFactory {
    abstract create<T>(entity: Type<T>): EntityStoreBuilder<T>;
}

//#endregion

//#region Implementation

/**
 * Entity Store Builder default implementation
 */
export class DefaultEntityStoreBuilder<T> implements EntityStoreBuilder<T> {
    private cachePolicy: CachePolicy | null;
    private fetchPolicy: FetchPolicy | null;
    private transient: boolean;

    constructor(
        protected readonly entity: Type<T>,
        protected readonly entityCollectionServiceFactory: EntityCollectionServiceFactory,
        protected readonly entityMetaOptionsService: EntityMetaOptionsService
    ) {
        this.reset();
    }

    reset() {
        this.cachePolicy = null;
        this.fetchPolicy = null;
        this.transient = false;
    }

    useCachePolicy(policy: CachePolicy) {
        this.cachePolicy = policy;
        return this;
    }

    useFetchPolicy(policy: FetchPolicy) {
        this.fetchPolicy = policy;
        return this;
    }

    isTransient() {
        this.transient = true;
        return this;
    }

    create(): EntityStore<T> {
        const { name } = this.entityMetaOptionsService.getEntityMetadata(this.entity);

        const result = new DefaultEntityStore<T>(this.entityCollectionServiceFactory.create(name), {
            cachePolicy: this.cachePolicy,
            fetchPolicy: this.fetchPolicy,
            transient: this.transient
        });

        this.reset();

        return result;
    }
}

/**
 * Entity Store Builder Factory Default Implementation
 */
@Injectable()
export class DefaultEntityStoreBuilderFactory implements EntityStoreBuilderFactory {
    constructor(
        private entityCollectionServiceFactory: EntityCollectionServiceFactory,
        private entityMetaOptionsService: EntityMetaOptionsService
    ) {}

    create<T>(entity: Type<T>): EntityStoreBuilder<T> {
        return new DefaultEntityStoreBuilder(
            entity,
            this.entityCollectionServiceFactory,
            this.entityMetaOptionsService
        );
    }
}

//#endregion
