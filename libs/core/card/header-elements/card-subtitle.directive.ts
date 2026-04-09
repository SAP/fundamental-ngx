import { Directive, ElementRef, input, OnInit } from '@angular/core';
import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/cdk/utils';

import { CLASS_NAME } from '../constants';
import { FD_CARD_SUBTITLE } from '../token';

let cardSubtitleId = 0;

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-subtitle]',
    standalone: true,
    providers: [
        {
            provide: FD_CARD_SUBTITLE,
            useExisting: CardSubtitleDirective
        }
    ],
    host: {
        '[attr.id]': 'id()'
    }
})
export class CardSubtitleDirective implements OnInit, CssClassBuilder {
    /** Card title id, it has some default value if not set,  */
    id = input('fd-card-subtitle-id-' + cardSubtitleId++);

    /** @hidden */
    class: string;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [CLASS_NAME.cardSubtitle];
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }
}
