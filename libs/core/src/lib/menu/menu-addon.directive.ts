import { Directive, HostBinding, Input } from '@angular/core';

/**
 * The directive for menu addon(for icons).
 */
@Directive({
    selector: '[fd-menu-addon], [fdMenuAddon]'
})
export class MenuAddonDirective {
    /** @hidden */
    @Input()
    @HostBinding('class.fd-menu--addon-before')
    fdMenuAddonClass: boolean = true;
}
