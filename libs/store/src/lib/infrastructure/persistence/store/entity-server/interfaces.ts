import { EntityCollectionDataService as EntityServerService } from '@ngrx/data';

import { Entity, IdentityKey } from '../../../../domain/entity';

export { EntityServerService, Entity, IdentityKey };

/**
 * Entity Collection Storage
 *
 * Used to retrieve / update entity collection
 */
export interface EntityStorageService<TModel extends Entity> {
    /**
     * Get all available items
     */
    getAll(): Promise<TModel[]>;
    /**
     * Set new items collection
     */
    setAll(items: TModel[]): Promise<TModel[]>;
    /**
     * Clear collection
     */
    clearAll(): Promise<void>;
}

export abstract class EntityServerServiceFactory {
    abstract create<T extends Entity>(entityName: string): EntityServerService<T>;
}
