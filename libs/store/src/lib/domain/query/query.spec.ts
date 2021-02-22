
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { QueryBuilder } from './query-builder';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
    EntityCollectionService,
    EntityCollectionServiceFactory,
    EntityDataModule,
    EntityMetadataMap,
} from '@ngrx/data';
import { TestBed } from '@angular/core/testing';
import { and, eq } from './grammer/query-expressions';
import { DefaultQueryAdapter } from './query-adapter';

class Supplier {
    name: string;
}

class Distributor {
    name: string;
}

class Fruit {
    name: string;
    variety: string;
    origin: string;
    price: number;
    supplier: Supplier;
    distributor: Distributor;
}

describe('Store: Query', () => {

    let qb: QueryBuilder<Fruit>;
    let service: EntityCollectionService<Fruit>;

    beforeEach(() => {
        const entityMetadata: EntityMetadataMap = { Fruit: {} };
        const pluralNames = {};
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                EffectsModule.forRoot([]),
                StoreModule.forRoot({}, {}),
                EntityDataModule.forRoot({
                    entityMetadata: entityMetadata,
                    pluralNames: pluralNames
                }),
            ],
        });
    });

    beforeEach(() => {
        const factory = TestBed.inject(EntityCollectionServiceFactory);
        const adapter = new DefaultQueryAdapter<Fruit>();
        service = factory.create<Fruit>('Fruit');
        spyOn(service, 'getWithQuery');
        spyOn(service, 'getByKey');
        qb = new QueryBuilder(Fruit, service, adapter);
    });

    it('should be able to create a query by ID', () => {
        const query = qb.byId('123');
        expect(service.getByKey).toHaveBeenCalled();
    });

    it('should call "getWithQuery" from EntityCollectionService', () => {
        const query = qb.build();
        query.fetch();
        expect(service.getWithQuery).toHaveBeenCalled();
    });

    it('should call "getWithQuery" with correct filter parameters', () => {
        let query = qb.where(eq('name', 'apple')).build();
        query.fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$filter=name eq \'apple\'');

        query = qb.where(eq('variety', 'pippen')).build();
        query.fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$filter=variety eq \'pippen\'');

        query = qb.where(and(eq('variety', 'pippen'), eq('price', 3.03))).build();
        query.fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$filter=(variety eq \'pippen\' and price eq 3.03)');
    });

    it('should call "getWithQuery" with the correct keyword parameter', () => {
        const query = qb.keyword('red').build();
        query.fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$search=red');
    });

    it('should call "getWithQuery" with the correct select parameters', () => {
        const query = qb.build();
        query.select('name', 'price').fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$select=name,price');
    });

    it('should call "getWithQuery" with the correct extend parameters', () => {
        const query = qb.build();
        query.expand('supplier', 'distributor').fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$expand=supplier,distributor');
    });

    it('should call "getWithQuery" with the correct order by parameters', () => {
        let query = qb.build();
        query.orderBy({ field: 'name'}).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$orderby=name');

        query = qb.build();
        query.orderBy({ field: 'name'}, { field: 'price', order: 'DESCENDING'}).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$orderby=name,price:desc');
    });

    it('should call "getWithQuery" with the correct pagination parameters', () => {
        let query = qb.build();
        query.maxResults(10).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=10');

        query = qb.build();
        query.maxResults(20).firstResult(100).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=100');

        query = qb.build();
        query.maxResults(20).firstResult(0).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=0');
    });

    it('should not include "$top" without "$skip"', () => {
        const query = qb.build();
        query.firstResult(100).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('');
    });

    it('should be able to modify query to get next page of results', () => {
        const query = qb.build();
        query.maxResults(20).firstResult(20).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=20');

        query.next();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=40');

        query.next();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=60');

        query.next();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=80');
    });

    it('should be able to modify query to get previous page of results', () => {
        const query = qb.build();
        query.maxResults(20).firstResult(80).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=80');

        query.previous();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=60');

        query.previous();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=40');

        query.previous();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=20');
    });

    it('should default the top to 0 if previous results in a negative index', () => {
        const query = qb.build();
        query.maxResults(20).firstResult(10).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=10');

        query.previous();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=0');
    });

    it('should add "count" to query string if includeCount is set to true', () => {
        const query = qb.build();
        query.includeCount(true).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$count=true');
    });

});
