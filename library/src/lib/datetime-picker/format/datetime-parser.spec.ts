import { FdDate } from '../../calendar/models/fd-date';
import { TimeObject } from '../../time/time-object';
import { FdDatetime } from '../models/fd-datetime';
import { DateTimeFormatParserDefault } from './datetime-parser';

describe('DateTimeParser', () => {
    const date: FdDate = new FdDate(2019, 9, 7);
    const time: TimeObject = {hour: 2, minute: 3, second: 4};
    const timeWithOnlyHours: TimeObject = {hour: 2, minute: 0, second: 0};
    let dateTime: FdDatetime = new FdDatetime(date, time);
    const service = new DateTimeFormatParserDefault();

    beforeEach(() => {
        dateTime = new FdDatetime(date, time);
    });


    it('Should Work For Default one "m/d/yyyy, H:M:S"', () => {
        const dateTimeFormat = 'm/d/yyyy, H:M:S';
        const dateString = service.format(dateTime, dateTimeFormat);
        expect(dateString).toBe('9/7/2019, 2:3:4');
        expect(service.parse(dateString, dateTimeFormat)).toEqual(dateTime);
    });


    it('Should Work For "mm/dd@yyyy, HH.MM:SS"', () => {
        const dateTimeFormat = 'mm/dd@yyyy, HH.MM:SS';
        const dateString = service.format(dateTime, dateTimeFormat);
        expect(dateString).toBe('09/07@2019, 02.03:04');
        expect(service.parse(dateString, dateTimeFormat)).toEqual(dateTime);
    });

    it('Should Pick Default one with missing comma "m3213d321yyyy321321S"', () => {
        const dateTimeFormat = 'm3213d321yyyy321321S';
        const dateString = service.format(dateTime, dateTimeFormat);
        expect(dateString).toBe('9/7/2019, 2:3:4');
        expect(service.parse(dateString, dateTimeFormat)).toEqual(dateTime);
    });

    it('Should Work For Missing Seconds and Minutes "m/d/yyyy, H"', () => {
        const dateTimeFormat = 'm/d/yyyy, H';
        const dateString = service.format(dateTime, dateTimeFormat);
        expect(dateString).toBe('9/7/2019, 2');

        dateTime = new FdDatetime(dateTime.date, timeWithOnlyHours);

        expect(service.parse(dateString, dateTimeFormat)).toEqual(dateTime);
    });

    it('Should Pick Default one with missing format', () => {
        const dateTimeFormat = '';
        const dateString = service.format(dateTime, dateTimeFormat);
        expect(dateString).toBe('9/7/2019, 2:3:4');

        expect(service.parse(dateString, dateTimeFormat)).toEqual(dateTime);
    });
});
