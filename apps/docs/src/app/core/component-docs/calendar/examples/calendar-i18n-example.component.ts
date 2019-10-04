import { Component, Injectable } from '@angular/core';
import { CalendarI18n, CalendarI18nLabels, FdDate } from '@fundamental-ngx/core';

const localized_values = {
    'fr': {
        weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
        fullMonths: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
            'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    }
};

@Injectable()
export class CustomCalendarI18n extends CalendarI18n {

    // You could also define a custom service and inject it here
    language: string = 'fr';

    getDayAriaLabel(date: Date): string {
        return date.getDate() + ' ' + localized_values[this.language].fullMonths[date.getMonth()] + ' ' + date.getFullYear();
    }
    getAllFullMonthNames(): string[] {
        return localized_values[this.language].fullMonths;
    }

    getAllShortMonthNames(): string[] {
        return localized_values[this.language].months;
    }

    getAllShortWeekdays(): string[] {
        return localized_values[this.language].weekdays;
    }
}

// Aria labels i18n
@Injectable()
export class CustomI18nLabels extends CalendarI18nLabels {

    yearSelectionLabel: string = 'Sélection de l\'année';

    previousYearLabel: string = 'Année précédente';

    nextYearLabel: string = 'Année suivante';

    monthSelectionLabel: string = 'Sélection du mois';

    previousMonthLabel: string = 'Mois précédent';

    nextMonthLabel: string = 'Mois suivant';
}

@Component({
    selector: 'fd-calendar-i18n-example',
    template: `
        <fd-calendar [(ngModel)]="date"></fd-calendar>`,

    // Note that this can be provided in the root of your application.
    providers: [
        {
            provide: CalendarI18n,
            useClass: CustomCalendarI18n
        },
        {
            provide: CalendarI18nLabels,
            useClass: CustomI18nLabels
        }
    ]
})
export class CalendarI18nExampleComponent {
        date = FdDate.getToday();
}
