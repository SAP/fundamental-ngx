import { Directive, OnInit, ElementRef } from '@angular/core';
import { applyCssClass } from '@fundamental-ngx/cdk/utils';
import { CssClassBuilder } from '@fundamental-ngx/cdk/utils';

import { CLASS_NAME } from '../constants';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-kpi-scale-icon]'
})
export class CardKpiScaleIconDirective implements OnInit, CssClassBuilder {
    /** @hidden */
    class: string;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [CLASS_NAME.cardAnalyticsScaleIcon];
    }
}
