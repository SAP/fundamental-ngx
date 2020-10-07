import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';

import { applyCssClass, CssClassBuilder } from '../../utils/public_api';

import { CLASS_NAME } from '../constants';

@Component({
    selector: 'fd-card-kpi-header',
    templateUrl: './card-kpi-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardKpiHeaderComponent implements OnInit, CssClassBuilder {
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
        return [CLASS_NAME.cardAnalyticalArea];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
