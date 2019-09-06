/**
 * Provides i18n support for placeholders and meridian modifiers naming in the time component.
 */
export declare class TimeI18n {
    /**
     * Ante Meridian naming label. The value written in the input should match this or Post Meridian. Otherwise it would be
     * treated as invalid
     * */
    meridianAm: string;
    /**
     * Post Meridian naming label. The value written in the input should match this or Ante Meridian. Otherwise it would be
     * treated as invalid
     * */
    meridianPm: string;
    /**
     * Placeholder on the Ante Meridian / Post Meridian input
     * */
    meridianPlaceholder: string;
    /**
     * Placeholder for hours input
     * */
    hoursPlaceholder: string;
    /**
     * Placeholder for minutes input
     * */
    minutesPlaceholder: string;
    /**
     * Placeholder for seconds input
     * */
    secondsPlaceholder: string;
    /**
     * Defines if the meridian validation should be case sensitive.
     * */
    meridianCaseSensitive: boolean;
}
