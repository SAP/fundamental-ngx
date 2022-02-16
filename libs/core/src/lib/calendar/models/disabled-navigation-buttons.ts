import { FdCalendarView } from '..';
import { CalendarCurrent } from './calendar-current';

export type NavigationButtonDisableFunction<D> = (
    date: D,
    currentlyDisplayedDate: CalendarCurrent,
    activeView: FdCalendarView
) => boolean;
