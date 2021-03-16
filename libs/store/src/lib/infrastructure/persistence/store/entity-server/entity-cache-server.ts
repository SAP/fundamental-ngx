import { HttpErrorResponse } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { timeout, delay, catchError, map, filter } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { DefaultDataServiceConfig, QueryParams, DataServiceError } from '@ngrx/data';
import { v4 as uuidV4 } from 'uuid';

import { EntityMetaOptionsService, EntityMetaOptions } from '../../utils/entity-options.service';
import { RequestData } from './entity-rest-server';
import {
    EntityStorageService,
    EntityServerService,
    BaseEntity,
    IdentityKey,
    PaginatedEntitiesResponse
} from './interfaces';
import { QueryAdapter, QuerySnapshot } from '../../query/query-adapter';

/**
 * Entity Cache Server.
 * It is a wrapper layer for entity server implementation (decorator pattern).
 * 
 */
export class EntityCacheServerService<T extends BaseEntity> implements EntityServerService<T> {
    /**
     * Service implementation name
     */
    name = `${this.entityName} EntityCacheServer`;

    constructor(
        protected server: EntityServerService<T>,
        protected entityName: string,
        protected storageService: EntityStorageService<T>,
        protected entityMetaOptionsService: EntityMetaOptionsService,
    ) {
    }

    add(entity: T): Observable<T> {
        // Cache response
        return this.server.add(entity);
    }

    delete(key: IdentityKey): Observable<IdentityKey> {
        // Cache response
        return this.delete(key);
    }

    getAll(): Observable<T[]> {
        // Cache
        return this.server.getAll();
    }

    getById(id: IdentityKey): Observable<T> {
        // Cache
        return this.server.getById(id);
    }

    getWithQuery(query: QuerySnapshot<T>): Observable<T[] | PaginatedEntitiesResponse<T>> {        
        return this.server.getWithQuery(query);
    }

    update(update: Update<T>): Observable<T> {
        return this.server.update(update);
    }

    upsert(entity: T): Observable<T> {
        return this.server.upsert(entity);
    }

    protected async getEntityById(id: IdentityKey): Promise<T | null> {
        const entities = await this.storageService.getAll();
        const entity = entities.find((_entity) => _entity.id === id);
        return entity || null;
    }

    protected async getListByQuery(query: QuerySnapshot<T>): Promise<{ items: T[]; count: number }> {
        let items: T[] = [];

        const allItems = await this.storageService.getAll();

        if (query.keyword) {
            items = allItems.filter((item) =>
                Object.values(item).filter((value) =>
                    (value?.toString() as string).toLocaleLowerCase().includes(query.keyword.toLocaleLowerCase())
                )
            );
        }

        if (query.predicate) {
            items = items.filter((item) => query.predicate.test(item));
        }

        if (query.select) {
            items = items.map((item) =>
                query.select.reduce((dto, prop) => {
                    dto[prop] = item[prop];
                    return dto;
                }, {} as T)
            );
        }

        const noPaginatedItemsLength = items.length;

        // Pagination

        if (!Number.isNaN(query.skip)) {
            items = items.slice(query.skip);
        }

        if (!Number.isNaN(query.top)) {
            items = items.slice(0, query.top);
        }

        return { items: items, count: noPaginatedItemsLength };
    }

    protected async updateEntity(update: Update<T>): Promise<T> {
        let entities = await this.storageService.getAll();
        let entity = entities.find((_entity) => _entity.id === update.id);
        if (entity) {
            entity = {
                ...entity,
                ...update.changes
            };
            entities = entities.map((_entity) => (_entity.id === update.id ? entity : _entity));
            await this.storageService.setAll(entities);
        }
        return entity;
    }

    protected async deleteEntity(id: IdentityKey): Promise<T> {
        let entities = await this.storageService.getAll();
        const entityToDelete = entities.find((_entity) => _entity.id === id);
        if (entityToDelete) {
            entities = entities.filter((_entity) => _entity !== entityToDelete);
            await this.storageService.setAll(entities);
        }
        return entityToDelete;
    }

    protected async addEntity(entity: T): Promise<T> {
        const entities = await this.storageService.getAll();
        // Should we generate entity id here?
        if (!entity.id) {
            entity.id = uuidV4();
        }

        entities.push(entity);

        await this.storageService.setAll(entities);

        return entity;
    }
}
