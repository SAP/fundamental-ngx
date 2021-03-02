import { Injectable } from '@angular/core';

import { Entity, EntityServerService, EntityServerServiceFactory } from './interfaces';
import { EntityServerServiceFactoryResolver } from './entity-server-service-resolver';

/**
 * Entity Server Service Factory
 *
 * Create Entity Server Service for given entity
 */
@Injectable()
export class DefaultEntityServerServiceFactory implements EntityServerServiceFactory {
    constructor(private entityServerServiceFactoryResolver: EntityServerServiceFactoryResolver) {}

    /**
     * Create EntityServerService for the given entity type
     * @param entityName {string} Name of the entity type for this data service
     */
    create<T extends Entity>(entityName: string): EntityServerService<T> {
        const entityServerFactory = this.entityServerServiceFactoryResolver.resolve(entityName);
        return entityServerFactory.create<T>(entityName);
    }
}
