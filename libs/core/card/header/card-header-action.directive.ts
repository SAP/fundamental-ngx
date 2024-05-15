import { Directive } from '@angular/core';
import { FD_CARD_HEADER_ACTION } from '../token';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-header-action]',
    standalone: true,
    providers: [
        {
            provide: FD_CARD_HEADER_ACTION,
            useExisting: CardHeaderActionDirective
        }
    ]
})
export class CardHeaderActionDirective {}
