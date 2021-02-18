import {
    Predicate
} from './grammer/predicate';
import { and, eq, ge, gt, le, lt, or } from './grammer/query-expressions';

import { DefaultQueryAdapter, QueryAdapter } from './query-adapter';

class Fruit {
    name: string;
    variety: string;
    origin: string;
    price: number;
}

describe('DefaultQueryAdapter: Predicate parsing', () => {
    let adapter: QueryAdapter<Fruit>;

    beforeEach(() => {
        adapter = new DefaultQueryAdapter<Fruit>();
    });

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
