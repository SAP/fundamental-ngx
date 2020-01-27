import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdPopoverBodyFooter], [fd-popover-body-footer]'
})
export class PopoverBodyFooterDirective {
    /** @hidden */
    @HostBinding('class.fd-popover__body-footer')
    fdPopoverBodyFooterClass: boolean = true;

    /** Whether the footer should be in compact mode. */
    @Input()
    @HostBinding('class.fd-popover__body-footer--compact')
    compact: boolean = false;
}
