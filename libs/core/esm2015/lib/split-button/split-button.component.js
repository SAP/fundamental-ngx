/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { SplitButtonActionTitle } from './split-button-utils/split-button.directives';
/**
 * Split Button component, used to enhance standard HTML button and add possibility to put some dropdown with
 * additional options.
 *
 * ```html
 *    <fd-split-button>
 *        Action Button
 *        <div fd-split-button-menu>
 *            <fd-menu>
 *                <ul fd-menu-list>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option</a>
 *                    </li>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option2</a>
 *                    </li>
 *                </ul>
 *            </fd-menu>
 *        </div>
 *    </fd-split-button>
 * ```
 */
export class SplitButtonComponent {
    constructor() {
        /**
         * The trigger events that will open/close the popover.
         *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
         */
        this.triggers = ['click'];
        /**
         * Whether the popover should close when a click is made outside its boundaries.
         */
        this.closeOnOutsideClick = true;
        /**
         * Whether the popover should close when the escape key is pressed.
         */
        this.closeOnEscapeKey = true;
        /**
         * Whether the popover should be focusTrapped.
         */
        this.focusTrapped = false;
        /**
         * The icon to include in the button. See the icon page for the list of icons.
         */
        this.glyph = 'slim-arrow-down';
        /**
         * Preset options for the popover body width.
         * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
         * * `equal` will apply a width to the body equivalent to the width of the control.
         * * Leave blank for no effect.
         */
        this.fillControlMode = 'at-least';
        /**
         * @hidden
         */
        this.isOpen = false;
        /**
         * Event sent when is open popover changed
         */
        this.isOpenChange = new EventEmitter();
        /**
         * Event sent when primary button is clicked
         */
        this.primaryButtonClicked = new EventEmitter();
    }
    /**
     *  Handles primary button click
     *
     * @param {?} $event
     * @return {?}
     */
    buttonClick($event) {
        this.primaryButtonClicked.emit();
        $event.stopPropagation();
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
}
SplitButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-split-button',
                template: "<fd-popover [(isOpen)]=\"isOpen\"\n            [focusTrapped]=\"focusTrapped\"\n            [closeOnEscapeKey]=\"closeOnEscapeKey\"\n            [closeOnOutsideClick]=\"closeOnOutsideClick\"\n            [disabled]=\"disabled\"\n            [triggers]=\"triggers\"\n            [fillControlMode]=\"fillControlMode\">\n    <fd-popover-control>\n        <div class=\"fd-button-split\">\n            <button fd-button\n                    [fdType]=\"fdType\"\n                    [options]=\"options\"\n                    [compact]=\"compact\"\n                    (click)=\"buttonClick($event)\"\n                    [disabled]=\"disabled\">\n                <ng-container *ngIf=\"titleTemplate\">\n                    <ng-container [fd-split-button-load-action-title]=\"titleTemplate\"></ng-container>\n                </ng-container>\n                <ng-container *ngIf=\"!titleTemplate\">\n                    {{mainActionTitle}}\n                </ng-container>\n            </button>\n            <button fd-button\n                    [attr.aria-expanded]=\"disabled ? false : isOpen\"\n                    [attr.aria-disabled]=\"disabled\"\n                    aria-haspopup=\"true\"\n                    [fdType]=\"fdType\"\n                    [options]=\"options\"\n                    [compact]=\"compact\"\n                    [glyph]=\"glyph\">\n            </button>\n        </div>\n    </fd-popover-control>\n    <fd-popover-body>\n        <ng-content select=\"[fd-split-button-menu]\"></ng-content>\n    </fd-popover-body>\n</fd-popover>\n"
            }] }
];
SplitButtonComponent.propDecorators = {
    titleTemplate: [{ type: ContentChild, args: [SplitButtonActionTitle, { read: TemplateRef },] }],
    triggers: [{ type: Input }],
    closeOnOutsideClick: [{ type: Input }],
    closeOnEscapeKey: [{ type: Input }],
    focusTrapped: [{ type: Input }],
    compact: [{ type: Input }],
    glyph: [{ type: Input }],
    disabled: [{ type: Input }],
    mainActionTitle: [{ type: Input }],
    fdType: [{ type: Input }],
    options: [{ type: Input }],
    fillControlMode: [{ type: Input }],
    isOpen: [{ type: Input }],
    isOpenChange: [{ type: Output }],
    primaryButtonClicked: [{ type: Output }]
};
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    SplitButtonComponent.prototype.titleTemplate;
    /**
     * The trigger events that will open/close the popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     * @type {?}
     */
    SplitButtonComponent.prototype.triggers;
    /**
     * Whether the popover should close when a click is made outside its boundaries.
     * @type {?}
     */
    SplitButtonComponent.prototype.closeOnOutsideClick;
    /**
     * Whether the popover should close when the escape key is pressed.
     * @type {?}
     */
    SplitButtonComponent.prototype.closeOnEscapeKey;
    /**
     * Whether the popover should be focusTrapped.
     * @type {?}
     */
    SplitButtonComponent.prototype.focusTrapped;
    /**
     * Whether to apply compact mode to the button.
     * @type {?}
     */
    SplitButtonComponent.prototype.compact;
    /**
     * The icon to include in the button. See the icon page for the list of icons.
     * @type {?}
     */
    SplitButtonComponent.prototype.glyph;
    /**
     * The icon to include in the button. See the icon page for the list of icons.
     * @type {?}
     */
    SplitButtonComponent.prototype.disabled;
    /**
     * The Title for main  action button
     * @type {?}
     */
    SplitButtonComponent.prototype.mainActionTitle;
    /**
     * The type of the button. Types include 'standard', 'positive', 'medium', and 'negative'.
     * Leave empty for default (Action button).'
     * @type {?}
     */
    SplitButtonComponent.prototype.fdType;
    /**
     * Button options.  Options include 'emphasized' and 'light'. Leave empty for default.'
     * @type {?}
     */
    SplitButtonComponent.prototype.options;
    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     * @type {?}
     */
    SplitButtonComponent.prototype.fillControlMode;
    /**
     * @hidden
     * @type {?}
     */
    SplitButtonComponent.prototype.isOpen;
    /**
     * Event sent when is open popover changed
     * @type {?}
     */
    SplitButtonComponent.prototype.isOpenChange;
    /**
     * Event sent when primary button is clicked
     * @type {?}
     */
    SplitButtonComponent.prototype.primaryButtonClicked;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQtYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zcGxpdC1idXR0b24vc3BsaXQtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZCdEYsTUFBTSxPQUFPLG9CQUFvQjtJQUpqQzs7Ozs7UUFhSSxhQUFRLEdBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7OztRQUkvQix3QkFBbUIsR0FBWSxJQUFJLENBQUM7Ozs7UUFJcEMscUJBQWdCLEdBQVksSUFBSSxDQUFDOzs7O1FBSWpDLGlCQUFZLEdBQVksS0FBSyxDQUFDOzs7O1FBUTlCLFVBQUssR0FBVyxpQkFBaUIsQ0FBQzs7Ozs7OztRQTBCbEMsb0JBQWUsR0FBb0IsVUFBVSxDQUFDOzs7O1FBSTlDLFdBQU0sR0FBWSxLQUFLLENBQUM7Ozs7UUFJZixpQkFBWSxHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDOzs7O1FBSWxFLHlCQUFvQixHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO0lBeUN2RixDQUFDOzs7Ozs7O0lBcENVLFdBQVcsQ0FBQyxNQUFNO1FBQ3JCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFLTSxNQUFNO1FBQ1QsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjtJQUNMLENBQUM7Ozs7O0lBS00sS0FBSztRQUNSLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7Ozs7O0lBS00sSUFBSTtRQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQzs7O1lBOUdKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixnaURBQTBDO2FBQzdDOzs7NEJBSUksWUFBWSxTQUFDLHNCQUFzQixFQUFFLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBQzt1QkFLeEQsS0FBSztrQ0FJTCxLQUFLOytCQUlMLEtBQUs7MkJBSUwsS0FBSztzQkFJTCxLQUFLO29CQUlMLEtBQUs7dUJBSUwsS0FBSzs4QkFJTCxLQUFLO3FCQUtMLEtBQUs7c0JBSUwsS0FBSzs4QkFTTCxLQUFLO3FCQUlMLEtBQUs7MkJBSUwsTUFBTTttQ0FJTixNQUFNOzs7Ozs7O0lBL0RQLDZDQUNnQzs7Ozs7O0lBSWhDLHdDQUMrQjs7Ozs7SUFHL0IsbURBQ29DOzs7OztJQUdwQyxnREFDaUM7Ozs7O0lBR2pDLDRDQUM4Qjs7Ozs7SUFHOUIsdUNBQ2lCOzs7OztJQUdqQixxQ0FDa0M7Ozs7O0lBR2xDLHdDQUNrQjs7Ozs7SUFHbEIsK0NBQ3dCOzs7Ozs7SUFJeEIsc0NBQ2U7Ozs7O0lBR2YsdUNBQzJCOzs7Ozs7OztJQVEzQiwrQ0FDOEM7Ozs7O0lBRzlDLHNDQUN3Qjs7Ozs7SUFHeEIsNENBQzJFOzs7OztJQUczRSxvREFDbUYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3BsaXRCdXR0b25BY3Rpb25UaXRsZSB9IGZyb20gJy4vc3BsaXQtYnV0dG9uLXV0aWxzL3NwbGl0LWJ1dHRvbi5kaXJlY3RpdmVzJztcbmltcG9ydCB7IFBvcG92ZXJGaWxsTW9kZSB9IGZyb20gJy4uL3BvcG92ZXIvcG9wb3Zlci1kaXJlY3RpdmUvcG9wb3Zlci5kaXJlY3RpdmUnO1xuXG4vKipcbiAqIFNwbGl0IEJ1dHRvbiBjb21wb25lbnQsIHVzZWQgdG8gZW5oYW5jZSBzdGFuZGFyZCBIVE1MIGJ1dHRvbiBhbmQgYWRkIHBvc3NpYmlsaXR5IHRvIHB1dCBzb21lIGRyb3Bkb3duIHdpdGhcbiAqIGFkZGl0aW9uYWwgb3B0aW9ucy5cbiAqXG4gKiBgYGBodG1sXG4gKiAgICA8ZmQtc3BsaXQtYnV0dG9uPlxuICogICAgICAgIEFjdGlvbiBCdXR0b25cbiAqICAgICAgICA8ZGl2IGZkLXNwbGl0LWJ1dHRvbi1tZW51PlxuICogICAgICAgICAgICA8ZmQtbWVudT5cbiAqICAgICAgICAgICAgICAgIDx1bCBmZC1tZW51LWxpc3Q+XG4gKiAgICAgICAgICAgICAgICAgICAgPGxpIGZkLW1lbnUtaXRlbT5cbiAqICAgICAgICAgICAgICAgICAgICAgICA8YSBbcm91dGVyTGlua109XCInLydcIj5vcHRpb248L2E+XG4gKiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAqICAgICAgICAgICAgICAgICAgICA8bGkgZmQtbWVudS1pdGVtPlxuICogICAgICAgICAgICAgICAgICAgICAgIDxhIFtyb3V0ZXJMaW5rXT1cIicvJ1wiPm9wdGlvbjI8L2E+XG4gKiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAqICAgICAgICAgICAgICAgIDwvdWw+XG4gKiAgICAgICAgICAgIDwvZmQtbWVudT5cbiAqICAgICAgICA8L2Rpdj5cbiAqICAgIDwvZmQtc3BsaXQtYnV0dG9uPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtc3BsaXQtYnV0dG9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJ3NwbGl0LWJ1dHRvbi5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgU3BsaXRCdXR0b25Db21wb25lbnQge1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAQ29udGVudENoaWxkKFNwbGl0QnV0dG9uQWN0aW9uVGl0bGUsIHtyZWFkOiBUZW1wbGF0ZVJlZn0pXG4gICAgdGl0bGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKiBUaGUgdHJpZ2dlciBldmVudHMgdGhhdCB3aWxsIG9wZW4vY2xvc2UgdGhlIHBvcG92ZXIuXG4gICAgICogIEFjY2VwdHMgYW55IFtIVE1MIERPTSBFdmVudHNdKGh0dHBzOi8vd3d3Lnczc2Nob29scy5jb20vanNyZWYvZG9tX29ial9ldmVudC5hc3ApLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgdHJpZ2dlcnM6IHN0cmluZ1tdID0gWydjbGljayddO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHBvcG92ZXIgc2hvdWxkIGNsb3NlIHdoZW4gYSBjbGljayBpcyBtYWRlIG91dHNpZGUgaXRzIGJvdW5kYXJpZXMuICovXG4gICAgQElucHV0KClcbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwb3BvdmVyIHNob3VsZCBjbG9zZSB3aGVuIHRoZSBlc2NhcGUga2V5IGlzIHByZXNzZWQuICovXG4gICAgQElucHV0KClcbiAgICBjbG9zZU9uRXNjYXBlS2V5OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwb3BvdmVyIHNob3VsZCBiZSBmb2N1c1RyYXBwZWQuICovXG4gICAgQElucHV0KClcbiAgICBmb2N1c1RyYXBwZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRvIGFwcGx5IGNvbXBhY3QgbW9kZSB0byB0aGUgYnV0dG9uLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29tcGFjdDogYm9vbGVhbjtcblxuICAgIC8qKiBUaGUgaWNvbiB0byBpbmNsdWRlIGluIHRoZSBidXR0b24uIFNlZSB0aGUgaWNvbiBwYWdlIGZvciB0aGUgbGlzdCBvZiBpY29ucy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdseXBoOiBzdHJpbmcgPSAnc2xpbS1hcnJvdy1kb3duJztcblxuICAgIC8qKiBUaGUgaWNvbiB0byBpbmNsdWRlIGluIHRoZSBidXR0b24uIFNlZSB0aGUgaWNvbiBwYWdlIGZvciB0aGUgbGlzdCBvZiBpY29ucy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgLyoqIFRoZSBUaXRsZSBmb3IgbWFpbiAgYWN0aW9uIGJ1dHRvbiAqL1xuICAgIEBJbnB1dCgpXG4gICAgbWFpbkFjdGlvblRpdGxlOiBzdHJpbmc7XG5cbiAgICAvKiogVGhlIHR5cGUgb2YgdGhlIGJ1dHRvbi4gVHlwZXMgaW5jbHVkZSAnc3RhbmRhcmQnLCAncG9zaXRpdmUnLCAnbWVkaXVtJywgYW5kICduZWdhdGl2ZScuXG4gICAgICogTGVhdmUgZW1wdHkgZm9yIGRlZmF1bHQgKEFjdGlvbiBidXR0b24pLicqL1xuICAgIEBJbnB1dCgpXG4gICAgZmRUeXBlOiBzdHJpbmc7XG5cbiAgICAvKiogQnV0dG9uIG9wdGlvbnMuICBPcHRpb25zIGluY2x1ZGUgJ2VtcGhhc2l6ZWQnIGFuZCAnbGlnaHQnLiBMZWF2ZSBlbXB0eSBmb3IgZGVmYXVsdC4nICovXG4gICAgQElucHV0KClcbiAgICBvcHRpb25zOiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIFByZXNldCBvcHRpb25zIGZvciB0aGUgcG9wb3ZlciBib2R5IHdpZHRoLlxuICAgICAqICogYGF0LWxlYXN0YCB3aWxsIGFwcGx5IGEgbWluaW11bSB3aWR0aCB0byB0aGUgYm9keSBlcXVpdmFsZW50IHRvIHRoZSB3aWR0aCBvZiB0aGUgY29udHJvbC5cbiAgICAgKiAqIGBlcXVhbGAgd2lsbCBhcHBseSBhIHdpZHRoIHRvIHRoZSBib2R5IGVxdWl2YWxlbnQgdG8gdGhlIHdpZHRoIG9mIHRoZSBjb250cm9sLlxuICAgICAqICogTGVhdmUgYmxhbmsgZm9yIG5vIGVmZmVjdC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGZpbGxDb250cm9sTW9kZTogUG9wb3ZlckZpbGxNb2RlID0gJ2F0LWxlYXN0JztcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQElucHV0KClcbiAgICBpc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBFdmVudCBzZW50IHdoZW4gaXMgb3BlbiBwb3BvdmVyIGNoYW5nZWQgKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBpc09wZW5DaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIC8qKiBFdmVudCBzZW50IHdoZW4gcHJpbWFyeSBidXR0b24gaXMgY2xpY2tlZCAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IHByaW1hcnlCdXR0b25DbGlja2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKipcbiAgICAgKiAgSGFuZGxlcyBwcmltYXJ5IGJ1dHRvbiBjbGlja1xuICAgICAqICAqL1xuICAgIHB1YmxpYyBidXR0b25DbGljaygkZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wcmltYXJ5QnV0dG9uQ2xpY2tlZC5lbWl0KCk7XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBwb3BvdmVyIG9wZW4gc3RhdGUuXG4gICAgICovXG4gICAgcHVibGljIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgcG9wb3Zlci5cbiAgICAgKi9cbiAgICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuQ2hhbmdlLmVtaXQodGhpcy5pc09wZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgdGhlIHBvcG92ZXIuXG4gICAgICovXG4gICAgcHVibGljIG9wZW4oKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuQ2hhbmdlLmVtaXQodGhpcy5pc09wZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=