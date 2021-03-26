import { Injectable } from '@angular/core';

import {
    FetchPolicy,
    CachePolicy,
    EntityType,
    BaseEntity,
    ChainingStrategyFieldsMap
} from '../../../domain/public_api';
import { DefaultEntityStore, EntityStore } from './entity-store';
import { QueryBuilder } from '../query/query-builder';
import { QueryService } from '../query/query.service';
import { Observable } from 'rxjs';
import { QuerySnapshot } from '../query/query';
import { EntityCollectionService, EntityCollectionServiceFactory } from './entity-collection-service';

//#region Interfaces

/**
 * Entity Store Builder interface
 */
export interface EntityStoreBuilder<T extends BaseEntity> {
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
     * Apply Chaining Strategy on Entity Store level
     * @param chainingStrategyMap Chaining strategy fields map
     */
    withChainingStrategy(chainingStrategyMap: ChainingStrategyFieldsMap<T>): this;
    /**
     * Create new store
     */
    create(): EntityStore<T>;
}

/**
 * Entity Store Builder Factory interface
 */
export abstract class EntityStoreBuilderFactory {
    abstract create<T extends BaseEntity>(entity: EntityType<T>): EntityStoreBuilder<T>;
}

//#endregion

//#region Implementation

/**
 * Entity Store Builder default implementation
 */
export class DefaultEntityStoreBuilder<T extends BaseEntity> implements EntityStoreBuilder<T> {
    protected cachePolicy: CachePolicy | null = null;
    protected fetchPolicy: FetchPolicy | null = null;
    protected chainingStrategyMap: ChainingStrategyFieldsMap<T> | null = null;

    constructor(
        protected readonly entity: EntityType<T>,
        protected readonly entityCollectionServiceFactory: EntityCollectionServiceFactory
    ) {
        this.reset();
    }

    reset(): void {
        this.cachePolicy = null;
        this.fetchPolicy = null;
        this.chainingStrategyMap = null;
    }

    useCachePolicy(policy: CachePolicy): this {
        this.cachePolicy = policy;
        return this;
    }

    useFetchPolicy(policy: FetchPolicy): this {
        this.fetchPolicy = policy;
        return this;
    }

    withChainingStrategy(chainingStrategyMap: ChainingStrategyFieldsMap<T>): this {
        this.chainingStrategyMap = chainingStrategyMap;
        return this;
    }

    create(): EntityStore<T> {
        const entityCollectionService = this.entityCollectionServiceFactory.create<T>(this.entity);
        const queryBuilder = new QueryBuilder(new DefaultQueryService(entityCollectionService));

        const result = new DefaultEntityStore<T>(entityCollectionService, queryBuilder, {
            cachePolicy: this.cachePolicy,
            fetchPolicy: this.fetchPolicy,
            chainingStrategy: this.chainingStrategyMap
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
    constructor(protected entityCollectionServiceFactory: EntityCollectionServiceFactory) {}

    create<T extends BaseEntity>(entity: EntityType<T>): EntityStoreBuilder<T> {
        return new DefaultEntityStoreBuilder(entity, this.entityCollectionServiceFactory);
    }
}

export class DefaultQueryService<TModel> extends QueryService<TModel> {
    constructor(private service: EntityCollectionService<TModel>) {
        super();
    }

    getByKey(id: string): Observable<TModel> {
        return this.service.getByKey(id);
    }

    getWithQuery(query: QuerySnapshot<TModel>): Observable<TModel[]> {
        return this.service.getWithQuery(query as any);
    }

    count(): Observable<number> {
        return this.service.count$;
    }
}

//#endregion
