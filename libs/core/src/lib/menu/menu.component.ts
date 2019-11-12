import {
    Component, HostBinding,
    ViewEncapsulation,
    Input, ChangeDetectionStrategy
} from '@angular/core';

/**
 * The component that represents a menu.
 */
@Component({
    selector: 'fd-menu',
    templateUrl: './menu.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
    /** @hidden */
    @HostBinding('class.fd-menu')
    fdMenuClass: boolean = true;

    /** The separator line for each menu item. When set to true, it adds a separator below each menu item in the list.
     * False by default. Leave empty for default. */
    @Input()
    @HostBinding('class.fd-menu__list--separated')
    separator: boolean = false;

}
