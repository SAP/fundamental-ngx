import { Directive, ElementRef, inject, input } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { CLASS_NAME } from '../constants';
import { FD_CARD_TITLE } from '../token';

let cardTitleId = 0;

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-title]',
    providers: [
        {
            provide: FD_CARD_TITLE,
            useExisting: CardTitleDirective
        }
    ],
    host: {
        class: CLASS_NAME.cardTitle,
        '[attr.id]': 'id()'
    }
})
export class CardTitleDirective implements HasElementRef {
    /** Card title id, it has some default value if not set,  */
    readonly id = input('fd-card-title-id-' + cardTitleId++);

    /** @hidden */
    readonly elementRef = inject(ElementRef);
}
