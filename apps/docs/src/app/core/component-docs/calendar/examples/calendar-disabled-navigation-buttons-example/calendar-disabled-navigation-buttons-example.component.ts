import { Component } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';
import { FdCalendarView, CalendarCurrent, NavigationButtonDisableFunction } from '@fundamental-ngx/core/calendar';

@Component({
    selector: 'fd-calendar-disabled-navigation-buttons-example',
    templateUrl: 'calendar-disabled-navigation-buttons-example.html'
})
export class CalendarDisabledNavigationButtonsExampleComponent {
    /**
     * Function used to disable previous button in the calendar header.
     * @param date selected date
     * @param currentlyDisplayedDate currently displayed date
     * @param activeView current view of calendar
     * will disable choosing dates before current year also if we are in year view or if we selected January
     */
    previousButtonDisableFunction: NavigationButtonDisableFunction<FdDate> = (
        date: FdDate | null | undefined,
        currentlyDisplayedDate: CalendarCurrent,
        activeView: FdCalendarView
    ): boolean => {
        if (date?.month === 1) {
            return true;
        }
        if (activeView === 'year') {
            return true;
        }
        return currentlyDisplayedDate?.year < new Date().getFullYear();
    };

    /**
     * Function used to disable next button in the calendar header.
     * @param date selected date
     * @param currentlyDisplayedDate currently displayed date
     * @param activeView current view of calendar
     *  will disable choosing dates after next year, also if we are in year view or if we selected January
     */
    nextButtonDisableFunction: NavigationButtonDisableFunction<FdDate> = (
        date: FdDate | null | undefined,
        currentlyDisplayedDate: CalendarCurrent,
        activeView: FdCalendarView
    ): boolean => {
        if (date?.month === 1) {
            return true;
        }
        if (activeView === 'year') {
            return true;
        }
        return currentlyDisplayedDate?.year > new Date().getFullYear() + 1;
    };
}
