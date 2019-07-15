import { Component, ContentChild, HostBinding, ViewEncapsulation } from '@angular/core';
import { MenuListDirective } from './menu-list.directive';

/**
 * The component that represents a menu group.
 */
@Component({
    selector: 'fd-menu-group',
    templateUrl: './menu-group.component.html',
    encapsulation: ViewEncapsulation.None
})
export class MenuGroupComponent {
    /** @hidden */
    @ContentChild(MenuListDirective)
    menuList: MenuListDirective;

    /** @hidden*/
    @HostBinding('class.fd-has-display-block')
    fdHasDisplayBlockClass: boolean = true;

    /** @hidden*/
    @HostBinding('class.fd-menu__group')
    fdMenuGroupClass: boolean = true;

}
