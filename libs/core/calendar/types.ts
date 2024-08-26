import { Nullable } from '@fundamental-ngx/cdk/utils';
import { CalendarCurrent } from './models/calendar-current';

/** Type of calendar */
export type CalendarType = 'single' | 'range';

/** Enum of calendarTypes */
export enum CalendarTypeEnum {
    Single = 'single',
    Range = 'range'
}

/** Type for the calendar view */
export type FdCalendarView = 'day' | 'month' | 'year' | 'aggregatedYear';

/** Type for the calendar view */
export enum FdCalendarViewEnum {
    Day = 'day',
    Month = 'month',
    Year = 'year',
    AggregatedYear = 'aggregatedYear'
}

/** Type for the days of the week. */
export type DaysOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type NavigationButtonDisableFunction<D> = (
    date: Nullable<D>,
    currentlyDisplayedDate: CalendarCurrent,
    activeView: FdCalendarView
) => boolean;
