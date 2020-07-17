import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[fdListGroupHeader], [fd-list-group-header]'
})
export class ListGroupHeaderDirective {
    /** @hidden */
    @HostBinding('class.fd-list__group-header')
    fdListGroupHeaderClass = true;
}
