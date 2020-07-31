import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-addon]'
})
export class MenuAddonDirective {
    /** Whether addon is used before or after text */
    @Input('position') set setAddonPosition(position: 'before' | 'after') {
        this.fdAddonBeforeClass = position === 'before';
        this.fdAddonAfterClass = position === 'after';
    }

    /** Whether is used as submenu indicator */
    @Input()
    @HostBinding('class.fd-menu__addon-after--submenu')
    submenuIndicator = false;

    /** Sets Aria hidden attribute */
    @Input()
    @HostBinding('attr.aria-hidden')
    ariaHidden = true;

    /** @hidden */
    @HostBinding('class.fd-menu__addon-after')
    fdAddonAfterClass = true;

    /** @hidden */
    @HostBinding('class.fd-menu__addon-before')
    fdAddonBeforeClass = false;
}
