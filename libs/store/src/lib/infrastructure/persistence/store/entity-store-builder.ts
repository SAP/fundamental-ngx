import { Injectable } from '@angular/core';
import { EntityCollectionServiceFactory } from '@ngrx/data';

import { FetchPolicy, CachePolicy, Type, BaseEntity } from '../../../domain/public_api';
import { DefaultEntityStore, DefaultQueryService, EntityStore } from './entity-store';
import { EntityMetaOptionsService } from '../utils/entity-options.service';
import { QueryBuilder } from '../query/query-builder';

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
     * Create new store
     */
    create(): EntityStore<T>;
}

/**
 * Entity Store Builder Factory interface
 */
export abstract class EntityStoreBuilderFactory {
    abstract create<T extends BaseEntity>(entity: Type<T>): EntityStoreBuilder<T>;
}

//#endregion

//#region Implementation

/**
 * Entity Store Builder default implementation
 */
export class DefaultEntityStoreBuilder<T extends BaseEntity> implements EntityStoreBuilder<T> {
    private cachePolicy: CachePolicy | null;
    private fetchPolicy: FetchPolicy | null;

    constructor(
        protected readonly entity: Type<T>,
        protected readonly entityCollectionServiceFactory: EntityCollectionServiceFactory,
        protected readonly entityMetaOptionsService: EntityMetaOptionsService
    ) {
        this.reset();
    }

    reset(): void {
        this.cachePolicy = null;
        this.fetchPolicy = null;
    }

    useCachePolicy(policy: CachePolicy): this {
        this.cachePolicy = policy;
        return this;
    }

    useFetchPolicy(policy: FetchPolicy): this {
        this.fetchPolicy = policy;
        return this;
    }

    create(): EntityStore<T> {
        const { name } = this.entityMetaOptionsService.getEntityMetadata(this.entity);
        const entityCollectionService = this.entityCollectionServiceFactory.create<T>(name);
        const queryBuilder = new QueryBuilder(new DefaultQueryService(entityCollectionService));

        const result = new DefaultEntityStore<T>(entityCollectionService, queryBuilder, {
            cachePolicy: this.cachePolicy,
            fetchPolicy: this.fetchPolicy
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

    create<T extends BaseEntity>(entity: Type<T>): EntityStoreBuilder<T> {
        return new DefaultEntityStoreBuilder(
            entity,
            this.entityCollectionServiceFactory,
            this.entityMetaOptionsService
        );
    }
}

//#endregion
