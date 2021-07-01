import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-avatar-group-focusable-avatar]',
    host: { class: 'fd-avatar-group__focusable-avatar' }
})
export class AvatarGroupFocusableAvatarDirective {
    /** Tabindex of the Avatar. */
    @Input()
    @HostBinding('attr.tabindex')
    tabindex = 0;
}
