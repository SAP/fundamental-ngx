import { Injectable } from '@angular/core';

import { CachePolicyStrategy } from '../../../../domain/cache-policy';
import { EntityMetaOptionsService } from '../../utils/entity-options.service';
import { QueryAdapterService } from '../../query/query-adapter';
import { EntityServerService, EntityServerServiceFactory } from './interfaces';
import { EntityRestServerServiceFactory } from './entity-rest-server';
import { EntityCacheStorageServiceFactory } from './cache-storage';
import { EntityCacheServerService } from './entity-cache-server';

/**
 * Entity Server Service Factory
 *
 * This factory adds cache policy layer.
 *
 */
@Injectable()
export class DefaultEntityServerServiceFactory implements EntityServerServiceFactory {
    constructor(
        protected entityMetaOptionsService: EntityMetaOptionsService,
        protected queryAdapterService: QueryAdapterService,
        private entityServerServiceFactory: EntityRestServerServiceFactory,
        private entityCacheStorageServiceFactory: EntityCacheStorageServiceFactory,
    ) {}

    /**
     * Create EntityServerService for the given entity type
     * @param entityName {string} Name of the entity type for this data service
     */
    create<T>(entityName: string): EntityServerService<T> {
        const server = this.entityServerServiceFactory.create<T>(entityName);

        const { cache } = this.entityMetaOptionsService.getEntityResourceMetadata(entityName);

        if (!cache || cache.strategy === CachePolicyStrategy.None) {
            return server;
        }

        const cachedServer = new EntityCacheServerService(
            entityName,
            server,
            this.entityCacheStorageServiceFactory.create(
                this.getStorageKey(entityName),
                cache.strategy === CachePolicyStrategy.LocaleStorage ? localStorage : sessionStorage
            ),
            this.entityMetaOptionsService

        );

        return cachedServer;
    }

    private getStorageKey(entityName: string): string {
        return `fdp-store-cache-entity-${entityName}`.toLowerCase();
    }
}
