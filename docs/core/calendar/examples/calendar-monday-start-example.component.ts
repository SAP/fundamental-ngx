import { Component } from '@angular/core';
import { DaysOfWeek } from '@fundamental-ngx/core/calendar';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-calendar-monday-start-example',
    template: `
        <fd-calendar calType="single" [(ngModel)]="date" [startingDayOfWeek]="startingDayOfWeek"></fd-calendar>
        <br />
        <label fd-form-label for="startingDayOfWeekPicker">Select the starting day of the week</label>
        <fd-select
            id="startingDayOfWeekPicker"
            (valueChange)="onChangeStartingDayOfWeek($event)"
            [value]="startingDayOfWeek"
        >
            <li fd-option *ngFor="let option of startingDayOfWeekOptions" [value]="option">
                {{ startingDayOfWeekOptionsInDays[option - 1] }}
            </li>
        </fd-select>
    `,
    providers: [
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
        }
    ]
})
export class CalendarMondayStartExampleComponent {
    date: FdDate = new FdDate(2020, 10, 25);
    startingDayOfWeek: DaysOfWeek = 2;
    startingDayOfWeekOptions: DaysOfWeek[] = [1, 2, 3, 4, 5, 6, 7];
    startingDayOfWeekOptionsInDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    public onChangeStartingDayOfWeek(day: DaysOfWeek) {
        this.startingDayOfWeek = day;
    }
}
