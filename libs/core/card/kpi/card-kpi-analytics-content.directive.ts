import { Directive, ElementRef, inject } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-kpi-analytics-content]',
    host: {
        class: 'fd-card__analytics-content'
    }
})
export class CardKpiAnalyticsContentDirective implements HasElementRef {
    /** @hidden */
    readonly elementRef = inject(ElementRef);
}
