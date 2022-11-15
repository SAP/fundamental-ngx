import { Directive, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ConnectedPosition, ScrollStrategy } from '@angular/cdk/overlay';
import { Placement, PopoverFillMode, Nullable } from '@fundamental-ngx/core/shared';

@Directive()
export class BasePopoverClass {
    /** Whether to close the popover on router navigation start. */
    @Input()
    closeOnNavigation = true;

    /** Whether the popover is disabled. */
    @Input()
    @HostBinding('class.fd-popover-custom--disabled')
    disabled = false;

    /** Maximum width of popover body in px, prevents from overextending body by `fillControlMode`  */
    @Input()
    maxWidth: Nullable<number> = null;

    /** Whether the popover should have an arrow. */
    @Input()
    noArrow = true;

    /** Whether the popover container needs an extra class for styling. */
    @Input()
    additionalBodyClass: string | null = null;

    /** Whether the popover container needs an extra class for styling. */
    @Input()
    additionalTriggerClass: string | null = null;

    /** Whether the popover should close when the escape key is pressed. */
    @Input()
    closeOnEscapeKey = true;

    /** Whether to wrap content with fd-scrollbar directive. */
    @Input()
    disableScrollbar = false;

    /**
     * The placement of the popover.
     * It can be one of:
     * top, top-start, top-end, bottom, bottom-start, bottom-end,
     * right, right-start, right-end, left, left-start, left-end.
     */
    @Input()
    placement: Placement | null = null;

    /**
     * The trigger events that will open/close the popover.
     * Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp) or a config object for the corresponding event.
     * Using the config object allows to specify whether an event should apply both for open and close actions or only some of them.
     *
     * Consider the following value for `triggers`:
     * ```
     * [
     *  'click', // basically it's an alias for "{ trigger: 'click', openAction: true, closeAction: true }"
     *  { trigger: 'mouseenter', openAction: true, closeAction: false }, // "mouseenter" will only open the popover
     *  { trigger: 'mouseleave', openAction: false, closeAction: true } // "mouseleave" will only close the popover
     * ]
     * ```
     *
     * @default ['click']
     */
    @Input()
    triggers: (string | TriggerConfig)[] = ['click'];

    /** Whether the popover is open. Can be used through two-way binding. */
    @Input()
    isOpen = false;

    /** Whether the popover should close when a click is made outside its boundaries. */
    @Input()
    closeOnOutsideClick = true;

    /** Whether the popover should be focusTrapped. */
    @Input()
    focusTrapped = false;

    /**
     * Whether the popover should automatically move focus into the trapped region upon
     * initialization and return focus to the previous activeElement upon destruction.
     */
    @Input()
    focusAutoCapture = false;

    /**
     * Scroll strategy, there are 4 accepted
     * - CloseScrollStrategy
     * - NoopScrollStrategy
     * - BlockScrollStrategy
     * - RepositionScrollStrategy ( default )
     */
    @Input()
    scrollStrategy: ScrollStrategy | null = null;

    /**
     * List of positions options for overlay defined by angular CDK.
     * Positions will be taken in order, same like on array. If first position provided doesn't fit to window,
     * another will be used
     * More information can be found in https://material.angular.io/cdk/overlay/api
     */
    @Input()
    cdkPositions: ConnectedPosition[] | null = null;

    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     */
    @Input()
    fillControlMode: Nullable<PopoverFillMode> = null;

    /** The element to which  the overlay is attached. By default it is body */
    @Input()
    appendTo: Nullable<ElementRef | Element>;

    /** Whether position shouldn't change, when popover approach the corner of page */
    @Input()
    fixedPosition = false;

    /** @deprecated */
    @Input()
    options;

    /** @deprecated */
    @Input()
    addContainerClass;

    /** @deprecated */
    @Input()
    additionalClasses;

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
}

/**
 * Config for the trigger event, which allows to specify
 * whether an event should apply both for open and close actions or only some of them
 */
export interface TriggerConfig {
    trigger: string;
    openAction: boolean;
    closeAction: boolean;
}
