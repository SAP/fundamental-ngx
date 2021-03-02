import { Injectable, Optional } from '@angular/core';
import { DefaultDataServiceConfig } from '@ngrx/data';

import { EntityMetaOptionsService } from '../../utils/entity-options.service';
import { EntityLocalServerBaseService } from './entity-local-server-base';
import { EntityStorageService, EntityServerServiceFactory, EntityServerService, Entity } from './interfaces';

/**
 * Entity In Memory Server
 *
 * Persist entity collection in memory (mimic API responses)
 *
 */
export class EntityInMemoryServerService<T extends Entity> extends EntityLocalServerBaseService<T> {
    get name(): string {
        return `${this.entityName} EntityInMemoryServerService`;
    }
}

/**
 * EntityInMemoryServer factory
 */
@Injectable()
export class EntityInMemoryServerServiceFactory implements EntityServerServiceFactory {
    constructor(
        protected entityMetaOptionsService: EntityMetaOptionsService,
        @Optional() protected config?: DefaultDataServiceConfig
    ) {
        config = config || {};
    }

    /**
     * Create EntityServerService for the given entity type
     * @param entityName {string} Name of the entity type for this data service
     */
    create<T extends Entity>(entityName: string): EntityServerService<T> {
        return new EntityInMemoryServerService<T>(
            entityName,
            new ImMemoryStorageService(),
            this.entityMetaOptionsService,
            this.config
        );
    }
}

/**
 * Im Memory Storage Service
 */
export class ImMemoryStorageService<TModel extends Entity> implements EntityStorageService<TModel> {
    private collection: TModel[] = [];

    getAll(): Promise<TModel[]> {
        return Promise.resolve(this.collection);
    }

    setAll(collection: TModel[]): Promise<TModel[]> {
        this.collection = collection;
        return Promise.resolve(this.collection);
    }

    clearAll(): Promise<void> {
        this.collection = [];
        return Promise.resolve();
    }
}
