
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

class Fruit {
    name: string;
    variety: string;
    origin: string;
    price: number;
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
        qb = new QueryBuilder(Fruit, service, adapter);
    });

    it('should call "getWithQuery" from EntityCollectionService', () => {
        const query = qb.newQuery();
        query.select();
        expect(service.getWithQuery).toHaveBeenCalled();
    });

    it('should call "getWithQuery" with correct filter parameters', () => {
        let query = qb.where(eq('name', 'apple')).newQuery();
        query.select();
        expect(service.getWithQuery).toHaveBeenCalledWith('$filter=name eq \'apple\'');

        query = qb.where(eq('variety', 'pippen')).newQuery();
        query.select();
        expect(service.getWithQuery).toHaveBeenCalledWith('$filter=variety eq \'pippen\'');

        query = qb.where(and(eq('variety', 'pippen'), eq('price', 3.03))).newQuery();
        query.select();
        expect(service.getWithQuery).toHaveBeenCalledWith('$filter=(variety eq \'pippen\' and price eq 3.03)');
    });

    it('should call "getWithQuery" with the correct order by parameters', () => {
        let query = qb.newQuery();
        query.orderBy({ field: 'name'}).select();
        expect(service.getWithQuery).toHaveBeenCalledWith('$orderby=name');

        query = qb.newQuery();
        query.orderBy({ field: 'name'}, { field: 'price', order: 'DESCENDING'}).select();
        expect(service.getWithQuery).toHaveBeenCalledWith('$orderby=name,price:desc');
    });

    it('should call "getWithQuery" with the correct pagination parameters', () => {
        let query = qb.newQuery();
        query.maxResults(10).select();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=10');

        query = qb.newQuery();
        query.firstResult(100).select();
        expect(service.getWithQuery).toHaveBeenCalledWith('$top=100');

        query = qb.newQuery();
        query.maxResults(20).firstResult(100).select();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=100');
    });

    it('should be able to modify query to get next page of results', () => {
        const query = qb.newQuery();
        query.maxResults(20).firstResult(20).select();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=20');

        query.next();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=40');
    });

    it('should be able to modify query to get previous page of results', () => {
        const query = qb.newQuery();
        query.maxResults(20).firstResult(80).select();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=80');

        query.previous();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=60');
    });

    it('should default the top to 0 if previous results in a negative index', () => {
        const query = qb.newQuery();
        query.maxResults(20).firstResult(10).select();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=10');

        query.previous();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=0');
    });

    it('should add "count" to query string if includeCount is set to true', () => {
        const query = qb.newQuery();
        query.includeCount(true).select();
        expect(service.getWithQuery).toHaveBeenCalledWith('$count=true');
    });

});
