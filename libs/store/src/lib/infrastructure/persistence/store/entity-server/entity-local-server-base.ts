import { HttpErrorResponse } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { timeout, delay, catchError, map, filter } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { DefaultDataServiceConfig, QueryParams, DataServiceError } from '@ngrx/data';
import { v4 as uuidV4 } from 'uuid';

import { EntityMetaOptionsService, EntityMetaOptions } from '../../utils/entity-options.service';
import { RequestData } from './entity-rest-server';
import { EntityStorageService, EntityServerService, Entity, IdentityKey } from './interfaces';

/**
 * The Base for Entity Local Sever Service
 *
 */
export abstract class EntityLocalServerBaseService<T extends Entity> implements EntityServerService<T> {
    protected _name: string;
    protected delete404OK: boolean;
    protected getDelay = 0;
    protected saveDelay = 0;
    protected timeout = 0;
    protected entityMetaOptions: EntityMetaOptions;

    /**
     * Service implementation name
     */
    abstract name: string;

    constructor(
        protected entityName: string,
        protected storageService: EntityStorageService<T>,
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

    getWithQuery(queryParams: QueryParams | string): Observable<T[]> {
        // In order to filter properly we must convert queryParams
        // to something that we understand and can work with
        // TODO: parse query to filtering logic
        return this.getAll();
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
        const entity = entities.find((_entity) => _entity.id === id);
        return entity || null;
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
