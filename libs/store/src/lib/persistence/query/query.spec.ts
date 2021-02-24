import { QueryBuilder } from './query-builder';
import { and, eq } from './grammer/query-expressions';
import { DefaultQueryAdapter } from './query-adapter';
import { QueryService } from './query.service';
import { Observable, of } from 'rxjs';

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

class MockQueryService<TModel> extends QueryService<TModel> {
    constructor() {
        super();
    }

    getByKey(id: string): Observable<TModel> {
        return of(null);
    }

    getWithQuery(query: string): Observable<TModel[]> {
        return of([]);
    }

    count(): Observable<number> {
        return of(0);
    }
}

describe('Store: Query', () => {

    let qb: QueryBuilder<Fruit>;
    let service: QueryService<Fruit>;

    beforeEach(() => {
        const adapter = new DefaultQueryAdapter<Fruit>();
        service = new MockQueryService<Fruit>();
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
        query.withMaxResults(10).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=10&$top=0');

        query = qb.build();
        query.withMaxResults(20).withFirstResult(100).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=100');

        query = qb.build();
        query.withMaxResults(20).withFirstResult(0).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=0');
    });

    it('should not include "$top" without "$skip"', () => {
        const query = qb.build();
        query.withFirstResult(100).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('');
    });

    it('should be able to modify query to get next page of results', () => {
        const query = qb.build();
        query.withMaxResults(20).withFirstResult(20).fetch();
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
        query.withMaxResults(20).withFirstResult(80).fetch();
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
        query.withMaxResults(20).withFirstResult(10).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=10');

        query.previous();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=0');
    });

    it('should add "count" to query string if includeCount is set to true', () => {
        const query = qb.build();
        query.includeCount(true).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$count=true');
    });

    it('should reset the paging index by default when orderBy is called', () => {
        const query = qb.build();
        query.withMaxResults(20).withFirstResult(40).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=40');

        query.orderBy({field: 'name'}).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=0&$orderby=name');
    });

    it('should suppress resetting of the paging index if "suppressPageReset" is invoked when orderBy is called', () => {
        const query = qb.build();
        query.withMaxResults(20).withFirstResult(40).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=40');

        query.suppressPageReset().orderBy({field: 'name'}).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$skip=20&$top=40&$orderby=name');
    });

    it('should reset the paging index by default when predicate has changed', () => {
        const query = qb.where(eq('name', 'orange')).build();
        query.withMaxResults(20).withFirstResult(40).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$filter=name eq \'orange\'&$skip=20&$top=40');

        query.where(eq('name', 'peach')).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$filter=name eq \'peach\'&$skip=20&$top=0');
    });

    it('should suppress resetting of the paging index if "suppressPageReset" is invoked when predicate has changed', () => {
        const query = qb.where(eq('name', 'orange')).build();
        query.withMaxResults(20).withFirstResult(40).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$filter=name eq \'orange\'&$skip=20&$top=40');

        query.suppressPageReset().where(eq('name', 'peach')).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$filter=name eq \'peach\'&$skip=20&$top=40');
    });

    it('should reset the paging index by default when keyword is changed', () => {
        const query = qb.keyword('apple').build();
        query.withMaxResults(20).withFirstResult(40).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$search=apple&$skip=20&$top=40');

        query.keyword('banana').fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$search=banana&$skip=20&$top=0');
    });

    it('should suppress resetting the paging index if "suppressPageReset" is invoked when keyword is changed', () => {
        const query = qb.keyword('apple').build();
        query.withMaxResults(20).withFirstResult(40).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$search=apple&$skip=20&$top=40');

        query.suppressPageReset().keyword('banana').fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$search=banana&$skip=20&$top=40');
    });

    it('should reset the paging index by default when page size is changed', () => {
        const query = qb.keyword('apple').build();
        query.withMaxResults(20).withFirstResult(40).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$search=apple&$skip=20&$top=40');

        query.withMaxResults(100).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$search=apple&$skip=100&$top=0');
    });

    it('should suppress resetting the paging index if "suppressPageReset" is invoked when page size is changed', () => {
        const query = qb.keyword('apple').build();
        query.withMaxResults(20).withFirstResult(40).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$search=apple&$skip=20&$top=40');

        query.suppressPageReset().withMaxResults(100).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$search=apple&$skip=100&$top=40');
    });

    it('should suppress resetting the paging index if setting the paging index is part of the query update', () => {
        const query = qb.keyword('apple').build();
        query.withMaxResults(20).withFirstResult(40).fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$search=apple&$skip=20&$top=40');

        query.withMaxResults(100).withFirstResult(40).keyword('banana').fetch();
        expect(service.getWithQuery).toHaveBeenCalledWith('$search=banana&$skip=100&$top=40');
    });
});
