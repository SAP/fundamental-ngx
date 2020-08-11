import {
    ChangeDetectionStrategy,
    Component,
    Input,
    isDevMode,
    ViewEncapsulation
} from '@angular/core';
import { ButtonType } from '../../button/button.component';
/**
 * @deprecated
 * PopoverDropdownComponent is deprecated
 * Consult docs for better alternative
 *
 * A component used to enforce a certain layout for the popover. With additional styling
 * ```html
 * <fd-popover>
 *     <fd-dropdown>Dropdown</fd-dropdown>
 *     <fd-popover-body>Popover Body</fd-popover-body>
 * </fd-popover>
 * ```
 */
@Component({
    selector: 'fd-dropdown-control',
    host: {
        class: 'fd-dropdown'
    },
    templateUrl: 'popover-dropdown.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverDropdownComponent {
    /** Whether the popover should have an arrow. */
    @Input()
    noArrow = true;

    /** Whether the popover is disabled. */
    @Input()
    disabled = false;

    /** The glyph to display. */
    @Input()
    glyph: string;

    /** The btnType to display. */
    @Input()
    btnType: ButtonType;

    /** Whether the dropdown is in compact format. */
    @Input()
    compact = false;

    /** Whether the dropdown is in a toolbar. */
    @Input()
    toolbar = false;

    /** Whether the dropdown is opened. */
    @Input()
    isOpen = false;

    constructor() {
        if (isDevMode()) {
            console.warn(
                'Popover Dropdown has been deprecated, it will be removed soon. Replace it by popover with menu button'
            );
        }
    }
}
