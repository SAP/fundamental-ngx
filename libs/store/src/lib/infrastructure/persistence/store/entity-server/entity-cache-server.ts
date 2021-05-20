import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

import {
    BaseEntity,
    EntityBaseType,
    EntityCacheStorageService,
    EntityServerService,
    IdentityKey,
    PaginatedEntitiesResponse
} from './interfaces';
import { QuerySnapshot } from '../../query/query-adapter';
import { EntityMetaOptionsService } from '../../utils';

/**
 * Entity Cache Server.
 * It is a wrapper layer for entity server implementation (decorator pattern).
 *
 */
export class EntityCacheServerService<T> implements EntityServerService<T> {
    /**
     * Service implementation name
     */
    name = `${this.entityName} EntityCacheServer`;
    protected entityType: EntityBaseType;

    constructor(
        protected entityName: string,
        protected server: EntityServerService<T>,
        protected storageService: EntityCacheStorageService<T>,
        protected entityMetaOptionsService: EntityMetaOptionsService
    ) {
        this.entityType = this.entityMetaOptionsService.getEntityTypeByName(entityName);
    }

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

    protected async addEntityToCache<T>(data: T): Promise<T> {
        const entity = new this.entityType(data);
        let entities = await this.getAllWrappedEntities();
        // Should we generate entity id here?
        // if (!entity.identity) {
        //     entity.identity = uuidV4();
        // }

        entities = entities.filter(e => e.equals(entity));

        entities.push(entity);

        await this.storageService.setAll(entities.map(e => e.value));

        return entity.value;
    }

    protected async deleteEntityFromCache(id: IdentityKey): Promise<T> {
        let entities = await this.getAllWrappedEntities();
        const entityToDelete = entities.find((_entity) => _entity.identity === id);
        if (entityToDelete) {
            entities = entities.filter((_entity) => !_entity.equals(entityToDelete));
            await this.storageService.setAll(entities.map(e => e.value));
        }
        return entityToDelete.value;
    }

    protected async getEntityByIdFromCache(id: IdentityKey): Promise<T | null> {
        const entities = await this.getAllWrappedEntities();
        const entity = entities.find((_entity) => _entity.identity === id);
        return entity.value || null;
    }

    protected async updateEntityInCache<T>(updated: T): Promise<T> {
        let entities = await this.getAllWrappedEntities();
        const _updated = new this.entityType(updated);
        const entity = entities.find((_entity) => _entity.equals(_updated));
        if (entity) {
            entities = entities.map((_entity) => (_entity.equals(_updated) ? _updated : _entity));
            await this.storageService.setAll(entities.map(e => e.value));
        }
        return entity.value;
    }

    protected async getAllWrappedEntities<T extends BaseEntity>(): Promise<BaseEntity<any>[]> {
        const entities = await this.storageService.getAll();

        return entities.map(entity => new this.entityType(entity));
    }
}
