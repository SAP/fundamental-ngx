import { Predicate } from './predicate';
import { and, or, not, eq, ge, gt, le, lt, contains } from './query-expressions';

interface Animal {
    name: string;
    category: string;
    weight: number; // in grams
    lifeSpan: number;
    lastSeen: Date;
}

interface Animals {
    [index: string]: Animal;
}
const animals: Animals = {
    'lion': {
        name: 'Lion',
        category: 'mammal',
        weight: 220000,
        lifeSpan: 14,
        lastSeen: new Date('2010-12-25')
    },
    'snake': {
        name: 'Snake',
        category: 'reptile',
        weight: 27000,
        lifeSpan: 25,
        lastSeen: new Date('2011-02-05')
    },
    'tiger': {
        name: 'Tiger',
        category: 'mammal',
        weight: 250000,
        lifeSpan: 10,
        lastSeen: new Date('2011-01-22')
    },
    'iguana': {
        name: 'Iguana',
        category: 'reptile',
        weight: 4000,
        lifeSpan: 20,
        lastSeen: new Date('2010-11-22')
    },
    'elephant': {
        name: 'Elephant',
        category: 'mammal',
        weight: 5000000,
        lifeSpan: 70,
        lastSeen: new Date('2011-01-01')
    },
    'mouse': {
        name: 'Mouse',
        category: 'mammal',
        weight: 30,
        lifeSpan: 2,
        lastSeen: new Date('2010-07-18')
    },
    'turtle': {
        name: 'Turtle',
        category: 'reptile',
        weight: 400000,
        lifeSpan: 30,
        lastSeen: new Date('2011-03-02')
    }

}
describe('Predicate', () => {

    it('should be able to test with EqPredicate', () => {
        let predicate: Predicate<Animal> = eq('name', 'Lion');
        expect(predicate.test(animals.lion)).toBeTruthy();
        expect(predicate.test(animals.turtle)).toBeFalsy();

        predicate = eq('weight', 5000000);
        expect(predicate.test(animals.mouse)).toBeFalsy();
        expect(predicate.test(animals.elephant)).toBeTruthy();

        predicate = eq('lastSeen', new Date('2011-03-02'));
        expect(predicate.test(animals.snake)).toBeFalsy();
        expect(predicate.test(animals.turtle)).toBeTruthy();
    });

    it('should be able to test with GtPredicate', () => {
        let predicate: Predicate<Animal> = gt('name', 'Lion');
        expect(predicate.test(animals.tiger)).toBeTruthy();
        expect(predicate.test(animals.elephant)).toBeFalsy();
        expect(predicate.test(animals.lion)).toBeFalsy();

        predicate = gt('weight', 250000);
        expect(predicate.test(animals.lion)).toBeFalsy();
        expect(predicate.test(animals.elephant)).toBeTruthy();
        expect(predicate.test(animals.tiger)).toBeFalsy();

        predicate = gt('lastSeen', new Date('2011-01-01'));
        expect(predicate.test(animals.iguana)).toBeFalsy();
        expect(predicate.test(animals.elephant)).toBeFalsy();
        expect(predicate.test(animals.tiger)).toBeTruthy();
    });

    it('should be able to test with LtPredicate', () => {
        let predicate: Predicate<Animal> = lt('name', 'Mouse');
        expect(predicate.test(animals.iguana)).toBeTruthy();
        expect(predicate.test(animals.turtle)).toBeFalsy();
        expect(predicate.test(animals.mouse)).toBeFalsy();

        predicate = lt('weight', 27000);
        expect(predicate.test(animals.mouse)).toBeTruthy();
        expect(predicate.test(animals.turtle)).toBeFalsy();
        expect(predicate.test(animals.snake)).toBeFalsy();

        predicate = lt('lastSeen', new Date('2011-01-01'));
        expect(predicate.test(animals.iguana)).toBeTruthy();
        expect(predicate.test(animals.elephant)).toBeFalsy();
        expect(predicate.test(animals.tiger)).toBeFalsy();
    });

    it('should be able to test with GePredicate', () => {
        let predicate: Predicate<Animal> = ge('name', 'Lion');
        expect(predicate.test(animals.tiger)).toBeTruthy();
        expect(predicate.test(animals.elephant)).toBeFalsy();
        expect(predicate.test(animals.lion)).toBeTruthy();

        predicate = ge('weight', 250000);
        expect(predicate.test(animals.lion)).toBeFalsy();
        expect(predicate.test(animals.elephant)).toBeTruthy();
        expect(predicate.test(animals.tiger)).toBeTruthy();

        predicate = ge('lastSeen', new Date('2011-01-01'));
        expect(predicate.test(animals.iguana)).toBeFalsy();
        expect(predicate.test(animals.elephant)).toBeTruthy();
        expect(predicate.test(animals.tiger)).toBeTruthy();
    });

    it('should be able to test with LePredicate', () => {
        let predicate: Predicate<Animal> = le('name', 'Mouse');
        expect(predicate.test(animals.iguana)).toBeTruthy();
        expect(predicate.test(animals.turtle)).toBeFalsy();
        expect(predicate.test(animals.mouse)).toBeTruthy();

        predicate = le('weight', 27000);
        expect(predicate.test(animals.mouse)).toBeTruthy();
        expect(predicate.test(animals.turtle)).toBeFalsy();
        expect(predicate.test(animals.snake)).toBeTruthy();

        predicate = le('lastSeen', new Date('2011-01-01'));
        expect(predicate.test(animals.iguana)).toBeTruthy();
        expect(predicate.test(animals.elephant)).toBeTruthy();
        expect(predicate.test(animals.tiger)).toBeFalsy();
    });

    it('should be able to test with ContainsPredicate (case insensitive)', () => {
        let predicate: Predicate<Animal> = contains('name', 'Na');
        expect(predicate.test(animals.iguana)).toBeTruthy();
        expect(predicate.test(animals.turtle)).toBeFalsy();
        expect(predicate.test(animals.snake)).toBeTruthy();

        // numbers will always return false ???
        predicate = contains('weight', 27000);
        expect(predicate.test(animals.iguana)).toBeFalsy();
        expect(predicate.test(animals.turtle)).toBeFalsy();
        expect(predicate.test(animals.snake)).toBeFalsy();

        // Dates will always return false ???
        predicate = contains('lastSeen', new Date('2011-01-01'));
        expect(predicate.test(animals.iguana)).toBeFalsy();
        expect(predicate.test(animals.elephant)).toBeFalsy();
        expect(predicate.test(animals.tiger)).toBeFalsy();
    });

    it('should be able to test with ContainsPredicate (case sensitive)', () => {
        let predicate: Predicate<Animal> = contains('name', 'Ig', true);
        expect(predicate.test(animals.iguana)).toBeTruthy();
        expect(predicate.test(animals.turtle)).toBeFalsy();
        expect(predicate.test(animals.snake)).toBeFalsy();

        predicate = contains('name', 'ig', true);
        expect(predicate.test(animals.iguana)).toBeFalsy();
    });

    it('should be able to test with AndPredicate', () => {
        let predicate: Predicate<Animal> = and(
            eq('category', 'mammal'),
            lt('weight', 250000)
        );
        expect(predicate.test(animals.turtle)).toBeFalsy();
        expect(predicate.test(animals.mouse)).toBeTruthy();
        expect(predicate.test(animals.elephant)).toBeFalsy();

        predicate = and(
            eq('category', 'reptile'),
            gt('weight', 4000),
            lt('lifeSpan', 30)
        );
        expect(predicate.test(animals.tiger)).toBeFalsy();
        expect(predicate.test(animals.snake)).toBeTruthy();
        expect(predicate.test(animals.iguana)).toBeFalsy();
    });

    it('should be able to test with OrPredicate', () => {
        let predicate: Predicate<Animal> = or(
            eq('category', 'mammal'),
            lt('weight', 27000)
        );
        expect(predicate.test(animals.turtle)).toBeFalsy();
        expect(predicate.test(animals.mouse)).toBeTruthy();
        expect(predicate.test(animals.elephant)).toBeTruthy();

        predicate = or(
            eq('category', 'reptile'),
            gt('weight', 220000),
            lt('lifeSpan', 5)
        );
        expect(predicate.test(animals.lion)).toBeFalsy();
        expect(predicate.test(animals.snake)).toBeTruthy();
        expect(predicate.test(animals.iguana)).toBeTruthy();
        expect(predicate.test(animals.mouse)).toBeTruthy();
    });

    it('should be able to test with NotPredicate', () => {
        let predicate: Predicate<Animal> = not(
            eq('category', 'mammal')
        );
        expect(predicate.test(animals.turtle)).toBeTruthy();
        expect(predicate.test(animals.mouse)).toBeFalsy();
        expect(predicate.test(animals.elephant)).toBeFalsy();

        predicate = not(
            gt('weight', 220000)
        );
        expect(predicate.test(animals.lion)).toBeTruthy();
        expect(predicate.test(animals.tiger)).toBeFalsy();
        expect(predicate.test(animals.elephant)).toBeFalsy();
        expect(predicate.test(animals.mouse)).toBeTruthy();
    });

    it('should be able to test with complex predicate', () => {
        let predicate: Predicate<Animal> = or(
            and(
                eq('category', 'mammal'),
                lt('weight', 220000)
            ),
            and(
                eq('category', 'reptile'),
                lt('lifeSpan', 25)
            )
        );
        expect(predicate.test(animals.lion)).toBeFalsy();
        expect(predicate.test(animals.mouse)).toBeTruthy();
        expect(predicate.test(animals.iguana)).toBeTruthy();
        expect(predicate.test(animals.turtle)).toBeFalsy();

        predicate = and(
            not(eq('category', 'reptile')),
            le('weight', 220000)
        );
        expect(predicate.test(animals.lion)).toBeTruthy();
        expect(predicate.test(animals.mouse)).toBeTruthy();
        expect(predicate.test(animals.snake)).toBeFalsy();
        expect(predicate.test(animals.turtle)).toBeFalsy();
    });
});
