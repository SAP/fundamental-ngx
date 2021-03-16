import { BaseEntity, EntityStorageService } from './interfaces';

/**
 * Cache Storage Service
 */
export class CacheStorageService<TModel extends BaseEntity> implements EntityStorageService<TModel> {
    private key: string;

    constructor(entityKey: string, private storage: Storage = sessionStorage) {
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
