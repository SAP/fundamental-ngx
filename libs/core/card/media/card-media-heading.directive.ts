import { Directive, input } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FD_CARD_MEDIA_HEADING } from '../token';

let cardMediaHeadingId = 0;

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-media-heading]',
    standalone: true,
    providers: [
        {
            provide: FD_CARD_MEDIA_HEADING,
            useExisting: CardMediaHeadingDirective
        }
    ],
    host: {
        role: 'group',
        class: 'fd-card__media-heading',
        '[attr.aria-level]': 'level()',
        '[attr.id]': 'id()'
    }
})
export class CardMediaHeadingDirective {
    /** Card title id, it has some default value if not set,  */
    id = input('fd-card-media-heading-' + cardMediaHeadingId++);

    /**
     * Heading level
     * Available values: number from 1 to 6
     */
    level = input<Nullable<number>>();
}
