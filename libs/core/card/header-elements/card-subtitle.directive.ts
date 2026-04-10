import { Directive, ElementRef, inject, input } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { FD_CARD_SUBTITLE } from '../token';

let cardSubtitleId = 0;

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-subtitle]',
    providers: [
        {
            provide: FD_CARD_SUBTITLE,
            useExisting: CardSubtitleDirective
        }
    ],
    host: {
        class: 'fd-card__subtitle',
        '[attr.id]': 'id()'
    }
})
export class CardSubtitleDirective implements HasElementRef {
    /** Card subtitle id, it has some default value if not set,  */
    readonly id = input('fd-card-subtitle-id-' + cardSubtitleId++);

    /** @hidden */
    readonly elementRef = inject(ElementRef);
}
