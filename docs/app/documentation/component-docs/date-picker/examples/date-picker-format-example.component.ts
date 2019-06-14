import { Component, Injectable } from '@angular/core';
import { DateFormatParser } from '../../../../../../library/src/lib/calendar/format/date-parser';

@Injectable()
export class DateFormatDashes extends DateFormatParser {

    rangeDelimiter: string = ' to ';

    public parse(value: string): Date {
        const values: number[] = value.split('-').map(Number);

        // If date is 0, set the date to invalid by setting month to 14
        if (values[2] === 0) {
            values[1] = 14;
        }
        return new Date(Number(values[2]), values[1] - 1, values[0]);
    }

    public format(date: Date): string {
        let monthStr = (date.getMonth() + 1).toLocaleString();
        if (monthStr.length === 1) {
            monthStr = '0' + monthStr;
        }

        return date.getDate() + '-' + monthStr + '-' + date.getFullYear();
    }
}

@Component({
    selector: 'fd-date-picker-format-example',
    template: `
        <fd-date-picker [(ngModel)]="selectedDay" placeholder="yyyy/mm/dd"></fd-date-picker>
        <br/>
        <div>Selected Date: {{selectedDay?.date?.toDateString()}}</div>
        <br/>
        <fd-date-picker style="width: 300px;" placeholder="yyyy/mm/dd to yyyy/mm/dd" 
                        [type]="'range'" [(ngModel)]="selectedRange"></fd-date-picker>
        <br />
        <div>Selected First Date: {{selectedRange?.date?.toDateString()}}</div>
        <div>Selected Last Date: {{selectedRange?.rangeEnd?.toDateString()}}</div>
    `,
    providers: [
        {
            provide: DateFormatParser,
            useClass: DateFormatDashes
        }
    ]
})
export class DatePickerFormatExampleComponent {

    selectedDay = {
        date: new Date()
    };

    selectedRange = {
        date: new Date(),
        rangeEnd: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
    };

}
