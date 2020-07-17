import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[fd-list-secondary] ,[fdListSecondary]'
})
export class ListSecondaryDirective {
    /** @hidden */
    @HostBinding('class.fd-list__secondary')
    fdListSecondaryClass = true;
}
