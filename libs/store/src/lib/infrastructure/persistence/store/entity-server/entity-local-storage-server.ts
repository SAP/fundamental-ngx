import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { DataServiceError, DefaultDataServiceConfig } from '@ngrx/data';
import { Update } from '@ngrx/entity';
import { from, Observable, of, throwError } from 'rxjs';
import { delay, map, timeout } from 'rxjs/operators';
// import { v4 as uuidV4 } from 'uuid';

import { QuerySnapshot } from '../../query/query';
import { QueryAdapter } from '../../query/query-adapter';

import { EntityMetaOptions, EntityMetaOptionsService } from '../../utils/entity-options.service';
import { RequestData } from './entity-rest-server';
import { EntityCacheStorageServiceBase } from './cache-storage';
import {
    EntityServerService,
    EntityServerServiceFactory,
    EntityCacheStorageService,
    IdentityKey,
    PaginatedEntitiesResponse,
    BaseEntity
} from './interfaces';

/**
 * The Base Entity Local Sever
 *
 */
export abstract class EntityLocalServerBaseService<T extends BaseEntity> implements EntityServerService<T> {
    protected _name: string;
    protected delete404OK: boolean;
    protected getDelay = 0;
    protected saveDelay = 0;
    protected timeout = 0;
    protected entityMetaOptions: EntityMetaOptions<T>;

    /**
     * Service implementation name
     */
    abstract name: string;

    constructor(
        protected entityName: string,
        protected storageService: EntityCacheStorageService<T>,
        protected entityMetaOptionsService: EntityMetaOptionsService,
        protected config?: DefaultDataServiceConfig
    ) {
        const { delete404OK = true, getDelay = 0, saveDelay = 0, timeout: to = 0 } = config || {};
        this.delete404OK = delete404OK;
        this.getDelay = getDelay;
        this.saveDelay = saveDelay;
        this.timeout = to;
        this.entityMetaOptions = entityMetaOptionsService.getEntityMetadata(entityName);
    }

    // Here for simplicity there is no error handlers
    // TODO: Add error handler for each action method

    add(entity: T): Observable<T> {
        let result = from(this.addEntity(entity));
        if (this.saveDelay) {
            result = result.pipe(delay(this.saveDelay));
        }
        return this.addOptionalTimeout(result);
    }

    delete(key: IdentityKey): Observable<IdentityKey> {
        let result = from(this.deleteEntity(key)).pipe(
            // forward the id of deleted entity as the result of the HTTP DELETE
            map(() => key as IdentityKey)
        );
        if (this.saveDelay) {
            result = result.pipe(delay(this.saveDelay));
        }
        return this.addOptionalTimeout(result);
    }

    getAll(): Observable<T[]> {
        let result = from(this.storageService.getAll());
        if (this.getDelay) {
            result = result.pipe(delay(this.getDelay));
        }
        return this.addOptionalTimeout(result);
    }

    getById(id: IdentityKey): Observable<T> {
        // TODO: if there is no item with such id should we throw error? (kind of 404)
        let result = from(this.getEntityById(id));
        if (this.getDelay) {
            result = result.pipe(delay(this.getDelay));
        }
        return this.addOptionalTimeout(result);
    }

    getWithQuery(query: QuerySnapshot<T>): Observable<T[] | PaginatedEntitiesResponse<T>> {
        if (!QueryAdapter.isQuerySnapshot<T>(query)) {
            throw Error('EntityLocalServerBaseService: getWithQuery handles QueryPayload only');
        }

        let result = from(this.getListByQuery(query)).pipe(
            map(({ items, count }) => (query.includeCount ? { value: items, count: count } : items))
        );

        if (this.getDelay) {
            result = result.pipe(delay(this.getDelay));
        }

        return this.addOptionalTimeout(result);
    }

    update(update: Update<T>): Observable<T> {
        let result = from(this.updateEntity(update));
        if (this.saveDelay) {
            result = result.pipe(delay(this.saveDelay));
        }
        return this.addOptionalTimeout(result);
    }

    // Important! Only call if the backend service supports upserts as a POST to the target URL
    upsert(entity: T): Observable<T> {
        // What actually upsert does?
        throw Error('EntityLocalServerBaseService: upsert is not implemented');
    }

    protected addOptionalTimeout<V>(input$: Observable<V>): Observable<V> {
        if (this.timeout) {
            input$ = input$.pipe(timeout(this.timeout));
        }
        return input$;
    }

    protected async getEntityById(id: IdentityKey): Promise<T | null> {
        const entities = await this.storageService.getAll();
        const entity = entities.find((_entity) => _entity.identity === id);
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
        let entity = entities.find((_entity) => _entity.identity === update.id);
        if (entity) {
            entity = {
                ...entity,
                ...update.changes
            };
            entities = entities.map((_entity) => (_entity.identity === update.id ? entity : _entity));
            await this.storageService.setAll(entities);
        }
        return entity;
    }

    protected async deleteEntity(id: IdentityKey): Promise<T> {
        let entities = await this.storageService.getAll();
        const entityToDelete = entities.find((_entity) => _entity.identity === id);
        if (entityToDelete) {
            entities = entities.filter((_entity) => _entity !== entityToDelete);
            await this.storageService.setAll(entities);
        }
        return entityToDelete;
    }

    protected async addEntity(entity: T): Promise<T> {
        const entities = await this.storageService.getAll();
        // Should we generate entity id here?
        // if (!entity.id) {
        //     entity.id = uuidV4();
        // }

        entities.push(entity);

        await this.storageService.setAll(entities);

        return entity;
    }

    protected handleError(reqData: RequestData): (err: any) => Observable<{}> {
        return (err: any) => {
            const ok = this.handleDelete404(err, reqData);
            if (ok) {
                return ok;
            }
            const error = new DataServiceError(err, reqData as any);
            return throwError(error);
        };
    }

    protected handleDelete404(error: HttpErrorResponse, reqData: RequestData): Observable<{}> {
        if (error.status === 404 && reqData.method === 'DELETE' && this.delete404OK) {
            return of({});
        }
        return undefined;
    }
}

/**
 * Entity LocalStorage Server
 *
 * Persist entity collection in memory (mimic API responses)
 */
export class EntityLocalStorageServerService<T extends BaseEntity> extends EntityLocalServerBaseService<T> {
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
    create<T extends BaseEntity>(entityName: string): EntityServerService<T> {
        return new EntityLocalStorageServerService<T>(
            entityName,
            new EntityCacheStorageServiceBase(this.getEntityStorageKey(entityName), localStorage),
            this.entityMetaOptionsService,
            this.config
        );
    }

    private getEntityStorageKey(entityName: string): string {
        return `fdp-store-cache-entity-${entityName}`.toLowerCase();
    }
}
