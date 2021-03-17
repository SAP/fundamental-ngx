import { Observable, of } from 'rxjs';
import { Update } from '@ngrx/entity';

import { EntityCacheServerService } from './entity-cache-server';
import { BaseEntity, EntityServerService, EntityCacheStorageService, PaginatedEntitiesResponse } from './interfaces';
import { QueryParams } from '../../query/query-adapter';
import { QuerySnapshotModel } from '../../query/query';

class Hero extends BaseEntity {
    id!: number;
    name!: string;
    version?: number;
}

class CacheStorageServiceMock implements EntityCacheStorageService<Hero> {
    getAll(): Promise<Hero[]> {
        throw new Error('Method not implemented.');
    }
    setAll(items?: Hero[]): Promise<Hero[]> {
        throw new Error('Method not implemented.');
    }
    clearAll(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

class PrimaryServerMock implements EntityServerService<Hero> {
    name: string;

    add(entity: Hero): Observable<Hero> {
        throw new Error('Method not implemented.');
    }
    delete(id: string | number): Observable<string | number> {
        throw new Error('Method not implemented.');
    }
    getAll(): Observable<Hero[]> {
        throw new Error('Method not implemented.');
    }
    getById(id: any): Observable<Hero> {
        throw new Error('Method not implemented.');
    }
    getWithQuery(
        queryParams: string | QueryParams | Readonly<QuerySnapshotModel<Hero>>
    ): Observable<Hero[] | PaginatedEntitiesResponse<Hero>> {
        throw new Error('Method not implemented.');
    }
    update(update: Update<Hero>): Observable<Hero> {
        throw new Error('Method not implemented.');
    }
    upsert(entity: Hero): Observable<Hero> {
        throw new Error('Method not implemented.');
    }
}

describe('EntityCacheServerService', () => {
    let service: EntityCacheServerService<Hero>;
    let cacheStorageService: EntityCacheStorageService<Hero>;
    let primaryServer: EntityServerService<Hero>;

    beforeEach(() => {
        cacheStorageService = new CacheStorageServiceMock();
        primaryServer = new PrimaryServerMock();
        service = new EntityCacheServerService('Hero', primaryServer, cacheStorageService);
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

        it('should try to get data from cache initially', (done) => {
            spyOn(cacheStorageService, 'getAll').and.resolveTo(heroes);
            spyOn(cacheStorageService, 'setAll').and.resolveTo([]);
            spyOn(primaryServer, 'getAll').and.returnValue(of([]));

            service.getAll().subscribe((result) => {
                expect(result).toEqual(heroes);
                expect(cacheStorageService.getAll).toHaveBeenCalled();
                expect(primaryServer.getAll).not.toHaveBeenCalled();
                done();
            }, fail);
        });

        it('should delegate request to the primary server if cache is empty', (done) => {
            spyOn(cacheStorageService, 'getAll').and.resolveTo(null);
            spyOn(cacheStorageService, 'setAll').and.resolveTo([]);
            spyOn(primaryServer, 'getAll').and.returnValue(of(heroes));

            service.getAll().subscribe((result) => {
                expect(result).toEqual(heroes);
                expect(cacheStorageService.getAll).toHaveBeenCalled();
                expect(primaryServer.getAll).toHaveBeenCalled();
                done();
            }, fail);
        });

        it('should cache primary server result', (done) => {
            spyOn(cacheStorageService, 'getAll').and.resolveTo(null);
            spyOn(cacheStorageService, 'setAll').and.resolveTo([]);
            spyOn(primaryServer, 'getAll').and.returnValue(of(heroes));

            service.getAll().subscribe((result) => {
                expect(cacheStorageService.setAll).toHaveBeenCalledWith(result);
                done();
            }, fail);
        });
    });

    describe('#add', () => {
        it('should delegate request to the primary server', (done) => {
            const newHeroModel: Hero = { id: null, name: 'New Hero', version: 2 };
            const newHeroResponse: Hero = { id: 2, name: 'New Hero', version: 3 };

            spyOn(primaryServer, 'add').and.returnValue(of(newHeroResponse));
            spyOn(cacheStorageService, 'getAll').and.resolveTo([]);
            spyOn(cacheStorageService, 'setAll').and.resolveTo([]);

            service.add(newHeroModel).subscribe((result) => {
                expect(result).toEqual(newHeroResponse);
                expect(primaryServer.add).toHaveBeenCalled();
                done();
            }, fail);
        });

        it('should cache primary server result', (done) => {
            const newHeroModel: Hero = { id: null, name: 'New Hero', version: 2 };
            const newHeroResponse: Hero = { id: 2, name: 'New Hero', version: 3 };

            spyOn(primaryServer, 'add').and.returnValue(of(newHeroResponse));
            spyOn(cacheStorageService, 'getAll').and.resolveTo([]);
            spyOn(cacheStorageService, 'setAll').and.resolveTo([]);

            service.add(newHeroModel).subscribe((result) => {
                expect(cacheStorageService.setAll).toHaveBeenCalledWith([result]);
                done();
            }, fail);
        });
    });

    describe('#delete', () => {
        let cachedHeroes: Hero[];

        beforeEach(() => {
            cachedHeroes = [
                { id: 1, name: 'BA', version: 1 },
                { id: 2, name: 'BB', version: 1 }
            ] as Hero[];

            spyOn(cacheStorageService, 'getAll').and.resolveTo(cachedHeroes);
            spyOn(cacheStorageService, 'setAll').and.callFake((data) => Promise.resolve(data));
            spyOn(primaryServer, 'delete').and.callFake((id) => of(id));
        });

        it('should delegate request to the primary server', (done) => {
            service.delete(2).subscribe(() => {
                expect(primaryServer.delete).toHaveBeenCalledWith(2);
                done();
            }, fail);
        });

        it('should delete entity from local cache', (done) => {
            service.delete(2).subscribe((result) => {
                expect(cacheStorageService.setAll).toHaveBeenCalledWith(cachedHeroes.filter(({ id }) => id !== result));
                done();
            }, fail);
        });
    });

    describe('#update', () => {
        let cachedHeroes: Hero[];

        beforeEach(() => {
            cachedHeroes = [
                { id: 1, name: 'BA', version: 1 },
                { id: 2, name: 'BB', version: 1 }
            ] as Hero[];

            spyOn(cacheStorageService, 'getAll').and.resolveTo(cachedHeroes);
            spyOn(cacheStorageService, 'setAll').and.callFake((data) => Promise.resolve(data));
            spyOn(primaryServer, 'update').and.callFake((data) => of({ ...cachedHeroes[1], ...data.changes }));
        });

        it('should delegate request to the primary server', (done) => {
            const changes = {
                id: 2,
                changes: {
                    name: 'CC'
                }
            };
            service.update(changes).subscribe(() => {
                expect(primaryServer.update).toHaveBeenCalledWith(changes);
                done();
            }, fail);
        });

        it('should update entity in cache', (done) => {
            const changes = {
                id: 2,
                changes: {
                    name: 'CC'
                }
            };
            service.update(changes).subscribe((result) => {
                expect(cacheStorageService.setAll).toHaveBeenCalledWith([
                    ...cachedHeroes.filter(({ id }) => id !== changes.id),
                    result
                ]);
                done();
            }, fail);
        });
    });

    describe('#getWithQuery', () => {
        it('should not cache data and delegate request to the primary server', (done) => {
            spyOn(cacheStorageService, 'getAll');
            spyOn(cacheStorageService, 'setAll');
            spyOn(primaryServer, 'getWithQuery').and.callFake((query) => of([]));

            const querySnapshot = new QuerySnapshotModel();

            service.getWithQuery(querySnapshot).subscribe(() => {
                expect(primaryServer.getWithQuery).toHaveBeenCalledWith(querySnapshot);
                expect(cacheStorageService.getAll).not.toHaveBeenCalled();
                expect(cacheStorageService.setAll).not.toHaveBeenCalled();
                done();
            }, fail);
        });
    });

    describe('#upsert', () => {
        it('should not cache data and delegate request to the primary server', (done) => {
            spyOn(cacheStorageService, 'getAll');
            spyOn(cacheStorageService, 'setAll');
            spyOn(primaryServer, 'upsert').and.callFake((entity) => of(null));

            const entityToUpdate: Hero = { id: 4, name: 'Hero' };

            service.upsert(entityToUpdate).subscribe(() => {
                expect(primaryServer.upsert).toHaveBeenCalledWith(entityToUpdate);
                expect(cacheStorageService.getAll).not.toHaveBeenCalled();
                expect(cacheStorageService.setAll).not.toHaveBeenCalled();
                done();
            }, fail);
        });
    });
});
