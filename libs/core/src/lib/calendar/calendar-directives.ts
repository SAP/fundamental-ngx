import { Attribute, ChangeDetectorRef, Directive, Inject } from '@angular/core';
import { FD_LANGUAGE, FdLanguage } from '@fundamental-ngx/i18n';
import { map, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-calendar-close-button]',
    host: {
        class: 'fd-calendar__close-button',
        '[attr.aria-label]': '_originalAriaLabel || _closeCalendarLabel',
        '[attr.title]': '_originalTitle || _closeCalendarLabel'
    },
    providers: [DestroyedService]
})
export class CalendarCloseButtonDirective {
    /** @hidden */
    protected _closeCalendarLabel: string;

    /** @hidden */
    constructor(
        @Attribute('aria-label') protected _originalAriaLabel: string,
        @Attribute('title') protected _originalTitle: string,
        @Inject(FD_LANGUAGE) lang$: Observable<FdLanguage>,
        protected _changeDetectorRef: ChangeDetectorRef,
        protected _destroyed$: DestroyedService
    ) {
        lang$
            .pipe(
                map((l) => l.coreCalendar.closeCalendarLabel as string),
                takeUntil(this._destroyed$)
            )
            .subscribe((closeCalendarLabel: string) => {
                this._closeCalendarLabel = closeCalendarLabel;
                this._changeDetectorRef.markForCheck();
            });
    }
}
