import { Directive, HostBinding } from '@angular/core';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-illustrated-message-title]'
})
export class IllustratedMessageTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-illustrated-message__title')
    fdIllustratedMessageTitleClass = true;
}
