
/**
 * DateTimeFormats is intended to keep all options 
 * related to date-time formatting / parsing
 * 
 */

export interface DateTimeFormats {
    parse: {
      dateInput: any;
      timeInput: any;
      dateTimeInput: any;
    },
    display: {
      dateInput: any,
      timeInput: any,
      dateTimeInput: any;

      dateA11yLabel: any,
      monthA11yLabel: any,
      yearA11yLabel: any,
    }
  }
