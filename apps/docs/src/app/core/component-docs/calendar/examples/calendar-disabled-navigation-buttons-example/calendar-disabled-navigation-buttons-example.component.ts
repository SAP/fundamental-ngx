import { Component } from '@angular/core';
import { FdDate } from 'libs/core/src/lib/datetime';
import { FdCalendarView } from 'libs/core/src/lib/calendar';
import { CalendarCurrent } from 'libs/core/src/lib/calendar/models/calendar-current';

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
     * will disable choosing dates before 2022 also if we are in year view or if we selected January
     */
    previousButtonDisableFunction(
        date: FdDate,
        currentlyDisplayedDate: CalendarCurrent,
        activeView: FdCalendarView
    ): boolean {
        if (date.month === 1) {
            return true;
        }
        if (activeView === 'year') {
            return true;
        }
        return currentlyDisplayedDate?.year < 2022;
    }

    /**
     * Function used to disable next button in the calendar header.
     * @param date selected date
     * @param currentlyDisplayedDate currently displayed date
     * @param activeView current view of calendar
     *  will disable choosing dates after 2023, also if we are in year view or if we selected January
     */
    nextButtonDisableFunction(
        date: FdDate,
        currentlyDisplayedDate: CalendarCurrent,
        activeView: FdCalendarView
    ): boolean {
        if (date.month === 1) {
            return true;
        }
        if (activeView === 'year') {
            return true;
        }
        return currentlyDisplayedDate?.year > 2023;
    }
}
