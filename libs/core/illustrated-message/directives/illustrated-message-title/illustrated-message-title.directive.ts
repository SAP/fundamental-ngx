import { Directive } from '@angular/core';

/**
 * Directive for the title element within an illustrated message figcaption.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-illustrated-message-title]',
    host: {
        class: 'fd-illustrated-message__title'
    }
})
export class IllustratedMessageTitleDirective {}
