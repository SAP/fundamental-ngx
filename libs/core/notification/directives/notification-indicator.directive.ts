import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';

export type IndicatorStates = 'success' | 'error' | 'warning' | 'information';

@Directive({
    selector: '[fdNotificationIndicator], [fd-notification-indicator]',
    standalone: true
})
export class NotificationIndicatorDirective implements OnChanges, OnInit, CssClassBuilder {
    /** Type of the indicator. Can be 'success' | 'error' | 'warning' | 'information' */
    @Input()
    type: IndicatorStates;

    /** Apply user custom styles */
    @Input()
    class: string;

    /** @ignore */
    constructor(public readonly elementRef: ElementRef) {}

    /** @ignore */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @ignore
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-notification__indicator', this.type ? 'fd-notification__indicator--' + this.type : '', this.class];
    }
}
