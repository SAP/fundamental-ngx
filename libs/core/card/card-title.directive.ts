import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';

import { CLASS_NAME } from './constants';
import { FD_CARD_TITLE } from './token';

let cardTitleId = 0;

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-title]',
    standalone: true,
    providers: [
        {
            provide: FD_CARD_TITLE,
            useExisting: CardTitleDirective
        }
    ]
})
export class CardTitleDirective implements OnInit, CssClassBuilder {
    /** Card title id, it has some default value if not set,  */
    @Input()
    @HostBinding('attr.id')
    id = 'fd-card-title-id-' + cardTitleId++;

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
        return [CLASS_NAME.cardTitle];
    }
}
