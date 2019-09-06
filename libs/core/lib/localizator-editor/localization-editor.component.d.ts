import { EventEmitter } from '@angular/core';
import { Placement } from 'popper.js';
import { LocalizationEditorMainComponent } from './localization-editor-main/localization-editor-main.component';
/**
 *  The component that represents a list of fields with add-ons inside popover
 *  ```html
 * <fd-localization-editor>
 *    <fd-localization-editor-main [label]="'EN'">
 *       <input fd-localization-editor-input type="text" placeholder="EN">
 *    </fd-localization-editor-main>
 *    <fd-localization-editor-item [label]="'DE'">
 *       <input fd-localization-editor-input type="text" placeholder="DE">
 *    </fd-localization-editor-item>
 * </fd-localization-editor>
 *  ```
 */
export declare class LocalizationEditorComponent {
    /** @hidden */
    fdLocalizationEditorClass: boolean;
    /** @hidden */
    mainElement: LocalizationEditorMainComponent;
    /** The trigger events that will open/close the popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    triggers: string[];
    /** The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end. */
    placement: Placement;
    /** Whether the popover is open. Can be used through two-way binding. */
    isOpen: boolean;
    /** Whether the popover should close when a click is made outside its boundaries. */
    closeOnOutsideClick: boolean;
    /** Whether the popover should close when the escape key is pressed. */
    closeOnEscapeKey: boolean;
    /** Event emitted when the state of the isOpen property changes. */
    readonly isOpenChange: EventEmitter<boolean>;
    /** Whether to disable opening. */
    disabled: boolean;
    /** Whether the inputs are in compact mode. */
    compact: boolean;
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
     * @hidden
     * Event handled always, when the popup is opened or closed.
     */
    handleOpenChange(opened: boolean): void;
}
