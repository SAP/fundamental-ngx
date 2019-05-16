import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

/**
 * The component that represents a menu.
 */
@Component({
    selector: 'fd-menu',
    templateUrl: './menu.component.html',
    encapsulation: ViewEncapsulation.None
})
export class MenuComponent {
    @HostBinding('class.fd-menu')
    private fdMenuClass: boolean = true;
}
