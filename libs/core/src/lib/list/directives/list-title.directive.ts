import {
    Directive,
    HostBinding
} from '@angular/core';

@Directive({
    selector: '[fd-list-title], [fdListTitle]'
})
export class ListTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-list__title')
    fdListTitleClass = true;
}
