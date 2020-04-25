import { Injectable } from '@angular/core';

/**
 * Provides i18n support for placeholders and meridian modifiers naming in the time component.
 */
@Injectable({ providedIn: 'root' })
export class TimeI18n {
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

    /**
     * Placeholder on the Ante Meridian / Post Meridian input
     * */
    meridianPlaceholder: string = 'am';

    /**
     * Placeholder for hours input
     * */
    hoursPlaceholder: string = 'hh';

    /**
     * Placeholder for minutes input
     * */
    minutesPlaceholder: string = 'mm';

    /**
     * Placeholder for seconds input
     * */
    secondsPlaceholder: string = 'ss';

    /**
     * Defines if the meridian validation should be case sensitive.
     * */
    meridianCaseSensitive: boolean = false;
}
