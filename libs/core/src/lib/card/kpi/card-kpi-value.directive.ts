import { Directive, OnInit, ElementRef, Input } from '@angular/core';
import { applyCssClass } from '@fundamental-ngx/cdk/utils';
import { CssClassBuilder } from '@fundamental-ngx/cdk/utils';

import { CLASS_NAME } from '../constants';

export type KpiStatus = 'positive' | 'negative' | 'critical' | 'informative';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-kpi-value]'
})
export class CardKpiValueDirective implements OnInit, CssClassBuilder {
    /** @hidden */
    class: string;

    /** Set type of KPI value. eg: 'positive', 'negative', 'critical', 'informative' */
    @Input()
    status: KpiStatus;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            CLASS_NAME.cardAnalyticsKpiValue,
            this.status ? `${CLASS_NAME.cardAnalyticsKpiValue}--${this.status}` : ''
        ];
    }
}
