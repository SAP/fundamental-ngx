/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ViewEncapsulation, ContentChild } from '@angular/core';
import { PopoverDirective } from './popover-directive/popover.directive';
import { PopoverDropdownComponent } from './popover-dropdown/popover-dropdown.component';
/** @type {?} */
let popoverUniqueId = 0;
/**
 * The popover is a wrapping component that accepts a *control* as well as a *body*.
 * The control is what will trigger the opening of the actual popover, which is called the body.
 * By default, popovers are triggered by click. This can be customized through the *triggers* input.
 * PopoverComponent is an abstraction of PopoverDirective.
 */
export class PopoverComponent {
    constructor() {
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
     * @return {?}
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Closes the popover.
     * @return {?}
     */
    close() {
        if (this.isOpen) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
    }
    /**
     * Opens the popover.
     * @return {?}
     */
    open() {
        if (!this.isOpen) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    }
    /**
     * Forces an update of the popover's positioning calculation.
     * @return {?}
     */
    updatePopover() {
        this.directiveRef.updatePopper();
    }
    /**
     * Function is called every time popover changes open attribute
     * @param {?} isOpen
     * @return {?}
     */
    openChanged(isOpen) {
        this.isOpenChange.emit(isOpen);
        this.updateDropdownIsOpen(isOpen);
    }
    /**
     * @hidden
     *  Function that allows us to control aria-expanded on dropdown child
     *
     * @private
     * @param {?} isOpen
     * @return {?}
     */
    updateDropdownIsOpen(isOpen) {
        if (this.dropdownComponent) {
            this.dropdownComponent.isOpen = isOpen;
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvcG9wb3Zlci9wb3BvdmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixTQUFTLEVBQUUsaUJBQWlCLEVBQUUsWUFBWSxFQUM3QyxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQW1CLE1BQU0sdUNBQXVDLENBQUM7QUFDMUYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0NBQStDLENBQUM7O0lBRXJGLGVBQWUsR0FBVyxDQUFDOzs7Ozs7O0FBa0IvQixNQUFNLE9BQU8sZ0JBQWdCO0lBVjdCOzs7O1FBb0JJLFlBQU8sR0FBWSxJQUFJLENBQUM7Ozs7UUFJeEIsYUFBUSxHQUFZLEtBQUssQ0FBQzs7OztRQUkxQixlQUFVLEdBQVksS0FBSyxDQUFDOzs7OztRQVM1QixhQUFRLEdBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7OztRQVMvQixXQUFNLEdBQVksS0FBSyxDQUFDOzs7OztRQUt4QixZQUFPLEdBQWtCO1lBQ3JCLFNBQVMsRUFBRSxjQUFjO1lBQ3pCLFNBQVMsRUFBRTtnQkFDUCxlQUFlLEVBQUU7b0JBQ2IsT0FBTyxFQUFFLElBQUk7b0JBQ2IsbUJBQW1CLEVBQUUsSUFBSTtvQkFDekIsaUJBQWlCLEVBQUUsY0FBYztpQkFDcEM7YUFDSjtTQUNKLENBQUM7Ozs7UUFJRixpQkFBWSxHQUFZLEtBQUssQ0FBQzs7OztRQWE5Qix3QkFBbUIsR0FBWSxJQUFJLENBQUM7Ozs7UUFJcEMscUJBQWdCLEdBQVksSUFBSSxDQUFDOzs7O1FBSWpDLGlCQUFZLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7Ozs7UUFJbEUsT0FBRSxHQUFXLGFBQWEsR0FBRyxlQUFlLEVBQUUsQ0FBQztJQTBEbkQsQ0FBQzs7Ozs7SUFyRFUsTUFBTTtRQUNULElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQjthQUFNO1lBQ0gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7SUFDTCxDQUFDOzs7OztJQUtNLEtBQUs7UUFDUixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkM7SUFDTCxDQUFDOzs7OztJQUtNLElBQUk7UUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7Ozs7O0lBS00sYUFBYTtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JDLENBQUM7Ozs7OztJQUtNLFdBQVcsQ0FBQyxNQUFlO1FBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7Ozs7Ozs7SUFNTyxvQkFBb0IsQ0FBQyxNQUFlO1FBQ3hDLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1NBQzFDO0lBQ0wsQ0FBQzs7O1lBakpKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIscXRDQUF1QztnQkFFdkMsSUFBSSxFQUFFO29CQUNGLDJCQUEyQixFQUFFLE1BQU07b0JBQ25DLFdBQVcsRUFBRSxJQUFJO2lCQUNwQjtnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDeEM7OzsyQkFJSSxTQUFTLFNBQUMsZ0JBQWdCO2dDQUcxQixZQUFZLFNBQUMsd0JBQXdCO3NCQUdyQyxLQUFLO3VCQUlMLEtBQUs7eUJBSUwsS0FBSzt1QkFJTCxLQUFLO3VCQUtMLEtBQUs7d0JBS0wsS0FBSztxQkFJTCxLQUFLO3NCQUtMLEtBQUs7MkJBYUwsS0FBSzs4QkFTTCxLQUFLO2tDQUlMLEtBQUs7K0JBSUwsS0FBSzsyQkFJTCxNQUFNO2lCQUlOLEtBQUs7Ozs7Ozs7SUEzRU4sd0NBQytCOzs7OztJQUUvQiw2Q0FBb0Y7Ozs7O0lBR3BGLG1DQUN3Qjs7Ozs7SUFHeEIsb0NBQzBCOzs7OztJQUcxQixzQ0FDNEI7Ozs7O0lBRzVCLG9DQUMrQjs7Ozs7O0lBSS9CLG9DQUMrQjs7Ozs7O0lBSS9CLHFDQUNxQjs7Ozs7SUFHckIsa0NBQ3dCOzs7Ozs7SUFJeEIsbUNBVUU7Ozs7O0lBR0Ysd0NBQzhCOzs7Ozs7OztJQVE5QiwyQ0FDaUM7Ozs7O0lBR2pDLCtDQUNvQzs7Ozs7SUFHcEMsNENBQ2lDOzs7OztJQUdqQyx3Q0FDa0U7Ozs7O0lBR2xFLDhCQUMrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbiwgQ29udGVudENoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGxhY2VtZW50LCBQb3BwZXJPcHRpb25zIH0gZnJvbSAncG9wcGVyLmpzJztcbmltcG9ydCB7IFBvcG92ZXJEaXJlY3RpdmUsIFBvcG92ZXJGaWxsTW9kZSB9IGZyb20gJy4vcG9wb3Zlci1kaXJlY3RpdmUvcG9wb3Zlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUG9wb3ZlckRyb3Bkb3duQ29tcG9uZW50IH0gZnJvbSAnLi9wb3BvdmVyLWRyb3Bkb3duL3BvcG92ZXItZHJvcGRvd24uY29tcG9uZW50JztcblxubGV0IHBvcG92ZXJVbmlxdWVJZDogbnVtYmVyID0gMDtcblxuLyoqXG4gKiBUaGUgcG9wb3ZlciBpcyBhIHdyYXBwaW5nIGNvbXBvbmVudCB0aGF0IGFjY2VwdHMgYSAqY29udHJvbCogYXMgd2VsbCBhcyBhICpib2R5Ki5cbiAqIFRoZSBjb250cm9sIGlzIHdoYXQgd2lsbCB0cmlnZ2VyIHRoZSBvcGVuaW5nIG9mIHRoZSBhY3R1YWwgcG9wb3Zlciwgd2hpY2ggaXMgY2FsbGVkIHRoZSBib2R5LlxuICogQnkgZGVmYXVsdCwgcG9wb3ZlcnMgYXJlIHRyaWdnZXJlZCBieSBjbGljay4gVGhpcyBjYW4gYmUgY3VzdG9taXplZCB0aHJvdWdoIHRoZSAqdHJpZ2dlcnMqIGlucHV0LlxuICogUG9wb3ZlckNvbXBvbmVudCBpcyBhbiBhYnN0cmFjdGlvbiBvZiBQb3BvdmVyRGlyZWN0aXZlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLXBvcG92ZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wb3BvdmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wb3BvdmVyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLmZkLXBvcG92ZXItY3VzdG9tXSc6ICd0cnVlJyxcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCdcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckNvbXBvbmVudCB7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBWaWV3Q2hpbGQoUG9wb3ZlckRpcmVjdGl2ZSlcbiAgICBkaXJlY3RpdmVSZWY6IFBvcG92ZXJEaXJlY3RpdmU7XG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAQ29udGVudENoaWxkKFBvcG92ZXJEcm9wZG93bkNvbXBvbmVudCkgZHJvcGRvd25Db21wb25lbnQ6IFBvcG92ZXJEcm9wZG93bkNvbXBvbmVudDtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwb3BvdmVyIHNob3VsZCBoYXZlIGFuIGFycm93LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgbm9BcnJvdzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcG9wb3ZlciBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcG9wb3ZlciBzaG91bGQgYmUgdHJlYXRlZCBhcyBhIGRyb3Bkb3duLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXNEcm9wZG93bjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFRoZSBlbGVtZW50IHRvIHdoaWNoIHRoZSBwb3BvdmVyIHNob3VsZCBiZSBhcHBlbmRlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGFwcGVuZFRvOiBIVE1MRWxlbWVudCB8ICdib2R5JztcblxuICAgIC8qKiBUaGUgdHJpZ2dlciBldmVudHMgdGhhdCB3aWxsIG9wZW4vY2xvc2UgdGhlIHBvcG92ZXIuXG4gICAgICogIEFjY2VwdHMgYW55IFtIVE1MIERPTSBFdmVudHNdKGh0dHBzOi8vd3d3Lnczc2Nob29scy5jb20vanNyZWYvZG9tX29ial9ldmVudC5hc3ApLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgdHJpZ2dlcnM6IHN0cmluZ1tdID0gWydjbGljayddO1xuXG4gICAgLyoqIFRoZSBwbGFjZW1lbnQgb2YgdGhlIHBvcG92ZXIuIEl0IGNhbiBiZSBvbmUgb2Y6IHRvcCwgdG9wLXN0YXJ0LCB0b3AtZW5kLCBib3R0b20sXG4gICAgICogIGJvdHRvbS1zdGFydCwgYm90dG9tLWVuZCwgcmlnaHQsIHJpZ2h0LXN0YXJ0LCByaWdodC1lbmQsIGxlZnQsIGxlZnQtc3RhcnQsIGxlZnQtZW5kLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcGxhY2VtZW50OiBQbGFjZW1lbnQ7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcG9wb3ZlciBpcyBvcGVuLiBDYW4gYmUgdXNlZCB0aHJvdWdoIHR3by13YXkgYmluZGluZy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFRoZSBQb3BwZXIuanMgb3B0aW9ucyB0byBhdHRhY2ggdG8gdGhpcyBwb3BvdmVyLlxuICAgICAqIFNlZSB0aGUgW1BvcHBlci5qcyBEb2N1bWVudGF0aW9uXShodHRwczovL3BvcHBlci5qcy5vcmcvcG9wcGVyLWRvY3VtZW50YXRpb24uaHRtbCkgZm9yIGRldGFpbHMuICovXG4gICAgQElucHV0KClcbiAgICBvcHRpb25zOiBQb3BwZXJPcHRpb25zID0ge1xuICAgICAgICBwbGFjZW1lbnQ6ICdib3R0b20tc3RhcnQnLFxuICAgICAgICBtb2RpZmllcnM6IHtcbiAgICAgICAgICAgIHByZXZlbnRPdmVyZmxvdzoge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZXNjYXBlV2l0aFJlZmVyZW5jZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBib3VuZGFyaWVzRWxlbWVudDogJ3Njcm9sbFBhcmVudCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKiogV2hldGhlciB0aGUgcG9wb3ZlciBzaG91bGQgYmUgZm9jdXNUcmFwcGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZm9jdXNUcmFwcGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBQcmVzZXQgb3B0aW9ucyBmb3IgdGhlIHBvcG92ZXIgYm9keSB3aWR0aC5cbiAgICAgKiAqIGBhdC1sZWFzdGAgd2lsbCBhcHBseSBhIG1pbmltdW0gd2lkdGggdG8gdGhlIGJvZHkgZXF1aXZhbGVudCB0byB0aGUgd2lkdGggb2YgdGhlIGNvbnRyb2wuXG4gICAgICogKiBgZXF1YWxgIHdpbGwgYXBwbHkgYSB3aWR0aCB0byB0aGUgYm9keSBlcXVpdmFsZW50IHRvIHRoZSB3aWR0aCBvZiB0aGUgY29udHJvbC5cbiAgICAgKiAqIExlYXZlIGJsYW5rIGZvciBubyBlZmZlY3QuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBmaWxsQ29udHJvbE1vZGU6IFBvcG92ZXJGaWxsTW9kZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwb3BvdmVyIHNob3VsZCBjbG9zZSB3aGVuIGEgY2xpY2sgaXMgbWFkZSBvdXRzaWRlIGl0cyBib3VuZGFyaWVzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2xvc2VPbk91dHNpZGVDbGljazogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcG9wb3ZlciBzaG91bGQgY2xvc2Ugd2hlbiB0aGUgZXNjYXBlIGtleSBpcyBwcmVzc2VkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2xvc2VPbkVzY2FwZUtleTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzdGF0ZSBvZiB0aGUgaXNPcGVuIHByb3BlcnR5IGNoYW5nZXMuICovXG4gICAgQE91dHB1dCgpXG4gICAgaXNPcGVuQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKiogSWQgb2YgdGhlIHBvcG92ZXIuIElmIG5vbmUgaXMgcHJvdmlkZWQsIG9uZSB3aWxsIGJlIGdlbmVyYXRlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGlkOiBzdHJpbmcgPSAnZmQtcG9wb3Zlci0nICsgcG9wb3ZlclVuaXF1ZUlkKys7XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBwb3BvdmVyIG9wZW4gc3RhdGUuXG4gICAgICovXG4gICAgcHVibGljIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgcG9wb3Zlci5cbiAgICAgKi9cbiAgICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuQ2hhbmdlLmVtaXQodGhpcy5pc09wZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgdGhlIHBvcG92ZXIuXG4gICAgICovXG4gICAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuQ2hhbmdlLmVtaXQodGhpcy5pc09wZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9yY2VzIGFuIHVwZGF0ZSBvZiB0aGUgcG9wb3ZlcidzIHBvc2l0aW9uaW5nIGNhbGN1bGF0aW9uLlxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVQb3BvdmVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpcmVjdGl2ZVJlZi51cGRhdGVQb3BwZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiBpcyBjYWxsZWQgZXZlcnkgdGltZSBwb3BvdmVyIGNoYW5nZXMgb3BlbiBhdHRyaWJ1dGVcbiAgICAgKi9cbiAgICBwdWJsaWMgb3BlbkNoYW5nZWQoaXNPcGVuOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaXNPcGVuQ2hhbmdlLmVtaXQoaXNPcGVuKTtcbiAgICAgICAgdGhpcy51cGRhdGVEcm9wZG93bklzT3Blbihpc09wZW4pO1xuICAgIH1cblxuXG4gICAgLyoqIEBoaWRkZW5cbiAgICAgKiAgRnVuY3Rpb24gdGhhdCBhbGxvd3MgdXMgdG8gY29udHJvbCBhcmlhLWV4cGFuZGVkIG9uIGRyb3Bkb3duIGNoaWxkXG4gICAgICogKi9cbiAgICBwcml2YXRlIHVwZGF0ZURyb3Bkb3duSXNPcGVuKGlzT3BlbjogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5kcm9wZG93bkNvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5kcm9wZG93bkNvbXBvbmVudC5pc09wZW4gPSBpc09wZW47XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==