import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { Placement, PopoverFillMode } from '../../popover/popover-position/popover-position';


@Component({
    selector: 'fd-form-input-message-group',
    templateUrl: './form-input-message-group.component.html',
    styleUrls: ['./form-input-message-group.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputMessageGroupComponent {
    /*
     * To allow user to determine what event he wants to trigger the messages to show
     * Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     */
    @Input()
    triggers: string[] = ['focusin', 'focusout'];

    /*
     * Allows the user to decide if he wants to keep the error message after they click outside
     *  Whether the popover should close when a click is made outside its boundaries.
     */
    @Input()
    closeOnOutsideClick = false;

    /**
     * Preset options for the message body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     */
    @Input()
    fillControlMode: PopoverFillMode;

    /** Whether the popover should have an arrow. */
    @Input()
    noArrow = true;

    /** Whether the popover should close when the escape key is pressed. */
    @Input()
    closeOnEscapeKey = false;

    /** The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end. */
    @Input()
    placement: Placement = 'bottom-start';

    /** Whether the message is open. Can be used through two-way binding. */
    @Input()
    isOpen = false;

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * Function is called every time message changes isOpen attribute
     */
    public openChanged(isOpen: boolean): void {
        this.isOpenChange.emit(isOpen);
    }
}
