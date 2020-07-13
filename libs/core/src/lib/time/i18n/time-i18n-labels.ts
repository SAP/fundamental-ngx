import { Injectable } from '@angular/core';

/**
 * Provides i18n support for labels inside the time component.
 */
@Injectable({ providedIn: 'root' })
export class TimeI18nLabels {
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

    /**
     * Ante Meridian naming label. The value written in the input should match this or Post Meridian. Otherwise it would be
     * treated as invalid
     * */
    meridianAm: string = 'am';

    /**
     * Post Meridian naming label. The value written in the input should match this or Ante Meridian. Otherwise it would be
     * treated as invalid
     * */
    meridianPm: string = 'pm';
}
