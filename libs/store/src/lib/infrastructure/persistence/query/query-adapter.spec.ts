import { Predicate } from './grammar/predicate';
import { and, eq, ge, gt, le, lt, or } from './grammar/query-expressions';
import { OrderBy, QuerySnapshot, QuerySnapshotModel } from './query';

import { DefaultQueryAdapter, QueryAdapter, QueryParams } from './query-adapter';

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
        expect(adapter.parsePredicate(p1)).toBe("name eq 'apple'");

        const p2: Predicate<Fruit> = eq('name', 'banana');
        expect(adapter.parsePredicate(p2)).toBe("name eq 'banana'");

        const p3: Predicate<Fruit> = eq('variety', 'braeburn');
        expect(adapter.parsePredicate(p3)).toBe("variety eq 'braeburn'");

        const p4: Predicate<Fruit> = eq('price', 6.22);
        expect(adapter.parsePredicate(p4)).toBe('price eq 6.22');
    });

    it('should be able to construct filter query for GtPredicate', () => {
        const p1: Predicate<Fruit> = gt('price', 5.25);
        expect(adapter.parsePredicate(p1)).toBe('price gt 5.25');

        const p2: Predicate<Fruit> = gt('price', 10);
        expect(adapter.parsePredicate(p2)).toBe('price gt 10');

        const p3: Predicate<Fruit> = gt('name', 'pear');
        expect(adapter.parsePredicate(p3)).toBe("name gt 'pear'");
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
        const p1: Predicate<Fruit> = and(eq('name', 'apple'), gt('price', 5.25));
        expect(adapter.parsePredicate(p1)).toBe("(name eq 'apple' and price gt 5.25)");
        const p2: Predicate<Fruit> = and(eq('name', 'apple'), eq('origin', 'Europe'), gt('price', 5.25));
        expect(adapter.parsePredicate(p2)).toBe("(name eq 'apple' and origin eq 'Europe' and price gt 5.25)");
    });

    it('should be able to construct filter query for OrPredicate', () => {
        const p1: Predicate<Fruit> = or(lt('price', 5.25), gt('price', 11.73));
        expect(adapter.parsePredicate(p1)).toBe('(price lt 5.25 or price gt 11.73)');
        const p2: Predicate<Fruit> = or(eq('name', 'apple'), eq('name', 'banana'), eq('name', 'orange'));
        expect(adapter.parsePredicate(p2)).toBe("(name eq 'apple' or name eq 'banana' or name eq 'orange')");
    });

    it('should be able to construct filter query from nested predicates', () => {
        const p1: Predicate<Fruit> = or(
            and(eq('name', 'apple'), lt('price', 5.25)),
            and(eq('name', 'banana'), gt('price', 11.73))
        );
        expect(adapter.parsePredicate(p1)).toBe(
            "((name eq 'apple' and price lt 5.25) or (name eq 'banana' and price gt 11.73))"
        );
    });
});

describe('DefaultQueryAdapter: Order By Parsing', () => {
    it('should return an empty string if no arguments are passed', () => {
        expect(adapter.parseOrderBys()).toBe('');
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
        let orderBys: OrderBy<Fruit>[] = [
            {
                field: 'variety'
            },
            {
                field: 'name',
                order: 'DESCENDING'
            }
        ];
        expect(adapter.parseOrderBys(orderBys)).toBe('variety,name:desc');

        orderBys = [
            {
                field: 'variety',
                order: 'ASCENDING'
            },
            {
                field: 'name',
                order: 'DESCENDING'
            },
            {
                field: 'price',
                order: 'ASCENDING'
            }
        ];
        expect(adapter.parseOrderBys(orderBys)).toBe('variety:asc,name:desc,price:asc');
    });
});

describe('DefaultQueryAdapter: Select Parsing', () => {
    it('should return an empty string if no arguments are passed', () => {
        expect(adapter.parseSelect()).toBe('');
    });

    it('should be able to process select parameters', () => {
        expect(adapter.parseSelect(['name', 'variety', 'origin'])).toBe('name,variety,origin');
    });
});

describe('DefaultQueryAdapter: Expand Parsing', () => {
    it('should return an empty string if no arguments are passed', () => {
        expect(adapter.parseExpand()).toBe('');
    });

    it('should be able to process expand parameters', () => {
        expect(adapter.parseExpand(['name', 'variety', 'origin'])).toBe('name,variety,origin');
    });
});

describe('DefaultQueryAdapter: Query string generation from queryParams', () => {
    it('should return empty string if no arguments are passed', () => {
        expect(adapter.createQueryStringFromQueryParams()).toBe('');
    });

    it('should return empty string if an empty parameter object is passed', () => {
        expect(adapter.createQueryStringFromQueryParams({})).toBe('');
    });

    it('should be able to process query parameters with "search"', () => {
        const params: QueryParams = {
            search: 'red'
        };
        expect(adapter.createQueryStringFromQueryParams(params)).toBe('$search=red');
    });

    it('should not include query parameters if they are empty', () => {
        const params: QueryParams = {
            search: '',
            filter: '',
            pageSize: '',
            offset: '',
            orderby: '',
            count: ''
        };
        expect(adapter.createQueryStringFromQueryParams(params)).toBe('');
    });

    it('should be able to process query parameters with "filter"', () => {
        const params: QueryParams = {
            filter: "name eq 'apple'"
        };
        expect(adapter.createQueryStringFromQueryParams(params)).toBe("$filter=name eq 'apple'");
    });

    it('should be able to process query parameters with "pageSize"', () => {
        const params: QueryParams = {
            skip: '42'
        };
        expect(adapter.createQueryStringFromQueryParams(params)).toBe('$skip=42');
    });

    it('should be able to process query parameters with "offset"', () => {
        const params: QueryParams = {
            top: '100'
        };
        expect(adapter.createQueryStringFromQueryParams(params)).toBe('$top=100');
    });

    it('should be able to process query parameters with "orderby"', () => {
        const params: QueryParams = {
            orderby: 'name'
        };
        expect(adapter.createQueryStringFromQueryParams(params)).toBe('$orderby=name');
    });

    it('should be able to handle the "count" query parameter', () => {
        const params: QueryParams = {
            count: 'true'
        };
        expect(adapter.createQueryStringFromQueryParams(params)).toBe('$count=true');
    });

    it('should be able to handle the "select" query parameter', () => {
        const params: QueryParams = {
            select: 'name,price'
        };
        expect(adapter.createQueryStringFromQueryParams(params)).toBe('$select=name,price');
    });

    it('should be able to handle the "expand" query parameter', () => {
        const params: QueryParams = {
            expand: 'supplier,distributor'
        };
        expect(adapter.createQueryStringFromQueryParams(params)).toBe('$expand=supplier,distributor');
    });

    it('should be able to process query parameters with any properties', () => {
        const params: QueryParams = {
            foo: 'hello',
            bar: 'world'
        };
        expect(adapter.createQueryStringFromQueryParams(params)).toBe('foo=hello&bar=world');
    });
});

describe('DefaultQueryAdapter: Query string generation from Query Snapshot', () => {
    const createQuerySnapshot = (partial: Partial<QuerySnapshot<Fruit>> = {}) => ({
        keyword: undefined,
        predicate: undefined,
        skip: undefined,
        top: undefined,
        orderby: undefined,
        includeCount: undefined,
        select: undefined,
        expand: undefined,
        ...partial
    });

    it('should not include query parameters if they are empty', () => {
        expect(adapter.createQueryStringFromQuery(createQuerySnapshot())).toBe('');
    });

    it('should be able to process query "keyword" parameter', () => {
        expect(adapter.createQueryStringFromQuery(createQuerySnapshot({ keyword: 'red' }))).toBe('$search=red');
    });

    it('should be able to process query predicate', () => {
        expect(adapter.createQueryStringFromQuery(createQuerySnapshot({ predicate: eq('name', 'apple') }))).toBe(
            "$filter=name eq 'apple'"
        );
    });

    it('should be able to process query parameters with "skip"', () => {
        expect(adapter.createQueryStringFromQuery(createQuerySnapshot({ skip: 42 }))).toBe('$skip=42');
    });

    it('should be able to process query parameters with "top"', () => {
        expect(adapter.createQueryStringFromQuery(createQuerySnapshot({ top: 100 }))).toBe('$top=100');
    });

    it('should be able to process query parameters with "orderby"', () => {
        expect(adapter.createQueryStringFromQuery(createQuerySnapshot({ orderby: [{ field: 'name' }] }))).toBe(
            '$orderby=name'
        );
    });

    it('should be able to process query parameter "includeCount"', () => {
        expect(adapter.createQueryStringFromQuery(createQuerySnapshot({ includeCount: true }))).toBe('$count=true');
    });

    it('should be able to handle the "select" query parameter', () => {
        expect(adapter.createQueryStringFromQuery(createQuerySnapshot({ select: ['name', 'price'] }))).toBe(
            '$select=name,price'
        );
    });

    it('should be able to handle the "expand" query parameter', () => {
        expect(adapter.createQueryStringFromQuery(createQuerySnapshot({expand: ['origin', 'price']}))).toBe('$expand=origin,price');
    });
});

describe('DefaultQueryAdapter: detect query snapshot', () => {
    it('should return true if pass query snapshot', () => {
        expect(QueryAdapter.isQuerySnapshot({})).toBeFalse();
        expect(QueryAdapter.isQuerySnapshot(new QuerySnapshotModel())).toBeTrue();
    });
});
