import { Directive, ElementRef, inject } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { CLASS_NAME } from '../constants';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-kpi-analytics]',
    host: {
        class: CLASS_NAME.cardAnalytics
    }
})
export class CardKpiAnalyticsDirective implements HasElementRef {
    /** @hidden */
    readonly elementRef = inject(ElementRef);
}
