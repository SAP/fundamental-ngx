import { Component, Injectable, LOCALE_ID } from '@angular/core';

import { CalendarI18nLabels } from '@fundamental-ngx/core/calendar';
import {
    FdDate,
    DatetimeAdapter,
    FdDatetimeAdapter,
    DATE_TIME_FORMATS,
    FD_DATETIME_FORMATS
} from '@fundamental-ngx/core/datetime';

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
    selector: 'fdp-platform-date-picker-i18n-example',
    templateUrl: './platform-date-picker-i18n-example.component.html',

    // Note that this can be provided in the root of your application.
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.

        { provide: LOCALE_ID, useValue: 'fr' },
        {
            provide: DatetimeAdapter,
            useClass: FdDatetimeAdapter
        },
        {
            provide: CalendarI18nLabels,
            useClass: CustomI18nLabels
        },
        {
            provide: DATE_TIME_FORMATS,
            useValue: FD_DATETIME_FORMATS
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
