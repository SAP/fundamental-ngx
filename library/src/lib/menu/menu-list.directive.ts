import { Directive, HostBinding, ElementRef, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/**
 * The directive that represents a listing structure of the menu.
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-menu-list]'
})
export class MenuListDirective extends AbstractFdNgxClass {
    /** @hidden */
    @HostBinding('class.fd-menu__list')
    fdMenuListClass: boolean = true;

    /** The separator line for each menu item. When set to true at list level, it adds a separator below each menu item in the list. 
     * False by default. Leave empty for default. */
    @Input()
    separator: boolean = false;

    /** @hidden */
    constructor(public itemEl: ElementRef) {
        super(itemEl);
    }
    /** @hidden */
    _setProperties(): void {
        if (this.separator) {
            this._addClassToElement('fd-menu__list-separator');
        }
    }

}
