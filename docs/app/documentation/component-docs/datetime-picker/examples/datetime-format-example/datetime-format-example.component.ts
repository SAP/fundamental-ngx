import { Component, Injectable } from '@angular/core';
import { DateTimeFormatParser } from '../../../../../../../library/src/lib/datetime-picker/format/datetime-parser';

@Injectable()
export class DateTimeFormatExample extends DateTimeFormatParser {

    public parse(value: string): Date {
        value = value.replace(/[\/hms ]/g, '-');
        const values: number[] = value.split('-').map(Number);
        return new Date(Number(values[1] - 1), values[0], values[2], values[3], values[4], values[5]);
    }

    public format(date: Date): string {
        const getAtLeastTwoDigits = function(num: number): string { return num < 10 ? '0' + num : String(num) };
        return date.getFullYear() + '-' +
            getAtLeastTwoDigits(date.getMonth() + 1) + '-' +
            date.getDate() + ' ' +
            getAtLeastTwoDigits(date.getHours()) + 'h' +
            getAtLeastTwoDigits(date.getMinutes()) + 'm' +
            getAtLeastTwoDigits(date.getSeconds()) + 's'
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
    date = new Date();
}
