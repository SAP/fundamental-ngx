import { Directive, ElementRef, input, OnInit } from '@angular/core';
import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/cdk/utils';

import { CLASS_NAME } from '../constants';
import { FD_CARD_TITLE } from '../token';

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
    ],
    host: {
        '[attr.id]': 'id()'
    }
})
export class CardTitleDirective implements OnInit, CssClassBuilder {
    /** Card title id, it has some default value if not set,  */
    id = input('fd-card-title-id-' + cardTitleId++);

    /** @hidden */
    class: string;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [CLASS_NAME.cardTitle];
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }
}
