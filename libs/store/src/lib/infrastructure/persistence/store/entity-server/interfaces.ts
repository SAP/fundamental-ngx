import { Observable } from 'rxjs';

import { Entity, IdentityKey } from '../../../../domain/entity';
import { BaseEntity } from '../../domain/base-classes/base-entity';
import { QueryParams, QuerySnapshot } from '../../query/query-adapter';
import { Update } from '@ngrx/entity';

export { BaseEntity, IdentityKey };

/**
 * Extended EntityCollectionDataService from '@ngrx/data';
 */
export interface EntityServerService<T> {
    readonly name: string;
    add(entity: T): Observable<T>;
    delete(id: number | string): Observable<number | string>;
    getAll(): Observable<T[]>;
    getById(id: any): Observable<T>;
    getWithQuery(queryParams: QuerySnapshot<T> | QueryParams | string): Observable<T[] | PaginatedEntitiesResponse<T>>;
    update(update: Update<T>): Observable<T>;
    upsert(entity: T): Observable<T>;
}

/**
 * Entity Cache Storage
 *
 * Used to retrieve / update entity collection
 */
export interface EntityCacheStorageService<TModel> {
    /**
     * Get all available items
     */
    getAll(): Promise<TModel[]>;
    /**
     * Set new items collection
     */
    setAll(items: TModel[]): Promise<TModel[]>;
    /**
     * Clear collection
     */
    clearAll(): Promise<void>;
}

/**
 * Entity Server Factory
 */
export abstract class EntityServerServiceFactory {
    abstract create<T extends Entity>(entityName: string): EntityServerService<T>;
}

export interface PaginatedEntitiesResponse<T> {
    value: T[];
    count: number;
}
