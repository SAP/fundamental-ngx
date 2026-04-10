import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { DatetimePickerComponent } from '@fundamental-ngx/core/datetime-picker';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { OptionComponent, SelectComponent } from '@fundamental-ngx/core/select';
import { DayjsDatetimeAdapter } from '@fundamental-ngx/datetime-adapter';
import dayjs, { Dayjs } from 'dayjs';

@Component({
    selector: 'fd-datetime-adapters-dayjs-formats-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './datetime-adapters-dayjs-formats-example.component.html',
    providers: [
        {
            provide: DATE_TIME_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'l',
                    timeInput: 'h:mm A',
                    dateTimeInput: 'l h:mm A'
                },
                display: {
                    dateInput: 'l',
                    timeInput: 'h:mm A',
                    dateTimeInput: 'l h:mm A',
                    dateA11yLabel: 'YYYY MMMM DD',
                    monthA11yLabel: 'MMMM',
                    yearA11yLabel: 'YYYY'
                },
                rangeDelimiter: ' - '
            }
        },
        { provide: DatetimeAdapter, useClass: DayjsDatetimeAdapter }
    ],
    imports: [DatetimePickerComponent, FormsModule, FormLabelComponent, SelectComponent, OptionComponent]
})
export class DatetimeAdaptersDayjsFormatsExampleComponent {
    date: Dayjs = dayjs();
    selectedFormat = 'YYYY-MM-DD h:mm A';

    readonly formatOptions = [
        { value: 'YYYY-MM-DD h:mm A', label: 'ISO-like (YYYY-MM-DD h:mm A)' },
        { value: 'MMMM DD, YYYY h:mm A', label: 'Full month (MMMM DD, YYYY h:mm A)' },
        { value: 'DD/MM/YYYY h:mm A', label: 'European (DD/MM/YYYY h:mm A)' },
        { value: 'YYYY-MM-DD HH:mm:ss', label: 'With seconds (YYYY-MM-DD HH:mm:ss)' },
        { value: 'ddd, MMM D, YYYY', label: 'Weekday short (ddd, MMM D, YYYY)' }
    ];

    onFormatChange(format: string): void {
        this.selectedFormat = format;
        // Re-assign date to trigger writeValue → re-format the input field,
        // since DatetimePickerComponent does not react to customDateTimeFormat changes.
        if (this.date) {
            this.date = this.date.clone();
        }
    }
}
