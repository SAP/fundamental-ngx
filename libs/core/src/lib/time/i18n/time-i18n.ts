import { Injectable } from '@angular/core';

/**
 * Provides i18n support for labels and meridian naming inside the time component.
 */
@Injectable({ providedIn: 'root' })
export class TimeI18n {
    /** Aria label for the 'increase hours' button */
    increaseHoursLabel = 'Increase hours';

    /** label for the 'hours' column */
    hoursLabel = 'Hrs';

    /** Aria label for the 'decrease hours' button */
    decreaseHoursLabel = 'Decrease hours';

    /** Aria label for the 'increase minutes' button */
    increaseMinutesLabel = 'Increase minutes';

    /** label for the 'minutes' column */
    minutesLabel = 'Min';

    /** Aria label for the 'decrease minutes' button */
    decreaseMinutesLabel = 'Decrease minutes';

    /** Aria label for the 'increase seconds' button */
    increaseSecondsLabel = 'Increase seconds';

    /** label for the 'seconds' column */
    secondsLabel = 'Sec';

    /** Aria label for the 'decrease seconds' button */
    decreaseSecondsLabel = 'Decrease seconds';

    /** Aria label for the 'increase period' button */
    increasePeriodLabel = 'Increase period';

    /** label for the 'period' column */
    periodLabel = 'Period';

    /** Aria label for the 'decrease period' button */
    decreasePeriodLabel = 'Decrease period';
}
