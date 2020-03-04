import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdPopoverBodyFooter], [fd-popover-body-footer]'
})
export class PopoverBodyFooterDirective {
    /** @hidden */
    @HostBinding('class.fd-popover__body-footer')
    fdPopoverBodyFooterClass: boolean = true;
}
