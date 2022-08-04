export type PluralizationSet1Options = 'zero' | 'one' | 'few' | 'many' | 'other';

/**
 * Applies to 'be', 'bs', 'cnr', 'dz', 'hr', 'ru', 'sr','uk' locales.
 * See details here http://translate.sourceforge.net/wiki/l10n/pluralforms
 */
export class PluralizationSet1 {
    private readonly fewInlusive: ReadonlySet<number> = new Set([2, 3, 4]);
    private readonly fewExclusive: ReadonlySet<number> = new Set([12, 13, 14]);
    private readonly manyInclusiveTenths: ReadonlySet<number> = new Set([5, 6, 7, 8, 9]);
    private readonly manyInclusiveHundredths: ReadonlySet<number> = new Set([11, 12, 13, 14]);

    process(num: any): PluralizationSet1Options {
        num = parseInt(num, 10);
        if (!isNaN(num)) {
            const tenth = num % 10;
            const hundredth = num % 100;
            if (num === 0) {
                return 'zero';
            } else if (tenth === 1 && num % 100 !== 11) {
                // 1, 21, 31, 41, 51, 61..
                return 'one';
            } else if (this.fewInlusive.has(tenth) && !this.fewExclusive.has(hundredth)) {
                // 2-4, 22-24, 32-34..
                return 'few';
            } else if (
                tenth === 0 ||
                this.manyInclusiveTenths.has(tenth) ||
                this.manyInclusiveHundredths.has(hundredth)
            ) {
                // 5-20, 25-30, 35-40...
                return 'many';
            }
        }
        return 'other';
    }
}
