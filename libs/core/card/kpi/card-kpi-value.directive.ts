import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';

import { CLASS_NAME } from '../constants';

export type KpiStatus = 'positive' | 'negative' | 'critical' | 'informative';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-kpi-value]',
    standalone: true
})
export class CardKpiValueDirective implements OnInit, CssClassBuilder {
    /** Set type of KPI value. eg: 'positive', 'negative', 'critical', 'informative' */
    @Input()
    status: KpiStatus;

    /** @hidden */
    class: string;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            CLASS_NAME.cardAnalyticsKpiValue,
            this.status ? `${CLASS_NAME.cardAnalyticsKpiValue}--${this.status}` : ''
        ];
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }
}
