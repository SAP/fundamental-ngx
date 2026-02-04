import { Directive } from '@angular/core';

/**
 * Directive for the text/description element within an illustrated message figcaption.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-illustrated-message-text]',
    host: {
        class: 'fd-illustrated-message__text'
    }
})
export class IllustratedMessageTextDirective {}
