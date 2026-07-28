import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { DatetimePickerComponent } from '@fundamental-ngx/core/datetime-picker';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';
import { DAYJS_DATETIME_FORMATS, DayjsDatetimeAdapter } from '@fundamental-ngx/datetime-adapter';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ar';
import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import 'dayjs/locale/ja';

const LOCALE_OPTIONS = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'ar', label: 'Arabic' },
    { value: 'ja', label: 'Japanese' }
];

/**
 * A picker with its own adapter — independent from the shared one above.
 */
@Component({
    selector: 'fd-datetime-adapters-isolated-picker',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: LOCALE_ID, useValue: 'en' },
        { provide: DatetimeAdapter, useClass: DayjsDatetimeAdapter },
        { provide: DATE_TIME_FORMATS, useValue: DAYJS_DATETIME_FORMATS }
    ],
    template: `
        <fd-segmented-button [ngModel]="locale" (ngModelChange)="setLocale($event)">
            @for (o of localeOptions; track o.value) {
                <button fd-button [label]="o.label" [value]="o.value"></button>
            }
        </fd-segmented-button>
        <br />
        <fd-date-picker [(ngModel)]="date"></fd-date-picker>
    `,
    imports: [SegmentedButtonComponent, FormsModule, ButtonComponent, DatePickerComponent]
})
export class DatetimeAdaptersIsolatedPickerInternalComponent {
    date: Dayjs = dayjs();
    locale = 'en';

    readonly localeOptions = LOCALE_OPTIONS;

    private readonly _datetimeAdapter = inject<DatetimeAdapter<Dayjs>>(DatetimeAdapter);

    setLocale(locale: string): void {
        this.locale = locale;
        this._datetimeAdapter.setLocale(locale);
    }
}

/**
 * Locale example: shared adapter at top, isolated adapter at bottom.
 *
 * The top pickers inherit the route-level adapter — changing the locale updates both.
 * The bottom picker declares its own adapter and is independent.
 */
@Component({
    selector: 'fd-datetime-adapters-locale-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: DatetimeAdapter, useClass: DayjsDatetimeAdapter },
        { provide: DATE_TIME_FORMATS, useValue: DAYJS_DATETIME_FORMATS }
    ],
    imports: [
        FormLabelComponent,
        SegmentedButtonComponent,
        FormsModule,
        ButtonComponent,
        DatePickerComponent,
        DatetimePickerComponent,
        DatetimeAdaptersIsolatedPickerInternalComponent
    ],
    template: `
        <label fd-form-label><strong>These pickers share the same adapter</strong></label>
        <fd-segmented-button
            class="fd-margin-bottom--sm"
            [ngModel]="sharedLocale"
            (ngModelChange)="setSharedLocale($event)"
        >
            @for (o of localeOptions; track o.value) {
                <button fd-button [label]="o.label" [value]="o.value"></button>
            }
        </fd-segmented-button>
        <br />
        <fd-date-picker class="fd-margin-bottom--sm" [(ngModel)]="date"></fd-date-picker>
        <br />
        <fd-datetime-picker [(ngModel)]="datetime"></fd-datetime-picker>

        <br />

        <label fd-form-label><strong>This picker has its own adapter</strong></label>
        <fd-datetime-adapters-isolated-picker></fd-datetime-adapters-isolated-picker>
    `
})
export class DatetimeAdaptersLocaleExampleComponent {
    date: Dayjs = dayjs();
    datetime: Dayjs = dayjs();
    sharedLocale = 'en';

    readonly localeOptions = LOCALE_OPTIONS;

    private readonly _datetimeAdapter = inject<DatetimeAdapter<Dayjs>>(DatetimeAdapter);

    setSharedLocale(locale: string): void {
        this.sharedLocale = locale;
        this._datetimeAdapter.setLocale(locale);
    }
}
