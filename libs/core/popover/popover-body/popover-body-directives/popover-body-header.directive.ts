import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdPopoverBodyHeader], [fd-popover-body-header]',
    standalone: true
})
export class PopoverBodyHeaderDirective {
    /** @hidden */
    @HostBinding('class.fd-popover__body-header')
    fdPopoverBodyHeaderClass = true;
}
