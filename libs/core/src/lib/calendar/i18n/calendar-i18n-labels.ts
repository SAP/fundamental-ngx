import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Provides i18n support for labels inside the calendar component.
 */
@Injectable({ providedIn: 'root' })
export class CalendarI18nLabels {
    /** This is event that should be called, when labels are changed, to let component detect an changes. */
    readonly labelsChange: Subject<void> = new Subject<void>();

    /** Year selection aria label. Used on the button to navigate to the years view. */
    yearSelectionLabel = 'Select year';

    /** Previous year aria label. Used on the button to switch to a previous year in the years view. */
    previousYearLabel = 'Previous year';

    /** Next year aria label. Used on the button to switch to a next year in the years view. */
    nextYearLabel = 'Next year';

    /** Month selection aria label. Used on the button to navigate to the months view. */
    monthSelectionLabel = 'Select month';

    /** Previous month aria label. Used on the button to switch to a previous month in the months view. */
    previousMonthLabel = 'Previous month';

    /** Next month aria label. Used on the button to switch to a next month in the months view. */
    nextMonthLabel = 'Next month';

    /** Next month aria label. Used on the button to switch to a next month in the months view. */
    dateSelectionLabel = 'Select date';
}
