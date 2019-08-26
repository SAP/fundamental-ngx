import {
    Component, HostBinding,
    ViewEncapsulation,
    Input,
    ElementRef
} from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/**
 * The component that represents a menu.
 */
@Component({
    selector: 'fd-menu',
    templateUrl: './menu.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['menu.component.scss']
})
export class MenuComponent extends AbstractFdNgxClass {
    /** @hidden */
    @HostBinding('class.fd-menu')
    fdMenuClass: boolean = true;

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
