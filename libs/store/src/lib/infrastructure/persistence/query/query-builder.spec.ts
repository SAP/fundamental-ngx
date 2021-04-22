import { Observable, of } from 'rxjs';

import { BaseEntity, IdentityKey } from '../store/entity-server/interfaces';
import { QueryBuilder } from './query-builder';
import { Query, QuerySnapshotModel } from './query';
import { QuerySnapshot } from './query-adapter';
import { QueryService } from './query.service';
import { eq } from './grammar/query-expressions';
import { Predicate } from './grammar/predicate';

class Supplier extends BaseEntity {
    id: IdentityKey;
    name: string;

    get identity(): IdentityKey {
        return this.id;
    }
}

class Distributor extends BaseEntity {
    id: IdentityKey;
    name: string;

    get identity(): IdentityKey {
        return this.id;
    }
}

class Fruit extends BaseEntity {
    id: IdentityKey;
    name: string;
    variety: string;
    origin: string;
    price: number;
    supplier: Supplier;
    distributor: Distributor;

    get identity(): IdentityKey {
        return this.id;
    }
}

class MockQueryService<TModel> extends QueryService<TModel> {
    getByKey(id: string): Observable<TModel> {
        throw new Error('Method not implemented.');
    }
    getWithQuery(query: Readonly<QuerySnapshotModel<TModel>>): Observable<TModel[]> {
        throw new Error('Method not implemented.');
    }
    count(): Observable<number> {
        throw new Error('Method not implemented.');
    }
}

describe('Store: Query Builder', () => {
    let qb: QueryBuilder<Fruit>;
    let service: QueryService<Fruit>;

    beforeEach(() => {
        service = new MockQueryService<Fruit>();
        qb = new QueryBuilder(service);
    });

    it('should build new query by "build" method', () => {
        const query = qb.build();

        expect(query).toBeInstanceOf(Query);
    });

    it('should have ability to set chaining strategy for new query', () => {
        const query = qb.withChainingStrategy({
            distributor: 'non-block',
            supplier: 'suppress'
        }).build();

        expect(query.createSnapshot().chainingStrategy).toEqual({
            distributor: 'non-block',
            supplier: 'suppress'
        });
    });

    it('should have ability to set keyword for new query', () => {
        const query = qb.keyword('keyword').build();

        expect(query.createSnapshot().keyword).toBe('keyword');
    });

    it('should have ability to set predicate for new query', () => {
        const predicate: Predicate<Fruit> = eq('name', 'apple');
        const query = qb.where(predicate).build();

        expect(query.createSnapshot().predicate).toEqual(predicate);
    });

    it('should delegate "byId" call to the query service "getByKey"', () => {
        spyOn(service, 'getByKey');

        const query = qb.byId('123');

        expect(service.getByKey).toHaveBeenCalledOnceWith('123');
    });
});
