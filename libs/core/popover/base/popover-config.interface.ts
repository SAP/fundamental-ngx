import { ConnectedPosition, ScrollStrategy } from '@angular/cdk/overlay';
import { ElementRef } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { Placement, PopoverFillMode } from '@fundamental-ngx/core/shared';

/**
 * Configuration object for popover trigger events.
 * Allows specifying whether an event should apply for open and/or close actions.
 */
export interface TriggerConfig {
    /** The DOM event trigger name */
    trigger: string;
    /** Whether this trigger should open the popover */
    openAction: boolean;
    /** Whether this trigger should close the popover */
    closeAction: boolean;
    /** Whether to stop event propagation */
    stopPropagation?: boolean;
}

/**
 * Comprehensive configuration interface for popover components.
 * This interface replaces the deprecated BasePopoverClass approach with a cleaner composition pattern.
 *
 * All properties are optional to support partial configuration.
 * Components can accept this config object via an input signal and merge it with individual inputs.
 */
export interface PopoverConfig {
    /** Whether to close the popover on router navigation start. */
    closeOnNavigation?: boolean;

    /** Whether the popover is disabled. */
    disabled?: boolean;

    /** Maximum width of popover body in px, prevents from overextending body by `fillControlMode`. */
    maxWidth?: Nullable<number>;

    /** Whether the popover should have an arrow. */
    noArrow?: boolean;

    /** Additional CSS classes for the popover body container. */
    additionalBodyClass?: string | null;

    /** Classes applied directly to fd-popover-body component. */
    additionalBodyComponentClasses?: string | null;

    /** Additional CSS classes for the trigger element. */
    additionalTriggerClass?: string | null;

    /** Whether the popover should close when the escape key is pressed. */
    closeOnEscapeKey?: boolean;

    /** Whether to wrap content with fd-scrollbar directive. */
    disableScrollbar?: boolean;

    /**
     * The placement of the popover.
     * Options: top, top-start, top-end, bottom, bottom-start, bottom-end,
     * right, right-start, right-end, left, left-start, left-end.
     */
    placement?: Placement | null;

    /**
     * Trigger events that open/close the popover.
     * Accepts HTML DOM Events or TriggerConfig objects.
     *
     * - Single event: treated as toggle (both open and close)
     * - Multiple events: odd events open, even events close
     *
     * Examples:
     * ```
     * ['click'] // Toggle on click
     * ['mouseenter', 'mouseleave'] // Open on mouseenter, close on mouseleave
     * [{ trigger: 'focus', openAction: true, closeAction: false }] // Only opens on focus
     * ```
     */
    triggers?: (string | TriggerConfig)[];

    /** Whether the popover is open. */
    isOpen?: boolean;

    /** Whether the popover should close when a click is made outside its boundaries. */
    closeOnOutsideClick?: boolean;

    /** Whether to apply a background overlay. */
    applyOverlay?: boolean;

    /** Whether the popover should trap focus within its boundaries. */
    focusTrapped?: boolean;

    /**
     * Whether to automatically move focus into the trapped region upon
     * initialization and return focus to the previous activeElement upon destruction.
     */
    focusAutoCapture?: boolean;

    /**
     * Whether to move focus back to the last focused element before popover was opened
     * when the popover is closed.
     */
    restoreFocusOnClose?: boolean;

    /**
     * Scroll strategy for the CDK overlay.
     * Options:
     * - CloseScrollStrategy: Closes popover on scroll
     * - NoopScrollStrategy: No action on scroll
     * - BlockScrollStrategy: Blocks scrolling
     * - RepositionScrollStrategy: Repositions popover on scroll (default)
     */
    scrollStrategy?: ScrollStrategy | null;

    /**
     * List of position options for CDK overlay.
     * Positions are tried in order until one fits.
     * See: https://material.angular.io/cdk/overlay/api
     */
    cdkPositions?: ConnectedPosition[] | null;

    /**
     * Preset options for popover body width.
     * - `at-least`: Minimum width equals control width
     * - `equal`: Width equals control width
     * - `null`: No width constraint
     */
    fillControlMode?: Nullable<PopoverFillMode>;

    /** The element to which the overlay is attached. Defaults to document body. */
    appendTo?: Nullable<ElementRef | Element>;

    /** Container element for positioning the popover. */
    placementContainer?: Nullable<ElementRef | Element>;

    /** Whether position should remain fixed when approaching page corners. */
    fixedPosition?: boolean;

    /** Whether the popover body is resizable. */
    resizable?: boolean;

    /** ARIA role for the popover body. */
    bodyRole?: string | null;

    /** ID for the popover body. */
    bodyId?: string | null;
}
