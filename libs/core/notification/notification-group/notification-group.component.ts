import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Optional,
    ViewEncapsulation
} from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { BasePopoverClass, FD_POPOVER_COMPONENT } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-notification-group',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
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

    /** @ignore */
    constructor(
        public readonly elementRef: ElementRef,
        @Optional() @Inject(FD_POPOVER_COMPONENT) private _popover: BasePopoverClass
    ) {
        if (this._popover) {
            this._popover.focusTrapped = true;
            this._popover.focusAutoCapture = true;
        }
    }

    /** @ignore */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @ignore CssClassBuilder interface implementation
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

    /** @ignore */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }
}
