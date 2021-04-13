import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { v4 as uuidV4 } from 'uuid';

import {
    EntityCacheStorageService,
    EntityServerService,
    BaseEntity,
    IdentityKey,
    PaginatedEntitiesResponse
} from './interfaces';
import { QuerySnapshot } from '../../query/query-adapter';

/**
 * Entity Cache Server.
 * It is a wrapper layer for entity server implementation (decorator pattern).
 *
 */
export class EntityCacheServerService<T extends BaseEntity<{}>> implements EntityServerService<T> {
    /**
     * Service implementation name
     */
    name = `${this.entityName} EntityCacheServer`;

    constructor(
        protected entityName: string,
        protected server: EntityServerService<T>,
        protected storageService: EntityCacheStorageService<T>
    ) {}

    add(entity: T): Observable<T> {
        return this.server.add(entity).pipe(
            switchMap((result) =>
                from(this.addEntityToCache(result)).pipe(
                    map(() => result),
                    catchError(() => of(result))
                )
            )
        );
    }

    delete(key: IdentityKey): Observable<IdentityKey> {
        return this.server.delete(key).pipe(
            switchMap((result) =>
                from(this.deleteEntityFromCache(key)).pipe(
                    map(() => result),
                    catchError(() => of(result))
                )
            )
        );
    }

    getAll(): Observable<T[]> {
        return from(this.storageService.getAll()).pipe(
            switchMap((cached) => {
                if (Array.isArray(cached)) {
                    // return cache
                    return of(cached);
                }
                return this.server.getAll().pipe(
                    switchMap((result) =>
                        from(this.storageService.setAll(result)).pipe(
                            map(() => result),
                            catchError(() => of(result))
                        )
                    )
                );
            })
        );
    }

    update(update: Update<T>): Observable<T> {
        // Cache it
        return this.server.update(update).pipe(
            switchMap((result) =>
                from(this.updateEntityInCache(result)).pipe(
                    map(() => result),
                    catchError(() => of(result))
                )
            )
        );
    }

    getById(id: IdentityKey): Observable<T> {
        return this.server.getById(id);
    }

    getWithQuery(query: QuerySnapshot<T>): Observable<T[] | PaginatedEntitiesResponse<T>> {
        return this.server.getWithQuery(query);
    }

    upsert(entity: T): Observable<T> {
        return this.server.upsert(entity);
    }

    protected async addEntityToCache(entity: T): Promise<T> {
        let entities = await this.storageService.getAll();
        // Should we generate entity id here?
        if (!entity.identity) {
            entity.identity = uuidV4();
        }

        entities = entities.filter(e => e.identity !== entity.identity);

        entities.push(entity);

        await this.storageService.setAll(entities);

        return entity;
    }

    protected async deleteEntityFromCache(id: IdentityKey): Promise<T> {
        let entities = await this.storageService.getAll();
        const entityToDelete = entities.find((_entity) => _entity.identity === id);
        if (entityToDelete) {
            entities = entities.filter((_entity) => _entity !== entityToDelete);
            await this.storageService.setAll(entities);
        }
        return entityToDelete;
    }

    protected async getEntityByIdFromCache(id: IdentityKey): Promise<T | null> {
        const entities = await this.storageService.getAll();
        const entity = entities.find((_entity) => _entity.identity === id);
        return entity || null;
    }

    protected async updateEntityInCache(updated: T): Promise<T> {
        let entities = await this.storageService.getAll();
        const entity = entities.find((_entity) => _entity.identity === updated.identity);
        if (entity) {
            entities = entities.map((_entity) => (_entity.identity === updated.identity ? updated : _entity));
            await this.storageService.setAll(entities);
        }
        return entity;
    }
}
