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

            expect(service.isValidKeyPress(mockEvent, '', '.')).toBe(true);
        });

        it('should block alphabetic characters', () => {
            mockElement.value = '';
            mockElement.setSelectionRange(0, 0);
            mockEvent = new KeyboardEvent('keydown', { key: 'a' });
            Object.defineProperty(mockEvent, 'target', { value: mockElement });

            expect(service.isValidKeyPress(mockEvent, '', '.')).toBe(false);
        });

        it('should allow minus at the beginning', () => {
            mockElement.value = '';
            mockElement.setSelectionRange(0, 0);
            mockEvent = new KeyboardEvent('keydown', { key: '-' });
            Object.defineProperty(mockEvent, 'target', { value: mockElement });

            expect(service.isValidKeyPress(mockEvent, '', '.')).toBe(true);
        });

        it('should block minus not at the beginning', () => {
            mockElement.value = '123';
            mockElement.setSelectionRange(3, 3);
            mockEvent = new KeyboardEvent('keydown', { key: '-' });
            Object.defineProperty(mockEvent, 'target', { value: mockElement });

            expect(service.isValidKeyPress(mockEvent, '123', '.')).toBe(false);
        });

        it('should allow decimal separator once', () => {
            mockElement.value = '';
            mockElement.setSelectionRange(0, 0);
            mockEvent = new KeyboardEvent('keydown', { key: '.' });
            Object.defineProperty(mockEvent, 'target', { value: mockElement });

            expect(service.isValidKeyPress(mockEvent, '', '.')).toBe(true);
        });

        it('should block second decimal separator', () => {
            mockElement.value = '3.14';
            mockElement.setSelectionRange(4, 4);
            mockEvent = new KeyboardEvent('keydown', { key: '.' });
            Object.defineProperty(mockEvent, 'target', { value: mockElement });

            expect(service.isValidKeyPress(mockEvent, '3.14', '.')).toBe(false);
        });

        it('should allow control keys', () => {
            ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].forEach((key) => {
                mockElement.value = '123';
                mockElement.setSelectionRange(0, 0);
                mockEvent = new KeyboardEvent('keydown', { key });
                Object.defineProperty(mockEvent, 'target', { value: mockElement });

                expect(service.isValidKeyPress(mockEvent, '123', '.')).toBe(true);
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
    });
});
