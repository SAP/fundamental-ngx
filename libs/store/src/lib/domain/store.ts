import { Observable } from 'rxjs';

import { IdentityKey } from './entity';
import { QueryBuilder } from './query';

export interface EntityStoreCommands<T> {
    getAll(): Observable<T[]>;
    getBy(id: IdentityKey): Observable<T>;
    save(entity: T): Observable<T>;
    delete(entity: T): Observable<T>;
}

export interface EntityStore<T> extends EntityStoreCommands<T> {
    // Query builder reference
    readonly queryBuilder: QueryBuilder<T>;
}
