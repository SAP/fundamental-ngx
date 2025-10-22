import { Directive, HostBinding, input } from '@angular/core';

let illustratedMessageTitleId = 0;

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-illustrated-message-title]',
    standalone: true,
    host: {
        '[attr.id]': 'id()'
    }
})
export class IllustratedMessageTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-illustrated-message__title')
    fdIllustratedMessageTitleClass = true;

    /** Illustrated Message Title ID
     *  Default value is provided if not set  */
    id = input('fd-illustrated-message-title-id-' + ++illustratedMessageTitleId);
}
