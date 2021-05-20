import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    FetchPolicy,
    CachePolicy,
    EntityType,
    BaseEntity,
    ChainingStrategyFieldsMap, Type, EntityDTOType
} from '../../../domain/public_api';
import { DefaultEntityStore, EntityStore } from './entity-store';
import { QueryBuilder } from '../query/query-builder';
import { QueryService } from '../query/query.service';
import { QuerySnapshot } from '../query/query';
import { EntityCollectionService } from './entity-collection-service';
import { EntityCollectionsService } from './entity-collections-service';
import { instanceForType } from '../domain/state-handler';

//#region Interfaces

/**
 * Entity Store Builder interface
 */
export interface EntityStoreBuilder<T extends BaseEntity<EntityDTOType<T>>> {
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
    abstract create<T extends BaseEntity<EntityDTOType<T>>>(entity: EntityType<T>): EntityStoreBuilder<T>;
}

//#endregion

//#region Implementation

/**
 * Entity Store Builder default implementation
 */
export class DefaultEntityStoreBuilder<T extends BaseEntity<EntityDTOType<T>>> implements EntityStoreBuilder<T> {
    protected cachePolicy: CachePolicy | null = null;
    protected fetchPolicy: FetchPolicy | null = null;
    protected chainingStrategyMap: ChainingStrategyFieldsMap<T> | null = null;

    constructor(
        protected readonly entityClass: EntityType<T>,
        protected readonly entityCollectionsService: EntityCollectionsService
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
        const entityCollectionService = this.entityCollectionsService.getEntityCollectionService<T>(this.entityClass);
        const queryBuilder = new QueryBuilder(
            new DefaultQueryService(this.entityClass, entityCollectionService));

        const result = new DefaultEntityStore<T>(
            this.entityClass,
            entityCollectionService,
            queryBuilder, {
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
    constructor(protected readonly entityCollectionsService: EntityCollectionsService) {}

    create<T extends BaseEntity<EntityDTOType<T>>>(entity: EntityType<T>): EntityStoreBuilder<T> {
        return new DefaultEntityStoreBuilder(entity, this.entityCollectionsService);
    }
}

export class DefaultQueryService<TModel extends BaseEntity<EntityDTOType<TModel>>> extends QueryService<TModel> {
    constructor(
        private entity: Type<TModel>,
        private service: EntityCollectionService<EntityDTOType<TModel>>) {
        super();
    }

    getByKey(id: string): Observable<TModel> {
        return this.service.getByKey(id).pipe(
            map((dto: EntityDTOType<TModel>) => instanceForType(this.entity, dto))
        );
    }

    getWithQuery(query: QuerySnapshot<EntityDTOType<TModel>>): Observable<TModel[]> {
        return this.service.getWithQuery(query).pipe(
            map((data: EntityDTOType<TModel>[]) => {
                return data.map(dto => instanceForType(this.entity, dto));
            })
        );
    }

    count(): Observable<number> {
        return this.service.count$;
    }
}

//#endregion
