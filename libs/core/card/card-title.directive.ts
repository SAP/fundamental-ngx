import { Directive, ElementRef, OnInit } from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';

import { CLASS_NAME } from './constants';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-title]',
    standalone: true
})
export class CardTitleDirective implements OnInit, CssClassBuilder {
    /** @ignore */
    class: string;

    /** @ignore */
    constructor(public readonly elementRef: ElementRef<HTMLElement>) {}

    /** @ignore */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @ignore */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [CLASS_NAME.cardTitle];
    }
}
