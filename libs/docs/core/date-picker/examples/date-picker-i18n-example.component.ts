import { Component, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { DATE_TIME_FORMATS, DatetimeAdapter, FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { DAYJS_DATETIME_FORMATS, DayjsDatetimeAdapter } from '@fundamental-ngx/datetime-adapter';
import { patchLanguage } from '@fundamental-ngx/i18n';
import 'dayjs/locale/bg';
import 'dayjs/locale/de';
import 'dayjs/locale/fr';

// using custom date format to better demonstrate i18n capabilities
const CUSTOM_DATETIME_FORMATS = {
    ...DAYJS_DATETIME_FORMATS,
    parse: {
        ...DAYJS_DATETIME_FORMATS.parse,
        dateInput: 'YYYY MMMM DD'
    },
    display: {
        ...DAYJS_DATETIME_FORMATS.parse,
        dateInput: 'YYYY MMMM DD'
    }
};

@Component({
    selector: 'fd-datepicker-i18n-example',
    template: `
        <label fd-form-label for="language">Select language:</label>
        <fd-segmented-button id="language" [style.margin-bottom.px]="20">
            <button fd-button label="French" (click)="setLocale('fr')" [class.is-selected]="'fr' === locale"></button>
            <button fd-button label="German" (click)="setLocale('de')" [class.is-selected]="'de' === locale"></button>
            <button
                fd-button
                label="Bulgarian"
                (click)="setLocale('bg')"
                [class.is-selected]="'bg' === locale"
            ></button>
        </fd-segmented-button>
        <br />
        <fd-date-picker [(ngModel)]="date" [startingDayOfWeek]="1"></fd-date-picker>
        <p>Selected: {{ date }}</p>
    `,
    // Note that this can be provided in the root of your application.
    providers: [
        { provide: LOCALE_ID, useValue: 'fr' },
        {
            provide: DatetimeAdapter,
            useClass: DayjsDatetimeAdapter,
            deps: [LOCALE_ID]
        },
        patchLanguage({
            coreCalendar: {
                yearSelectionLabel: `Sélection de l'année`,
                previousYearLabel: 'Année précédente',
                nextYearLabel: 'Année suivante',
                monthSelectionLabel: 'Sélection du mois',
                previousMonthLabel: 'Mois précédent',
                nextMonthLabel: 'Mois suivant'
            }
        }),
        {
            provide: DATE_TIME_FORMATS,
            useValue: CUSTOM_DATETIME_FORMATS
        }
    ],
    imports: [
        FormLabelComponent,
        SegmentedButtonModule,
        ButtonComponent,
        DatePickerComponent,
        FormsModule,
        FdDatetimeModule
    ]
})
export class DatePickerI18nExampleComponent {
    date = FdDate.getNow();
    locale = 'fr';

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    setLocale(locale: string): void {
        this.locale = locale;
        this.datetimeAdapter.setLocale(locale);
    }
}
