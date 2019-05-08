import { Component, HostBinding } from '@angular/core';

/**
 * Container for grouped buttons.
 *
 * ```html
 * <fd-button-group>
 *     <button fd-button-grouped>Button</button>
 * </fd-button-group>
 * ```
 */
@Component({
    selector: 'fd-button-group',
    templateUrl: './button-group.component.html',
    host: {
        'role': 'group'
    }
})
export class ButtonGroupComponent {

    /** @hidden */
    @HostBinding('class.fd-button-group')
    fdButtonGroupClass: boolean = true;
}
