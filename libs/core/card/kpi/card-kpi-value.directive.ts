import { computed, Directive, ElementRef, inject, input } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';

export type KpiStatus = 'positive' | 'negative' | 'critical' | 'informative';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-kpi-value]',
    host: {
        '[class]': 'cssClass()'
    }
})
export class CardKpiValueDirective implements HasElementRef {
    /** Set type of KPI value. eg: 'positive', 'negative', 'critical', 'informative' */
    readonly status = input<KpiStatus>();

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    protected readonly cssClass = computed(() => {
        let classes = 'fd-numeric-content__kpi';
        const status = this.status();

        if (status) {
            classes += ` fd-numeric-content__kpi--${status}`;
        }

        return classes;
    });
}
