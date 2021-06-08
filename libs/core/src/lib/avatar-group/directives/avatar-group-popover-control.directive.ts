import { Directive, HostBinding, Input } from '@angular/core';

/** Needed to bind specific class to group type popover control. */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-avatar-group-popover-control]',
    host: { class: 'fd-avatar-group__popover-control' }
})
export class AvatarGroupPopoverControlDirective {
    /** Tabindex of the popover control. */
    @Input()
    @HostBinding('attr.tabindex')
    tabindex = 0;

    /** Role of the popover control. */
    @Input()
    @HostBinding('attr.role')
    role = 'button';
}
