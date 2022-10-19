import { OnInit, ElementRef, Directive } from '@angular/core';
import { applyCssClass } from '@fundamental-ngx/core/utils';
import { CssClassBuilder } from '@fundamental-ngx/core/utils';

import { CLASS_NAME } from './constants';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-subtitle]'
})
export class CardSubtitleDirective implements OnInit, CssClassBuilder {
    /** @hidden */
    class: string;

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [CLASS_NAME.cardSubtitle];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
