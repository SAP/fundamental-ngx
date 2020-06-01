/**
 * This approach has been taken from core/datepicker implementation.
 * Some part of code has been modified to integrate platform capabilities.
 */
import { AfterViewInit, Component, Injectable } from '@angular/core';
import { CalendarI18n, CalendarI18nLabels, FdDate } from '@fundamental-ngx/core';

// The weekdays translations have to start with Sunday
const localized_values = {
    fr: {
        weekdays: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
        months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
        fullMonths: [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Aout',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre'
        ]
    },
    de: {
        weekdays: ['Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag', 'Montag'],
        months: [' Jän', 'Feb', 'März', 'Apr', 'Mai', 'Juni', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dez'],
        fullMonths: [
            'Januar',
            'Februar',
            'März',
            'April',
            'Mai',
            'Juni',
            'Juli',
            'August',
            'September',
            'Oktober',
            'November',
            'Dezember'
        ]
    },
    bg: {
        weekdays: ['неделя', 'понеделник', 'вторник', 'сряда', 'четвъртък', 'петък', 'събота'],
        months: [' яну', 'фев', 'март', 'апр', 'май', 'юни', 'юли', 'авг', 'септ', 'окт', 'ное', 'дек'],
        fullMonths: [
            'януари',
            'февруари',
            'март',
            'април',
            'май',
            'юни',
            'юли',
            'август',
            'септември',
            'октомври',
            'ноември',
            'декември'
        ]
    }
};

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    selectedLanguage: string = 'bg';

    setLanguage(newLanguage: string) {
        this.selectedLanguage = newLanguage;
    }

    getLanguage() {
        return this.selectedLanguage;
    }
}

@Injectable()
export class CustomCalendarI18n extends CalendarI18n {
    constructor(private languageService: LanguageService) {
        super();
    }

    getDayAriaLabel(date: Date): string {
        return (
            date.getDate() +
            ' ' +
            localized_values[this.languageService.getLanguage()].fullMonths[date.getMonth()] +
            ' ' +
            date.getFullYear()
        );
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
    selector: 'fdp-datepicker-i18n-example',
    template: `
        <label fd-form-label for="language">Select language:</label>
        <fdp-button [compact]="true" (buttonClicked)="setFrench()" [type]="isSelected('fr') ? 'emphasized' : ''"
            >French
        </fdp-button>
        |
        <fdp-button [compact]="true" (buttonClicked)="setGerman()" [type]="isSelected('de') ? 'emphasized' : ''"
            >German
        </fdp-button>
        |
        <fdp-button [compact]="true" (buttonClicked)="setBulgarian()" [type]="isSelected('bg') ? 'emphasized' : ''"
            >Bulgarian
        </fdp-button>
        <br />
        <br />
        <div style="width:20%">
            <fdp-date-picker [id]="'intz'" [name]="'intz'" [(ngModel)]="date" [startingDayOfWeek]="1"></fdp-date-picker>
        </div>
        <p i18n>selected: {{ date.toDateString() }}</p>
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
export class PlatformDatePickerI18nExampleComponent implements AfterViewInit {
    selected: number = 3;

    constructor(
        private languageService: LanguageService,
        private calendarI18n: CalendarI18n,
        private calendarI18nLabels: CalendarI18nLabels
    ) {}

    date = FdDate.getToday();

    isSelected(language: string): boolean {
        switch (language) {
            case 'fr': {
                return this.selected === 1 ? true : false;
            }
            case 'de': {
                return this.selected === 2 ? true : false;
            }
            case 'bg': {
                return this.selected === 3 ? true : false;
            }
        }
    }

    setGerman(): void {
        this.selected = 2;
        this.languageService.setLanguage('de');
        this.refresh();
    }

    setFrench(): void {
        this.selected = 1;
        this.languageService.setLanguage('fr');
        this.refresh();
    }

    setBulgarian(): void {
        this.selected = 3;
        this.languageService.setLanguage('bg');
        this.refresh();
    }

    ngAfterViewInit(): void {
        this.refresh();
    }

    private refresh(): void {
        this.calendarI18n.i18nChange.next();
        this.calendarI18nLabels.labelsChange.next();
    }
}
