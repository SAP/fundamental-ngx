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

    /** Years range selection aria label. Used on the button to navigate to the years range view. */
    yearsRangeSelectionLabel = 'Select years range';

    /** Month selection aria label. Used on the button to navigate to the months view. */
    monthSelectionLabel = 'Select month';

    /** Day selection aria label. Used on the button to navigate to the day view. */
    dateSelectionLabel = 'Select date';

    /** Previous year aria label. Used on the button to switch to a previous year in the years view. */
    previousYearLabel = 'Previous year';

    /** Next year aria label. Used on the button to switch to a next year in the years view. */
    nextYearLabel = 'Next year';

    /** Previous month aria label. Used on the button to switch to a previous month in the months view. */
    previousMonthLabel = 'Previous month';

    /** Next month aria label. Used on the button to switch to a next month in the months view. */
    nextMonthLabel = 'Next month';

    /** Week number column label */
    weekColumnLabel = 'Calendar week';

    /** Selected date label. Used on the selected day/month/year cell. */
    dateSelectedLabel = 'Selected date';

    /** Is used to describe present date */
    todayLabel = 'Today';

    /** Range start label. Used for date range selection */
    rangeStartLabel = 'Range start';

    /** Range end label. Used for date range selection */
    rangeEndLabel = 'Range end';

    /** Past days aria label. Used when days in the past are accessed */
    dayInPastLabel = 'Past days';

    /** Past days aria label. Used when days in the past are accessed */
    closeCalendarLabel = 'Close calendar';

    /** Calendar day view aria role description. */
    calendarDayViewDescription = 'Calendar';

    /** Calendar month view aria role description. */
    calendarMonthViewDescription = 'Month picker';

    /** Calendar years view aria role description. */
    calendarYearsViewDescription = 'Year picker';

    /** Calendar years range view aria role description. */
    calendarYearsRangeViewDescription = 'Years range picker';
}
