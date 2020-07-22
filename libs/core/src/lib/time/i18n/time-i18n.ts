import { Injectable } from '@angular/core';

/**
 * Provides i18n support for labels and meridian naming inside the time component.
 */
@Injectable({ providedIn: 'root' })
export class TimeI18n {
    /** Aria label for the 'increase hours' button */
    increaseHoursLabel: string = 'Increase hours';

    /** label for the 'hours' column */
    hoursLabel: string = 'Hours';

    /** Aria label for the 'decrease hours' button */
    decreaseHoursLabel: string = 'Decrease hours';

    /** Aria label for the 'increase minutes' button */
    increaseMinutesLabel: string = 'Increase minutes';

    /** label for the 'minutes' column */
    minutesLabel: string = 'Minutes';

    /** Aria label for the 'decrease minutes' button */
    decreaseMinutesLabel: string = 'Decrease minutes';

    /** Aria label for the 'increase seconds' button */
    increaseSecondsLabel: string = 'Increase seconds';

    /** label for the 'seconds' column */
    secondsLabel: string = 'Seconds';

    /** Aria label for the 'decrease seconds' button */
    decreaseSecondsLabel: string = 'Decrease seconds';

    /** Aria label for the 'increase period' button */
    increasePeriodLabel: string = 'Increase period';

    /** label for the 'period' column */
    periodLabel: string = 'Period';

    /** Aria label for the 'decrease period' button */
    decreasePeriodLabel: string = 'Decrease period';

    /** Ante Meridian value, which will be displayed on period column */
    meridianAm: string = 'am';

    /** Post Meridian value, which will be displayed on period column */
    meridianPm: string = 'pm';
}
