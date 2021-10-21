import { Component, Injectable, LOCALE_ID } from '@angular/core';
import {
    FdDate,
    DatetimeAdapter,
    FdDatetimeAdapter,
    DATE_TIME_FORMATS,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';
import { CalendarI18nLabels } from '@fundamental-ngx/core/calendar';

// Translated aria labels.
// Please note these labels should be translated for each locale separately
@Injectable()
export class CustomI18nLabels extends CalendarI18nLabels {
    yearSelectionLabel = `Sélection de l'année`;

    previousYearLabel = 'Année précédente';

    nextYearLabel = 'Année suivante';

    monthSelectionLabel = 'Sélection du mois';

    previousMonthLabel = 'Mois précédent';

    nextMonthLabel = 'Mois suivant';
}

@Component({
    selector: 'fd-datepicker-i18n-example',
    template: `
        <label fd-form-label for="language">Select language:</label>
        <fd-segmented-button id="language" style="margin-bottom:20px">
            <button fd-button label="French" (click)="setLocale('fr')" [class.is-selected]="'fr' == locale"></button>
            <button fd-button label="German" (click)="setLocale('de')" [class.is-selected]="'de' == locale"></button>
            <button fd-button label="Bulgarian" (click)="setLocale('bg')" [class.is-selected]="'bg' == locale"></button>
        </fd-segmented-button>
        <br />
        <fd-date-picker [(ngModel)]="date" [startingDayOfWeek]="1"></fd-date-picker>
    `,

    // Note that this can be provided in the root of your application.
    providers: [
        { provide: LOCALE_ID, useValue: 'fr' },
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
        },
        {
            provide: CalendarI18nLabels,
            useClass: CustomI18nLabels
        }
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
