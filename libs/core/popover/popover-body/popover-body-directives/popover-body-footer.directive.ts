import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdPopoverBodyFooter], [fd-popover-body-footer]',
    standalone: true
})
export class PopoverBodyFooterDirective {
    /** @hidden */
    @HostBinding('class.fd-popover__body-footer')
    fdPopoverBodyFooterClass = true;
}
