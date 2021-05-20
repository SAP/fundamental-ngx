import { QueryBuilder } from './query-builder';
import { eq } from './grammar/query-expressions';
import { QuerySnapshot } from './query-adapter';
import { QueryService } from './query.service';
import { Observable } from 'rxjs';
import { QuerySnapshotModel } from './query';
import { BaseEntity, EntityDTOType, IdentityKey } from '../../../domain/public_api';

interface SupplierDTO {
    id: IdentityKey;
    name: string;
}

class Supplier extends BaseEntity<SupplierDTO> {
    get identity(): IdentityKey {
        return this.value.id;
    }
}

interface DistributorDTO {
    id: IdentityKey;
    name: string;
}

class Distributor extends BaseEntity<DistributorDTO> {
    get identity(): IdentityKey {
        return this.value.id;
    }
}

interface FruitDTO {
    id: IdentityKey;
    name: string;
    variety: string;
    origin: string;
    price: number;
    supplier: SupplierDTO;
    distributor: DistributorDTO;
}

class Fruit extends BaseEntity<FruitDTO> {
    get identity(): IdentityKey {
        return this.value.id;
    }

    get supplier(): Supplier {
        return new Supplier({ id: this.value.supplier.id, name: this.value.supplier.name });
    }

    get distributor(): Distributor {
        return new Distributor({ id: this.value.distributor.id, name: this.value.distributor.name });
    }
}

class MockQueryService<Entity extends BaseEntity<EntityDTOType<Entity>>> extends QueryService<Entity> {
    getByKey(id: string): Observable<Entity> {
        throw new Error('Method not implemented.');
    }
    getWithQuery(query: Readonly<QuerySnapshotModel<EntityDTOType<Entity>>>): Observable<Entity[]> {
        throw new Error('Method not implemented.');
    }
    count(): Observable<number> {
        throw new Error('Method not implemented.');
    }
}

describe('Store: Query', () => {
    let qb: QueryBuilder<Fruit>;
    let service: QueryService<Fruit>;
    let getWithQuerySnapshotParam: QuerySnapshot<FruitDTO>;

    beforeEach(() => {
        service = new MockQueryService<Fruit>();
        spyOn(service, 'getWithQuery').and.callFake((snapshot): any => {
            getWithQuerySnapshotParam = snapshot;
        });
        spyOn(service, 'getByKey');
        qb = new QueryBuilder(service);
    });

    it('should call "getWithQuery" once "fetch" is called', () => {
        const query = qb.build();
        query.fetch();
        expect(service.getWithQuery).toHaveBeenCalled();
        expect(getWithQuerySnapshotParam).toBeInstanceOf(QuerySnapshotModel);
    });

    it('should call "getWithQuery" with the current query snapshot', () => {
        const query = qb.build();

        query.where(eq('name', 'apple'));
        query.keyword('keyword_text');
        query.select('name', 'distributor');
        query.expand('distributor');
        query.includeCount(true);
        query.orderBy({ field: 'name', order: 'ASCENDING' });
        query.withFirstResult(20);
        query.withMaxResults(10);

        query.fetch();

        expect(getWithQuerySnapshotParam.predicate).toEqual(eq('name', 'apple'));
        expect(getWithQuerySnapshotParam.keyword).toEqual('keyword_text');
        expect(getWithQuerySnapshotParam.select).toEqual(['name', 'distributor']);
        expect(getWithQuerySnapshotParam.expand).toEqual(['distributor']);
        expect(getWithQuerySnapshotParam.includeCount).toBe(true);
        expect(getWithQuerySnapshotParam.orderby).toEqual([{ field: 'name', order: 'ASCENDING' }]);
        expect(getWithQuerySnapshotParam.skip).toEqual(20);
        expect(getWithQuerySnapshotParam.top).toEqual(10);
    });

    it('should keep "keyword" option', () => {
        const query = qb.build();
        query.keyword('red').fetch();
        expect(query.createSnapshot().keyword).toEqual('red');
    });

    it('should keep "select" option', () => {
        const query = qb.build();
        query.select('name', 'price').fetch();
        expect(query.createSnapshot().select).toEqual(['name', 'price']);
    });

    it('should keep "expand" option', () => {
        const query = qb.build();
        query.expand('supplier', 'distributor').fetch();
        expect(query.createSnapshot().expand).toEqual(['supplier', 'distributor']);
    });

    it('should handle "orderBy" option', () => {
        const query = qb.build();
        query.orderBy({ field: 'name' }, { field: 'price', order: 'DESCENDING' }).fetch();
        expect(query.createSnapshot().orderby).toEqual([{ field: 'name' }, { field: 'price', order: 'DESCENDING' }]);
    });

    it('should handle pagination parameters', () => {
        let query = qb.build();
        query.withMaxResults(10).fetch();
        expect(query.createSnapshot().top).toEqual(10);

        query = qb.build();
        query.withMaxResults(20).withFirstResult(100).fetch();
        expect(query.createSnapshot().top).toEqual(20);
        expect(query.createSnapshot().skip).toEqual(100);

        query = qb.build();
        query.withMaxResults(20).withFirstResult(0).fetch();
        expect(query.createSnapshot().top).toEqual(20);
        expect(query.createSnapshot().skip).toEqual(0);
    });

    it('should not include "$skip" without "$top"', () => {
        const query = qb.build();
        query.withFirstResult(100).fetch();
        expect(query.createSnapshot().skip).toEqual(undefined);
    });

    it('should be able to modify query to get next page of results', () => {
        const query = qb.build();
        let snapshot: QuerySnapshot<FruitDTO>;

        query.withMaxResults(20).withFirstResult(10).fetch();
        snapshot = query.createSnapshot();
        expect(snapshot.skip).toEqual(10);
        expect(snapshot.top).toEqual(20);

        query.next();
        snapshot = query.createSnapshot();
        expect(snapshot.skip).toEqual(30);
        expect(snapshot.top).toEqual(20);

        query.next();
        snapshot = query.createSnapshot();
        expect(snapshot.skip).toEqual(50);
        expect(snapshot.top).toEqual(20);

        query.next();
        snapshot = query.createSnapshot();
        expect(snapshot.skip).toEqual(70);
        expect(snapshot.top).toEqual(20);
    });

    it('should be able to modify query to get previous page of results', () => {
        const query = qb.build();
        let snapshot: QuerySnapshot<FruitDTO>;

        query.withMaxResults(20).withFirstResult(80).fetch();
        snapshot = query.createSnapshot();
        expect(snapshot.skip).toEqual(80);
        expect(snapshot.top).toEqual(20);

        query.previous();
        snapshot = query.createSnapshot();
        expect(snapshot.skip).toEqual(60);
        expect(snapshot.top).toEqual(20);

        query.previous();
        snapshot = query.createSnapshot();
        expect(snapshot.skip).toEqual(40);
        expect(snapshot.top).toEqual(20);

        query.previous();
        snapshot = query.createSnapshot();
        expect(snapshot.skip).toEqual(20);
        expect(snapshot.top).toEqual(20);
    });

    it('should default the top to 0 if previous results in a negative index', () => {
        const query = qb.build();
        let snapshot: QuerySnapshot<FruitDTO>;

        query.withMaxResults(20).withFirstResult(10).fetch();
        snapshot = query.createSnapshot();
        expect(snapshot.skip).toEqual(10);
        expect(snapshot.top).toEqual(20);

        query.previous();
        snapshot = query.createSnapshot();
        expect(snapshot.skip).toEqual(0);
        expect(snapshot.top).toEqual(20);
    });

    it('should add "count" to query string if includeCount is set to true', () => {
        const query = qb.build();
        query.includeCount(true).fetch();
        expect(query.createSnapshot().includeCount).toEqual(true);
    });

    it('should reset the paging index by default when orderBy is called', () => {
        const query = qb.build();
        query.withMaxResults(20).withFirstResult(40).fetch();
        expect(query.createSnapshot().skip).toEqual(40);

        query.orderBy({ field: 'name' }).fetch();
        expect(query.createSnapshot().skip).toEqual(0);
    });

    it('should reset the paging index by default when predicate has changed', () => {
        const query = qb.build();
        query.withMaxResults(20).withFirstResult(40).fetch();
        expect(query.createSnapshot().skip).toEqual(40);

        query.where(eq('name', 'peach')).fetch();
        expect(query.createSnapshot().skip).toEqual(0);
    });

    it('should reset the paging index by default when keyword is changed', () => {
        const query = qb.keyword('apple').build();
        query.withMaxResults(20).withFirstResult(40).fetch();
        expect(query.createSnapshot().skip).toEqual(40);

        query.keyword('banana').fetch();
        expect(query.createSnapshot().skip).toEqual(0);
    });

    it('should reset the paging index by default when page size is changed', () => {
        const query = qb.keyword('apple').build();
        query.withMaxResults(20).withFirstResult(40).fetch();
        expect(query.createSnapshot().skip).toEqual(40);

        query.withMaxResults(100).fetch();
        expect(query.createSnapshot().skip).toEqual(0);
    });

    it('should suppress resetting the paging index if setting the paging index is part of the query update', () => {
        const query = qb.keyword('apple').build();
        query.withMaxResults(20).withFirstResult(40).fetch();
        expect(query.createSnapshot().skip).toEqual(40);

        query.withMaxResults(100).withFirstResult(60).keyword('banana').fetch();
        expect(query.createSnapshot().skip).toEqual(60);
    });

    it('should suppress resetting of the paging index if "suppressPageReset" is called during update', () => {
        const query = qb.build();
        query.withMaxResults(20).withFirstResult(40).fetch();
        expect(query.createSnapshot().skip).toEqual(40);

        query.orderBy({ field: 'name' }).where(eq('name', 'test')).suppressPageReset().fetch();
        expect(query.createSnapshot().skip).toEqual(40);
    });
});
