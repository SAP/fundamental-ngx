import { EventEmitter } from '@angular/core';
import { Placement, PopperOptions } from 'popper.js';
import { PopoverDirective, PopoverFillMode } from './popover-directive/popover.directive';
import { PopoverDropdownComponent } from './popover-dropdown/popover-dropdown.component';
/**
 * The popover is a wrapping component that accepts a *control* as well as a *body*.
 * The control is what will trigger the opening of the actual popover, which is called the body.
 * By default, popovers are triggered by click. This can be customized through the *triggers* input.
 * PopoverComponent is an abstraction of PopoverDirective.
 */
export declare class PopoverComponent {
    /** @hidden */
    directiveRef: PopoverDirective;
    /** @hidden */
    dropdownComponent: PopoverDropdownComponent;
    /** Whether the popover should have an arrow. */
    noArrow: boolean;
    /** Whether the popover is disabled. */
    disabled: boolean;
    /** Whether the popover should be treated as a dropdown. */
    isDropdown: boolean;
    /** The element to which the popover should be appended. */
    appendTo: HTMLElement | 'body';
    /** The trigger events that will open/close the popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    triggers: string[];
    /** The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end. */
    placement: Placement;
    /** Whether the popover is open. Can be used through two-way binding. */
    isOpen: boolean;
    /** The Popper.js options to attach to this popover.
     * See the [Popper.js Documentation](https://popper.js.org/popper-documentation.html) for details. */
    options: PopperOptions;
    /** Whether the popover should be focusTrapped. */
    focusTrapped: boolean;
    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     */
    fillControlMode: PopoverFillMode;
    /** Whether the popover should close when a click is made outside its boundaries. */
    closeOnOutsideClick: boolean;
    /** Whether the popover should close when the escape key is pressed. */
    closeOnEscapeKey: boolean;
    /** Event emitted when the state of the isOpen property changes. */
    isOpenChange: EventEmitter<boolean>;
    /** Id of the popover. If none is provided, one will be generated. */
    id: string;
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
    /**
     * Forces an update of the popover's positioning calculation.
     */
    updatePopover(): void;
    /**
     * Function is called every time popover changes open attribute
     */
    openChanged(isOpen: boolean): void;
    /** @hidden
     *  Function that allows us to control aria-expanded on dropdown child
     * */
    private updateDropdownIsOpen;
}
