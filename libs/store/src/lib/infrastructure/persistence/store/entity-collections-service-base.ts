import { Injectable } from '@angular/core';

import { BaseEntity, EntityType } from '../../../domain/public_api';
import { EntityCollectionService } from './entity-collection-service';
import { EntityCollectionsService } from './entity-collections-service';
import { EntityCollectionServiceFactory } from './entity-collection-service-factory';
import { EntityServices } from '@ngrx/data';
import { EntityMetaOptionsService } from '../utils/entity-options.service';

/**
 * EntityCollectionsService Base implementation.
 *
 * This service returns existed or create new instance of EntityCollectionService.
 *
 */
@Injectable()
export class DefaultEntityCollectionsService extends EntityCollectionsService {
    /** Registry of EntityCollectionService instances */
    private readonly servicesMap = new Map<EntityType<any>, EntityCollectionService<any>>();

    constructor(protected entityCollectionServiceFactory: EntityCollectionServiceFactory) {
        super();
    }

    getEntityCollectionService<T>(entityType: EntityType<T>): EntityCollectionService<T> {
        let service = this.servicesMap.get(entityType);
        if (service) {
            return service;
        }
        // create new instance
        service = this.createEntityCollectionService(entityType);
        this.registerEntityCollectionService(entityType, service);
        return service;
    }

    registerEntityCollectionService<T>(
        entityType: EntityType<T>,
        entityCollectionService: EntityCollectionService<T>
    ): void {
        this.servicesMap.set(entityType, entityCollectionService);
    }

    /**
     * Create a new instance of an EntityCollectionService.
     * @param entity {class} Entity class to create service for
     */
    protected createEntityCollectionService<T>(entity: EntityType<T>): EntityCollectionService<T> {
        return this.entityCollectionServiceFactory.create<T>(entity, this);
    }
}
