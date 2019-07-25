import {
    Component, HostBinding,
    ViewEncapsulation
} from '@angular/core';

/**
 * The component that represents a menu.
 */
@Component({
    selector: 'fd-menu',
    templateUrl: './menu.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['menu.component.scss']
})
export class MenuComponent {
    /** @hidden */
    @HostBinding('class.fd-menu')
    fdMenuClass: boolean = true;

}
