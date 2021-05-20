import { Observable } from 'rxjs';

import { BaseEntity, EntityDTOType } from '../../../domain/entity';
import { QuerySnapshot } from './query';

export abstract class QueryService<Entity extends BaseEntity<EntityDTOType<Entity>>> {
    /**
     * Request entity by ID and return observable for entity.
     * @param id Identifier of entity
     */
    abstract getByKey(id: string): Observable<Entity>;

    /**
     * Request collection of entities from service with query string
     * and return observable of collection.
     *
     * @param query URL query string
     */
    abstract getWithQuery(query: QuerySnapshot<EntityDTOType<Entity>>): Observable<Entity[]>;

    /**
     * Request count of entities in collection and return observable
     * of count.
     */
    abstract count(): Observable<number>;
}
