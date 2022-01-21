import { Component } from '@angular/core';

@Component({
    selector: 'fd-calendar-disabled-navigation-buttons-example',
    templateUrl: 'calendar-disabled-navigation-buttons-example.html'
})
export class CalendarDisabledNavigationButtonsExampleComponent {
    /**
     * Function used to disable previous button in the calendar header.
     */
    previousButtonDisableFunction(): boolean {
        return true;
    }

    /**
     * Function used to disable next button in the calendar header.
     */

    nextButtonDisableFunction(): boolean {
        return true;
    }
}
