import { Component, LOCALE_ID } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { DAYJS_DATETIME_FORMATS, DayjsDatetimeAdapter } from '@fundamental-ngx/datetime-adapter';
import { PlatformDatePickerComponent } from '@fundamental-ngx/platform/form';
import dayjs from 'dayjs';

// Dayjs locale data required for this example
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
    selector: 'fdp-platform-date-picker-i18n-example',
    templateUrl: './platform-date-picker-i18n-example.component.html',
    // Note that this can be provided in the root of your application.
    providers: [
        // Note that this is usually provided in the root of your application.
        // Due to the limit of this example we must provide it on this level.
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
    imports: [FormLabelComponent, SegmentedButtonModule, FormsModule, ButtonComponent, PlatformDatePickerComponent]
})
export class PlatformDatePickeri18nExampleComponent {
    date = dayjs();
    locale = 'fr';

    constructor(private datetimeAdapter: DatetimeAdapter<dayjs.Dayjs>) {}

    setLocale(locale: string): void {
        this.locale = locale;
        this.datetimeAdapter.setLocale(locale);
    }
}
