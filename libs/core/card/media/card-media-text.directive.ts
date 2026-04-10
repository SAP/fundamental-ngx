import { Directive } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-media-text]',
    host: {
        class: 'fd-card__media-text'
    }
})
export class CardMediaTextDirective {}
