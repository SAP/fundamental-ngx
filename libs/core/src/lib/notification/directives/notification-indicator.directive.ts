import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { applyCssClass } from '@fundamental-ngx/cdk/utils';
import { CssClassBuilder } from '@fundamental-ngx/cdk/utils';

export type IndicatorStates = 'success' | 'error' | 'warning' | 'information';

@Directive({
    selector: '[fdNotificationIndicator], [fd-notification-indicator]'
})
export class NotificationIndicatorDirective implements OnChanges, OnInit, CssClassBuilder {
    /** Type of the indicator. Can be 'success' | 'error' | 'warning' | 'information' */
    @Input()
    type: IndicatorStates;

    /** Apply user custom styles */
    @Input()
    class: string;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-notification__indicator', this.type ? 'fd-notification__indicator--' + this.type : '', this.class];
    }
}
