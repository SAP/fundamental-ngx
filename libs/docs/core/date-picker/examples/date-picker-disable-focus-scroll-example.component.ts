import { Component } from '@angular/core';
import {
    DATE_TIME_FORMATS,
    DatetimeAdapter,
    FD_DATETIME_FORMATS,
    FdDate,
    FdDatetimeAdapter
} from '@fundamental-ngx/core/datetime';

@Component({
    selector: 'fd-date-picker-disable-focus-scroll-example',
    template: ` <p>Open date picker and scroll at the top of the page. Then click on the 'Theme' dropdown</p>
        <p>Scrolling is {{ preventScrollOnFocus ? 'disabled' : 'enabled' }}</p>
        <button fd-button label="Toggle scroll on focus" (click)="toggleScroll()"></button>
        <br />
        <fd-date-picker
            [preventScrollOnFocus]="preventScrollOnFocus"
            [allowNull]="false"
            type="single"
            [(ngModel)]="date"
        ></fd-date-picker>
        <br />
        <div>Selected Date: {{ date?.toDateString() || 'null' }}</div>`,
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
export class DatePickerDisableFocusScrollExampleComponent {
    date = FdDate.getNow();

    preventScrollOnFocus = false;

    toggleScroll(): void {
        this.preventScrollOnFocus = !this.preventScrollOnFocus;
    }
}
