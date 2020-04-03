import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

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
    readonly fdMenuClass: boolean = true;

    /** Display menu in compact mode */
    @Input()
    compact: boolean = false;

    /** Display menu in mobile mode */
    @Input()
    mobile: boolean = false;

    @Input()
    separator: boolean = false;
}
