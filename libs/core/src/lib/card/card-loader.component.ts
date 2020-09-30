import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';

import { applyCssClass, CssClassBuilder } from '../utils/public_api';

import { CLASS_NAME } from './constants';

@Component({
    selector: 'fd-card-loader',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardLoaderComponent implements OnInit, CssClassBuilder {
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
        return [CLASS_NAME.cardLoader];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
