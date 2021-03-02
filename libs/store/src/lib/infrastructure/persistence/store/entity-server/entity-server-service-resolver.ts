import { Injectable } from '@angular/core';

import { EntityMetaOptionsService } from '../../utils';
import { EntityServerServiceFactory } from './interfaces';
import { EntityRestServerServiceFactory } from './entity-rest-server';
import { EntityInMemoryServerServiceFactory } from './entity-in-memory-server';
import { EntityLocalStorageServerServiceFactory } from './entity-local-storage-server';
/**
 * Entity Server Factory Resolver.
 *
 * Returns Entity Store Server Factory based on entity options
 */
@Injectable()
export class EntityServerServiceFactoryResolver {
    constructor(
        protected entityRestServerFactory: EntityRestServerServiceFactory,
        protected entityInMemoryServerFactory: EntityInMemoryServerServiceFactory,
        protected entityLocalStorageServerFactory: EntityLocalStorageServerServiceFactory,
        protected entityMetaOptionsService: EntityMetaOptionsService
    ) {}
    /**
     * Get Entity Server Factory based on entity options
     * @param entityName Entity name
     */
    resolve(entityName: string): EntityServerServiceFactory {
        const options = this.entityMetaOptionsService.getEntityMetadata(entityName);
        // TODO: Based on entity option select needed factory
        switch (options['storageStrategy']) {
            case 'in-memory':
                return this.entityInMemoryServerFactory;
            case 'locale-storage':
                return this.entityLocalStorageServerFactory;
        }
        return this.entityRestServerFactory;
    }
}
