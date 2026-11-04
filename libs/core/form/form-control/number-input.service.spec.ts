import { TestBed } from '@angular/core/testing';
import { NumberInputService } from './number-input.service';

describe('NumberInputService', () => {
    let service: NumberInputService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NumberInputService]
        });
        service = TestBed.inject(NumberInputService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('isValidKeyPress', () => {
        let mockEvent: KeyboardEvent;
        let mockElement: HTMLInputElement;

        beforeEach(() => {
            mockElement = document.createElement('input');
            mockEvent = new KeyboardEvent('keydown', { key: 'a' });
            Object.defineProperty(mockEvent, 'target', { value: mockElement, writable: false });
        });

        it('should allow numeric characters', () => {
            mockElement.value = '';
            mockElement.setSelectionRange(0, 0);
            mockEvent = new KeyboardEvent('keydown', { key: '5' });
            Object.defineProperty(mockEvent, 'target', { value: mockElement });

            expect(service.isValidKeyPress(mockEvent, '')).toBe(true);
        });

        it('should block alphabetic characters', () => {
            mockElement.value = '';
            mockElement.setSelectionRange(0, 0);
            mockEvent = new KeyboardEvent('keydown', { key: 'a' });
            Object.defineProperty(mockEvent, 'target', { value: mockElement });

            expect(service.isValidKeyPress(mockEvent, '')).toBe(false);
        });

        it('should allow minus at the beginning', () => {
            mockElement.value = '';
            mockElement.setSelectionRange(0, 0);
            mockEvent = new KeyboardEvent('keydown', { key: '-' });
            Object.defineProperty(mockEvent, 'target', { value: mockElement });

            expect(service.isValidKeyPress(mockEvent, '')).toBe(true);
        });

        it('should block minus not at the beginning', () => {
            mockElement.value = '123';
            mockElement.setSelectionRange(3, 3);
            mockEvent = new KeyboardEvent('keydown', { key: '-' });
            Object.defineProperty(mockEvent, 'target', { value: mockElement });

            expect(service.isValidKeyPress(mockEvent, '123')).toBe(false);
        });

        it('should allow minus directly after exponent (e.g. 1e-5)', () => {
            mockElement.value = '1e';
            mockElement.setSelectionRange(2, 2);
            mockEvent = new KeyboardEvent('keydown', { key: '-' });
            Object.defineProperty(mockEvent, 'target', { value: mockElement });

            expect(service.isValidKeyPress(mockEvent, '1e')).toBe(true);
        });

        it('should allow plus directly after exponent (e.g. 1e+5)', () => {
            mockElement.value = '1E';
            mockElement.setSelectionRange(2, 2);
            mockEvent = new KeyboardEvent('keydown', { key: '+' });
            Object.defineProperty(mockEvent, 'target', { value: mockElement });

            expect(service.isValidKeyPress(mockEvent, '1E')).toBe(true);
        });

        it('should block a second sign in the exponent', () => {
            mockElement.value = '1e-';
            mockElement.setSelectionRange(3, 3);
            mockEvent = new KeyboardEvent('keydown', { key: '-' });
            Object.defineProperty(mockEvent, 'target', { value: mockElement });

            expect(service.isValidKeyPress(mockEvent, '1e-')).toBe(false);
        });

        it('should block plus as a leading sign', () => {
            mockElement.value = '';
            mockElement.setSelectionRange(0, 0);
            mockEvent = new KeyboardEvent('keydown', { key: '+' });
            Object.defineProperty(mockEvent, 'target', { value: mockElement });

            expect(service.isValidKeyPress(mockEvent, '')).toBe(false);
        });

        it('should allow decimal separator once', () => {
            mockElement.value = '';
            mockElement.setSelectionRange(0, 0);
            mockEvent = new KeyboardEvent('keydown', { key: '.' });
            Object.defineProperty(mockEvent, 'target', { value: mockElement });

            expect(service.isValidKeyPress(mockEvent, '')).toBe(true);
        });

        it('should block second decimal separator', () => {
            mockElement.value = '3.14';
            mockElement.setSelectionRange(4, 4);
            mockEvent = new KeyboardEvent('keydown', { key: '.' });
            Object.defineProperty(mockEvent, 'target', { value: mockElement });

            expect(service.isValidKeyPress(mockEvent, '3.14')).toBe(false);
        });

        it('should allow control keys', () => {
            ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].forEach((key) => {
                mockElement.value = '123';
                mockElement.setSelectionRange(0, 0);
                mockEvent = new KeyboardEvent('keydown', { key });
                Object.defineProperty(mockEvent, 'target', { value: mockElement });

                expect(service.isValidKeyPress(mockEvent, '123')).toBe(true);
            });
        });
    });

    describe('parseNumericValue', () => {
        describe('dot decimal locale (en-US)', () => {
            it('should parse simple number', () => {
                expect(service.parseNumericValue('123', '.')).toBe(123);
            });

            it('should parse decimal number', () => {
                expect(service.parseNumericValue('123.45', '.')).toBe(123.45);
            });

            it('should parse negative number', () => {
                expect(service.parseNumericValue('-123.45', '.')).toBe(-123.45);
            });

            it('should parse number with thousands separator', () => {
                expect(service.parseNumericValue('1,234.56', '.')).toBe(1234.56);
            });

            it('should parse large number with multiple thousands separators', () => {
                expect(service.parseNumericValue('1,000,000', '.')).toBe(1000000);
            });

            it('should treat single comma with 3 digits as thousands separator', () => {
                expect(service.parseNumericValue('1,000', '.')).toBe(1000);
            });

            it('should treat single comma without 3 digits as decimal', () => {
                expect(service.parseNumericValue('1,5', '.')).toBe(1.5);
            });

            it('should return null for empty string', () => {
                expect(service.parseNumericValue('', '.')).toBeNull();
            });

            it('should return null for invalid input', () => {
                expect(service.parseNumericValue('abc', '.')).toBeNull();
            });
        });

        describe('comma decimal locale (de-DE, fr-FR)', () => {
            it('should parse simple number', () => {
                expect(service.parseNumericValue('123', ',')).toBe(123);
            });

            it('should parse decimal number with comma', () => {
                expect(service.parseNumericValue('123,45', ',')).toBe(123.45);
            });

            it('should parse number with period thousands separator', () => {
                expect(service.parseNumericValue('1.234,56', ',')).toBe(1234.56);
            });

            it('should parse large number with multiple thousands separators', () => {
                expect(service.parseNumericValue('1.000.000', ',')).toBe(1000000);
            });

            it('should treat single period with 3 digits as thousands separator', () => {
                expect(service.parseNumericValue('1.000', ',')).toBe(1000);
            });

            it('should treat single period without 3 digits as decimal', () => {
                expect(service.parseNumericValue('1.5', ',')).toBe(1.5);
            });

            it('should handle user typing period as decimal in comma locale', () => {
                // User might type period thinking it's decimal
                expect(service.parseNumericValue('1234.56', ',')).toBe(1234.56);
            });
        });
    });

    describe('formatNumber', () => {
        it('should format simple number', () => {
            expect(service.formatNumber(123, undefined, '.', false)).toBe('123');
        });

        it('should format decimal number', () => {
            expect(service.formatNumber(123.45, undefined, '.', false)).toBe('123.45');
        });

        it('should format with precision', () => {
            expect(service.formatNumber(123.456789, 2, '.', false)).toBe('123.46');
        });

        it('should format with zero precision', () => {
            expect(service.formatNumber(123.456, 0, '.', false)).toBe('123');
        });

        it('should format with thousands separator', () => {
            expect(service.formatNumber(1234.56, undefined, '.', true)).toBe('1,234.56');
        });

        it('should format large number with thousands separator', () => {
            expect(service.formatNumber(1000000, undefined, '.', true)).toBe('1,000,000');
        });

        it('should format with comma decimal separator', () => {
            expect(service.formatNumber(123.45, undefined, ',', false)).toBe('123,45');
        });

        it('should format with comma decimal and period thousands', () => {
            expect(service.formatNumber(1234.56, undefined, ',', true)).toBe('1.234,56');
        });

        it('should use an explicit grouping separator when provided (e.g. fr-FR space)', () => {
            expect(service.formatNumber(1234.56, undefined, ',', true, ' ')).toBe('1 234,56');
        });

        it('should ignore the explicit grouping separator when grouping is disabled', () => {
            expect(service.formatNumber(1234.56, undefined, ',', false, ' ')).toBe('1234,56');
        });

        it('should return empty string for null', () => {
            expect(service.formatNumber(null, undefined, '.', false)).toBe('');
        });
    });

    describe('isValidPaste', () => {
        it('should accept simple numeric string', () => {
            expect(service.isValidPaste('123', '.')).toBe(true);
        });

        it('should accept decimal number', () => {
            expect(service.isValidPaste('123.45', '.')).toBe(true);
        });

        it('should accept negative number', () => {
            expect(service.isValidPaste('-123.45', '.')).toBe(true);
        });

        it('should accept number with thousands separator', () => {
            expect(service.isValidPaste('1,234.56', '.')).toBe(true);
        });

        it('should accept scientific notation', () => {
            expect(service.isValidPaste('1e5', '.')).toBe(true);
            expect(service.isValidPaste('1E-2', '.')).toBe(true);
        });

        it('should reject alphabetic characters', () => {
            expect(service.isValidPaste('abc', '.')).toBe(false);
        });

        it('should reject mixed alphanumeric', () => {
            expect(service.isValidPaste('123abc', '.')).toBe(false);
        });

        it('should reject multiple decimal separators', () => {
            expect(service.isValidPaste('1.2.3', '.')).toBe(false);
        });

        describe('precision', () => {
            it('should accept a value within the precision limit', () => {
                expect(service.isValidPaste('3.14', '.', 2)).toBe(true);
            });

            it('should accept a value with fewer decimals than the limit', () => {
                expect(service.isValidPaste('3.1', '.', 2)).toBe(true);
            });

            it('should reject a value exceeding the precision limit', () => {
                expect(service.isValidPaste('3.14159', '.', 2)).toBe(false);
            });

            it('should accept an integer when precision is 0', () => {
                expect(service.isValidPaste('123', '.', 0)).toBe(true);
            });

            it('should reject any decimal when precision is 0', () => {
                expect(service.isValidPaste('123.4', '.', 0)).toBe(false);
            });

            it('should enforce precision against the parsed value with thousands separators', () => {
                expect(service.isValidPaste('1,234.567', '.', 2)).toBe(false);
                expect(service.isValidPaste('1,234.56', '.', 2)).toBe(true);
            });

            it('should enforce precision in a comma decimal locale', () => {
                expect(service.isValidPaste('3,14159', ',', 2)).toBe(false);
                expect(service.isValidPaste('3,14', ',', 2)).toBe(true);
            });
        });
    });

    describe('countDecimals', () => {
        it('should return 0 for an integer', () => {
            expect(service.countDecimals(100)).toBe(0);
        });

        it('should count decimal places of a simple fraction', () => {
            expect(service.countDecimals(3.14)).toBe(2);
        });

        it('should count all decimal places', () => {
            expect(service.countDecimals(3.14159)).toBe(5);
        });

        it('should count decimals in a negative value', () => {
            expect(service.countDecimals(-2.5)).toBe(1);
        });

        it('should handle scientific notation with negative exponent', () => {
            expect(service.countDecimals(1e-5)).toBe(5);
        });

        it('should handle scientific notation with a fractional coefficient', () => {
            expect(service.countDecimals(1.5e-3)).toBe(4);
        });
    });

    describe('wouldExceedPrecision', () => {
        let mockElement: HTMLInputElement;

        const keyEvent = (key: string, selectionStart: number, selectionEnd: number): KeyboardEvent => {
            mockElement.setSelectionRange(selectionStart, selectionEnd);
            const event = new KeyboardEvent('keydown', { key });
            Object.defineProperty(event, 'target', { value: mockElement });
            return event;
        };

        beforeEach(() => {
            mockElement = document.createElement('input');
        });

        it('should block a digit that exceeds the decimal limit', () => {
            mockElement.value = '3.14';
            expect(service.wouldExceedPrecision(keyEvent('5', 4, 4), '3.14', 2)).toBe(true);
        });

        it('should allow a digit that stays within the decimal limit', () => {
            mockElement.value = '3.1';
            expect(service.wouldExceedPrecision(keyEvent('4', 3, 3), '3.1', 2)).toBe(false);
        });

        it('should allow a digit typed before the decimal separator', () => {
            mockElement.value = '3.14';
            expect(service.wouldExceedPrecision(keyEvent('9', 0, 0), '3.14', 2)).toBe(false);
        });

        it('should allow a digit when there is no decimal separator', () => {
            mockElement.value = '314';
            expect(service.wouldExceedPrecision(keyEvent('5', 3, 3), '314', 2)).toBe(false);
        });

        it('should ignore non-digit keys', () => {
            mockElement.value = '3.14';
            expect(service.wouldExceedPrecision(keyEvent('.', 4, 4), '3.14', 2)).toBe(false);
        });

        it('should account for a selection being replaced by the digit', () => {
            // Selecting the whole fractional part and typing one digit keeps within precision
            mockElement.value = '3.14';
            expect(service.wouldExceedPrecision(keyEvent('9', 2, 4), '3.14', 2)).toBe(false);
        });
    });
});
