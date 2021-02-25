import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityCollectionService } from '@ngrx/data';

import { CachePolicy, FetchPolicy, IdentityKey } from '../../../domain/public_api';
import { QueryService } from '../query/query.service';
import { QueryBuilder } from '../query/query-builder';

//#region Interfaces

/**
 * Entity Store interface
 */
export interface EntityStore<T> {
    /**
     * Query builder reference.
     * Use it to create a query to underlying entity collection
     */
    readonly queryBuilder: QueryBuilder<T>;
    /**
     * Get entity by id
     * @param id identity key
     */
    get(id: IdentityKey): Observable<T>;
    /**
     * Save or Create Entity.
     * @param entity If entity has identity key it will update entity otherwise create new one
     */
    save(entity: T): Observable<T>;
    /**
     * Delete Entity
     * @param entity Entity to be deleted
     */
    delete(entity: T): Observable<T>;
}

//#endregion

//#region Implementation

export interface EntityStoreOptions {
    cachePolicy: CachePolicy;
    fetchPolicy: FetchPolicy;
}

/**
 * Entity Store default implementation
 */
export class DefaultEntityStore<T> implements EntityStore<T> {
    get queryBuilder(): QueryBuilder<T> {
        return this._queryBuilder;
    }

    constructor(
        protected readonly _entityService: EntityCollectionService<T>,
        protected readonly _queryBuilder: QueryBuilder<T>,
        protected readonly _options?: EntityStoreOptions
    ) {
        // TODO: do something with options
    }

    get(id: IdentityKey): Observable<T> {
        return this._entityService.getByKey(id);
    }

    save(entity: T): Observable<T> {
        if (entity['id']) {
            // TODO: Should check if entity has id based on primary key settings
            return this._entityService.update(entity);
        }
        return this._entityService.add(entity);
    }

    delete(entity: T): Observable<T> {
        return this._entityService.delete(entity).pipe(map(() => entity));
    }
}

export class DefaultQueryService<TModel> extends QueryService<TModel> {
    constructor(private service: EntityCollectionService<TModel>) {
        super();
    }

    getByKey(id: string): Observable<TModel> {
        return this.service.getByKey(id);
    }

    getWithQuery(query: string): Observable<TModel[]> {
        return this.service.getWithQuery(query);
    }

    count(): Observable<number> {
        return this.service.count$;
    }
}

//#endregion
