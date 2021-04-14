import { Directive, Input, OnInit, ElementRef } from '@angular/core';

import { applyCssClass, CssClassBuilder } from '../../utils/public_api';

import { CLASS_NAME } from '../constants';

export type KpiValueType = 'positive' | 'negative' | 'critical' | 'informative';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-card-kpi-value]'
})
export class CardKpiValueDirective implements OnInit, CssClassBuilder {
    /** @hidden */
    class: string;

    /** Set type of KPI value. eg: 'positive', 'negative', 'critical', 'informative' */
    @Input()
    fdType: KpiValueType;

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** @hidden */
    buildComponentCssClass(): string[] {
        return [CLASS_NAME.cardAnalyticsKpiValue, this.fdType ? `fd-numeric-content__kpi--${this.fdType}` : ''];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
