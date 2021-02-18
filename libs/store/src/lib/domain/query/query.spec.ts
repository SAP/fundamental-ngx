
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

});
