import { Directive, HostBinding } from '@angular/core';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-illustrated-message-text]'
})
export class IllustratedMessageTextDirective {
    /** @hidden */
    @HostBinding('class.fd-illustrated-message__text')
    fdIllustratedMessageTextClass = true;
}
