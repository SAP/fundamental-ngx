import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    ViewEncapsulation,
    OnChanges,
    OnInit,
    Optional
} from '@angular/core';
import { applyCssClass } from '@fundamental-ngx/core/utils';
import { CssClassBuilder } from '@fundamental-ngx/core/utils';
import { PopoverComponent } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-notification-group',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
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

    /** @hidden */
    constructor(private _elementRef: ElementRef, @Optional() private _popover: PopoverComponent) {
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
    elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }
}
