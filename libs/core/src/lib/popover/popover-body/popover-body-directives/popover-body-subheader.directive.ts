import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdPopoverBodySubheader], [fd-popover-body-subheader]'
})
export class PopoverBodySubheaderDirective {
    /** @hidden */
    @HostBinding('class.fd-popover__body-subheader')
    fdPopoverBodySubheaderClass: boolean = true;

    /** Whether the subheader should be in compact mode. */
    @Input()
    @HostBinding('class.fd-popover__body-subheader--compact')
    compact: boolean = false;
}
