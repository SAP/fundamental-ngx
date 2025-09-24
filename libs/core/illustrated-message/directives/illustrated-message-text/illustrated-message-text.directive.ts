import { Directive, HostBinding, input } from '@angular/core';

let illustratedMessageTextId = 0;

@Directive({
    // TODO to be discussed
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-illustrated-message-text]',
    standalone: true,
    host: {
        '[attr.id]': 'id()'
    }
})
export class IllustratedMessageTextDirective {
    /** @hidden */
    @HostBinding('class.fd-illustrated-message__text')
    fdIllustratedMessageTextClass = true;

    /** Illustrated Message Text ID
     *  Default value is provided if not set  */
    id = input('fd-illustrated-message-text-id-' + ++illustratedMessageTextId);
}
