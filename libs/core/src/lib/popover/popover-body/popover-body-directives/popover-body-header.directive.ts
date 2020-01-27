import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdPopoverBodyHeader], [fd-popover-body-header]'
})
export class PopoverBodyHeaderDirective {
    /** @hidden */
    @HostBinding('class.fd-popover__body-header')
    fdPopoverBodyHeaderClass: boolean = true;

    /** Whether the header should be in compact mode. */
    @Input()
    @HostBinding('class.fd-popover__body-header--compact')
    compact: boolean = false;

    /** Whether the header is followed by a subheader. */
    @Input()
    @HostBinding('class.fd-popover__body-header--with-subheader')
    hasSubheader: boolean = false;
}
