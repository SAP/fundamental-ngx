import { Injectable } from '@angular/core';
import { EntityServices } from '@ngrx/data';

import { BaseEntity, EntityType } from '../../../domain/public_api';
import { EntityMetaOptionsService } from '../utils/entity-options.service';
import { EntityCollectionService } from './entity-collection-service';
import { DefaultEntityCollectionService } from './entity-collection-service-base';
import { EntityCollectionsService } from './entity-collections-service';

/**
 * Factory for EntityCollectionService
 */
@Injectable()
export class EntityCollectionServiceFactory {
    constructor(
        protected readonly entityServices: EntityServices,
        protected readonly entityMetaOptionsService: EntityMetaOptionsService
    ) {}

    /**
     * Create new instance of EntityCollectionService<EntityType>
     * @param entityType
     * @returns EntityCollectionService<T>
     */
    create<T>(
        entityType: EntityType<BaseEntity<T>>,
        // Can't use it as dependency in ctr due to DI circular error
        entityCollectionsService: EntityCollectionsService
    ): EntityCollectionService<T> {
        return new DefaultEntityCollectionService(
            entityType,
            this.entityServices,
            this.entityMetaOptionsService,
            entityCollectionsService
        );
    }
}
