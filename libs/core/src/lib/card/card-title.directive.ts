import { Directive, OnInit, ElementRef } from '@angular/core';
import { applyCssClass } from '@fundamental-ngx/core/utils';
import { CssClassBuilder } from '@fundamental-ngx/core/utils';

import { CLASS_NAME } from './constants';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-card-title]'
})
export class CardTitleDirective implements OnInit, CssClassBuilder {
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
        return [CLASS_NAME.cardTitle];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
