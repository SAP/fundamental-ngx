import { Component, HostBinding } from '@angular/core';

/**
 * The component that represents a menu group.
 */
@Component({
    selector: 'fd-menu-group',
    templateUrl: './menu-group.component.html',
    styles: [':host {display: block;}']
})
export class MenuGroupComponent {
    /** @hidden */
    @HostBinding('class.fd-menu__group') true;
}
