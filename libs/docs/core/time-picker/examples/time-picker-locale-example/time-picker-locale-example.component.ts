import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatetimeAdapter, FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { FormItemComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { SelectModule } from '@fundamental-ngx/core/select';
import { TimePickerModule } from '@fundamental-ngx/core/time-picker';

@Component({
    selector: 'fd-time-picker-locale-example',
    templateUrl: './time-picker-locale-example.component.html',
    styles: [
        `
            .fd-form-item {
                margin-bottom: 1rem;
            }
        `
    ],
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
        provideDateTimeFormats()
    ],
    imports: [FormItemComponent, FormLabelComponent, SelectModule, TimePickerModule, FormsModule, DatePipe]
})
export class TimePickerLocaleExampleComponent implements OnInit {
    time = new FdDate().setTime(15, 30, 0);
    locales = ['en-US', 'fr', 'bg', 'zh-CH', 'bn', 'ar-EG'];
    locale = 'en-US';

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    ngOnInit(): void {
        this.setLocale(this.locale);
    }

    setLocale(locale: string): void {
        this.datetimeAdapter.setLocale(locale);
    }
}
