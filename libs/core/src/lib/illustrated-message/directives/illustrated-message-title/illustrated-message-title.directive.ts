import { Directive, HostBinding } from '@angular/core';

@Directive({
    // TODO to be discussed
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-illustrated-message-title]'
})
export class IllustratedMessageTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-illustrated-message__title')
    fdIllustratedMessageTitleClass = true;
}
