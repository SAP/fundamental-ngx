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
var SplitButtonComponent = /** @class */ (function () {
    function SplitButtonComponent() {
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
     *  */
    /**
     *  Handles primary button click
     *
     * @param {?} $event
     * @return {?}
     */
    SplitButtonComponent.prototype.buttonClick = /**
     *  Handles primary button click
     *
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.primaryButtonClicked.emit();
        $event.stopPropagation();
    };
    /**
     * Toggles the popover open state.
     */
    /**
     * Toggles the popover open state.
     * @return {?}
     */
    SplitButtonComponent.prototype.toggle = /**
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
    SplitButtonComponent.prototype.close = /**
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
    SplitButtonComponent.prototype.open = /**
     * Opens the popover.
     * @return {?}
     */
    function () {
        if (!this.isOpen) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    };
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
    return SplitButtonComponent;
}());
export { SplitButtonComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQtYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zcGxpdC1idXR0b24vc3BsaXQtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCdEY7SUFBQTs7Ozs7UUFhSSxhQUFRLEdBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7OztRQUkvQix3QkFBbUIsR0FBWSxJQUFJLENBQUM7Ozs7UUFJcEMscUJBQWdCLEdBQVksSUFBSSxDQUFDOzs7O1FBSWpDLGlCQUFZLEdBQVksS0FBSyxDQUFDOzs7O1FBUTlCLFVBQUssR0FBVyxpQkFBaUIsQ0FBQzs7Ozs7OztRQTBCbEMsb0JBQWUsR0FBb0IsVUFBVSxDQUFDOzs7O1FBSTlDLFdBQU0sR0FBWSxLQUFLLENBQUM7Ozs7UUFJZixpQkFBWSxHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDOzs7O1FBSWxFLHlCQUFvQixHQUEwQixJQUFJLFlBQVksRUFBVyxDQUFDO0lBeUN2RixDQUFDO0lBdkNHOztVQUVNOzs7Ozs7O0lBQ0MsMENBQVc7Ozs7OztJQUFsQixVQUFtQixNQUFNO1FBQ3JCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNJLHFDQUFNOzs7O0lBQWI7UUFDSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNJLG9DQUFLOzs7O0lBQVo7UUFDSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0ksbUNBQUk7Ozs7SUFBWDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQzs7Z0JBOUdKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixnaURBQTBDO2lCQUM3Qzs7O2dDQUlJLFlBQVksU0FBQyxzQkFBc0IsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUM7MkJBS3hELEtBQUs7c0NBSUwsS0FBSzttQ0FJTCxLQUFLOytCQUlMLEtBQUs7MEJBSUwsS0FBSzt3QkFJTCxLQUFLOzJCQUlMLEtBQUs7a0NBSUwsS0FBSzt5QkFLTCxLQUFLOzBCQUlMLEtBQUs7a0NBU0wsS0FBSzt5QkFJTCxLQUFLOytCQUlMLE1BQU07dUNBSU4sTUFBTTs7SUEwQ1gsMkJBQUM7Q0FBQSxBQWhIRCxJQWdIQztTQTVHWSxvQkFBb0I7Ozs7OztJQUc3Qiw2Q0FDZ0M7Ozs7OztJQUloQyx3Q0FDK0I7Ozs7O0lBRy9CLG1EQUNvQzs7Ozs7SUFHcEMsZ0RBQ2lDOzs7OztJQUdqQyw0Q0FDOEI7Ozs7O0lBRzlCLHVDQUNpQjs7Ozs7SUFHakIscUNBQ2tDOzs7OztJQUdsQyx3Q0FDa0I7Ozs7O0lBR2xCLCtDQUN3Qjs7Ozs7O0lBSXhCLHNDQUNlOzs7OztJQUdmLHVDQUMyQjs7Ozs7Ozs7SUFRM0IsK0NBQzhDOzs7OztJQUc5QyxzQ0FDd0I7Ozs7O0lBR3hCLDRDQUMyRTs7Ozs7SUFHM0Usb0RBQ21GIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNwbGl0QnV0dG9uQWN0aW9uVGl0bGUgfSBmcm9tICcuL3NwbGl0LWJ1dHRvbi11dGlscy9zcGxpdC1idXR0b24uZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBQb3BvdmVyRmlsbE1vZGUgfSBmcm9tICcuLi9wb3BvdmVyL3BvcG92ZXItZGlyZWN0aXZlL3BvcG92ZXIuZGlyZWN0aXZlJztcblxuLyoqXG4gKiBTcGxpdCBCdXR0b24gY29tcG9uZW50LCB1c2VkIHRvIGVuaGFuY2Ugc3RhbmRhcmQgSFRNTCBidXR0b24gYW5kIGFkZCBwb3NzaWJpbGl0eSB0byBwdXQgc29tZSBkcm9wZG93biB3aXRoXG4gKiBhZGRpdGlvbmFsIG9wdGlvbnMuXG4gKlxuICogYGBgaHRtbFxuICogICAgPGZkLXNwbGl0LWJ1dHRvbj5cbiAqICAgICAgICBBY3Rpb24gQnV0dG9uXG4gKiAgICAgICAgPGRpdiBmZC1zcGxpdC1idXR0b24tbWVudT5cbiAqICAgICAgICAgICAgPGZkLW1lbnU+XG4gKiAgICAgICAgICAgICAgICA8dWwgZmQtbWVudS1saXN0PlxuICogICAgICAgICAgICAgICAgICAgIDxsaSBmZC1tZW51LWl0ZW0+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgPGEgW3JvdXRlckxpbmtdPVwiJy8nXCI+b3B0aW9uPC9hPlxuICogICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gKiAgICAgICAgICAgICAgICAgICAgPGxpIGZkLW1lbnUtaXRlbT5cbiAqICAgICAgICAgICAgICAgICAgICAgICA8YSBbcm91dGVyTGlua109XCInLydcIj5vcHRpb24yPC9hPlxuICogICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gKiAgICAgICAgICAgICAgICA8L3VsPlxuICogICAgICAgICAgICA8L2ZkLW1lbnU+XG4gKiAgICAgICAgPC9kaXY+XG4gKiAgICA8L2ZkLXNwbGl0LWJ1dHRvbj5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLXNwbGl0LWJ1dHRvbicsXG4gICAgdGVtcGxhdGVVcmw6ICdzcGxpdC1idXR0b24uY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0QnV0dG9uQ29tcG9uZW50IHtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQENvbnRlbnRDaGlsZChTcGxpdEJ1dHRvbkFjdGlvblRpdGxlLCB7cmVhZDogVGVtcGxhdGVSZWZ9KVxuICAgIHRpdGxlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKiogVGhlIHRyaWdnZXIgZXZlbnRzIHRoYXQgd2lsbCBvcGVuL2Nsb3NlIHRoZSBwb3BvdmVyLlxuICAgICAqICBBY2NlcHRzIGFueSBbSFRNTCBET00gRXZlbnRzXShodHRwczovL3d3dy53M3NjaG9vbHMuY29tL2pzcmVmL2RvbV9vYmpfZXZlbnQuYXNwKS4gKi9cbiAgICBASW5wdXQoKVxuICAgIHRyaWdnZXJzOiBzdHJpbmdbXSA9IFsnY2xpY2snXTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwb3BvdmVyIHNob3VsZCBjbG9zZSB3aGVuIGEgY2xpY2sgaXMgbWFkZSBvdXRzaWRlIGl0cyBib3VuZGFyaWVzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2xvc2VPbk91dHNpZGVDbGljazogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcG9wb3ZlciBzaG91bGQgY2xvc2Ugd2hlbiB0aGUgZXNjYXBlIGtleSBpcyBwcmVzc2VkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2xvc2VPbkVzY2FwZUtleTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcG9wb3ZlciBzaG91bGQgYmUgZm9jdXNUcmFwcGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZm9jdXNUcmFwcGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0byBhcHBseSBjb21wYWN0IG1vZGUgdG8gdGhlIGJ1dHRvbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbXBhY3Q6IGJvb2xlYW47XG5cbiAgICAvKiogVGhlIGljb24gdG8gaW5jbHVkZSBpbiB0aGUgYnV0dG9uLiBTZWUgdGhlIGljb24gcGFnZSBmb3IgdGhlIGxpc3Qgb2YgaWNvbnMuICovXG4gICAgQElucHV0KClcbiAgICBnbHlwaDogc3RyaW5nID0gJ3NsaW0tYXJyb3ctZG93bic7XG5cbiAgICAvKiogVGhlIGljb24gdG8gaW5jbHVkZSBpbiB0aGUgYnV0dG9uLiBTZWUgdGhlIGljb24gcGFnZSBmb3IgdGhlIGxpc3Qgb2YgaWNvbnMuICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKiBUaGUgVGl0bGUgZm9yIG1haW4gIGFjdGlvbiBidXR0b24gKi9cbiAgICBASW5wdXQoKVxuICAgIG1haW5BY3Rpb25UaXRsZTogc3RyaW5nO1xuXG4gICAgLyoqIFRoZSB0eXBlIG9mIHRoZSBidXR0b24uIFR5cGVzIGluY2x1ZGUgJ3N0YW5kYXJkJywgJ3Bvc2l0aXZlJywgJ21lZGl1bScsIGFuZCAnbmVnYXRpdmUnLlxuICAgICAqIExlYXZlIGVtcHR5IGZvciBkZWZhdWx0IChBY3Rpb24gYnV0dG9uKS4nKi9cbiAgICBASW5wdXQoKVxuICAgIGZkVHlwZTogc3RyaW5nO1xuXG4gICAgLyoqIEJ1dHRvbiBvcHRpb25zLiAgT3B0aW9ucyBpbmNsdWRlICdlbXBoYXNpemVkJyBhbmQgJ2xpZ2h0Jy4gTGVhdmUgZW1wdHkgZm9yIGRlZmF1bHQuJyAqL1xuICAgIEBJbnB1dCgpXG4gICAgb3B0aW9uczogc3RyaW5nIHwgc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBQcmVzZXQgb3B0aW9ucyBmb3IgdGhlIHBvcG92ZXIgYm9keSB3aWR0aC5cbiAgICAgKiAqIGBhdC1sZWFzdGAgd2lsbCBhcHBseSBhIG1pbmltdW0gd2lkdGggdG8gdGhlIGJvZHkgZXF1aXZhbGVudCB0byB0aGUgd2lkdGggb2YgdGhlIGNvbnRyb2wuXG4gICAgICogKiBgZXF1YWxgIHdpbGwgYXBwbHkgYSB3aWR0aCB0byB0aGUgYm9keSBlcXVpdmFsZW50IHRvIHRoZSB3aWR0aCBvZiB0aGUgY29udHJvbC5cbiAgICAgKiAqIExlYXZlIGJsYW5rIGZvciBubyBlZmZlY3QuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBmaWxsQ29udHJvbE1vZGU6IFBvcG92ZXJGaWxsTW9kZSA9ICdhdC1sZWFzdCc7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogRXZlbnQgc2VudCB3aGVuIGlzIG9wZW4gcG9wb3ZlciBjaGFuZ2VkICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgaXNPcGVuQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICAvKiogRXZlbnQgc2VudCB3aGVuIHByaW1hcnkgYnV0dG9uIGlzIGNsaWNrZWQgKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBwcmltYXJ5QnV0dG9uQ2xpY2tlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgLyoqXG4gICAgICogIEhhbmRsZXMgcHJpbWFyeSBidXR0b24gY2xpY2tcbiAgICAgKiAgKi9cbiAgICBwdWJsaWMgYnV0dG9uQ2xpY2soJGV2ZW50KSB7XG4gICAgICAgIHRoaXMucHJpbWFyeUJ1dHRvbkNsaWNrZWQuZW1pdCgpO1xuICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyB0aGUgcG9wb3ZlciBvcGVuIHN0YXRlLlxuICAgICAqL1xuICAgIHB1YmxpYyB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbG9zZXMgdGhlIHBvcG92ZXIuXG4gICAgICovXG4gICAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbkNoYW5nZS5lbWl0KHRoaXMuaXNPcGVuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW5zIHRoZSBwb3BvdmVyLlxuICAgICAqL1xuICAgIHB1YmxpYyBvcGVuKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbkNoYW5nZS5lbWl0KHRoaXMuaXNPcGVuKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19