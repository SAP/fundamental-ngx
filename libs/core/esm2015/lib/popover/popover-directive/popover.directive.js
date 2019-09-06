/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ApplicationRef, ChangeDetectorRef, ComponentFactoryResolver, Directive, ElementRef, EventEmitter, HostListener, Injector, Input, Output, Renderer2 } from '@angular/core';
import { PopoverContainer } from './popover-container';
import Popper from 'popper.js';
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
export class PopoverDirective {
    /**
     * @hidden
     * @param {?} elRef
     * @param {?} cdRef
     * @param {?} resolver
     * @param {?} injector
     * @param {?} appRef
     * @param {?} renderer
     */
    constructor(elRef, cdRef, resolver, injector, appRef, renderer) {
        this.elRef = elRef;
        this.cdRef = cdRef;
        this.resolver = resolver;
        this.injector = injector;
        this.appRef = appRef;
        this.renderer = renderer;
        /**
         * Whether the popover is open. Can be used through two-way binding.
         */
        this.isOpen = false;
        /**
         * The trigger events that will open/close the popover.
         *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
         */
        this.triggers = ['click'];
        /**
         * Whether the popover should display the default arrow.
         */
        this.noArrow = true;
        /**
         * Whether the popover should be focusTrapped.
         */
        this.focusTrapped = false;
        /**
         * Whether the popover should close when the escape key is pressed.
         */
        this.closeOnEscapeKey = true;
        /**
         * Whether the popover is disabled.
         */
        this.disabled = false;
        /**
         * Whether the popover should close when a click is made outside its boundaries.
         */
        this.closeOnOutsideClick = true;
        /**
         * The element to which the popover should be appended.
         */
        this.appendTo = 'body';
        /**
         * The Popper.js options to attach to this popover.
         * See the [Popper.js Documentation](https://popper.js.org/popper-documentation.html) for details.
         */
        this.options = {
            placement: 'bottom-start',
            modifiers: {
                preventOverflow: {
                    enabled: true,
                    escapeWithReference: true,
                    boundariesElement: 'scrollParent'
                }
            }
        };
        /**
         * Event emitted when the state of the isOpen property changes.
         */
        this.isOpenChange = new EventEmitter();
        this.eventRef = [];
        this.isSetup = false;
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        if (this.isOpen) {
            this.open();
        }
        this.setupFillBehaviour();
        this.initPlacement();
        this.addTriggerListeners();
        this.isSetup = true;
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        if (this.popper) {
            this.popper.destroy();
        }
        if (this.containerRef) {
            this.destroyContainer();
        }
        this.destroyTriggerListeners();
    }
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.isSetup) {
            return;
        }
        if (changes.triggers) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.destroyTriggerListeners();
                this.addTriggerListeners();
            }));
        }
        if (changes.isOpen) {
            if (changes.isOpen.currentValue) {
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.isOpen = false;
                    this.open(false);
                }));
            }
            else {
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.isOpen = true;
                    this.close(false);
                }));
            }
        }
        if (changes.placement) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.initPlacement();
            }));
        }
        if (changes.fillControl) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.setupFillBehaviour();
            }));
        }
    }
    /**
     * Toggles the popover open state.
     * @param {?=} fireEvent
     * @return {?}
     */
    toggle(fireEvent = true) {
        if (this.isOpen) {
            this.close(fireEvent);
        }
        else {
            this.open(fireEvent);
        }
    }
    /**
     * Opens the popover.
     * @param {?=} fireEvent
     * @return {?}
     */
    open(fireEvent = true) {
        if (!this.isOpen && !this.disabled) {
            this.createContainer();
            this.isOpen = true;
            if (fireEvent) {
                this.isOpenChange.emit(this.isOpen);
            }
        }
    }
    /**
     * Closes the popover.
     * @param {?=} fireEvent
     * @return {?}
     */
    close(fireEvent = true) {
        if (this.isOpen) {
            this.destroyContainer();
            this.isOpen = false;
            if (fireEvent) {
                this.isOpenChange.emit(this.isOpen);
            }
        }
    }
    /**
     * Forces an update of the popover's positioning calculation.
     * @return {?}
     */
    updatePopper() {
        if (this.popper) {
            this.popper.scheduleUpdate();
        }
    }
    /**
     * @private
     * @return {?}
     */
    createContainer() {
        if (this.containerRef) {
            return;
        }
        /** @type {?} */
        const factory = this.resolver.resolveComponentFactory(PopoverContainer);
        this.containerRef = factory.create(this.injector);
        // Set instance properties
        this.containerRef.instance.context = this;
        this.containerRef.instance.content = this.content;
        this.containerRef.instance.focusTrapped = this.focusTrapped;
        this.containerRef.instance.noArrow = this.noArrow;
        this.containerRef.instance.closeOnEscapeKey = this.closeOnEscapeKey;
        this.appRef.attachView(this.containerRef.hostView);
        /** @type {?} */
        const setupRef = this.containerRef.instance.isSetup.subscribe((/**
         * @return {?}
         */
        () => {
            this.createPopper();
            setupRef.unsubscribe();
        }));
        /** @type {?} */
        const containerEl = (/** @type {?} */ (((/** @type {?} */ (this.containerRef.hostView))).rootNodes[0]));
        if (this.appendTo === 'body') {
            document.body.appendChild(containerEl);
        }
        else {
            this.appendTo.appendChild(containerEl);
        }
    }
    /**
     * @private
     * @return {?}
     */
    destroyTriggerListeners() {
        if (this.eventRef && this.eventRef.length > 0) {
            this.eventRef.forEach((/**
             * @param {?} event
             * @return {?}
             */
            event => {
                event();
            }));
            this.eventRef = [];
        }
    }
    /**
     * @private
     * @return {?}
     */
    addTriggerListeners() {
        if (this.triggers && this.triggers.length > 0) {
            this.triggers.forEach((/**
             * @param {?} trigger
             * @return {?}
             */
            trigger => {
                this.eventRef.push(this.renderer.listen(this.elRef.nativeElement, trigger, (/**
                 * @return {?}
                 */
                () => {
                    this.toggle();
                })));
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    destroyContainer() {
        if (this.containerRef) {
            this.appRef.detachView(this.containerRef.hostView);
            this.containerRef.destroy();
            this.containerRef = null;
        }
        if (this.popper) {
            this.popper.destroy();
            this.popper = null;
        }
    }
    /**
     * @private
     * @return {?}
     */
    createPopper() {
        this.popper = new Popper((/** @type {?} */ (this.elRef.nativeElement)), (/** @type {?} */ (this.containerRef.location.nativeElement)), this.options);
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    fillReference(data) {
        data.offsets.popper.left = data.offsets.reference.left;
        data.offsets.popper.right = data.offsets.reference.right;
        data.offsets.popper.width = data.styles.width = data.offsets.reference.width;
        return data;
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    atLeastReference(data) {
        data.offsets.popper.left = data.offsets.reference.left;
        data.offsets.popper.right = data.offsets.reference.right;
        data.styles.minWidth = data.offsets.reference.width + 'px';
        return data;
    }
    /**
     * @private
     * @return {?}
     */
    initPlacement() {
        if (this.placement) {
            if (this.options) {
                this.options.placement = this.placement;
            }
            else {
                this.options = { placement: this.placement };
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    setupFillBehaviour() {
        if (this.fillControlMode) {
            if (this.options && this.options.modifiers) {
                this.options.modifiers.fillReference = {
                    enabled: true,
                    fn: this.fillControlMode === 'equal' ? this.fillReference : this.atLeastReference,
                    order: 840
                };
            }
            else {
                this.options = {
                    modifiers: {
                        fillReference: {
                            enabled: true,
                            fn: this.fillControlMode === 'equal' ? this.fillReference : this.atLeastReference,
                            order: 840
                        }
                    }
                };
            }
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    clickHandler(event) {
        if (this.containerRef &&
            this.isOpen &&
            this.closeOnOutsideClick &&
            event.target !== this.elRef.nativeElement &&
            !this.elRef.nativeElement.contains(event.target) &&
            !this.containerRef.location.nativeElement.contains(event.target)) {
            event.preventDefault();
            event.stopPropagation();
            this.close();
        }
    }
}
PopoverDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fdPopover]'
            },] }
];
/** @nocollapse */
PopoverDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: ApplicationRef },
    { type: Renderer2 }
];
PopoverDirective.propDecorators = {
    content: [{ type: Input, args: ['fdPopover',] }],
    isOpen: [{ type: Input }],
    triggers: [{ type: Input }],
    noArrow: [{ type: Input }],
    placement: [{ type: Input }],
    focusTrapped: [{ type: Input }],
    closeOnEscapeKey: [{ type: Input }],
    disabled: [{ type: Input }],
    closeOnOutsideClick: [{ type: Input }],
    appendTo: [{ type: Input }],
    options: [{ type: Input }],
    fillControlMode: [{ type: Input }],
    isOpenChange: [{ type: Output }],
    clickHandler: [{ type: HostListener, args: ['document:click', ['$event'],] }]
};
if (false) {
    /**
     * Content of the popover. Used through the actual directive tag. Accepts strings or TemplateRefs.
     * @type {?}
     */
    PopoverDirective.prototype.content;
    /**
     * Whether the popover is open. Can be used through two-way binding.
     * @type {?}
     */
    PopoverDirective.prototype.isOpen;
    /**
     * The trigger events that will open/close the popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     * @type {?}
     */
    PopoverDirective.prototype.triggers;
    /**
     * Whether the popover should display the default arrow.
     * @type {?}
     */
    PopoverDirective.prototype.noArrow;
    /**
     * The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     * @type {?}
     */
    PopoverDirective.prototype.placement;
    /**
     * Whether the popover should be focusTrapped.
     * @type {?}
     */
    PopoverDirective.prototype.focusTrapped;
    /**
     * Whether the popover should close when the escape key is pressed.
     * @type {?}
     */
    PopoverDirective.prototype.closeOnEscapeKey;
    /**
     * Whether the popover is disabled.
     * @type {?}
     */
    PopoverDirective.prototype.disabled;
    /**
     * Whether the popover should close when a click is made outside its boundaries.
     * @type {?}
     */
    PopoverDirective.prototype.closeOnOutsideClick;
    /**
     * The element to which the popover should be appended.
     * @type {?}
     */
    PopoverDirective.prototype.appendTo;
    /**
     * The Popper.js options to attach to this popover.
     * See the [Popper.js Documentation](https://popper.js.org/popper-documentation.html) for details.
     * @type {?}
     */
    PopoverDirective.prototype.options;
    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     * @type {?}
     */
    PopoverDirective.prototype.fillControlMode;
    /**
     * Event emitted when the state of the isOpen property changes.
     * @type {?}
     */
    PopoverDirective.prototype.isOpenChange;
    /**
     * @type {?}
     * @private
     */
    PopoverDirective.prototype.containerRef;
    /**
     * @type {?}
     * @private
     */
    PopoverDirective.prototype.popper;
    /**
     * @type {?}
     * @private
     */
    PopoverDirective.prototype.eventRef;
    /**
     * @type {?}
     * @private
     */
    PopoverDirective.prototype.isSetup;
    /**
     * @type {?}
     * @private
     */
    PopoverDirective.prototype.elRef;
    /**
     * @type {?}
     * @private
     */
    PopoverDirective.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    PopoverDirective.prototype.resolver;
    /**
     * @type {?}
     * @private
     */
    PopoverDirective.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    PopoverDirective.prototype.appRef;
    /**
     * @type {?}
     * @private
     */
    PopoverDirective.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvcG9wb3Zlci9wb3BvdmVyLWRpcmVjdGl2ZS9wb3BvdmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsd0JBQXdCLEVBRXhCLFNBQVMsRUFDVCxVQUFVLEVBQW1CLFlBQVksRUFBRSxZQUFZLEVBQ3ZELFFBQVEsRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBRSxTQUFTLEVBRW5FLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sTUFBb0MsTUFBTSxXQUFXLENBQUM7Ozs7Ozs7Ozs7O0FBaUI3RCxNQUFNLE9BQU8sZ0JBQWdCOzs7Ozs7Ozs7O0lBNkV6QixZQUFvQixLQUFpQixFQUNqQixLQUF3QixFQUN4QixRQUFrQyxFQUNsQyxRQUFrQixFQUNsQixNQUFzQixFQUN0QixRQUFtQjtRQUxuQixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVzs7OztRQTFFdkMsV0FBTSxHQUFZLEtBQUssQ0FBQzs7Ozs7UUFLeEIsYUFBUSxHQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7UUFJL0IsWUFBTyxHQUFZLElBQUksQ0FBQzs7OztRQVN4QixpQkFBWSxHQUFZLEtBQUssQ0FBQzs7OztRQUk5QixxQkFBZ0IsR0FBWSxJQUFJLENBQUM7Ozs7UUFJakMsYUFBUSxHQUFZLEtBQUssQ0FBQzs7OztRQUkxQix3QkFBbUIsR0FBWSxJQUFJ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SUFDTCxDQUFDOzs7WUE1VUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2FBQzFCOzs7O1lBckJHLFVBQVU7WUFKVixpQkFBaUI7WUFDakIsd0JBQXdCO1lBSXhCLFFBQVE7WUFOUixjQUFjO1lBTXlDLFNBQVM7OztzQkF3Qi9ELEtBQUssU0FBQyxXQUFXO3FCQUlqQixLQUFLO3VCQUtMLEtBQUs7c0JBSUwsS0FBSzt3QkFLTCxLQUFLOzJCQUlMLEtBQUs7K0JBSUwsS0FBSzt1QkFJTCxLQUFLO2tDQUlMLEtBQUs7dUJBSUwsS0FBSztzQkFLTCxLQUFLOzhCQWtCTCxLQUFLOzJCQUlMLE1BQU07MkJBeVBOLFlBQVksU0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Ozs7OztJQTFUMUMsbUNBQ21DOzs7OztJQUduQyxrQ0FDd0I7Ozs7OztJQUl4QixvQ0FDK0I7Ozs7O0lBRy9CLG1DQUN3Qjs7Ozs7O0lBSXhCLHFDQUNxQjs7Ozs7SUFHckIsd0NBQzhCOzs7OztJQUc5Qiw0Q0FDaUM7Ozs7O0lBR2pDLG9DQUMwQjs7Ozs7SUFHMUIsK0NBQ29DOzs7OztJQUdwQyxvQ0FDd0M7Ozs7OztJQUl4QyxtQ0FVRTs7Ozs7Ozs7SUFRRiwyQ0FDaUM7Ozs7O0lBR2pDLHdDQUNrRTs7Ozs7SUFFbEUsd0NBQXFEOzs7OztJQUNyRCxrQ0FBdUI7Ozs7O0lBQ3ZCLG9DQUFrQzs7Ozs7SUFDbEMsbUNBQWlDOzs7OztJQUdyQixpQ0FBeUI7Ozs7O0lBQ3pCLGlDQUFnQzs7Ozs7SUFDaEMsb0NBQTBDOzs7OztJQUMxQyxvQ0FBMEI7Ozs7O0lBQzFCLGtDQUE4Qjs7Ozs7SUFDOUIsb0NBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBcHBsaWNhdGlvblJlZixcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQ29tcG9uZW50UmVmLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFbGVtZW50UmVmLCBFbWJlZGRlZFZpZXdSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLFxuICAgIEluamVjdG9yLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZXMsXG4gICAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb3BvdmVyQ29udGFpbmVyIH0gZnJvbSAnLi9wb3BvdmVyLWNvbnRhaW5lcic7XG5pbXBvcnQgUG9wcGVyLCB7IFBsYWNlbWVudCwgUG9wcGVyT3B0aW9ucyB9IGZyb20gJ3BvcHBlci5qcyc7XG5cbmV4cG9ydCB0eXBlIFBvcG92ZXJGaWxsTW9kZSA9ICdhdC1sZWFzdCcgfCAnZXF1YWwnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB3aGljaCBtYW5hZ2VzIHRoZSBwb3BwZXIgYW5kIHBvcG92ZXIgY29tcG9uZW50cyBvZiB0aGUgbGlicmFyeS5cbiAqIEl0IGNhbiBiZSBhdHRhY2hlZCB0byBhbnkgZWxlbWVudC4gVG8gYmluZCBpdCB0byBhIGJvZHksIHVzZSB0aGUgZm9sbG93aW5nIHN5bnRheC5cbiAqIGBgYGh0bWxcbiAqIDxkaXYgW2ZkUG9wb3Zlcl09XCJ0ZW1wbGF0ZVwiPkNvbnRyb2wgRWxlbWVudDwvZGl2PlxuICogPG5nLXRlbXBsYXRlICN0ZW1wbGF0ZT5cbiAqICAgICBQb3BvdmVyIEJvZHlcbiAqIDwvbmctdGVtcGxhdGU+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbZmRQb3BvdmVyXSdcbn0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuXG4gICAgLyoqIENvbnRlbnQgb2YgdGhlIHBvcG92ZXIuIFVzZWQgdGhyb3VnaCB0aGUgYWN0dWFsIGRpcmVjdGl2ZSB0YWcuIEFjY2VwdHMgc3RyaW5ncyBvciBUZW1wbGF0ZVJlZnMuICovXG4gICAgQElucHV0KCdmZFBvcG92ZXInKVxuICAgIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT4gfCBzdHJpbmc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcG9wb3ZlciBpcyBvcGVuLiBDYW4gYmUgdXNlZCB0aHJvdWdoIHR3by13YXkgYmluZGluZy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFRoZSB0cmlnZ2VyIGV2ZW50cyB0aGF0IHdpbGwgb3Blbi9jbG9zZSB0aGUgcG9wb3Zlci5cbiAgICAgKiAgQWNjZXB0cyBhbnkgW0hUTUwgRE9NIEV2ZW50c10oaHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbS9qc3JlZi9kb21fb2JqX2V2ZW50LmFzcCkuICovXG4gICAgQElucHV0KClcbiAgICB0cmlnZ2Vyczogc3RyaW5nW10gPSBbJ2NsaWNrJ107XG5cbiAgICAvKiogV2hldGhlciB0aGUgcG9wb3ZlciBzaG91bGQgZGlzcGxheSB0aGUgZGVmYXVsdCBhcnJvdy4gKi9cbiAgICBASW5wdXQoKVxuICAgIG5vQXJyb3c6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFRoZSBwbGFjZW1lbnQgb2YgdGhlIHBvcG92ZXIuIEl0IGNhbiBiZSBvbmUgb2Y6IHRvcCwgdG9wLXN0YXJ0LCB0b3AtZW5kLCBib3R0b20sXG4gICAgICogIGJvdHRvbS1zdGFydCwgYm90dG9tLWVuZCwgcmlnaHQsIHJpZ2h0LXN0YXJ0LCByaWdodC1lbmQsIGxlZnQsIGxlZnQtc3RhcnQsIGxlZnQtZW5kLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcGxhY2VtZW50OiBQbGFjZW1lbnQ7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcG9wb3ZlciBzaG91bGQgYmUgZm9jdXNUcmFwcGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZm9jdXNUcmFwcGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcG9wb3ZlciBzaG91bGQgY2xvc2Ugd2hlbiB0aGUgZXNjYXBlIGtleSBpcyBwcmVzc2VkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2xvc2VPbkVzY2FwZUtleTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcG9wb3ZlciBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcG9wb3ZlciBzaG91bGQgY2xvc2Ugd2hlbiBhIGNsaWNrIGlzIG1hZGUgb3V0c2lkZSBpdHMgYm91bmRhcmllcy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFRoZSBlbGVtZW50IHRvIHdoaWNoIHRoZSBwb3BvdmVyIHNob3VsZCBiZSBhcHBlbmRlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGFwcGVuZFRvOiBIVE1MRWxlbWVudCB8ICdib2R5JyA9ICdib2R5JztcblxuICAgIC8qKiBUaGUgUG9wcGVyLmpzIG9wdGlvbnMgdG8gYXR0YWNoIHRvIHRoaXMgcG9wb3Zlci5cbiAgICAgKiBTZWUgdGhlIFtQb3BwZXIuanMgRG9jdW1lbnRhdGlvbl0oaHR0cHM6Ly9wb3BwZXIuanMub3JnL3BvcHBlci1kb2N1bWVudGF0aW9uLmh0bWwpIGZvciBkZXRhaWxzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgb3B0aW9uczogUG9wcGVyT3B0aW9ucyA9IHtcbiAgICAgICAgcGxhY2VtZW50OiAnYm90dG9tLXN0YXJ0JyxcbiAgICAgICAgbW9kaWZpZXJzOiB7XG4gICAgICAgICAgICBwcmV2ZW50T3ZlcmZsb3c6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVzY2FwZVdpdGhSZWZlcmVuY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgYm91bmRhcmllc0VsZW1lbnQ6ICdzY3JvbGxQYXJlbnQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHJlc2V0IG9wdGlvbnMgZm9yIHRoZSBwb3BvdmVyIGJvZHkgd2lkdGguXG4gICAgICogKiBgYXQtbGVhc3RgIHdpbGwgYXBwbHkgYSBtaW5pbXVtIHdpZHRoIHRvIHRoZSBib2R5IGVxdWl2YWxlbnQgdG8gdGhlIHdpZHRoIG9mIHRoZSBjb250cm9sLlxuICAgICAqICogYGVxdWFsYCB3aWxsIGFwcGx5IGEgd2lkdGggdG8gdGhlIGJvZHkgZXF1aXZhbGVudCB0byB0aGUgd2lkdGggb2YgdGhlIGNvbnRyb2wuXG4gICAgICogKiBMZWF2ZSBibGFuayBmb3Igbm8gZWZmZWN0LlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZmlsbENvbnRyb2xNb2RlOiBQb3BvdmVyRmlsbE1vZGU7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzdGF0ZSBvZiB0aGUgaXNPcGVuIHByb3BlcnR5IGNoYW5nZXMuICovXG4gICAgQE91dHB1dCgpXG4gICAgaXNPcGVuQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBwcml2YXRlIGNvbnRhaW5lclJlZjogQ29tcG9uZW50UmVmPFBvcG92ZXJDb250YWluZXI+O1xuICAgIHByaXZhdGUgcG9wcGVyOiBQb3BwZXI7XG4gICAgcHJpdmF0ZSBldmVudFJlZjogRnVuY3Rpb25bXSA9IFtdO1xuICAgIHByaXZhdGUgaXNTZXR1cDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0dXBGaWxsQmVoYXZpb3VyKCk7XG4gICAgICAgIHRoaXMuaW5pdFBsYWNlbWVudCgpO1xuXG4gICAgICAgIHRoaXMuYWRkVHJpZ2dlckxpc3RlbmVycygpO1xuICAgICAgICB0aGlzLmlzU2V0dXAgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBvcHBlcikge1xuICAgICAgICAgICAgdGhpcy5wb3BwZXIuZGVzdHJveSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyUmVmKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lDb250YWluZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGVzdHJveVRyaWdnZXJMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU2V0dXApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VzLnRyaWdnZXJzKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lUcmlnZ2VyTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUcmlnZ2VyTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VzLmlzT3Blbikge1xuICAgICAgICAgICAgaWYgKGNoYW5nZXMuaXNPcGVuLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VzLnBsYWNlbWVudCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0UGxhY2VtZW50KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGFuZ2VzLmZpbGxDb250cm9sKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldHVwRmlsbEJlaGF2aW91cigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBwb3BvdmVyIG9wZW4gc3RhdGUuXG4gICAgICovXG4gICAgcHVibGljIHRvZ2dsZShmaXJlRXZlbnQ6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5jbG9zZShmaXJlRXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcGVuKGZpcmVFdmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgcG9wb3Zlci5cbiAgICAgKi9cbiAgICBwdWJsaWMgb3BlbihmaXJlRXZlbnQ6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc09wZW4gJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ29udGFpbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmIChmaXJlRXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbkNoYW5nZS5lbWl0KHRoaXMuaXNPcGVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgcG9wb3Zlci5cbiAgICAgKi9cbiAgICBwdWJsaWMgY2xvc2UoZmlyZUV2ZW50OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUNvbnRhaW5lcigpO1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKGZpcmVFdmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuQ2hhbmdlLmVtaXQodGhpcy5pc09wZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9yY2VzIGFuIHVwZGF0ZSBvZiB0aGUgcG9wb3ZlcidzIHBvc2l0aW9uaW5nIGNhbGN1bGF0aW9uLlxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVQb3BwZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBvcHBlcikge1xuICAgICAgICAgICAgdGhpcy5wb3BwZXIuc2NoZWR1bGVVcGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQ29udGFpbmVyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXJSZWYpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoUG9wb3ZlckNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyUmVmID0gZmFjdG9yeS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG5cbiAgICAgICAgLy8gU2V0IGluc3RhbmNlIHByb3BlcnRpZXNcbiAgICAgICAgdGhpcy5jb250YWluZXJSZWYuaW5zdGFuY2UuY29udGV4dCA9IHRoaXM7XG4gICAgICAgIHRoaXMuY29udGFpbmVyUmVmLmluc3RhbmNlLmNvbnRlbnQgPSB0aGlzLmNvbnRlbnQ7XG4gICAgICAgIHRoaXMuY29udGFpbmVyUmVmLmluc3RhbmNlLmZvY3VzVHJhcHBlZCA9IHRoaXMuZm9jdXNUcmFwcGVkO1xuICAgICAgICB0aGlzLmNvbnRhaW5lclJlZi5pbnN0YW5jZS5ub0Fycm93ID0gdGhpcy5ub0Fycm93O1xuICAgICAgICB0aGlzLmNvbnRhaW5lclJlZi5pbnN0YW5jZS5jbG9zZU9uRXNjYXBlS2V5ID0gdGhpcy5jbG9zZU9uRXNjYXBlS2V5O1xuXG4gICAgICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcodGhpcy5jb250YWluZXJSZWYuaG9zdFZpZXcpO1xuICAgICAgICBjb25zdCBzZXR1cFJlZiA9IHRoaXMuY29udGFpbmVyUmVmLmluc3RhbmNlLmlzU2V0dXAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUG9wcGVyKCk7XG4gICAgICAgICAgICBzZXR1cFJlZi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjb250YWluZXJFbCA9ICh0aGlzLmNvbnRhaW5lclJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyRWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcHBlbmRUby5hcHBlbmRDaGlsZChjb250YWluZXJFbCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByaXZhdGUgZGVzdHJveVRyaWdnZXJMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmV2ZW50UmVmICYmIHRoaXMuZXZlbnRSZWYubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudFJlZi5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBldmVudCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50UmVmID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRyaWdnZXJMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXJzICYmIHRoaXMudHJpZ2dlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2Vycy5mb3JFYWNoKHRyaWdnZXIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRSZWYucHVzaCh0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsIHRyaWdnZXIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGVzdHJveUNvbnRhaW5lcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyUmVmKSB7XG4gICAgICAgICAgICB0aGlzLmFwcFJlZi5kZXRhY2hWaWV3KHRoaXMuY29udGFpbmVyUmVmLmhvc3RWaWV3KTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyUmVmLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyUmVmID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnBvcHBlcikge1xuICAgICAgICAgICAgdGhpcy5wb3BwZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5wb3BwZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVQb3BwZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucG9wcGVyID0gbmV3IFBvcHBlcihcbiAgICAgICAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCxcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbGxSZWZlcmVuY2UoZGF0YSk6IGFueSB7XG4gICAgICAgIGRhdGEub2Zmc2V0cy5wb3BwZXIubGVmdCA9IGRhdGEub2Zmc2V0cy5yZWZlcmVuY2UubGVmdDtcbiAgICAgICAgZGF0YS5vZmZzZXRzLnBvcHBlci5yaWdodCA9IGRhdGEub2Zmc2V0cy5yZWZlcmVuY2UucmlnaHQ7XG4gICAgICAgIGRhdGEub2Zmc2V0cy5wb3BwZXIud2lkdGggPSBkYXRhLnN0eWxlcy53aWR0aCA9IGRhdGEub2Zmc2V0cy5yZWZlcmVuY2Uud2lkdGg7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXRMZWFzdFJlZmVyZW5jZShkYXRhKTogYW55IHtcbiAgICAgICAgZGF0YS5vZmZzZXRzLnBvcHBlci5sZWZ0ID0gZGF0YS5vZmZzZXRzLnJlZmVyZW5jZS5sZWZ0O1xuICAgICAgICBkYXRhLm9mZnNldHMucG9wcGVyLnJpZ2h0ID0gZGF0YS5vZmZzZXRzLnJlZmVyZW5jZS5yaWdodDtcbiAgICAgICAgZGF0YS5zdHlsZXMubWluV2lkdGggPSBkYXRhLm9mZnNldHMucmVmZXJlbmNlLndpZHRoICsgJ3B4JztcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0UGxhY2VtZW50KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wbGFjZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMucGxhY2VtZW50ID0gdGhpcy5wbGFjZW1lbnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHtwbGFjZW1lbnQ6IHRoaXMucGxhY2VtZW50fVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXR1cEZpbGxCZWhhdmlvdXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmZpbGxDb250cm9sTW9kZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubW9kaWZpZXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLm1vZGlmaWVycy5maWxsUmVmZXJlbmNlID0ge1xuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmbjogdGhpcy5maWxsQ29udHJvbE1vZGUgPT09ICdlcXVhbCcgPyB0aGlzLmZpbGxSZWZlcmVuY2UgOiB0aGlzLmF0TGVhc3RSZWZlcmVuY2UsXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyOiA4NDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsUmVmZXJlbmNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbjogdGhpcy5maWxsQ29udHJvbE1vZGUgPT09ICdlcXVhbCcgPyB0aGlzLmZpbGxSZWZlcmVuY2UgOiB0aGlzLmF0TGVhc3RSZWZlcmVuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXI6IDg0MFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICAgIGNsaWNrSGFuZGxlcihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXJSZWYgJiZcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuICYmXG4gICAgICAgICAgICB0aGlzLmNsb3NlT25PdXRzaWRlQ2xpY2sgJiZcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldCAhPT0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50ICYmXG4gICAgICAgICAgICAhdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgJiZcbiAgICAgICAgICAgICF0aGlzLmNvbnRhaW5lclJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==