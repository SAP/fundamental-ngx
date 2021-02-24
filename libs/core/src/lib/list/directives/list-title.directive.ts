import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[fd-list-title], [fdListTitle]'
})
export class ListTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-list__title')
    fdListTitleClass = true;

    /** Whether or not this should be wrapped, when too much text. */
    @Input()
    @HostBinding('class.fd-list__title--wrap')
    wrap = false;
}
