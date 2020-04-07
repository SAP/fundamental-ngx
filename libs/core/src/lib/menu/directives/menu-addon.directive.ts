import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
  selector: '[fd-menu-addon]'
})
export class MenuAddonDirective {

    /** @hidden */
    @HostBinding('class.fd-menu__addon-before')
    fdAddonBeforeClass: boolean = true;

    /** @hidden */
    @HostBinding('class.fd-menu__addon-after')
    fdAddonAfterClass: boolean = false;

    /** Whether addon is used before or after text */
    @Input('position') set setAddonPosition(position: 'before' | 'after') {
        this.fdAddonBeforeClass = position === 'before';
        this.fdAddonAfterClass = position === 'after';
    }
}
