import { EventEmitter, TemplateRef } from '@angular/core';
import { PopoverFillMode } from '../popover/popover-directive/popover.directive';
/**
 * Split Button component, used to enhance standard HTML button and add possibility to put some dropdown with
 * additional options.
 *
 * ```html
 *    <fd-split-button>
 *        Action Button
 *        <div fd-split-button-menu>
 *            <fd-menu>
 *                <ul fd-menu-list>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option</a>
 *                    </li>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option2</a>
 *                    </li>
 *                </ul>
 *            </fd-menu>
 *        </div>
 *    </fd-split-button>
 * ```
 */
export declare class SplitButtonComponent {
    /** @hidden */
    titleTemplate: TemplateRef<any>;
    /** The trigger events that will open/close the popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    triggers: string[];
    /** Whether the popover should close when a click is made outside its boundaries. */
    closeOnOutsideClick: boolean;
    /** Whether the popover should close when the escape key is pressed. */
    closeOnEscapeKey: boolean;
    /** Whether the popover should be focusTrapped. */
    focusTrapped: boolean;
    /** Whether to apply compact mode to the button. */
    compact: boolean;
    /** The icon to include in the button. See the icon page for the list of icons. */
    glyph: string;
    /** The icon to include in the button. See the icon page for the list of icons. */
    disabled: boolean;
    /** The Title for main  action button */
    mainActionTitle: string;
    /** The type of the button. Types include 'standard', 'positive', 'medium', and 'negative'.
     * Leave empty for default (Action button).'*/
    fdType: string;
    /** Button options.  Options include 'emphasized' and 'light'. Leave empty for default.' */
    options: string | string[];
    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     */
    fillControlMode: PopoverFillMode;
    /** @hidden */
    isOpen: boolean;
    /** Event sent when is open popover changed */
    readonly isOpenChange: EventEmitter<boolean>;
    /** Event sent when primary button is clicked */
    readonly primaryButtonClicked: EventEmitter<boolean>;
    /**
     *  Handles primary button click
     *  */
    buttonClick($event: any): void;
    /**
     * Toggles the popover open state.
     */
    toggle(): void;
    /**
     * Closes the popover.
     */
    close(): void;
    /**
     * Opens the popover.
     */
    open(): void;
}
