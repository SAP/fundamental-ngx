import { CalendarI18n } from '../../../../../../library/src/lib/calendar/i18n/calendar-i18n';
import { Component, Injectable } from '@angular/core';
import { CalendarI18nLabels } from '../../../../../../library/src/lib/calendar/i18n/calendar-i18n-labels';
import { FdDate } from '../../../../../../library/src/lib/calendar/models/fd-date';

// The weekdays translations have to start with Sunday
const localized_values = {
    'fr': {
        weekdays: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
        months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
        fullMonths: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
            'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    },
    'de': {
        weekdays: ['Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag', 'Montag'],
        months: [' Jän', 'Feb', 'März', 'Apr', 'Mai', 'Juni', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dez'],
        fullMonths: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
    },
    'bg': {
        weekdays: ['неделя', 'понеделник', 'вторник', 'сряда', 'четвъртък', 'петък', 'събота'],
        months: [' яну', 'фев', 'март', 'апр', 'май', 'юни', 'юли', 'авг', 'септ', 'окт', 'ное', 'дек'],
        fullMonths: ['януари', 'февруари', 'март', 'април', 'май', 'юни', 'юли', 'август', 'септември', 'октомври', 'ноември', 'декември']
    }
};

@Injectable({
    providedIn: 'root',
})
export class LanguageService {

    selectedLanguage: string = 'bg';

    setLanguage(newLanguage: string) {
        this.selectedLanguage = newLanguage;
    }

    getLanguage() { return this.selectedLanguage; }
}

@Injectable()
export class CustomCalendarI18n extends CalendarI18n {

    constructor(private languageService: LanguageService) {
        super();
    }

    getDayAriaLabel(date: Date): string {
        return date.getDate() + ' ' + localized_values[this.languageService.getLanguage()].fullMonths[date.getMonth()] + ' ' + date.getFullYear();
    }

    getAllFullMonthNames(): string[] {
        return localized_values[this.languageService.getLanguage()].fullMonths;
    }

    getAllShortMonthNames(): string[] {
        return localized_values[this.languageService.getLanguage()].months;
    }

    getAllShortWeekdays(): string[] {
        return localized_values[this.languageService.getLanguage()].weekdays;
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
    selector: 'fd-datepicker-i18n-example',
    template: `
        <label fd-form-label for="language">Select language:</label>
        <fd-button-group id="language" style="margin-bottom:20px">
            <button fd-button-grouped [size]="'xs'" (click)="setFrench()" [state]="isSelected('fr')">French</button>
            <button fd-button-grouped [size]="'xs'" (click)="setGerman()" [state]="isSelected('de')">German</button>
            <button fd-button-grouped [size]="'xs'" (click)="setBulgarian()" [state]="isSelected('bg')">Bulgarian</button>
        </fd-button-group>
        <br>
        <fd-date-picker [(ngModel)]="date" [startingDayOfWeek]="1"></fd-date-picker>
        `,

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
export class DatePickerI18nExampleComponent {

    selected: number = 3;

    constructor(private languageService: LanguageService) {
    }

    date = FdDate.getToday();

    isSelected(language: string) {
        switch (language) {
            case 'fr': {
                return this.selected === 1 ? 'selected' : '';
            }
            case 'de': {
                return this.selected === 2 ? 'selected' : '';
            }
            case 'bg': {
                return this.selected === 3 ? 'selected' : '';
            }
        }
    }

    setGerman() {
        this.selected = 2;
        this.languageService.setLanguage('de');
    }
    setFrench() {
        this.selected = 1;
        this.languageService.setLanguage('fr');
    }
    setBulgarian() {
        this.selected = 3;
        this.languageService.setLanguage('bg');
    }

}
