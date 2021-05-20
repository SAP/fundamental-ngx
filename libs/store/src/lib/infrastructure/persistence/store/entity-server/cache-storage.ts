import { Injectable } from '@angular/core';

import {  EntityCacheStorageService } from './interfaces';

/**
 * Entity Cache Storage Service
 * Default implementation
 */
export class EntityCacheStorageServiceBase<TModel> implements EntityCacheStorageService<TModel> {
    private key: string;

    constructor(entityKey: string, private storage: Storage) {
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
        try {
            this.storage.setItem(this.key, undefined);
        } catch (error) {}
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

/**
 * Entity Cache Storage Service Factory
 */
@Injectable()
export class EntityCacheStorageServiceFactory {
    /**
     * Create Entity Cache Storage Service
     *
     * @param storageKey Unique storage key
     * @param storage Optional storage type (sessionStorage or localStorage)
     * @returns EntityCacheStorageService
     */
    create<T>(storageKey: string, storage?: Storage): EntityCacheStorageService<T> {
        return new EntityCacheStorageServiceBase<T>(storageKey, storage || sessionStorage);
    }
}
