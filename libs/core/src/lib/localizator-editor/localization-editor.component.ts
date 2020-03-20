import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
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
@Component({
    selector: 'fd-localization-editor',
    templateUrl: './localization-editor.component.html',
    styleUrls: ['localization-editor.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalizationEditorComponent {

    /** @hidden */
    @HostBinding('class.fd-localization-editor')
    fdLocalizationEditorClass: boolean = true;

    /** @hidden */
    @ContentChild(LocalizationEditorMainComponent)
    mainElement: LocalizationEditorMainComponent;

    /** The trigger events that will open/close the popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    @Input()
    triggers: string[] = ['click'];

    /** The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end. */
    @Input()
    placement: Placement;

    /** Whether the popover is open. Can be used through two-way binding. */
    @Input()
    isOpen: boolean = false;

    /** Whether the popover should close when a click is made outside its boundaries. */
    @Input()
    closeOnOutsideClick: boolean = true;

    /** Whether the popover should close when the escape key is pressed. */
    @Input()
    closeOnEscapeKey: boolean = true;

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    readonly isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Whether to disable opening. */
    @Input()
    disabled: boolean;

    /** Whether the inputs are in compact mode. */
    @Input()
    compact: boolean = false;

    /**
     * Toggles the popover open state.
     */
    public toggle(): void {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Closes the popover.
     */
    public close(): void {
        if (this.isOpen) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
    }

    /**
     * Opens the popover.
     */
    public open(): void {
        if (!this.isOpen) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    }

    /**
     * @hidden
     * Event handled always, when the popup is opened or closed.
     */
    public handleOpenChange(opened: boolean): void {
        if (this.mainElement) {
            this.mainElement.expanded = opened;
        }
    }
}
