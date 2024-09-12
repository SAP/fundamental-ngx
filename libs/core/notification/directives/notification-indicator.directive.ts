import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';

export type IndicatorStates = 'success' | 'error' | 'warning' | 'information';
export type ColorStates = 'negative' | 'positive' | 'critical' | 'informative';

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

    /** @hidden */
    constructor(public readonly elementRef: ElementRef) {}

    /** @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['sap-icon', 'sap-icon--' + this.type, 'sap-icon--color-' + this._getColorByType(this.type), this.class];
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    private _getColorByType(type: IndicatorStates): ColorStates {
        switch (type) {
            case 'success':
                return 'positive';
            case 'error':
                return 'negative';
            case 'warning':
                return 'critical';
            case 'information':
                return 'informative';
            default:
                return 'negative';
        }
    }
}
