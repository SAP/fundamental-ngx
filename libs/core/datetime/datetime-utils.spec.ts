import { TestBed } from '@angular/core/testing';
import { DatetimeAdapter } from './datetime-adapter';
import { convertToDesiredFormat } from './datetime-utils';
import { FdDate } from './fd-date';
import { provideDateTimeFormats } from './provide-date-time';

describe('convertToDesiredFormat', () => {
    it('should convert English day period labels to 24-hour time', () => {
        expect(convertToDesiredFormat('09:05 in the morning')).toBe('09:05');
        expect(convertToDesiredFormat('12:05 in the afternoon')).toBe('12:05');
        expect(convertToDesiredFormat('03:05 in the afternoon')).toBe('15:05');
        expect(convertToDesiredFormat('09:05 in the evening')).toBe('21:05');
        expect(convertToDesiredFormat('01:05 at night')).toBe('01:05');
    });

    it('should not leave the leading words of the day period in the date-time string', () => {
        expect(convertToDesiredFormat('October 23, 2026 at 09:05 in the evening')).toBe('October 23, 2026  21:05');
        expect(convertToDesiredFormat('October 23, 2026 at 01:05 at night')).toBe('October 23, 2026  01:05');
    });

    it('should still convert AM/PM', () => {
        expect(convertToDesiredFormat('October 23, 2026 at 04:33 PM')).toBe('October 23, 2026  16:33');
        expect(convertToDesiredFormat('12:10 AM')).toBe('00:10');
    });

    describe('with the datetime adapter', () => {
        let adapter: DatetimeAdapter<FdDate>;

        beforeEach(() => {
            TestBed.configureTestingModule({ providers: provideDateTimeFormats() });
            adapter = TestBed.inject(DatetimeAdapter);
        });

        it('should produce a string that the adapter can parse back', () => {
            const parseFormat: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };

            const date = adapter.parse(convertToDesiredFormat('October 23, 2026 at 09:05 in the evening'), parseFormat);

            expect(date?.isDateValid()).toBe(true);
            expect([date?.year, date?.month, date?.day, date?.hour, date?.minute]).toEqual([2026, 10, 23, 21, 5]);
        });
    });
});
