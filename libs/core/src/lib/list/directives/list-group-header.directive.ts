import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[fdListGroupHeader], [fd-list-group-header]',
  host: {
    '[style.outline]': '"none"',
  }
})
export class ListGroupHeaderDirective {
    /** @hidden */
    @HostBinding('class.fd-list__group-header')
    fdListGroupHeaderClass = true;
}
