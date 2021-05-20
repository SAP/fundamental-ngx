import { BaseEntity, EntityDTOType, EntityType } from '../../../domain/public_api';
import { EntityCollectionService } from './entity-collection-service';

/**
 * EntityCollectionsService is a locator for Entity Collection Service
 *
 * This service returns existed or create new instance of EntityCollectionService.
 *
 */
export abstract class EntityCollectionsService {
    /**
     * Get EntityCollectionService for given Entity class
     *
     * @param entityType {class} Entity class to get associated service for
     */
    abstract getEntityCollectionService<T extends BaseEntity<EntityDTOType<T>>>(entityType: EntityType<T>): EntityCollectionService<EntityDTOType<T>>;
    /**
     * Register EntityCollectionService instance
     *
     * @param entityType Entity class to associate a service with
     * @param entityCollectionService Entity collection service instance
     */
    abstract registerEntityCollectionService<T extends BaseEntity<EntityDTOType<T>>>(
        entityType: EntityType<T>,
        entityCollectionService: EntityCollectionService<EntityDTOType<T>>
    ): void;
}
