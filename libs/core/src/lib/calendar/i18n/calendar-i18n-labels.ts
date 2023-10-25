import { FD_LANGUAGE_ENGLISH } from '@fundamental-ngx/i18n';
import { Subject } from 'rxjs';

/**
 * Provides i18n support for labels inside the calendar component.
 * @deprecated use i18n `coreCalendar` key instead
 */
export class CalendarI18nLabels {
    /** This is event that should be called, when labels are changed, to let component detect an changes. */
    readonly labelsChange: Subject<void> = new Subject();

    /** Year selection aria label. Used on the button to navigate to the years view. */
    yearSelectionLabel = FD_LANGUAGE_ENGLISH.coreCalendar.yearSelectionLabel;

    /** Years range selection aria label. Used on the button to navigate to the years range view. */
    yearsRangeSelectionLabel = FD_LANGUAGE_ENGLISH.coreCalendar.yearsRangeSelectionLabel;

    /** Month selection aria label. Used on the button to navigate to the months view. */
    monthSelectionLabel = FD_LANGUAGE_ENGLISH.coreCalendar.monthSelectionLabel;

    /** Day selection aria label. Used on the button to navigate to the day view. */
    dateSelectionLabel = FD_LANGUAGE_ENGLISH.coreCalendar.dateSelectionLabel;

    /** Previous year aria label. Used on the button to switch to a previous year in the years view. */
    previousYearLabel = FD_LANGUAGE_ENGLISH.coreCalendar.previousYearLabel;

    /** Next year aria label. Used on the button to switch to a next year in the years view. */
    nextYearLabel = FD_LANGUAGE_ENGLISH.coreCalendar.nextYearLabel;

    /** Previous month aria label. Used on the button to switch to a previous month in the months view. */
    previousMonthLabel = FD_LANGUAGE_ENGLISH.coreCalendar.previousMonthLabel;

    /** Next month aria label. Used on the button to switch to a next month in the months view. */
    nextMonthLabel = FD_LANGUAGE_ENGLISH.coreCalendar.nextMonthLabel;

    /** Week number column label */
    weekColumnLabel = FD_LANGUAGE_ENGLISH.coreCalendar.weekColumnLabel;

    /** Selected date label. Used on the selected day/month/year cell. */
    dateSelectedLabel = FD_LANGUAGE_ENGLISH.coreCalendar.dateSelectedLabel;

    /** Is used to describe present date */
    todayLabel = FD_LANGUAGE_ENGLISH.coreCalendar.todayLabel;

    /** Range start label. Used for date range selection */
    rangeStartLabel = FD_LANGUAGE_ENGLISH.coreCalendar.rangeStartLabel;

    /** Range end label. Used for date range selection */
    rangeEndLabel = FD_LANGUAGE_ENGLISH.coreCalendar.rangeEndLabel;

    /** Past days aria label. Used when days in the past are accessed */
    dayInPastLabel = FD_LANGUAGE_ENGLISH.coreCalendar.dayInPastLabel;

    /** Past days aria label. Used when days in the past are accessed */
    closeCalendarLabel = FD_LANGUAGE_ENGLISH.coreCalendar.closeCalendarLabel;

    /** Calendar day view aria role description. */
    calendarDayViewDescription = FD_LANGUAGE_ENGLISH.coreCalendar.calendarDayViewDescription;

    /** Calendar month view aria role description. */
    calendarMonthViewDescription = FD_LANGUAGE_ENGLISH.coreCalendar.calendarMonthViewDescription;

    /** Calendar years view aria role description. */
    calendarYearsViewDescription = FD_LANGUAGE_ENGLISH.coreCalendar.calendarYearsViewDescription;

    /** Calendar years range view aria role description. */
    calendarYearsRangeViewDescription = FD_LANGUAGE_ENGLISH.coreCalendar.calendarYearsRangeViewDescription;
}
