import { Directive, input } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { CLASS_NAME } from '../constants';
import { FD_CARD_MEDIA_HEADING } from '../token';

let cardMediaHeadingId = 0;

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-media-heading]',
    providers: [
        {
            provide: FD_CARD_MEDIA_HEADING,
            useExisting: CardMediaHeadingDirective
        }
    ],
    host: {
        role: 'group',
        class: CLASS_NAME.cardMediaHeading,
        '[attr.aria-level]': 'level()',
        '[attr.id]': 'id()'
    }
})
export class CardMediaHeadingDirective {
    /** Card title id, it has some default value if not set,  */
    readonly id = input('fd-card-media-heading-' + cardMediaHeadingId++);

    /**
     * Heading level
     * Available values: number from 1 to 6
     */
    readonly level = input<Nullable<number>>();
}
