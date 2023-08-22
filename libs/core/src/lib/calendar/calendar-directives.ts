import { Attribute, Directive } from '@angular/core';

import { CalendarI18nLabels } from './i18n/calendar-i18n-labels';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-calendar-close-button]',
    host: {
        class: 'fd-calendar__close-button',
        '[attr.aria-label]': '_ariaLabel',
        '[attr.title]': '_title'
    },
    standalone: true
})
export class CalendarCloseButtonDirective {
    /** @hidden */
    get _ariaLabel(): string {
        return this._originalAriaLabel || this._calendarI18nLabels.closeCalendarLabel;
    }

    /** @hidden */
    get _title(): string {
        return this._originalTitle || this._calendarI18nLabels.closeCalendarLabel;
    }

    /** @hidden */
    constructor(
        @Attribute('aria-label') private _originalAriaLabel: string,
        @Attribute('title') private _originalTitle: string,
        private _calendarI18nLabels: CalendarI18nLabels
    ) {}
}
