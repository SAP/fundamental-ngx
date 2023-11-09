import { Directive, ElementRef, HostBinding, Inject, Input, OnChanges, OnInit, Optional } from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { BasePopoverClass, FD_POPOVER_COMPONENT } from '@fundamental-ngx/core/popover';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-notification-group',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class NotificationGroupComponent implements OnChanges, OnInit, CssClassBuilder {
    /** User's custom classes */
    @Input()
    class: string;

    /** Whether the Notification Group is in mobile mode */
    @Input() mobile = false;

    /** User defined width for the notification */
    @HostBinding('style.width')
    @Input()
    width: string;

    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef,
        @Optional() @Inject(FD_POPOVER_COMPONENT) private _popover: BasePopoverClass
    ) {
        if (this._popover) {
            this._popover.focusTrapped = true;
            this._popover.focusAutoCapture = true;
        }
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden CssClassBuilder interface implementation
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-notification fd-notification--group fd-notification-custom-block',
            this.mobile ? 'fd-notification--mobile' : '',
            this.class
        ];
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }
}
