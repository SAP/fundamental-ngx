import { TestBed } from '@angular/core/testing';
import { FdLanguage } from '@fundamental-ngx/i18n';
import { RatingStarLabelPipe } from './rating-star-label.pipe';

describe('RatingStarLabelPipe', () => {
    let pipe: RatingStarLabelPipe;
    let mockLanguage: FdLanguage;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        pipe = new RatingStarLabelPipe();
        mockLanguage = {
            coreRatingIndicator: {
                ariaLabelValue: 'of'
            }
        } as FdLanguage;
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    describe('without halves', () => {
        it('should transform index 0 to "1 of 5"', () => {
            const result = pipe.transform(0, 5, false, mockLanguage);
            expect(result).toBe('1 of 5');
        });

        it('should transform index 2 to "3 of 5"', () => {
            const result = pipe.transform(2, 5, false, mockLanguage);
            expect(result).toBe('3 of 5');
        });

        it('should transform index 4 to "5 of 5"', () => {
            const result = pipe.transform(4, 5, false, mockLanguage);
            expect(result).toBe('5 of 5');
        });

        it('should work with different control counts', () => {
            const result = pipe.transform(2, 10, false, mockLanguage);
            expect(result).toBe('3 of 10');
        });
    });

    describe('with halves', () => {
        it('should transform index 0 to "0.5 of 2.5"', () => {
            const result = pipe.transform(0, 5, true, mockLanguage);
            expect(result).toBe('0.5 of 2.5');
        });

        it('should transform index 1 to "1 of 2.5"', () => {
            const result = pipe.transform(1, 5, true, mockLanguage);
            expect(result).toBe('1 of 2.5');
        });

        it('should transform index 2 to "1.5 of 2.5"', () => {
            const result = pipe.transform(2, 5, true, mockLanguage);
            expect(result).toBe('1.5 of 2.5');
        });

        it('should transform index 4 to "2.5 of 2.5"', () => {
            const result = pipe.transform(4, 5, true, mockLanguage);
            expect(result).toBe('2.5 of 2.5');
        });

        it('should work with different control counts', () => {
            const result = pipe.transform(3, 10, true, mockLanguage);
            expect(result).toBe('2 of 5');
        });
    });

    describe('language translation', () => {
        it('should use the provided language translation', () => {
            const customLanguage = {
                coreRatingIndicator: {
                    ariaLabelValue: 'aus'
                }
            } as FdLanguage;

            const result = pipe.transform(2, 5, false, customLanguage);
            expect(result).toBe('3 aus 5');
        });

        it('should handle missing translation gracefully', () => {
            const emptyLanguage = {} as FdLanguage;

            const result = pipe.transform(2, 5, false, emptyLanguage);
            expect(result).toContain('3');
            expect(result).toContain('5');
        });

        it('should handle different language translations', () => {
            const germanLanguage = {
                coreRatingIndicator: {
                    ariaLabelValue: 'von'
                }
            } as FdLanguage;

            const result = pipe.transform(1, 5, false, germanLanguage);
            expect(result).toBe('2 von 5');
        });
    });

    describe('edge cases', () => {
        it('should handle zero controls count', () => {
            const result = pipe.transform(0, 0, false, mockLanguage);
            expect(result).toBe('1 of 0');
        });

        it('should handle large index values', () => {
            const result = pipe.transform(99, 100, false, mockLanguage);
            expect(result).toBe('100 of 100');
        });

        it('should handle halves with zero controls count', () => {
            const result = pipe.transform(0, 0, true, mockLanguage);
            expect(result).toBe('0.5 of 0');
        });

        it('should handle large index values with halves', () => {
            const result = pipe.transform(19, 20, true, mockLanguage);
            expect(result).toBe('10 of 10');
        });
    });
});
