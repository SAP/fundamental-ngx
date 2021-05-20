import { Observable } from 'rxjs';

import { BaseEntity, IdentityKey } from '../store/entity-server/interfaces';
import { QueryBuilder } from './query-builder';
import { Query, QuerySnapshotModel } from './query';
import { QueryService } from './query.service';
import { eq } from './grammar/query-expressions';
import { Predicate } from './grammar/predicate';
import { EntityDTOType } from '../../../domain/entity';

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
        const query = qb
            .withChainingStrategy({
                distributor: 'non-block',
                supplier: 'suppress'
            })
            .build();

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
        const predicate: Predicate<FruitDTO> = eq('name', 'apple');
        const query = qb.where(predicate).build();

        expect(query.createSnapshot().predicate).toEqual(predicate);
    });

    it('should delegate "byId" call to the query service "getByKey"', () => {
        spyOn(service, 'getByKey');

        const query = qb.byId('123');

        expect(service.getByKey).toHaveBeenCalledOnceWith('123');
    });
});
