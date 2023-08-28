import { Component, LOCALE_ID, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DatePickerComponent, DatePickerComponent as DatePickerComponent_1 } from '@fundamental-ngx/core/date-picker';
import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import moment, { Moment } from 'moment';

import 'moment/locale/ar';
import 'moment/locale/bg';
import 'moment/locale/de';
import 'moment/locale/en-gb';
import 'moment/locale/fr';

@Component({
    selector: 'fd-date-picker-moment-adapter-example',
    templateUrl: './date-picker-moment-adapter-example.component.html',
    providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
    standalone: true,
    imports: [FormLabelModule, SegmentedButtonModule, FormsModule, ButtonModule, DatePickerComponent_1]
})
export class DatePickerMomentAdapterExampleComponent {
    @ViewChild(DatePickerComponent) datePicker: DatePickerComponent<Moment>;

    actualLocale: string;
    date: Moment = moment();

    constructor(private datetimeAdapter: DatetimeAdapter<Moment>) {
        this.setLocale('fr');
    }

    setLocale(locale: string): void {
        this.actualLocale = locale;
        this.datetimeAdapter.setLocale(locale);
    }
}
