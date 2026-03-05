import { ConnectedPosition, ScrollStrategy } from '@angular/cdk/overlay';
import { Directive, ElementRef, signal } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { Placement, PopoverFillMode } from '@fundamental-ngx/core/shared';
import { TriggerConfig } from './popover-config.interface';

// Re-export for backward compatibility
export { TriggerConfig };

/**
 * @deprecated Use the {@link PopoverConfig} interface instead of extending this class.
 * This class will be removed in a future major version.
 *
 * Migration guide:
 * - For components: Use regular `input()` signal properties and pass configuration to PopoverService
 * - For services: Use the PopoverConfig interface to define configuration objects
 * - See {@link PopoverComponent} and {@link MenuComponent} for modern implementation examples
 *
 * Configuration object for popover settings.
 * This is used by PopoverService and was extended by PopoverComponent and MenuComponent.
 *
 * **For Components:** Use signal inputs with the `input()` function to declare these properties.
 * Components should also define their own `isOpenChange = output<boolean>()` and `beforeOpen = output<void>()` outputs.
 *
 * **For Services:** Use regular signal instances to store these values.
 */
@Directive({
    host: {
        '[class.fd-popover-custom--disabled]': 'disabled()'
    }
})
export class BasePopoverClass {
    /** Whether to close the popover on router navigation start. */
    closeOnNavigation = signal(true);

    /** Whether the popover is disabled. */
    disabled = signal(false);

    /** Maximum width of popover body in px, prevents from overextending body by `fillControlMode`  */
    maxWidth = signal<Nullable<number>>(null);

    /** Whether the popover should have an arrow. */
    noArrow = signal(true);

    /** Whether the popover container needs an extra class for styling. */
    additionalBodyClass = signal<string | null>(null);

    /** Classes that should be applied to fd-popover-body component directly. */
    additionalBodyComponentClasses = signal<string | null>(null);

    /** Whether the popover container needs an extra class for styling. */
    additionalTriggerClass = signal<string | null>(null);

    /** Whether the popover should close when the escape key is pressed. */
    closeOnEscapeKey = signal(true);

    /** Whether to wrap content with fd-scrollbar directive. */
    disableScrollbar = signal(false);

    /**
     * The placement of the popover.
     * It can be one of:
     * top, top-start, top-end, bottom, bottom-start, bottom-end,
     * right, right-start, right-end, left, left-start, left-end.
     */
    placement = signal<Placement | null>(null);

    /**
     * The trigger events that will open/close the popover.
     * Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp) or a config object for the corresponding event.
     * Using the config object allows to specify whether an event should apply both for open and close actions or only some of them.
     *
     * If array of triggers consists only of one event, it will be treated at a toggle event (open and close)
     * If array of trigger consists of more than one event, each odd event will be treated as an open event for the popover,
     * and each even event will be treated as closing event for the popover.
     *
     * Consider the following value for `triggers`:
     * ```
     * [
     *  'click' // basically it's an alias for "{ trigger: 'click', openAction: true, closeAction: true }"
     * ]
     * ```
     * ```
     * [
     *  'mouseenter' // Shortcut for "{ trigger: 'mouseenter', openAction: true, closeAction: false }", and will only open the popover.
     *  'mouseleave' // Shortcut for "{ trigger: 'mouseleave', openAction: false, closeAction: true }" and will only close the popover.
     * ]
     * ```
     * ```
     * [
     *  { trigger: 'mouseenter', openAction: true, closeAction: true }, // "mouseenter" will toggle the popover.
     *  { trigger: 'mouseleave', openAction: true, closeAction: true } // "mouseleave" will toggle the popover.
     * ]
     * ```
     *
     * @default ['click']
     */
    triggers = signal<(string | TriggerConfig)[]>(['click']);

    /** Whether the popover is open. Can be used through two-way binding. */
    isOpen = signal(false);

    /** Whether the popover should close when a click is made outside its boundaries. */
    closeOnOutsideClick = signal(true);

    /** Wether to apply a background overlay */
    applyOverlay = signal(false);

    /** Whether the popover should be focusTrapped. */
    focusTrapped = signal(false);

    /**
     * Whether the popover should automatically move focus into the trapped region upon
     * initialization and return focus to the previous activeElement upon destruction.
     */
    focusAutoCapture = signal(false);

    /**
     * Whether to move the focus after popover is closed to the last focused element before popover was opened.
     */
    restoreFocusOnClose = signal(true);

    /**
     * Scroll strategy, there are 4 accepted
     * - CloseScrollStrategy
     * - NoopScrollStrategy
     * - BlockScrollStrategy
     * - RepositionScrollStrategy ( default )
     */
    scrollStrategy = signal<ScrollStrategy | null>(null);

    /**
     * List of positions options for overlay defined by angular CDK.
     * Positions will be taken in order, same like on array. If first position provided doesn't fit to window,
     * another will be used
     * More information can be found in https://material.angular.io/cdk/overlay/api
     */
    cdkPositions = signal<ConnectedPosition[] | null>(null);

    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     */
    fillControlMode = signal<Nullable<PopoverFillMode>>(null);

    /** The element to which  the overlay is attached. By default it is body */
    appendTo = signal<Nullable<ElementRef | Element>>(null);

    /** Placement of the popover element. */
    placementContainer = signal<Nullable<ElementRef | Element>>(null);

    /** Whether position shouldn't change, when popover approach the corner of page */
    fixedPosition = signal(false);

    /** Whether the popover body is resizable. */
    resizable = signal(false);

    /** @hidden Aria role for the popover body. */
    protected _bodyRole: string | null = 'dialog';

    /** @hidden ID for the popover body. */
    protected readonly _bodyId = signal<string | null>(null);
}
