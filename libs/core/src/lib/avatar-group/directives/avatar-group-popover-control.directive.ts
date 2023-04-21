import { Directive, HostBinding, Input } from '@angular/core';

/** Needed to bind specific class to group type popover control. */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-avatar-group-popover-control]',
    host: { class: 'fd-avatar-group__popover-control' },
    standalone: true
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
