import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Provides i18n support for labels inside the calendar component.
 */
@Injectable({providedIn: 'root'})
export class CalendarI18nLabels {

    /** This is event that should be called, when labels are changed, to let component detect an changes. */
    readonly labelsChange: Subject<void> = new Subject<void>();

    /** Year selection aria label. Used on the button to navigate to the years view. */
    yearSelectionLabel: string = 'Year selection';

    /** Previous year aria label. Used on the button to switch to a previous year in the years view. */
    previousYearLabel: string = 'Previous year';

    /** Next year aria label. Used on the button to switch to a next year in the years view. */
    nextYearLabel: string = 'Next year';

    /** Month selection aria label. Used on the button to navigate to the months view. */
    monthSelectionLabel: string = 'Month selection';

    /** Previous month aria label. Used on the button to switch to a previous month in the months view. */
    previousMonthLabel: string = 'Previous month';

    /** Next month aria label. Used on the button to switch to a next month in the months view. */
    nextMonthLabel: string = 'Next month';

}
