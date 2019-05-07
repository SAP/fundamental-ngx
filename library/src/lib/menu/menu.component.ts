import { Component, HostBinding } from '@angular/core';

/**
 * The component that represents a menu.
 */
@Component({
    selector: 'fd-menu',
    templateUrl: './menu.component.html',
    styles: [':host {display: block;}']
})
export class MenuComponent {
    /** @hidden */
    @HostBinding('class.fd-menu') true;
}
