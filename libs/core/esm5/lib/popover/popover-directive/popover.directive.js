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
var PopoverDirective = /** @class */ (function () {
    /** @hidden */
    function PopoverDirective(elRef, cdRef, resolver, injector, appRef, renderer) {
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
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    PopoverDirective.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            this.open();
        }
        this.setupFillBehaviour();
        this.initPlacement();
        this.addTriggerListeners();
        this.isSetup = true;
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    PopoverDirective.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.popper) {
            this.popper.destroy();
        }
        if (this.containerRef) {
            this.destroyContainer();
        }
        this.destroyTriggerListeners();
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    PopoverDirective.prototype.ngOnChanges = /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (!this.isSetup) {
            return;
        }
        if (changes.triggers) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.destroyTriggerListeners();
                _this.addTriggerListeners();
            }));
        }
        if (changes.isOpen) {
            if (changes.isOpen.currentValue) {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.isOpen = false;
                    _this.open(false);
                }));
            }
            else {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.isOpen = true;
                    _this.close(false);
                }));
            }
        }
        if (changes.placement) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.initPlacement();
            }));
        }
        if (changes.fillControl) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.setupFillBehaviour();
            }));
        }
    };
    /**
     * Toggles the popover open state.
     */
    /**
     * Toggles the popover open state.
     * @param {?=} fireEvent
     * @return {?}
     */
    PopoverDirective.prototype.toggle = /**
     * Toggles the popover open state.
     * @param {?=} fireEvent
     * @return {?}
     */
    function (fireEvent) {
        if (fireEvent === void 0) { fireEvent = true; }
        if (this.isOpen) {
            this.close(fireEvent);
        }
        else {
            this.open(fireEvent);
        }
    };
    /**
     * Opens the popover.
     */
    /**
     * Opens the popover.
     * @param {?=} fireEvent
     * @return {?}
     */
    PopoverDirective.prototype.open = /**
     * Opens the popover.
     * @param {?=} fireEvent
     * @return {?}
     */
    function (fireEvent) {
        if (fireEvent === void 0) { fireEvent = true; }
        if (!this.isOpen && !this.disabled) {
            this.createContainer();
            this.isOpen = true;
            if (fireEvent) {
                this.isOpenChange.emit(this.isOpen);
            }
        }
    };
    /**
     * Closes the popover.
     */
    /**
     * Closes the popover.
     * @param {?=} fireEvent
     * @return {?}
     */
    PopoverDirective.prototype.close = /**
     * Closes the popover.
     * @param {?=} fireEvent
     * @return {?}
     */
    function (fireEvent) {
        if (fireEvent === void 0) { fireEvent = true; }
        if (this.isOpen) {
            this.destroyContainer();
            this.isOpen = false;
            if (fireEvent) {
                this.isOpenChange.emit(this.isOpen);
            }
        }
    };
    /**
     * Forces an update of the popover's positioning calculation.
     */
    /**
     * Forces an update of the popover's positioning calculation.
     * @return {?}
     */
    PopoverDirective.prototype.updatePopper = /**
     * Forces an update of the popover's positioning calculation.
     * @return {?}
     */
    function () {
        if (this.popper) {
            this.popper.scheduleUpdate();
        }
    };
    /**
     * @private
     * @return {?}
     */
    PopoverDirective.prototype.createContainer = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.containerRef) {
            return;
        }
        /** @type {?} */
        var factory = this.resolver.resolveComponentFactory(PopoverContainer);
        this.containerRef = factory.create(this.injector);
        // Set instance properties
        this.containerRef.instance.context = this;
        this.containerRef.instance.content = this.content;
        this.containerRef.instance.focusTrapped = this.focusTrapped;
        this.containerRef.instance.noArrow = this.noArrow;
        this.containerRef.instance.closeOnEscapeKey = this.closeOnEscapeKey;
        this.appRef.attachView(this.containerRef.hostView);
        /** @type {?} */
        var setupRef = this.containerRef.instance.isSetup.subscribe((/**
         * @return {?}
         */
        function () {
            _this.createPopper();
            setupRef.unsubscribe();
        }));
        /** @type {?} */
        var containerEl = (/** @type {?} */ (((/** @type {?} */ (this.containerRef.hostView))).rootNodes[0]));
        if (this.appendTo === 'body') {
            document.body.appendChild(containerEl);
        }
        else {
            this.appendTo.appendChild(containerEl);
        }
    };
    /**
     * @private
     * @return {?}
     */
    PopoverDirective.prototype.destroyTriggerListeners = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.eventRef && this.eventRef.length > 0) {
            this.eventRef.forEach((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                event();
            }));
            this.eventRef = [];
        }
    };
    /**
     * @private
     * @return {?}
     */
    PopoverDirective.prototype.addTriggerListeners = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.triggers && this.triggers.length > 0) {
            this.triggers.forEach((/**
             * @param {?} trigger
             * @return {?}
             */
            function (trigger) {
                _this.eventRef.push(_this.renderer.listen(_this.elRef.nativeElement, trigger, (/**
                 * @return {?}
                 */
                function () {
                    _this.toggle();
                })));
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    PopoverDirective.prototype.destroyContainer = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.containerRef) {
            this.appRef.detachView(this.containerRef.hostView);
            this.containerRef.destroy();
            this.containerRef = null;
        }
        if (this.popper) {
            this.popper.destroy();
            this.popper = null;
        }
    };
    /**
     * @private
     * @return {?}
     */
    PopoverDirective.prototype.createPopper = /**
     * @private
     * @return {?}
     */
    function () {
        this.popper = new Popper((/** @type {?} */ (this.elRef.nativeElement)), (/** @type {?} */ (this.containerRef.location.nativeElement)), this.options);
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    PopoverDirective.prototype.fillReference = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        data.offsets.popper.left = data.offsets.reference.left;
        data.offsets.popper.right = data.offsets.reference.right;
        data.offsets.popper.width = data.styles.width = data.offsets.reference.width;
        return data;
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    PopoverDirective.prototype.atLeastReference = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        data.offsets.popper.left = data.offsets.reference.left;
        data.offsets.popper.right = data.offsets.reference.right;
        data.styles.minWidth = data.offsets.reference.width + 'px';
        return data;
    };
    /**
     * @private
     * @return {?}
     */
    PopoverDirective.prototype.initPlacement = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.placement) {
            if (this.options) {
                this.options.placement = this.placement;
            }
            else {
                this.options = { placement: this.placement };
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    PopoverDirective.prototype.setupFillBehaviour = /**
     * @private
     * @return {?}
     */
    function () {
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
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    PopoverDirective.prototype.clickHandler = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    PopoverDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fdPopover]'
                },] }
    ];
    /** @nocollapse */
    PopoverDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: ComponentFactoryResolver },
        { type: Injector },
        { type: ApplicationRef },
        { type: Renderer2 }
    ]; };
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
    return PopoverDirective;
}());
export { PopoverDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvcG9wb3Zlci9wb3BvdmVyLWRpcmVjdGl2ZS9wb3BvdmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsd0JBQXdCLEVBRXhCLFNBQVMsRUFDVCxVQUFVLEVBQW1CLFlBQVksRUFBRSxZQUFZLEVBQ3ZELFFBQVEsRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBRSxTQUFTLEVBRW5FLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sTUFBb0MsTUFBTSxXQUFXLENBQUM7Ozs7Ozs7Ozs7O0FBYzdEO0lBK0VJLGNBQWM7SUFDZCwwQkFBb0IsS0FBaUIsRUFDakIsS0FBd0IsRUFDeEIsUUFBa0MsRUFDbEMsUUFBa0IsRUFDbEIsTUFBc0IsRUFDdEIsUUFBbUI7UUFMbkIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN4QixhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7Ozs7UUExRXZDLFdBQU0sR0FBWSxLQUFLLENBQUM7Ozs7O1FBS3hCLGFBQVEsR0FBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7O1FBSS9CLFlBQU8sR0FBWSxJQUFJLENBQUM7Ozs7UUFTeEIsaUJBQVksR0FBWSxLQUFLLENBQUM7Ozs7UUFJOUIscUJBQWdCLEdBQVksSUFBSSxDQUFDOzs7O1FBSWpDLGFBQVEsR0FBWSxLQUFLLENBQUM7Ozs7UUFJMUIsd0JBQW1CLEdBQVksSUFBSSxDQUFDOzs7O1FBSXBDLGFB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O0lBQ2xDLG1DQUFpQzs7Ozs7SUFHckIsaUNBQXlCOzs7OztJQUN6QixpQ0FBZ0M7Ozs7O0lBQ2hDLG9DQUEwQzs7Ozs7SUFDMUMsb0NBQTBCOzs7OztJQUMxQixrQ0FBOEI7Ozs7O0lBQzlCLG9DQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQXBwbGljYXRpb25SZWYsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZiwgRW1iZWRkZWRWaWV3UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lcixcbiAgICBJbmplY3RvciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgUmVuZGVyZXIyLCBTaW1wbGVDaGFuZ2VzLFxuICAgIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbnRhaW5lciB9IGZyb20gJy4vcG9wb3Zlci1jb250YWluZXInO1xuaW1wb3J0IFBvcHBlciwgeyBQbGFjZW1lbnQsIFBvcHBlck9wdGlvbnMgfSBmcm9tICdwb3BwZXIuanMnO1xuXG5leHBvcnQgdHlwZSBQb3BvdmVyRmlsbE1vZGUgPSAnYXQtbGVhc3QnIHwgJ2VxdWFsJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgd2hpY2ggbWFuYWdlcyB0aGUgcG9wcGVyIGFuZCBwb3BvdmVyIGNvbXBvbmVudHMgb2YgdGhlIGxpYnJhcnkuXG4gKiBJdCBjYW4gYmUgYXR0YWNoZWQgdG8gYW55IGVsZW1lbnQuIFRvIGJpbmQgaXQgdG8gYSBib2R5LCB1c2UgdGhlIGZvbGxvd2luZyBzeW50YXguXG4gKiBgYGBodG1sXG4gKiA8ZGl2IFtmZFBvcG92ZXJdPVwidGVtcGxhdGVcIj5Db250cm9sIEVsZW1lbnQ8L2Rpdj5cbiAqIDxuZy10ZW1wbGF0ZSAjdGVtcGxhdGU+XG4gKiAgICAgUG9wb3ZlciBCb2R5XG4gKiA8L25nLXRlbXBsYXRlPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2ZkUG9wb3Zlcl0nXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcblxuICAgIC8qKiBDb250ZW50IG9mIHRoZSBwb3BvdmVyLiBVc2VkIHRocm91Z2ggdGhlIGFjdHVhbCBkaXJlY3RpdmUgdGFnLiBBY2NlcHRzIHN0cmluZ3Mgb3IgVGVtcGxhdGVSZWZzLiAqL1xuICAgIEBJbnB1dCgnZmRQb3BvdmVyJylcbiAgICBjb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+IHwgc3RyaW5nO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHBvcG92ZXIgaXMgb3Blbi4gQ2FuIGJlIHVzZWQgdGhyb3VnaCB0d28td2F5IGJpbmRpbmcuICovXG4gICAgQElucHV0KClcbiAgICBpc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBUaGUgdHJpZ2dlciBldmVudHMgdGhhdCB3aWxsIG9wZW4vY2xvc2UgdGhlIHBvcG92ZXIuXG4gICAgICogIEFjY2VwdHMgYW55IFtIVE1MIERPTSBFdmVudHNdKGh0dHBzOi8vd3d3Lnczc2Nob29scy5jb20vanNyZWYvZG9tX29ial9ldmVudC5hc3ApLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgdHJpZ2dlcnM6IHN0cmluZ1tdID0gWydjbGljayddO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHBvcG92ZXIgc2hvdWxkIGRpc3BsYXkgdGhlIGRlZmF1bHQgYXJyb3cuICovXG4gICAgQElucHV0KClcbiAgICBub0Fycm93OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBUaGUgcGxhY2VtZW50IG9mIHRoZSBwb3BvdmVyLiBJdCBjYW4gYmUgb25lIG9mOiB0b3AsIHRvcC1zdGFydCwgdG9wLWVuZCwgYm90dG9tLFxuICAgICAqICBib3R0b20tc3RhcnQsIGJvdHRvbS1lbmQsIHJpZ2h0LCByaWdodC1zdGFydCwgcmlnaHQtZW5kLCBsZWZ0LCBsZWZ0LXN0YXJ0LCBsZWZ0LWVuZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHBsYWNlbWVudDogUGxhY2VtZW50O1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHBvcG92ZXIgc2hvdWxkIGJlIGZvY3VzVHJhcHBlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGZvY3VzVHJhcHBlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHBvcG92ZXIgc2hvdWxkIGNsb3NlIHdoZW4gdGhlIGVzY2FwZSBrZXkgaXMgcHJlc3NlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGNsb3NlT25Fc2NhcGVLZXk6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHBvcG92ZXIgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHBvcG92ZXIgc2hvdWxkIGNsb3NlIHdoZW4gYSBjbGljayBpcyBtYWRlIG91dHNpZGUgaXRzIGJvdW5kYXJpZXMuICovXG4gICAgQElucHV0KClcbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBUaGUgZWxlbWVudCB0byB3aGljaCB0aGUgcG9wb3ZlciBzaG91bGQgYmUgYXBwZW5kZWQuICovXG4gICAgQElucHV0KClcbiAgICBhcHBlbmRUbzogSFRNTEVsZW1lbnQgfCAnYm9keScgPSAnYm9keSc7XG5cbiAgICAvKiogVGhlIFBvcHBlci5qcyBvcHRpb25zIHRvIGF0dGFjaCB0byB0aGlzIHBvcG92ZXIuXG4gICAgICogU2VlIHRoZSBbUG9wcGVyLmpzIERvY3VtZW50YXRpb25dKGh0dHBzOi8vcG9wcGVyLmpzLm9yZy9wb3BwZXItZG9jdW1lbnRhdGlvbi5odG1sKSBmb3IgZGV0YWlscy4gKi9cbiAgICBASW5wdXQoKVxuICAgIG9wdGlvbnM6IFBvcHBlck9wdGlvbnMgPSB7XG4gICAgICAgIHBsYWNlbWVudDogJ2JvdHRvbS1zdGFydCcsXG4gICAgICAgIG1vZGlmaWVyczoge1xuICAgICAgICAgICAgcHJldmVudE92ZXJmbG93OiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlc2NhcGVXaXRoUmVmZXJlbmNlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGJvdW5kYXJpZXNFbGVtZW50OiAnc2Nyb2xsUGFyZW50J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFByZXNldCBvcHRpb25zIGZvciB0aGUgcG9wb3ZlciBib2R5IHdpZHRoLlxuICAgICAqICogYGF0LWxlYXN0YCB3aWxsIGFwcGx5IGEgbWluaW11bSB3aWR0aCB0byB0aGUgYm9keSBlcXVpdmFsZW50IHRvIHRoZSB3aWR0aCBvZiB0aGUgY29udHJvbC5cbiAgICAgKiAqIGBlcXVhbGAgd2lsbCBhcHBseSBhIHdpZHRoIHRvIHRoZSBib2R5IGVxdWl2YWxlbnQgdG8gdGhlIHdpZHRoIG9mIHRoZSBjb250cm9sLlxuICAgICAqICogTGVhdmUgYmxhbmsgZm9yIG5vIGVmZmVjdC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGZpbGxDb250cm9sTW9kZTogUG9wb3ZlckZpbGxNb2RlO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc3RhdGUgb2YgdGhlIGlzT3BlbiBwcm9wZXJ0eSBjaGFuZ2VzLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIGlzT3BlbkNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgcHJpdmF0ZSBjb250YWluZXJSZWY6IENvbXBvbmVudFJlZjxQb3BvdmVyQ29udGFpbmVyPjtcbiAgICBwcml2YXRlIHBvcHBlcjogUG9wcGVyO1xuICAgIHByaXZhdGUgZXZlbnRSZWY6IEZ1bmN0aW9uW10gPSBbXTtcbiAgICBwcml2YXRlIGlzU2V0dXA6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldHVwRmlsbEJlaGF2aW91cigpO1xuICAgICAgICB0aGlzLmluaXRQbGFjZW1lbnQoKTtcblxuICAgICAgICB0aGlzLmFkZFRyaWdnZXJMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5pc1NldHVwID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wb3BwZXIpIHtcbiAgICAgICAgICAgIHRoaXMucG9wcGVyLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lclJlZikge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95Q29udGFpbmVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRlc3Ryb3lUcmlnZ2VyTGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc1NldHVwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlcy50cmlnZ2Vycykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95VHJpZ2dlckxpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkVHJpZ2dlckxpc3RlbmVycygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlcy5pc09wZW4pIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLmlzT3Blbi5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlcy5wbGFjZW1lbnQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBsYWNlbWVudCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlcy5maWxsQ29udHJvbCkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR1cEZpbGxCZWhhdmlvdXIoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyB0aGUgcG9wb3ZlciBvcGVuIHN0YXRlLlxuICAgICAqL1xuICAgIHB1YmxpYyB0b2dnbGUoZmlyZUV2ZW50OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoZmlyZUV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlbihmaXJlRXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgdGhlIHBvcG92ZXIuXG4gICAgICovXG4gICAgcHVibGljIG9wZW4oZmlyZUV2ZW50OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaXNPcGVuICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNvbnRhaW5lcigpO1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAoZmlyZUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2UuZW1pdCh0aGlzLmlzT3Blbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbG9zZXMgdGhlIHBvcG92ZXIuXG4gICAgICovXG4gICAgcHVibGljIGNsb3NlKGZpcmVFdmVudDogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lDb250YWluZXIoKTtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmIChmaXJlRXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbkNoYW5nZS5lbWl0KHRoaXMuaXNPcGVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvcmNlcyBhbiB1cGRhdGUgb2YgdGhlIHBvcG92ZXIncyBwb3NpdGlvbmluZyBjYWxjdWxhdGlvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlUG9wcGVyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wb3BwZXIpIHtcbiAgICAgICAgICAgIHRoaXMucG9wcGVyLnNjaGVkdWxlVXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUNvbnRhaW5lcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyUmVmKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFBvcG92ZXJDb250YWluZXIpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lclJlZiA9IGZhY3RvcnkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuXG4gICAgICAgIC8vIFNldCBpbnN0YW5jZSBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMuY29udGFpbmVyUmVmLmluc3RhbmNlLmNvbnRleHQgPSB0aGlzO1xuICAgICAgICB0aGlzLmNvbnRhaW5lclJlZi5pbnN0YW5jZS5jb250ZW50ID0gdGhpcy5jb250ZW50O1xuICAgICAgICB0aGlzLmNvbnRhaW5lclJlZi5pbnN0YW5jZS5mb2N1c1RyYXBwZWQgPSB0aGlzLmZvY3VzVHJhcHBlZDtcbiAgICAgICAgdGhpcy5jb250YWluZXJSZWYuaW5zdGFuY2Uubm9BcnJvdyA9IHRoaXMubm9BcnJvdztcbiAgICAgICAgdGhpcy5jb250YWluZXJSZWYuaW5zdGFuY2UuY2xvc2VPbkVzY2FwZUtleSA9IHRoaXMuY2xvc2VPbkVzY2FwZUtleTtcblxuICAgICAgICB0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KHRoaXMuY29udGFpbmVyUmVmLmhvc3RWaWV3KTtcbiAgICAgICAgY29uc3Qgc2V0dXBSZWYgPSB0aGlzLmNvbnRhaW5lclJlZi5pbnN0YW5jZS5pc1NldHVwLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVBvcHBlcigpO1xuICAgICAgICAgICAgc2V0dXBSZWYudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY29udGFpbmVyRWwgPSAodGhpcy5jb250YWluZXJSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcblxuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lckVsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kVG8uYXBwZW5kQ2hpbGQoY29udGFpbmVyRWwpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGRlc3Ryb3lUcmlnZ2VyTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5ldmVudFJlZiAmJiB0aGlzLmV2ZW50UmVmLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRSZWYuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5ldmVudFJlZiA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRUcmlnZ2VyTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50cmlnZ2VycyAmJiB0aGlzLnRyaWdnZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcnMuZm9yRWFjaCh0cmlnZ2VyID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50UmVmLnB1c2godGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCB0cmlnZ2VyLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRlc3Ryb3lDb250YWluZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lclJlZikge1xuICAgICAgICAgICAgdGhpcy5hcHBSZWYuZGV0YWNoVmlldyh0aGlzLmNvbnRhaW5lclJlZi5ob3N0Vmlldyk7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lclJlZi5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lclJlZiA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wb3BwZXIpIHtcbiAgICAgICAgICAgIHRoaXMucG9wcGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMucG9wcGVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlUG9wcGVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBvcHBlciA9IG5ldyBQb3BwZXIoXG4gICAgICAgICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lclJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50LFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaWxsUmVmZXJlbmNlKGRhdGEpOiBhbnkge1xuICAgICAgICBkYXRhLm9mZnNldHMucG9wcGVyLmxlZnQgPSBkYXRhLm9mZnNldHMucmVmZXJlbmNlLmxlZnQ7XG4gICAgICAgIGRhdGEub2Zmc2V0cy5wb3BwZXIucmlnaHQgPSBkYXRhLm9mZnNldHMucmVmZXJlbmNlLnJpZ2h0O1xuICAgICAgICBkYXRhLm9mZnNldHMucG9wcGVyLndpZHRoID0gZGF0YS5zdHlsZXMud2lkdGggPSBkYXRhLm9mZnNldHMucmVmZXJlbmNlLndpZHRoO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGF0TGVhc3RSZWZlcmVuY2UoZGF0YSk6IGFueSB7XG4gICAgICAgIGRhdGEub2Zmc2V0cy5wb3BwZXIubGVmdCA9IGRhdGEub2Zmc2V0cy5yZWZlcmVuY2UubGVmdDtcbiAgICAgICAgZGF0YS5vZmZzZXRzLnBvcHBlci5yaWdodCA9IGRhdGEub2Zmc2V0cy5yZWZlcmVuY2UucmlnaHQ7XG4gICAgICAgIGRhdGEuc3R5bGVzLm1pbldpZHRoID0gZGF0YS5vZmZzZXRzLnJlZmVyZW5jZS53aWR0aCArICdweCc7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFBsYWNlbWVudCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucGxhY2VtZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBsYWNlbWVudCA9IHRoaXMucGxhY2VtZW50O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSB7cGxhY2VtZW50OiB0aGlzLnBsYWNlbWVudH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0dXBGaWxsQmVoYXZpb3VyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5maWxsQ29udHJvbE1vZGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLm1vZGlmaWVycykge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RpZmllcnMuZmlsbFJlZmVyZW5jZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZm46IHRoaXMuZmlsbENvbnRyb2xNb2RlID09PSAnZXF1YWwnID8gdGhpcy5maWxsUmVmZXJlbmNlIDogdGhpcy5hdExlYXN0UmVmZXJlbmNlLFxuICAgICAgICAgICAgICAgICAgICBvcmRlcjogODQwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbFJlZmVyZW5jZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm46IHRoaXMuZmlsbENvbnRyb2xNb2RlID09PSAnZXF1YWwnID8gdGhpcy5maWxsUmVmZXJlbmNlIDogdGhpcy5hdExlYXN0UmVmZXJlbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyOiA4NDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgICBjbGlja0hhbmRsZXIoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyUmVmICYmXG4gICAgICAgICAgICB0aGlzLmlzT3BlbiAmJlxuICAgICAgICAgICAgdGhpcy5jbG9zZU9uT3V0c2lkZUNsaWNrICYmXG4gICAgICAgICAgICBldmVudC50YXJnZXQgIT09IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCAmJlxuICAgICAgICAgICAgIXRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpICYmXG4gICAgICAgICAgICAhdGhpcy5jb250YWluZXJSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=