import { Nullable } from '@fundamental-ngx/cdk/utils';

import { CalendarCurrent } from './models/calendar-current';

/** Type of calendar */
export type CalendarType = 'single' | 'multi' | 'range';

/** Type of date picker excluding 'multi' */
export type DatePickerType = Exclude<CalendarType, 'multi'>;

/** Enum of calendarTypes */
export enum CalendarTypeEnum {
    Single = 'single',
    Multi = 'multi',
    Range = 'range'
}

/** Enum for Date Picker Types excluding 'multi' */
export enum DatePickerTypeEnum {
    Single = CalendarTypeEnum.Single,
    Range = CalendarTypeEnum.Range
}

/** Type for the calendar view */
export type FdCalendarView = 'day' | 'month' | 'year' | 'aggregatedYear';

/** Type for the days of the week. */
export type DaysOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type NavigationButtonDisableFunction<D> = (
    date: Nullable<D>,
    currentlyDisplayedDate: CalendarCurrent,
    activeView: FdCalendarView
) => boolean;
