import {
    Predicate
} from './grammer/predicate';
import { and, eq, ge, gt, le, lt, or } from './grammer/query-expressions';
import { OrderBy } from './query';

import {
    DefaultQueryAdapter,
    QueryAdapter,
    QueryParams
} from './query-adapter';

class Fruit {
    name: string;
    variety: string;
    origin: string;
    price: number;
}

const adapter: QueryAdapter<Fruit> = new DefaultQueryAdapter<Fruit>();

describe('DefaultQueryAdapter: Predicate parsing', () => {

    it('should return empty string if no argument is passed', () => {
        expect(adapter.parsePredicate()).toBe('');
    });

    it('should be able to construct filter query for EqPredicate', () => {
        const p1: Predicate<Fruit> = eq('name', 'apple');
        expect(adapter.parsePredicate(p1)).toBe('name eq \'apple\'');

        const p2: Predicate<Fruit> = eq('name', 'banana');
        expect(adapter.parsePredicate(p2)).toBe('name eq \'banana\'');

        const p3: Predicate<Fruit> = eq('variety', 'braeburn');
        expect(adapter.parsePredicate(p3)).toBe('variety eq \'braeburn\'');

        const p4: Predicate<Fruit> = eq('price', 6.22);
        expect(adapter.parsePredicate(p4)).toBe('price eq 6.22');
    });

    it('should be able to construct filter query for GtPredicate', () => {
        const p1: Predicate<Fruit> = gt('price', 5.25);
        expect(adapter.parsePredicate(p1)).toBe('price gt 5.25');

        const p2: Predicate<Fruit> = gt('price', 10);
        expect(adapter.parsePredicate(p2)).toBe('price gt 10');

        const p3: Predicate<Fruit> = gt('name', 'pear');
        expect(adapter.parsePredicate(p3)).toBe('name gt \'pear\'');
    });

    it('should be able to construct filter query for LtPredicate', () => {
        const p1: Predicate<Fruit> = lt('price', 5.25);
        expect(adapter.parsePredicate(p1)).toBe('price lt 5.25');

        const p2: Predicate<Fruit> = lt('price', 10);
        expect(adapter.parsePredicate(p2)).toBe('price lt 10');
    });

    it('should be able to construct filter query for GePredicate', () => {
        const p1: Predicate<Fruit> = ge('price', 5.25);
        expect(adapter.parsePredicate(p1)).toBe('price ge 5.25');

        const p2: Predicate<Fruit> = ge('price', 10);
        expect(adapter.parsePredicate(p2)).toBe('price ge 10');
    });

    it('should be able to construct filter query for LePredicate', () => {
        const p1: Predicate<Fruit> = le('price', 5.25);
        expect(adapter.parsePredicate(p1)).toBe('price le 5.25');

        const p2: Predicate<Fruit> = le('price', 10);
        expect(adapter.parsePredicate(p2)).toBe('price le 10');
    });

    it('should be able to construct filter query for AndPredicate', () => {
        const p1: Predicate<Fruit> = and(
            eq('name', 'apple'),
            gt('price', 5.25)
        );
        expect(adapter.parsePredicate(p1)).toBe('(name eq \'apple\' and price gt 5.25)');
        const p2: Predicate<Fruit> = and(
            eq('name', 'apple'),
            eq('origin', 'Europe'),
            gt('price', 5.25)
        );
        expect(adapter.parsePredicate(p2)).toBe('(name eq \'apple\' and origin eq \'Europe\' and price gt 5.25)');
    });

    it('should be able to construct filter query for OrPredicate', () => {
        const p1: Predicate<Fruit> = or(
            lt('price', 5.25),
            gt('price', 11.73)
        );
        expect(adapter.parsePredicate(p1)).toBe('(price lt 5.25 or price gt 11.73)');
        const p2: Predicate<Fruit> = or(
            eq('name', 'apple'),
            eq('name', 'banana'),
            eq('name', 'orange')
        );
        expect(adapter.parsePredicate(p2)).toBe('(name eq \'apple\' or name eq \'banana\' or name eq \'orange\')');
    });

    it('should be able to construct filter query from nested predicates', () => {
        const p1: Predicate<Fruit> = or(
            and(eq('name', 'apple'), lt('price', 5.25)),
            and(eq('name', 'banana'), gt('price', 11.73))
        );
        expect(adapter.parsePredicate(p1)).toBe('((name eq \'apple\' and price lt 5.25) or (name eq \'banana\' and price gt 11.73))');

    });
});

describe('DefaultQueryAdapter: Order By Parsing', () => {
    it('should return an empty string if no arguments are passed', () => {
        expect(adapter.parseOrderBys()).toBe('')
    });

    it('should return correct string if single OrderBy is passed without direction', () => {
        const orderBy: OrderBy<Fruit> = {
            field: 'name'
        };
        expect(adapter.parseOrderBys(orderBy)).toBe('name');
    });

    it('should return correct string if single OrderBy is passed with direction', () => {
        let orderBy: OrderBy<Fruit> = {
            field: 'variety',
            order: 'ASCENDING'
        };
        expect(adapter.parseOrderBys(orderBy)).toBe('variety:asc');
        orderBy = {
            field: 'origin',
            order: 'DESCENDING'
        };
        expect(adapter.parseOrderBys(orderBy)).toBe('origin:desc');
    });

    it('should return a correct query string for an array of OrderBys', () => {

        let orderBys: OrderBy<Fruit>[] = [{
            field: 'variety'
        }, {
            field: 'name',
            order: 'DESCENDING'
        }];
        expect(adapter.parseOrderBys(orderBys)).toBe('variety,name:desc');

        orderBys = [{
            field: 'variety',
            order: 'ASCENDING'
        }, {
            field: 'name',
            order: 'DESCENDING'
        }, {
            field: 'price',
            order: 'ASCENDING'
        }];
        expect(adapter.parseOrderBys(orderBys)).toBe('variety:asc,name:desc,price:asc');

    });
});

describe('DefaultQueryAdapter: Select Parsing', () => {

    it('should return an empty string if no arguments are passed', () => {
        expect(adapter.parseSelect()).toBe('')
    });

    it('should be able to process select parameters', () => {
        expect(adapter.parseSelect(['name', 'age', 'color'])).toBe('name,age,color');
    });

});

describe('DefaultQueryAdapter: Expand Parsing', () => {

    it('should return an empty string if no arguments are passed', () => {
        expect(adapter.parseExpand()).toBe('')
    });

    it('should be able to process expand parameters', () => {
        expect(adapter.parseExpand(['name', 'age', 'color'])).toBe('name,age,color');
    });

});

describe('DefaultQueryAdapter: Query string generation', () => {

    it('should return empty string if no arguments are passed', () => {
        expect(adapter.createQueryString()).toBe('');
    });

    it('should return empty string if an empty parameter object is passed', () => {
        expect(adapter.createQueryString({})).toBe('');
    });

    it('should be able to process query parameters with "search"', () => {
        const params: QueryParams = {
            search: 'red'
        };
        expect(adapter.createQueryString(params)).toBe('$search=red');
    });

    it('should not include query parameters if they are empty', () => {
        const params: QueryParams = {
            search: '',
            filter: '',
            pageSize: '',
            offset: '',
            orderby: '',
            count: '',
        };
        expect(adapter.createQueryString(params)).toBe('');
    });

    it('should be able to process query parameters with "filter"', () => {
        const params: QueryParams = {
            filter: 'name eq \'apple\''
        };
        expect(adapter.createQueryString(params)).toBe('$filter=name eq \'apple\'');
    });

    it('should be able to process query parameters with "pageSize"', () => {
        const params: QueryParams = {
            pageSize: '42'
        };
        expect(adapter.createQueryString(params)).toBe('$skip=42');
    });

    it('should be able to process query parameters with "offset"', () => {
        const params: QueryParams = {
            offset: '100'
        };
        expect(adapter.createQueryString(params)).toBe('$top=100');
    });

    it('should be able to process query parameters with "orderby"', () => {
        const params: QueryParams = {
            orderby: 'name'
        };
        expect(adapter.createQueryString(params)).toBe('$orderby=name');
    });

    it('should be able to handle the "count" query parameter', () => {
        const params: QueryParams = {
            count: 'true'
        };
        expect(adapter.createQueryString(params)).toBe('$count=true');
    });

    it('should be able to handle the "select" query parameter', () => {
        const params: QueryParams = {
            select: 'name,price'
        };
        expect(adapter.createQueryString(params)).toBe('$select=name,price');
    });

    it('should be able to handle the "expand" query parameter', () => {
        const params: QueryParams = {
            expand: 'supplier,distributor'
        };
        expect(adapter.createQueryString(params)).toBe('$expand=supplier,distributor');
    });

    it('should be able to process query parameters with any properties', () => {
        const params: QueryParams = {
            foo: 'hello',
            bar: 'world'
        };
        expect(adapter.createQueryString(params)).toBe('foo=hello&bar=world');
    });

});
