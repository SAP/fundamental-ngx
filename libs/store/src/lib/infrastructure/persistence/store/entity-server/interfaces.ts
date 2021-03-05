import { EntityCollectionDataService as EntityServerService } from '@ngrx/data';

import { BaseEntity, IdentityKey } from '../../../../domain/entity';

export { EntityServerService, BaseEntity, IdentityKey };

/**
 * Entity Collection Storage
 *
 * Used to retrieve / update entity collection
 */
export interface EntityStorageService<TModel extends BaseEntity> {
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
    abstract create<T extends BaseEntity>(entityName: string): EntityServerService<T>;
}
