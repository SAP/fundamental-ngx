import { Component, ContentChild, ViewEncapsulation } from '@angular/core';
import { MenuListDirective } from './menu-list.directive';

/**
 * The component that represents a menu group.
 */
@Component({
    selector: 'fd-menu-group',
    templateUrl: './menu-group.component.html',
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'fd-has-display-block fd-menu__group',
    }
})
export class MenuGroupComponent {
    /** @hidden */
    @ContentChild(MenuListDirective) public menuList: MenuListDirective;
}
