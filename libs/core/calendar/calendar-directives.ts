import { Attribute, Directive } from '@angular/core';
import { resolveTranslationSignal } from '@fundamental-ngx/i18n';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-calendar-close-button]',
    host: {
        class: 'fd-calendar__close-button',
        '[attr.aria-label]': '_originalAriaLabel || _closeCalendarLabel()',
        '[attr.title]': '_originalTitle || _closeCalendarLabel()'
    },
    standalone: true
})
export class CalendarCloseButtonDirective {
    /** @ignore */
    protected _closeCalendarLabel = resolveTranslationSignal('coreCalendar.closeCalendarLabel');

    /** @ignore */
    constructor(
        @Attribute('aria-label') protected _originalAriaLabel: string,
        @Attribute('title') protected _originalTitle: string
    ) {}
}
