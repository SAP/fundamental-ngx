import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

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
    styleUrls: ['./button-group.component.scss'],
    host: {
        'role': 'group'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonGroupComponent {

    /** @hidden */
    @HostBinding('class.fd-button-group')
    fdButtonGroupClass: boolean = true;
}
