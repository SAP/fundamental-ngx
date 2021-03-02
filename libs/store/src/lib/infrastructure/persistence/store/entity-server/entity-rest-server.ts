import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { timeout, delay, catchError, map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { DefaultDataServiceConfig, QueryParams, DataServiceError } from '@ngrx/data';

import { EntityPath, EntityOperation } from '../../../../domain/public_api';
import {
    EntityMetaOptionsService,
    EntityResourceMetaOptions,
    EntityMetaOptions
} from '../../utils/entity-options.service';

import { HttpUrlGenerator } from '../http-url-generator';
import { Entity, EntityServerService } from './interfaces';

export declare type HttpMethods = 'DELETE' | 'GET' | 'POST' | 'PUT' | 'PATCH';

export interface RequestData {
    method: HttpMethods;
    url: string;
    data?: any;
    options?: any;
}

/**
 * This Service is used to make API server request.
 *
 * This should be provided instead of ngrx DefaultDataService.
 *
 */
export class EntityRestServerService<T extends Entity> implements EntityServerService<T> {
    protected _name: string;
    protected delete404OK: boolean;
    protected entityName: string;
    protected getDelay = 0;
    protected saveDelay = 0;
    protected timeout = 0;
    protected entityMetaOptions: EntityMetaOptions;
    protected entityResourceMetaOptions: EntityResourceMetaOptions | undefined;
    protected entityResourcePathOptions: EntityPath | undefined;
    protected root: string;

    get name(): string {
        return this._name;
    }

    constructor(
        entityName: string,
        protected http: HttpClient,
        protected httpUrlGenerator: HttpUrlGenerator,
        entityMetaOptionsService: EntityMetaOptionsService,
        config?: DefaultDataServiceConfig
    ) {
        this._name = `${entityName} EntityRestServerService`;
        this.entityName = entityName;
        const { root = 'api', delete404OK = true, getDelay = 0, saveDelay = 0, timeout: to = 0 } = config || {};
        this.delete404OK = delete404OK;
        this.getDelay = getDelay;
        this.saveDelay = saveDelay;
        this.timeout = to;
        this.entityMetaOptions = entityMetaOptionsService.getEntityMetadata(entityName);
        this.entityResourceMetaOptions = entityMetaOptionsService.getEntityResourceMetadata(entityName);
        this.entityResourcePathOptions = this.entityResourceMetaOptions?.path;
        this.root = this.entityResourceMetaOptions?.root || root;
    }

    add(entity: T): Observable<T> {
        const entityOrError = entity || new Error(`No "${this.entityName}" entity to add`);
        const entityUrl = this.getEntityUrl('add');
        const method = this.getOperationMethod('add') || 'POST';
        return this.execute(method, entityUrl, entityOrError);
    }

    delete(key: number | string): Observable<number | string> {
        let err: Error | undefined;
        if (key == null) {
            err = new Error(`No "${this.entityName}" key to delete`);
        }
        const entityUrl = this.getEntityUrl('delete');
        const method = this.getOperationMethod('delete') || 'DELETE';
        return this.execute(method, entityUrl + key, err).pipe(
            // forward the id of deleted entity as the result of the HTTP DELETE
            map((result) => key as number | string)
        );
    }

    getAll(): Observable<T[]> {
        const entitiesUrl = this.getCollectionUrl('getAll');
        const method = this.getOperationMethod('getAll') || 'GET';
        return this.execute(method, entitiesUrl);
    }

    getById(key: number | string): Observable<T> {
        let err: Error | undefined;
        if (key == null) {
            err = new Error(`No "${this.entityName}" key to get`);
        }
        const entityUrl = this.getEntityUrl('getById');
        const method = this.getOperationMethod('getById') || 'GET';
        return this.execute(method, entityUrl + key, err);
    }

    getWithQuery(queryParams: QueryParams | string): Observable<T[]> {
        const qParams = typeof queryParams === 'string' ? { fromString: queryParams } : { fromObject: queryParams };
        const params = new HttpParams(qParams);
        const entitiesUrl = this.getCollectionUrl('getAll');
        const method = this.getOperationMethod('getAll') || 'GET';
        return this.execute(method, entitiesUrl, undefined, { params: params });
    }

    update(update: Update<T>): Observable<T> {
        const id = update && update.id;
        const updateOrError = id == null ? new Error(`No "${this.entityName}" update data or id`) : update.changes;
        const entityUrl = this.getEntityUrl('update') + id;
        const method = this.getOperationMethod('update') || 'PUT';
        return this.execute(method, entityUrl, updateOrError);
    }

    // Important! Only call if the backend service supports upserts as a POST to the target URL
    upsert(entity: T): Observable<T> {
        const entityOrError = entity || new Error(`No "${this.entityName}" entity to upsert`);
        const entityUrl = this.getEntityUrl('upsert');
        const method = this.getOperationMethod('upsert') || 'POST';
        return this.execute(method, entityUrl, entityOrError);
    }

    protected execute(
        method: HttpMethods,
        url: string,
        data?: any, // data, error, or undefined/null
        options?: any
    ): Observable<any> {
        const req: RequestData = { method: method, url: url, data: data, options: options };

        if (data instanceof Error) {
            return this.handleError(req)(data);
        }

        let result$: Observable<ArrayBuffer>;

        switch (method) {
            case 'DELETE': {
                result$ = this.http.delete(url, options);
                if (this.saveDelay) {
                    result$ = result$.pipe(delay(this.saveDelay));
                }
                break;
            }
            case 'GET': {
                result$ = this.http.get(url, options);
                if (this.getDelay) {
                    result$ = result$.pipe(delay(this.getDelay));
                }
                break;
            }
            case 'POST': {
                result$ = this.http.post(url, data, options);
                if (this.saveDelay) {
                    result$ = result$.pipe(delay(this.saveDelay));
                }
                break;
            }
            // N.B.: It must return an Update<T>
            case 'PUT': {
                result$ = this.http.put(url, data, options);
                if (this.saveDelay) {
                    result$ = result$.pipe(delay(this.saveDelay));
                }
                break;
            }
            case 'PATCH': {
                result$ = this.http.patch(url, data, options);
                if (this.saveDelay) {
                    result$ = result$.pipe(delay(this.saveDelay));
                }
                break;
            }
            default: {
                const error = new Error('Unimplemented HTTP method, ' + method);
                result$ = throwError(error);
            }
        }
        if (this.timeout) {
            result$ = result$.pipe(timeout(this.timeout + this.saveDelay));
        }
        return result$.pipe(catchError(this.handleError(req)));
    }

    private handleError(reqData: RequestData): (err: any) => Observable<{}> {
        return (err: any) => {
            const ok = this.handleDelete404(err, reqData);
            if (ok) {
                return ok;
            }
            const error = new DataServiceError(err, reqData as any);
            return throwError(error);
        };
    }

    private handleDelete404(error: HttpErrorResponse, reqData: RequestData): Observable<{}> {
        if (error.status === 404 && reqData.method === 'DELETE' && this.delete404OK) {
            return of({});
        }
        return undefined;
    }

    private getEntityUrl(operation: EntityOperation): string {
        return this.httpUrlGenerator.entityResource(
            this.entityName,
            this.root,
            operation,
            this.entityResourcePathOptions
        );
    }

    private getCollectionUrl(operation: EntityOperation): string {
        return this.httpUrlGenerator.collectionResource(
            this.entityName,
            this.root,
            operation,
            this.entityResourcePathOptions
        );
    }

    private getOperationMethod(operation: EntityOperation): HttpMethods | undefined {
        const pathOptions = this.entityResourcePathOptions;
        if (!pathOptions) {
            return undefined;
        }
        if (typeof pathOptions === 'string') {
            return undefined;
        }
        const pathOperation = pathOptions[operation];
        if (Array.isArray(pathOperation)) {
            return pathOperation[0];
        }
    }
}

/**
 * Create a basic, generic entity data service
 */
@Injectable()
export class EntityRestServerServiceFactory {
    constructor(
        protected http: HttpClient,
        protected httpUrlGenerator: HttpUrlGenerator,
        protected entityMetaOptionsService: EntityMetaOptionsService,
        @Optional() protected config?: DefaultDataServiceConfig
    ) {
        config = config || {};
    }

    /**
     * Create REST EntityServerService for the given entity type
     * @param entityName {string} Name of the entity
     */
    create<T extends Entity>(entityName: string): EntityServerService<T> {
        return new EntityRestServerService<T>(
            entityName,
            this.http,
            this.httpUrlGenerator,
            this.entityMetaOptionsService,
            this.config
        );
    }
}
