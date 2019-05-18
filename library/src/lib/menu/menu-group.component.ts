import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 * The component that represents a menu group.
 */
@Component({
    selector: 'fd-menu-group',
    templateUrl: './menu-group.component.html',
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.fd-has-display-block]': 'true'
    }
})
export class MenuGroupComponent {
    @HostBinding('class.fd-menu__group')
    private fdMenuGroupClass: boolean = true;
}
