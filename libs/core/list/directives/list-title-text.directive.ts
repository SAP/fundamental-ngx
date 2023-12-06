import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fd-list-title-text], [fdListTitleText]',
    standalone: true
})
export class ListTitleTextDirective {
    /** @hidden */
    @HostBinding('class.fd-list__title-text')
    fdListTitleText = true;
}
