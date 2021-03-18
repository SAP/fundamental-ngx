import { Observable } from 'rxjs';

import { QuerySnapshot } from './query';

export abstract class QueryService<TModel> {
    /**
     * Request entity by ID and return observable for entity.
     * @param id Identifier of entity
     */
    abstract getByKey(id: string): Observable<TModel>;

    /**
     * Request collection of entities from service with query string
     * and return observable of collection.
     *
     * @param query URL query string
     */
    abstract getWithQuery(query: QuerySnapshot<TModel>): Observable<TModel[]>;

    /**
     * Request count of entities in collection and return observable
     * of count.
     */
    abstract count(): Observable<number>;
}
