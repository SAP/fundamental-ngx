import { Component, Injectable } from '@angular/core';
import { DateFormatParser, FdDate, FdRangeDate } from '@fundamental-ngx/core';

@Injectable()
export class DateFormatDashes extends DateFormatParser {

    rangeDelimiter: string = ' to ';

    public parse(value: string): FdDate {
        const values: number[] = value.split('-').map(Number);

        // If date is 0, set the date to invalid by setting month to 14
        if (values[2] === 0) {
            values[1] = 14;
        }
        return new FdDate(values[2], values[1], values[0]);
    }

    public format(date: FdDate): string {
        return date.day + '-' + (date.month < 10 ? '0' : '') + date.month + '-' + date.year;
    }
}

@Component({
    selector: 'fd-date-picker-format-example',
    template: `
        <fd-date-picker [(ngModel)]="date" placeholder="dd-mm-yyyy"></fd-date-picker>
        <br/>
        <div>Selected Date: {{date?.toDateString()}}</div>
        <br/>
        <fd-date-picker placeholder="dd-mm-yyyy to dd-mm-yyyy"
                        [type]="'range'" [(ngModel)]="selectedRange"></fd-date-picker>
        <br/>
        <div>Selected First Date: {{selectedRange?.start?.toDateString()}}</div>
        <div>Selected Last Date: {{selectedRange?.end?.toDateString()}}</div>
    `,
    providers: [
        {
            provide: DateFormatParser,
            useClass: DateFormatDashes
        }
    ]
})
export class DatePickerFormatExampleComponent {

    date = FdDate.getToday();

    selectedRange: FdRangeDate = {
        start: FdDate.getToday(),
        end: FdDate.getToday().nextDay()
    };

}
