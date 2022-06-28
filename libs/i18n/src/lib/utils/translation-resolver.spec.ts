import { TranslationResolver } from './translation-resolver';

describe('TranslationResolver', () => {
    let resolver: TranslationResolver;
    beforeEach(() => {
        resolver = new TranslationResolver();
    });

    const cases: [unprocessed: string, args: Record<string, any> | undefined, result: string][] = [
        ['{{ count }} items', { count: 5 }, '5 items'],
        ['{{ count }} items', { count: 'some' }, 'some items'],
        ['{{ count }} items', { count: {} }, '[object Object] items'],
        ['{{ another_count }} items', { another_count: 5 }, '5 items'],
        ['{{ anotherCount }} items', { anotherCount: 5 }, '5 items'],
        ['{{ anothercount }} items', { anotherCount: 5 }, ' items'],
        ['{{ }} items', { count: 5 }, ' items'],
        ['{{ count }} items', {}, ' items'],
        ['{{ count }} items', undefined, ' items'],
        ['{{    count    }} items', { count: 5 }, '5 items'],
        ['{{count}} items', { count: 5 }, '5 items'],
        ['{{count }} items', { count: 5 }, '5 items'],
        [' {{ count }} items', { count: 5 }, ' 5 items'],
        ['another {{ count }} items', { count: 5 }, 'another 5 items'],
        ['{{{ count }}} items', { count: 5 }, '{5} items'],
        ['{{{{ count }}}} items', { count: 5 }, '{{5}} items'],
        ['{{{ count }} items', { count: 5 }, '{5 items'],
        ['{{ count }}} items', { count: 5 }, '5} items'],
        ['{{ two words }} items', { two: 5, words: 10 }, '{{ two words }} items'],
        ['{{ before }} {{ count }} items', { count: 5, before: 'awesome' }, 'awesome 5 items']
    ];

    cases.forEach(([unprocessed, args, result]) => {
        it(`"${unprocessed}" should be processed as "${result}"`, () => {
            expect(resolver._interpolate(unprocessed, args)).toBe(result);
        });
    });
});
