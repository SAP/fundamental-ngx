import { OnInit, ElementRef, Directive } from '@angular/core';

import { applyCssClass, CssClassBuilder } from '../../utils/public_api';

import { CLASS_NAME } from '../constants';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-card-kpi-analytics-content]'
})
export class CardKpiAnalyticsContentDirective implements OnInit, CssClassBuilder {
    /** @hidden */
    class: string;

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** @hidden */
    buildComponentCssClass(): string[] {
        return [CLASS_NAME.cardAnalyticsContent];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
