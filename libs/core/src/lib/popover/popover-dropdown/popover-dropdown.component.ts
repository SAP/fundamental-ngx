import { Component, Host, Inject, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopoverComponent } from '../popover.component';
import { ButtonType } from '../../button/button.component';
/**
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
        class: 'fd-dropdown',
    },
    templateUrl: 'popover-dropdown.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class PopoverDropdownComponent {
    /** Whether the popover should have an arrow. */
    @Input()
    noArrow: boolean = true;

    /** Whether the popover is disabled. */
    @Input()
    disabled: boolean = false;

    /** The glyph to display. */
    @Input()
    glyph: string;

    /** The btnType to display. */
    @Input()
    btnType: ButtonType;

    /** Whether the dropdown is in compact format. */
    @Input()
    compact: boolean = false;

    /** Whether the dropdown is in a toolbar. */
    @Input()
    toolbar: boolean = false;

    /** Whether the dropdown is opened. */
    @Input()
    isOpen: boolean = false;

}
