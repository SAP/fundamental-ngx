/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ViewEncapsulation, ContentChild } from '@angular/core';
import { PopoverDirective } from './popover-directive/popover.directive';
import { PopoverDropdownComponent } from './popover-dropdown/popover-dropdown.component';
/** @type {?} */
var popoverUniqueId = 0;
/**
 * The popover is a wrapping component that accepts a *control* as well as a *body*.
 * The control is what will trigger the opening of the actual popover, which is called the body.
 * By default, popovers are triggered by click. This can be customized through the *triggers* input.
 * PopoverComponent is an abstraction of PopoverDirective.
 */
var PopoverComponent = /** @class */ (function () {
    function PopoverComponent() {
        /**
         * Whether the popover should have an arrow.
         */
        this.noArrow = true;
        /**
         * Whether the popover is disabled.
         */
        this.disabled = false;
        /**
         * Whether the popover should be treated as a dropdown.
         */
        this.isDropdown = false;
        /**
         * The trigger events that will open/close the popover.
         *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
         */
        this.triggers = ['click'];
        /**
         * Whether the popover is open. Can be used through two-way binding.
         */
        this.isOpen = false;
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
         * Whether the popover should be focusTrapped.
         */
        this.focusTrapped = false;
        /**
         * Whether the popover should close when a click is made outside its boundaries.
         */
        this.closeOnOutsideClick = true;
        /**
         * Whether the popover should close when the escape key is pressed.
         */
        this.closeOnEscapeKey = true;
        /**
         * Event emitted when the state of the isOpen property changes.
         */
        this.isOpenChange = new EventEmitter();
        /**
         * Id of the popover. If none is provided, one will be generated.
         */
        this.id = 'fd-popover-' + popoverUniqueId++;
    }
    /**
     * Toggles the popover open state.
     */
    /**
     * Toggles the popover open state.
     * @return {?}
     */
    PopoverComponent.prototype.toggle = /**
     * Toggles the popover open state.
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Closes the popover.
     */
    /**
     * Closes the popover.
     * @return {?}
     */
    PopoverComponent.prototype.close = /**
     * Closes the popover.
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
    };
    /**
     * Opens the popover.
     */
    /**
     * Opens the popover.
     * @return {?}
     */
    PopoverComponent.prototype.open = /**
     * Opens the popover.
     * @return {?}
     */
    function () {
        if (!this.isOpen) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    };
    /**
     * Forces an update of the popover's positioning calculation.
     */
    /**
     * Forces an update of the popover's positioning calculation.
     * @return {?}
     */
    PopoverComponent.prototype.updatePopover = /**
     * Forces an update of the popover's positioning calculation.
     * @return {?}
     */
    function () {
        this.directiveRef.updatePopper();
    };
    /**
     * Function is called every time popover changes open attribute
     */
    /**
     * Function is called every time popover changes open attribute
     * @param {?} isOpen
     * @return {?}
     */
    PopoverComponent.prototype.openChanged = /**
     * Function is called every time popover changes open attribute
     * @param {?} isOpen
     * @return {?}
     */
    function (isOpen) {
        this.isOpenChange.emit(isOpen);
        this.updateDropdownIsOpen(isOpen);
    };
    /** @hidden
     *  Function that allows us to control aria-expanded on dropdown child
     * */
    /**
     * @hidden
     *  Function that allows us to control aria-expanded on dropdown child
     *
     * @private
     * @param {?} isOpen
     * @return {?}
     */
    PopoverComponent.prototype.updateDropdownIsOpen = /**
     * @hidden
     *  Function that allows us to control aria-expanded on dropdown child
     *
     * @private
     * @param {?} isOpen
     * @return {?}
     */
    function (isOpen) {
        if (this.dropdownComponent) {
            this.dropdownComponent.isOpen = isOpen;
        }
    };
    PopoverComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-popover',
                    template: "<div #popoverContainer>\n    <div class=\"fd-popover__control\"\n         [attr.aria-expanded]=\"this.disabled ? false : isOpen\"\n         [attr.aria-disabled]=\"this.disabled\"\n         aria-haspopup=\"true\"\n         [fdPopover]=\"popoverBody\"\n         [(isOpen)]=\"isOpen\"\n         (isOpenChange)=\"openChanged($event)\"\n         [noArrow]=\"noArrow\"\n         [disabled]=\"disabled\"\n         [triggers]=\"triggers\"\n         [placement]=\"placement\"\n         [focusTrapped]=\"focusTrapped\"\n         [options]=\"options\"\n         [fillControlMode]=\"fillControlMode\"\n         [closeOnOutsideClick]=\"closeOnOutsideClick\"\n         [closeOnEscapeKey]=\"closeOnEscapeKey\"\n         [appendTo]=\"(appendTo ? appendTo : popoverContainer)\">\n        <ng-content select=\"fd-popover-control\"></ng-content>\n        <ng-content select=\"fd-dropdown-control\"></ng-content>\n    </div>\n    <ng-template #popoverBody>\n        <ng-container *ngTemplateOutlet=\"popoverBodyTpl\"></ng-container>\n    </ng-template>\n</div>\n\n<ng-template #popoverBodyTpl>\n    <div [attr.aria-hidden]=\"disabled ? true : !isOpen\">\n        <ng-content select=\"fd-popover-body\"></ng-content>\n    </div>\n</ng-template>\n",
                    host: {
                        '[class.fd-popover-custom]': 'true',
                        '[attr.id]': 'id'
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-popover-custom{margin-right:0;display:inline-block}.fd-popover-custom .fd-dropdown{position:static}"]
                }] }
    ];
    PopoverComponent.propDecorators = {
        directiveRef: [{ type: ViewChild, args: [PopoverDirective,] }],
        dropdownComponent: [{ type: ContentChild, args: [PopoverDropdownComponent,] }],
        noArrow: [{ type: Input }],
        disabled: [{ type: Input }],
        isDropdown: [{ type: Input }],
        appendTo: [{ type: Input }],
        triggers: [{ type: Input }],
        placement: [{ type: Input }],
        isOpen: [{ type: Input }],
        options: [{ type: Input }],
        focusTrapped: [{ type: Input }],
        fillControlMode: [{ type: Input }],
        closeOnOutsideClick: [{ type: Input }],
        closeOnEscapeKey: [{ type: Input }],
        isOpenChange: [{ type: Output }],
        id: [{ type: Input }]
    };
    return PopoverComponent;
}());
export { PopoverComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    PopoverComponent.prototype.directiveRef;
    /**
     * @hidden
     * @type {?}
     */
    PopoverComponent.prototype.dropdownComponent;
    /**
     * Whether the popover should have an arrow.
     * @type {?}
     */
    PopoverComponent.prototype.noArrow;
    /**
     * Whether the popover is disabled.
     * @type {?}
     */
    PopoverComponent.prototype.disabled;
    /**
     * Whether the popover should be treated as a dropdown.
     * @type {?}
     */
    PopoverComponent.prototype.isDropdown;
    /**
     * The element to which the popover should be appended.
     * @type {?}
     */
    PopoverComponent.prototype.appendTo;
    /**
     * The trigger events that will open/close the popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     * @type {?}
     */
    PopoverComponent.prototype.triggers;
    /**
     * The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     * @type {?}
     */
    PopoverComponent.prototype.placement;
    /**
     * Whether the popover is open. Can be used through two-way binding.
     * @type {?}
     */
    PopoverComponent.prototype.isOpen;
    /**
     * The Popper.js options to attach to this popover.
     * See the [Popper.js Documentation](https://popper.js.org/popper-documentation.html) for details.
     * @type {?}
     */
    PopoverComponent.prototype.options;
    /**
     * Whether the popover should be focusTrapped.
     * @type {?}
     */
    PopoverComponent.prototype.focusTrapped;
    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     * @type {?}
     */
    PopoverComponent.prototype.fillControlMode;
    /**
     * Whether the popover should close when a click is made outside its boundaries.
     * @type {?}
     */
    PopoverComponent.prototype.closeOnOutsideClick;
    /**
     * Whether the popover should close when the escape key is pressed.
     * @type {?}
     */
    PopoverComponent.prototype.closeOnEscapeKey;
    /**
     * Event emitted when the state of the isOpen property changes.
     * @type {?}
     */
    PopoverComponent.prototype.isOpenChange;
    /**
     * Id of the popover. If none is provided, one will be generated.
     * @type {?}
     */
    PopoverComponent.prototype.id;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvcG9wb3Zlci9wb3BvdmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixTQUFTLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxFQUM3QyxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQW1CLE1BQU0sdUNBQXVDLENBQUM7QUFDMUYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0NBQStDLENBQUM7O0lBRXJGLGVBQWUsR0FBVyxDQUFDOzs7Ozs7O0FBUS9CO0lBQUE7Ozs7UUFvQkksWUFBTyxHQUFZLElBQUksQ0FBQzs7OztRQUl4QixhQUFRLEdBQVksS0FBSyxDQUFDOzs7O1FBSTFCLGVBQVUsR0FBWSxLQUFLLENBQUM7Ozs7O1FBUzVCLGFBQVEsR0FBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7O1FBUy9CLFdBQU0sR0FBWSxLQUFLLENBQUM7Ozs7O1FBS3hCLFlBQU8sR0FBa0I7WUFDckIsU0FBUyxFQUFFLGNBQWM7WUFDekIsU0FBUyxFQUFFO2dCQUNQLGVBQWUsRUFBRTtvQkFDYixPQUFPLEVBQUUsSUFBSTtvQkFDYixtQkFBbUIsRUFBRSxJQUFJO29CQUN6QixpQkFBaUIsRUFBRSxjQUFjO2lCQUNwQzthQUNKO1NBQ0osQ0FBQzs7OztRQUlGLGlCQUFZLEdBQVksS0FBSyxDQUFDOzs7O1FBYTlCLHdCQUFtQixHQUFZLElBQUksQ0FBQzs7OztRQUlwQyxxQkFBZ0IsR0FBWSxJQUFJLENBQUM7Ozs7UUFJakMsaUJBQVksR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQzs7OztRQUlsRSxPQUFFLEdBQVcsYUFBYSxHQUFHLGVBQWUsRUFBRSxDQUFDO0lBMERuRCxDQUFDO0lBeERHOztPQUVHOzs7OztJQUNJLGlDQUFNOzs7O0lBQWI7UUFDSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNJLGdDQUFLOzs7O0lBQVo7UUFDSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0ksK0JBQUk7Ozs7SUFBWDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNJLHdDQUFhOzs7O0lBQXBCO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNJLHNDQUFXOzs7OztJQUFsQixVQUFtQixNQUFlO1FBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBR0Q7O1NBRUs7Ozs7Ozs7OztJQUNHLCtDQUFvQjs7Ozs7Ozs7SUFBNUIsVUFBNkIsTUFBZTtRQUN4QyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUMxQztJQUNMLENBQUM7O2dCQWpKSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLHF0Q0FBdUM7b0JBRXZDLElBQUksRUFBRTt3QkFDRiwyQkFBMkIsRUFBRSxNQUFNO3dCQUNuQyxXQUFXLEVBQUUsSUFBSTtxQkFDcEI7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN4Qzs7OytCQUlJLFNBQVMsU0FBQyxnQkFBZ0I7b0NBRzFCLFlBQVksU0FBQyx3QkFBd0I7MEJBR3JDLEtBQUs7MkJBSUwsS0FBSzs2QkFJTCxLQUFLOzJCQUlMLEtBQUs7MkJBS0wsS0FBSzs0QkFLTCxLQUFLO3lCQUlMLEtBQUs7MEJBS0wsS0FBSzsrQkFhTCxLQUFLO2tDQVNMLEtBQUs7c0NBSUwsS0FBSzttQ0FJTCxLQUFLOytCQUlMLE1BQU07cUJBSU4sS0FBSzs7SUEyRFYsdUJBQUM7Q0FBQSxBQW5KRCxJQW1KQztTQXpJWSxnQkFBZ0I7Ozs7OztJQUd6Qix3Q0FDK0I7Ozs7O0lBRS9CLDZDQUFvRjs7Ozs7SUFHcEYsbUNBQ3dCOzs7OztJQUd4QixvQ0FDMEI7Ozs7O0lBRzFCLHNDQUM0Qjs7Ozs7SUFHNUIsb0NBQytCOzs7Ozs7SUFJL0Isb0NBQytCOzs7Ozs7SUFJL0IscUNBQ3FCOzs7OztJQUdyQixrQ0FDd0I7Ozs7OztJQUl4QixtQ0FVRTs7Ozs7SUFHRix3Q0FDOEI7Ozs7Ozs7O0lBUTlCLDJDQUNpQzs7Ozs7SUFHakMsK0NBQ29DOzs7OztJQUdwQyw0Q0FDaUM7Ozs7O0lBR2pDLHdDQUNrRTs7Ozs7SUFHbEUsOEJBQytDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDb250ZW50Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQbGFjZW1lbnQsIFBvcHBlck9wdGlvbnMgfSBmcm9tICdwb3BwZXIuanMnO1xuaW1wb3J0IHsgUG9wb3ZlckRpcmVjdGl2ZSwgUG9wb3ZlckZpbGxNb2RlIH0gZnJvbSAnLi9wb3BvdmVyLWRpcmVjdGl2ZS9wb3BvdmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQb3BvdmVyRHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuL3BvcG92ZXItZHJvcGRvd24vcG9wb3Zlci1kcm9wZG93bi5jb21wb25lbnQnO1xuXG5sZXQgcG9wb3ZlclVuaXF1ZUlkOiBudW1iZXIgPSAwO1xuXG4vKipcbiAqIFRoZSBwb3BvdmVyIGlzIGEgd3JhcHBpbmcgY29tcG9uZW50IHRoYXQgYWNjZXB0cyBhICpjb250cm9sKiBhcyB3ZWxsIGFzIGEgKmJvZHkqLlxuICogVGhlIGNvbnRyb2wgaXMgd2hhdCB3aWxsIHRyaWdnZXIgdGhlIG9wZW5pbmcgb2YgdGhlIGFjdHVhbCBwb3BvdmVyLCB3aGljaCBpcyBjYWxsZWQgdGhlIGJvZHkuXG4gKiBCeSBkZWZhdWx0LCBwb3BvdmVycyBhcmUgdHJpZ2dlcmVkIGJ5IGNsaWNrLiBUaGlzIGNhbiBiZSBjdXN0b21pemVkIHRocm91Z2ggdGhlICp0cmlnZ2VycyogaW5wdXQuXG4gKiBQb3BvdmVyQ29tcG9uZW50IGlzIGFuIGFic3RyYWN0aW9uIG9mIFBvcG92ZXJEaXJlY3RpdmUuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtcG9wb3ZlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BvcG92ZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3BvcG92ZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MuZmQtcG9wb3Zlci1jdXN0b21dJzogJ3RydWUnLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyQ29tcG9uZW50IHtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQFZpZXdDaGlsZChQb3BvdmVyRGlyZWN0aXZlKVxuICAgIGRpcmVjdGl2ZVJlZjogUG9wb3ZlckRpcmVjdGl2ZTtcbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBDb250ZW50Q2hpbGQoUG9wb3ZlckRyb3Bkb3duQ29tcG9uZW50KSBkcm9wZG93bkNvbXBvbmVudDogUG9wb3ZlckRyb3Bkb3duQ29tcG9uZW50O1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHBvcG92ZXIgc2hvdWxkIGhhdmUgYW4gYXJyb3cuICovXG4gICAgQElucHV0KClcbiAgICBub0Fycm93OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwb3BvdmVyIGlzIGRpc2FibGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwb3BvdmVyIHNob3VsZCBiZSB0cmVhdGVkIGFzIGEgZHJvcGRvd24uICovXG4gICAgQElucHV0KClcbiAgICBpc0Ryb3Bkb3duOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogVGhlIGVsZW1lbnQgdG8gd2hpY2ggdGhlIHBvcG92ZXIgc2hvdWxkIGJlIGFwcGVuZGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgYXBwZW5kVG86IEhUTUxFbGVtZW50IHwgJ2JvZHknO1xuXG4gICAgLyoqIFRoZSB0cmlnZ2VyIGV2ZW50cyB0aGF0IHdpbGwgb3Blbi9jbG9zZSB0aGUgcG9wb3Zlci5cbiAgICAgKiAgQWNjZXB0cyBhbnkgW0hUTUwgRE9NIEV2ZW50c10oaHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbS9qc3JlZi9kb21fb2JqX2V2ZW50LmFzcCkuICovXG4gICAgQElucHV0KClcbiAgICB0cmlnZ2Vyczogc3RyaW5nW10gPSBbJ2NsaWNrJ107XG5cbiAgICAvKiogVGhlIHBsYWNlbWVudCBvZiB0aGUgcG9wb3Zlci4gSXQgY2FuIGJlIG9uZSBvZjogdG9wLCB0b3Atc3RhcnQsIHRvcC1lbmQsIGJvdHRvbSxcbiAgICAgKiAgYm90dG9tLXN0YXJ0LCBib3R0b20tZW5kLCByaWdodCwgcmlnaHQtc3RhcnQsIHJpZ2h0LWVuZCwgbGVmdCwgbGVmdC1zdGFydCwgbGVmdC1lbmQuICovXG4gICAgQElucHV0KClcbiAgICBwbGFjZW1lbnQ6IFBsYWNlbWVudDtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwb3BvdmVyIGlzIG9wZW4uIENhbiBiZSB1c2VkIHRocm91Z2ggdHdvLXdheSBiaW5kaW5nLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogVGhlIFBvcHBlci5qcyBvcHRpb25zIHRvIGF0dGFjaCB0byB0aGlzIHBvcG92ZXIuXG4gICAgICogU2VlIHRoZSBbUG9wcGVyLmpzIERvY3VtZW50YXRpb25dKGh0dHBzOi8vcG9wcGVyLmpzLm9yZy9wb3BwZXItZG9jdW1lbnRhdGlvbi5odG1sKSBmb3IgZGV0YWlscy4gKi9cbiAgICBASW5wdXQoKVxuICAgIG9wdGlvbnM6IFBvcHBlck9wdGlvbnMgPSB7XG4gICAgICAgIHBsYWNlbWVudDogJ2JvdHRvbS1zdGFydCcsXG4gICAgICAgIG1vZGlmaWVyczoge1xuICAgICAgICAgICAgcHJldmVudE92ZXJmbG93OiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlc2NhcGVXaXRoUmVmZXJlbmNlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGJvdW5kYXJpZXNFbGVtZW50OiAnc2Nyb2xsUGFyZW50J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwb3BvdmVyIHNob3VsZCBiZSBmb2N1c1RyYXBwZWQuICovXG4gICAgQElucHV0KClcbiAgICBmb2N1c1RyYXBwZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFByZXNldCBvcHRpb25zIGZvciB0aGUgcG9wb3ZlciBib2R5IHdpZHRoLlxuICAgICAqICogYGF0LWxlYXN0YCB3aWxsIGFwcGx5IGEgbWluaW11bSB3aWR0aCB0byB0aGUgYm9keSBlcXVpdmFsZW50IHRvIHRoZSB3aWR0aCBvZiB0aGUgY29udHJvbC5cbiAgICAgKiAqIGBlcXVhbGAgd2lsbCBhcHBseSBhIHdpZHRoIHRvIHRoZSBib2R5IGVxdWl2YWxlbnQgdG8gdGhlIHdpZHRoIG9mIHRoZSBjb250cm9sLlxuICAgICAqICogTGVhdmUgYmxhbmsgZm9yIG5vIGVmZmVjdC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGZpbGxDb250cm9sTW9kZTogUG9wb3ZlckZpbGxNb2RlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHBvcG92ZXIgc2hvdWxkIGNsb3NlIHdoZW4gYSBjbGljayBpcyBtYWRlIG91dHNpZGUgaXRzIGJvdW5kYXJpZXMuICovXG4gICAgQElucHV0KClcbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwb3BvdmVyIHNob3VsZCBjbG9zZSB3aGVuIHRoZSBlc2NhcGUga2V5IGlzIHByZXNzZWQuICovXG4gICAgQElucHV0KClcbiAgICBjbG9zZU9uRXNjYXBlS2V5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHN0YXRlIG9mIHRoZSBpc09wZW4gcHJvcGVydHkgY2hhbmdlcy4gKi9cbiAgICBAT3V0cHV0KClcbiAgICBpc09wZW5DaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIC8qKiBJZCBvZiB0aGUgcG9wb3Zlci4gSWYgbm9uZSBpcyBwcm92aWRlZCwgb25lIHdpbGwgYmUgZ2VuZXJhdGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgaWQ6IHN0cmluZyA9ICdmZC1wb3BvdmVyLScgKyBwb3BvdmVyVW5pcXVlSWQrKztcblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIHBvcG92ZXIgb3BlbiBzdGF0ZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSBwb3BvdmVyLlxuICAgICAqL1xuICAgIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2UuZW1pdCh0aGlzLmlzT3Blbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgcG9wb3Zlci5cbiAgICAgKi9cbiAgICBwdWJsaWMgb3BlbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2UuZW1pdCh0aGlzLmlzT3Blbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb3JjZXMgYW4gdXBkYXRlIG9mIHRoZSBwb3BvdmVyJ3MgcG9zaXRpb25pbmcgY2FsY3VsYXRpb24uXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZVBvcG92ZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUmVmLnVwZGF0ZVBvcHBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGlzIGNhbGxlZCBldmVyeSB0aW1lIHBvcG92ZXIgY2hhbmdlcyBvcGVuIGF0dHJpYnV0ZVxuICAgICAqL1xuICAgIHB1YmxpYyBvcGVuQ2hhbmdlZChpc09wZW46IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2UuZW1pdChpc09wZW4pO1xuICAgICAgICB0aGlzLnVwZGF0ZURyb3Bkb3duSXNPcGVuKGlzT3Blbik7XG4gICAgfVxuXG5cbiAgICAvKiogQGhpZGRlblxuICAgICAqICBGdW5jdGlvbiB0aGF0IGFsbG93cyB1cyB0byBjb250cm9sIGFyaWEtZXhwYW5kZWQgb24gZHJvcGRvd24gY2hpbGRcbiAgICAgKiAqL1xuICAgIHByaXZhdGUgdXBkYXRlRHJvcGRvd25Jc09wZW4oaXNPcGVuOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLmRyb3Bkb3duQ29tcG9uZW50KSB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duQ29tcG9uZW50LmlzT3BlbiA9IGlzT3BlbjtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19