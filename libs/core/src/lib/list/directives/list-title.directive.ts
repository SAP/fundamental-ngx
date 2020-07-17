import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[fd-list-title], [fdListTitle]'
})
export class ListTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-list__title')
    fdListTitleClass = true;
}
