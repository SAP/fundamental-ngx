import { Injectable, Optional } from '@angular/core';
import { DefaultDataServiceConfig } from '@ngrx/data';

import { EntityMetaOptionsService } from '../../utils/entity-options.service';
import { EntityLocalServerBaseService } from './entity-local-server-base';
import { Entity, EntityServerService, EntityServerServiceFactory, EntityStorageService } from './interfaces';

/**
 * Entity LocalStorage Server
 *
 * Persist entity collection in memory (mimic API responses)
 */
export class EntityLocalStorageServerService<T extends Entity> extends EntityLocalServerBaseService<T> {
    get name(): string {
        return `${this.entityName} EntityLocalStorageServerService`;
    }
}

/**
 * EntityLocalStorageServer Factory
 */
@Injectable()
export class EntityLocalStorageServerServiceFactory implements EntityServerServiceFactory {
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
        return new EntityLocalStorageServerService<T>(
            entityName,
            new LocalStorageService(this.getEntityStorageKey(entityName)),
            this.entityMetaOptionsService,
            this.config
        );
    }

    private getEntityStorageKey(entityName: string): string {
        return `fdp-entity-store-storage-${entityName}`;
    }
}

/**
 * Local Storage Service
 */
export class LocalStorageService<TModel extends Entity> implements EntityStorageService<TModel> {
    private key: string;

    constructor(entityKey: string, private storage: Storage = localStorage) {
        this.key = entityKey;
    }

    getAll(): Promise<TModel[]> {
        const collection = this.getListFromStorage() || [];
        return Promise.resolve(collection);
    }

    setAll(items: TModel[] = []): Promise<TModel[]> {
        this.saveListToStorage(items);
        return Promise.resolve(items);
    }

    clearAll(): Promise<void> {
        this.saveListToStorage([]);
        return Promise.resolve();
    }

    private getListFromStorage(): TModel[] {
        try {
            const stringified = this.storage.getItem(this.key);
            const parsed = JSON.parse(stringified);
            return parsed || [];
        } catch (error) {
            return [];
        }
    }

    private saveListToStorage(collection: TModel[]): void {
        try {
            const stringified = JSON.stringify(collection);
            this.storage.setItem(this.key, stringified);
        } catch (error) {}
    }
}
