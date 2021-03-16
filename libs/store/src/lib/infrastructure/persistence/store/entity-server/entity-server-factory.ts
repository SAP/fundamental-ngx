import { Injectable } from '@angular/core';

import { CachePolicyStrategy } from '../../../../domain/cache-policy';
import { EntityMetaOptionsService } from '../../utils/entity-options.service';
import { QueryAdapterService } from '../../query/query-adapter';
import { BaseEntity, EntityServerService, EntityServerServiceFactory } from './interfaces';
import { EntityRestServerServiceFactory } from './entity-rest-server';
import { CacheStorageService } from './cache-storage';
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
        private entityServerServiceFactory: EntityRestServerServiceFactory
    ) {}

    /**
     * Create EntityServerService for the given entity type
     * @param entityName {string} Name of the entity type for this data service
     */
    create<T extends BaseEntity>(entityName: string): EntityServerService<T> {
        const server = this.entityServerServiceFactory.create<T>(entityName);

        const { cache } = this.entityMetaOptionsService.getEntityResourceMetadata(entityName);

        if (!cache || cache.strategy === CachePolicyStrategy.None) {
            return server;
        }

        const cachedServer = new EntityCacheServerService(
            server,
            entityName,
            new CacheStorageService(
                entityName,
                cache.strategy === CachePolicyStrategy.LocaleStorage ? localStorage : sessionStorage
            ),
            this.entityMetaOptionsService
        );

        return cachedServer;
    }
}
