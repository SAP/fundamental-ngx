import { A11yModule } from '@angular/cdk/a11y';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    contentChild,
    effect,
    ElementRef,
    EventEmitter,
    inject,
    Injector,
    Input,
    Output,
    Renderer2,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {
    PopoverBodyComponent,
    PopoverComponent,
    PopoverControlComponent,
    TriggerConfig
} from '@fundamental-ngx/core/popover';

import { Placement, PopoverFillMode } from '@fundamental-ngx/core/shared';
import { resolveTranslationSignalFn } from '@fundamental-ngx/i18n';
import { FormMessageComponent } from '../form-message/form-message.component';

@Component({
    selector: 'fd-form-input-message-group',
    templateUrl: './form-input-message-group.component.html',
    styleUrl: './form-input-message-group.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PopoverComponent, PopoverControlComponent, PopoverBodyComponent, A11yModule]
})
export class FormInputMessageGroupComponent implements AfterContentInit {
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
    _popoverPlacementContainer: ElementRef | null;

    /** @hidden */
    @ViewChild('popover')
    _popover: PopoverComponent;

    /** @hidden */
    readonly _elementRef = inject(ElementRef);

    /** @hidden Translated aria-label for the popover body (#14260). */
    protected readonly _popoverAriaLabel = resolveTranslationSignalFn()('coreFormInputMessageGroup.popoverAriaLabel');

    /** @hidden */
    private readonly _renderer = inject(Renderer2);

    /** @hidden */
    private readonly _injector = inject(Injector);

    /** @hidden Query for the projected form message */
    private readonly _formMessage = contentChild(FormMessageComponent);

    /** @hidden */
    ngAfterContentInit(): void {
        // Set up ARIA attributes linking the control to the form message
        effect(
            () => {
                const formMessage = this._formMessage();
                const controlElement = this._getControlElement();

                if (!formMessage || !controlElement) {
                    return;
                }

                const messageId = formMessage.id();
                const messageType = formMessage.type();

                if (!messageId) {
                    return;
                }

                // Check if user provided their own ARIA linking attributes
                const userDescribedby = controlElement.getAttribute('aria-describedby');
                const userErrormessage = controlElement.getAttribute('aria-errormessage');

                // If user provided aria-errormessage, replace it with aria-describedby
                // because aria-errormessage requires the referenced element to be perceivable at all times,
                // which doesn't work with popover-based messages that may be hidden initially
                if (userErrormessage) {
                    this._renderer.removeAttribute(controlElement, 'aria-errormessage');
                    this._renderer.setAttribute(controlElement, 'aria-describedby', userErrormessage);
                    // Ensure aria-invalid is set for error messages
                    if (messageType === 'error' && !controlElement.hasAttribute('aria-invalid')) {
                        this._renderer.setAttribute(controlElement, 'aria-invalid', 'true');
                    }
                    return;
                }

                // If user provided aria-describedby, respect it and only add aria-invalid for errors
                if (userDescribedby) {
                    if (messageType === 'error' && !controlElement.hasAttribute('aria-invalid')) {
                        this._renderer.setAttribute(controlElement, 'aria-invalid', 'true');
                    }
                    return;
                }

                // No user-provided attributes - automatically manage ARIA
                // Note: We use aria-describedby for all message types (including errors)
                // because aria-errormessage requires the referenced element to be perceivable,
                // which isn't guaranteed with popover-based messages
                if (messageType === 'error') {
                    this._renderer.setAttribute(controlElement, 'aria-describedby', messageId);
                    this._renderer.setAttribute(controlElement, 'aria-invalid', 'true');
                } else {
                    this._renderer.setAttribute(controlElement, 'aria-describedby', messageId);
                    this._renderer.removeAttribute(controlElement, 'aria-invalid');
                }
            },
            { injector: this._injector }
        );
    }

    /**
     * Function is called every time message changes isOpen attribute
     */
    public openChanged(isOpen: boolean): void {
        this.isOpenChange.emit(isOpen);
    }

    /** @hidden Get the control element (input, textarea, etc.) from the popover control */
    private _getControlElement(): HTMLElement | null {
        const popoverControlElement = this._elementRef.nativeElement.querySelector('fd-popover-control');
        if (!popoverControlElement) {
            return null;
        }

        // Find the first form control element (input, textarea, select, etc.)
        const controlElement =
            popoverControlElement.querySelector('input') ||
            popoverControlElement.querySelector('textarea') ||
            popoverControlElement.querySelector('select') ||
            popoverControlElement.querySelector('[contenteditable]');

        return controlElement as HTMLElement | null;
    }
}
