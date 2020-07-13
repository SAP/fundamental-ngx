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
}
