import { BaseEntity, EntityCacheStorageService, IdentityKey } from './interfaces';
import { EntityCacheStorageServiceBase } from './cache-storage';

interface HeroDTO {
    id: number;
    name: string;
    version?: number;
}

class Hero extends BaseEntity<HeroDTO> {
    id!: number;
    name!: string;
    version?: number;

    get identity(): IdentityKey {
        return this.value.id;
    }
}

class StorageMock implements Storage {
    [name: string]: any;
    length: number;

    clear(): void {
        throw new Error('Method not implemented.');
    }
    getItem(key: string): string {
        throw new Error('Method not implemented.');
    }
    key(index: number): string {
        throw new Error('Method not implemented.');
    }
    removeItem(key: string): void {
        throw new Error('Method not implemented.');
    }
    setItem(key: string, value: string): void {
        throw new Error('Method not implemented.');
    }
}

describe('EntityCacheStorageServiceBase', () => {
    let service: EntityCacheStorageService<HeroDTO>;
    let storage: Storage;
    const storageKey = 'hero-storage-key';

    beforeEach(() => {
        storage = new StorageMock();
        service = new EntityCacheStorageServiceBase(storageKey, storage);
    });

    it('should be created', () => {
        expect(service).toBeDefined();
    });

    describe('#getAll', () => {
        let heroes: Hero[];

        beforeEach(() => {
            heroes = [
                { id: 1, name: 'BA', version: 1 },
                { id: 2, name: 'BB', version: 1 }
            ] as Hero[];
        });

        it('should return empty list if no data stored', async () => {
            spyOn(storage, 'getItem').and.returnValue(undefined);
            const result = await service.getAll();
            expect(result).toEqual([]);
            expect(storage.getItem).toHaveBeenCalledOnceWith(storageKey);
        });

        it('should return heroes list from storage', async () => {
            spyOn(storage, 'getItem').and.returnValue(JSON.stringify(heroes));
            const result = await service.getAll();
            expect(result).toEqual(heroes);
        });
    });

    describe('#setAll', () => {
        it('should store new list', async () => {
            spyOn(storage, 'setItem');
            const listToStore: HeroDTO[] = [{ id: 123, name: 'new item' }];
            const result = await service.setAll(listToStore);
            expect(result).toEqual(listToStore);
            expect(storage.setItem).toHaveBeenCalledOnceWith(storageKey, JSON.stringify(listToStore));
        });
    });

    describe('#clearAll', () => {
        it('should set entity cache to undefined', async () => {
            spyOn(storage, 'setItem');
            await service.clearAll();
            expect(storage.setItem).toHaveBeenCalledOnceWith(storageKey, undefined);
        });
    });
});
