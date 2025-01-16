import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation,
    inject
} from '@angular/core';
import {
    PopoverBodyComponent,
    PopoverComponent,
    PopoverControlComponent,
    TriggerConfig
} from '@fundamental-ngx/core/popover';

import { Placement, PopoverFillMode } from '@fundamental-ngx/core/shared';

@Component({
    selector: 'fd-form-input-message-group',
    templateUrl: './form-input-message-group.component.html',
    styleUrl: './form-input-message-group.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PopoverComponent, PopoverControlComponent, PopoverBodyComponent, CommonModule, A11yModule]
})
export class FormInputMessageGroupComponent {
    /**
     * To allow user to determine what event he wants to trigger the messages to show
     * Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     */
    @Input()
    triggers: (string | TriggerConfig)[] = ['focusin', 'focusout'];

    /**
     * Allows the user to decide if he wants to keep the error message after they click outside
     * Whether the popover should close when a click is made outside its boundaries.
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

    /**
     * @experimental
     * Container element, in which form message popover will be rendered.
     */
    @Input()
    placementContainer: 'body' | 'self' = 'body';

    /** Whether the message is open. Can be used through two-way binding. */
    @Input()
    isOpen = false;

    /**
     * Whether the popover should prevent page scrolling when space key is pressed.
     **/
    @Input()
    preventSpaceKeyScroll = true;

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    @ViewChild('popoverPlacementContainer', { static: false, read: ElementRef })
    _popoverPlacementContainer: ElementRef | undefined;

    /** @hidden */
    @ViewChild('popover')
    _popover: PopoverComponent;

    /** @hidden */
    readonly _elementRef = inject(ElementRef);

    /**
     * Function is called every time message changes isOpen attribute
     */
    public openChanged(isOpen: boolean): void {
        this.isOpenChange.emit(isOpen);
    }
}
