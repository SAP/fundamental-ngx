import { ApplicationRef, ChangeDetectorRef, ComponentFactoryResolver, ElementRef, EventEmitter, Injector, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { Placement, PopperOptions } from 'popper.js';
export declare type PopoverFillMode = 'at-least' | 'equal';
/**
 * Directive which manages the popper and popover components of the library.
 * It can be attached to any element. To bind it to a body, use the following syntax.
 * ```html
 * <div [fdPopover]="template">Control Element</div>
 * <ng-template #template>
 *     Popover Body
 * </ng-template>
 * ```
 */
export declare class PopoverDirective implements OnInit, OnDestroy, OnChanges {
    private elRef;
    private cdRef;
    private resolver;
    private injector;
    private appRef;
    private renderer;
    /** Content of the popover. Used through the actual directive tag. Accepts strings or TemplateRefs. */
    content: TemplateRef<any> | string;
    /** Whether the popover is open. Can be used through two-way binding. */
    isOpen: boolean;
    /** The trigger events that will open/close the popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    triggers: string[];
    /** Whether the popover should display the default arrow. */
    noArrow: boolean;
    /** The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end. */
    placement: Placement;
    /** Whether the popover should be focusTrapped. */
    focusTrapped: boolean;
    /** Whether the popover should close when the escape key is pressed. */
    closeOnEscapeKey: boolean;
    /** Whether the popover is disabled. */
    disabled: boolean;
    /** Whether the popover should close when a click is made outside its boundaries. */
    closeOnOutsideClick: boolean;
    /** The element to which the popover should be appended. */
    appendTo: HTMLElement | 'body';
    /** The Popper.js options to attach to this popover.
     * See the [Popper.js Documentation](https://popper.js.org/popper-documentation.html) for details. */
    options: PopperOptions;
    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     */
    fillControlMode: PopoverFillMode;
    /** Event emitted when the state of the isOpen property changes. */
    isOpenChange: EventEmitter<boolean>;
    private containerRef;
    private popper;
    private eventRef;
    private isSetup;
    /** @hidden */
    constructor(elRef: ElementRef, cdRef: ChangeDetectorRef, resolver: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef, renderer: Renderer2);
    /** @hidden */
    ngOnInit(): void;
    /** @hidden */
    ngOnDestroy(): void;
    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Toggles the popover open state.
     */
    toggle(fireEvent?: boolean): void;
    /**
     * Opens the popover.
     */
    open(fireEvent?: boolean): void;
    /**
     * Closes the popover.
     */
    close(fireEvent?: boolean): void;
    /**
     * Forces an update of the popover's positioning calculation.
     */
    updatePopper(): void;
    private createContainer;
    private destroyTriggerListeners;
    private addTriggerListeners;
    private destroyContainer;
    private createPopper;
    private fillReference;
    private atLeastReference;
    private initPlacement;
    private setupFillBehaviour;
    /** @hidden */
    clickHandler(event: MouseEvent): void;
}
