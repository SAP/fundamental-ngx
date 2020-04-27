import { Injectable } from '@angular/core';

/**
 * Provides i18n support for labels inside the time component.
 */
@Injectable({ providedIn: 'root' })
export class TimeI18nLabels {
    /** Aria label for the 'increase hours' button */
    increaseHoursLabel: string = 'Increase hours';

    /** Aria label for the 'hours' input */
    hoursLabel: string = 'Hours';

    /** Aria label for the 'decrease hours' button */
    decreaseHoursLabel: string = 'Decrease hours';

    /** Aria label for the 'increase minutes' button */
    increaseMinutesLabel: string = 'Increase minutes';

    /** Aria label for the 'minutes' input */
    minutesLabel: string = 'Minutes';

    /** Aria label for the 'decrease minutes' button */
    decreaseMinutesLabel: string = 'Decrease minutes';

    /** Aria label for the 'increase seconds' button */
    increaseSecondsLabel: string = 'Increase seconds';

    /** Aria label for the 'seconds' input */
    secondsLabel: string = 'Seconds';

    /** Aria label for the 'decrease seconds' button */
    decreaseSecondsLabel: string = 'Decrease seconds';

    /** Aria label for the 'increase period' button */
    increasePeriodLabel: string = 'Increase period';

    /** Aria label for the 'period' input */
    periodLabel: string = 'Period';

    /** Aria label for the 'decrease period' button */
    decreasePeriodLabel: string = 'Decrease period';
}
