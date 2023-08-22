import { Component, LOCALE_ID, ViewChild } from '@angular/core';

// Dayjs locale data required for this example
import 'dayjs/locale/es';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/de';
import 'dayjs/locale/fr';
import 'dayjs/locale/bg';
import 'dayjs/locale/pl';
import { DatetimeAdapter, FdDate, FdDatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { DatePickerComponent as DatePickerComponent_1 } from '@fundamental-ngx/core/date-picker';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormsModule } from '@angular/forms';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-date-picker-complex-i18n-example',
    templateUrl: './date-picker-complex-i18n-example.component.html',
    styleUrls: ['./date-picker-complex-i18n-example.component.scss'],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr' },
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        }
    ],
    standalone: true,
    imports: [FormLabelModule, SegmentedButtonModule, FormsModule, ButtonModule, DatePickerComponent_1]
})
export class DatePickerComplexI18nExampleComponent {
    @ViewChild(DatePickerComponent) datePicker: DatePickerComponent<FdDate>;

    actualLocale = 'fr';

    date: FdDate = FdDate.getNow();

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    setLocale(locale: string): void {
        this.actualLocale = locale;
        this.datetimeAdapter.setLocale(locale);
    }
}
