import { Component, Injectable } from '@angular/core';
import { DateTimeFormatParser } from '../../../../../../../library/src/lib/datetime-picker/format/datetime-parser';
import { FdDatetime } from '../../../../../../../library/src/lib/datetime-picker/models/fd-datetime';
import { FdDate } from '../../../../../../../library/src/lib/calendar/models/fd-date';

@Injectable()
export class DateTimeFormatExample extends DateTimeFormatParser {

    public parse(value: string): FdDatetime {
        value = value.replace(/[\/hms ]/g, '-');
        const values: number[] = value.split('-').map(Number);
        return new FdDatetime(new FdDate(values[0], values[1], values[2]), {hour: values[3], minute: values[4], second: values[5]} );
    }

    public format(date: FdDatetime): string {
        const getAtLeastTwoDigits = function(num: number): string { return num < 10 ? '0' + num : String(num) };
        return date.year + '-' +
            getAtLeastTwoDigits(date.month) + '-' +
            getAtLeastTwoDigits(date.day) + ' ' +
            getAtLeastTwoDigits(date.hour) + 'h' +
            getAtLeastTwoDigits(date.minute) + 'm' +
            getAtLeastTwoDigits(date.second) + 's'
    }
}


@Component({
    selector: 'fd-datetime-format-example',
    templateUrl: './datetime-format-example.component.html',
    providers: [
        {
            provide: DateTimeFormatParser,
            useClass: DateTimeFormatExample
        }
    ]
})
export class DatetimeFormatExampleComponent {
    date = FdDatetime.getToday();
}
