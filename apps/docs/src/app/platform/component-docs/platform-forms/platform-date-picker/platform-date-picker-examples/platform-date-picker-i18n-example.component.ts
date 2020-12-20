import { Component, Injectable, LOCALE_ID } from '@angular/core';
import { CalendarI18nLabels, FdDate, DatetimeAdapter, FdDatetimeAdapter } from '@fundamental-ngx/core';

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
    selector: 'fdp-date-picker-i18n-example',
    templateUrl: './platform-date-picker-i18n-example.component.html',

    // Note that this can be provided in the root of your application.
    providers: [
        { provide: LOCALE_ID, useValue: 'fr' },
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: CalendarI18nLabels,
            useClass: CustomI18nLabels
        }
    ]
})
export class PlatformDatePickeri18nExampleComponent {
    date = FdDate.getNow();
    locale = 'fr';

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {}

    setLocale(locale: string): void {
        this.locale = locale;
        this.datetimeAdapter.setLocale(locale);
    }
}
