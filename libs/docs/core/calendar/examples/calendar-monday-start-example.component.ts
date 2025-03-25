import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarComponent, DaysOfWeek } from '@fundamental-ngx/core/calendar';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter,
    FdDatetimeModule
} from '@fundamental-ngx/core/datetime';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SelectModule } from '@fundamental-ngx/core/select';

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
            @for (option of startingDayOfWeekOptions; track option) {
                <li fd-option [value]="option">
                    {{ startingDayOfWeekOptionsInDays[option - 1] }}
                </li>
            }
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
    ],
    imports: [CalendarComponent, FormsModule, FormLabelComponent, SelectModule, FdDatetimeModule]
})
export class CalendarMondayStartExampleComponent {
    date: FdDate = new FdDate(2020, 10, 25);
    startingDayOfWeek: DaysOfWeek = 2;
    startingDayOfWeekOptions: DaysOfWeek[] = [1, 2, 3, 4, 5, 6, 7];
    startingDayOfWeekOptionsInDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    public onChangeStartingDayOfWeek(day: DaysOfWeek): void {
        this.startingDayOfWeek = day;
    }
}
