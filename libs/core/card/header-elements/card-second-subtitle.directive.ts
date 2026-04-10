import { Directive, ElementRef, inject, input } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { FD_CARD_SECOND_SUBTITLE } from '../token';

let cardSecondSubtitleId = 0;

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-second-subtitle]',
    providers: [
        {
            provide: FD_CARD_SECOND_SUBTITLE,
            useExisting: CardSecondSubtitleDirective
        }
    ],
    host: {
        class: 'fd-card__second-subtitle',
        '[attr.id]': 'id()'
    }
})
export class CardSecondSubtitleDirective implements HasElementRef {
    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** Card second subtitle id, it has some default value if not set,  */
    readonly id = input('fd-card-second-subtitle-id-' + cardSecondSubtitleId++);
}
