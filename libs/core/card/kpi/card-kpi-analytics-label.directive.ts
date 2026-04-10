import { Directive, ElementRef, inject } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-kpi-analytics-label]',
    host: {
        class: 'fd-card__analytics-text'
    }
})
export class CardKpiAnalyticsLabelDirective implements HasElementRef {
    /** @hidden */
    readonly elementRef = inject(ElementRef);
}
