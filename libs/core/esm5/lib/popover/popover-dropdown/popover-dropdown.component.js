/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';
/**
 * A component used to enforce a certain layout for the popover. With additional styling
 * ```html
 * <fd-popover>
 *     <fd-dropdown>Dropdown</fd-dropdown>
 *     <fd-popover-body>Popover Body</fd-popover-body>
 * </fd-popover>
 * ```
 */
var PopoverDropdownComponent = /** @class */ (function () {
    function PopoverDropdownComponent() {
        /**
         * Whether the popover should have an arrow.
         */
        this.noArrow = true;
        /**
         * Whether the popover is disabled.
         */
        this.disabled = false;
        /**
         * The btnType to display.
         */
        this.btnType = '';
        /**
         * Whether the dropdown is in compact format.
         */
        this.compact = false;
        /**
         * Whether the dropdown is in a toolbar.
         */
        this.toolbar = false;
        /**
         * Whether the dropdown is opened.
         */
        this.isOpen = false;
    }
    PopoverDropdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-dropdown-control',
                    host: {
                        class: 'fd-dropdown',
                    },
                    template: "<div class=\"fd-dropdown\">\n    <button\n        fd-button\n        class=\"fd-dropdown__control fd-button\"\n        [ngClass]=\"\n                    (btnType ? ' fd-button--' + btnType : '') +\n                    (glyph ? ' sap-icon--' + glyph : '') +\n                    (compact ? ' fd-button--compact' : '') +\n                    (this.disabled ? ' is-disabled' : '') +\n                    (toolbar ? ' fd-button--standard': '')\n                \"\n        [attr.aria-expanded]=\"this.disabled ? false : isOpen\"\n        [attr.aria-disabled]=\"this.disabled\"\n        aria-haspopup=\"true\"\n        [disabled]=\"disabled\"\n    >\n        <ng-content></ng-content>\n    </button>\n</div>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    PopoverDropdownComponent.propDecorators = {
        noArrow: [{ type: Input }],
        disabled: [{ type: Input }],
        glyph: [{ type: Input }],
        btnType: [{ type: Input }],
        compact: [{ type: Input }],
        toolbar: [{ type: Input }],
        isOpen: [{ type: Input }]
    };
    return PopoverDropdownComponent;
}());
export { PopoverDropdownComponent };
if (false) {
    /**
     * Whether the popover should have an arrow.
     * @type {?}
     */
    PopoverDropdownComponent.prototype.noArrow;
    /**
     * Whether the popover is disabled.
     * @type {?}
     */
    PopoverDropdownComponent.prototype.disabled;
    /**
     * The glyph to display.
     * @type {?}
     */
    PopoverDropdownComponent.prototype.glyph;
    /**
     * The btnType to display.
     * @type {?}
     */
    PopoverDropdownComponent.prototype.btnType;
    /**
     * Whether the dropdown is in compact format.
     * @type {?}
     */
    PopoverDropdownComponent.prototype.compact;
    /**
     * Whether the dropdown is in a toolbar.
     * @type {?}
     */
    PopoverDropdownComponent.prototype.toolbar;
    /**
     * Whether the dropdown is opened.
     * @type {?}
     */
    PopoverDropdownComponent.prototype.isOpen;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1kcm9wZG93bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvcG9wb3Zlci9wb3BvdmVyLWRyb3Bkb3duL3BvcG92ZXItZHJvcGRvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFnQixLQUFLLEVBQWEsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7QUFZN0Y7SUFBQTs7OztRQVdJLFlBQU8sR0FBWSxJQUFJLENBQUM7Ozs7UUFJeEIsYUFBUSxHQUFZLEtBQUssQ0FBQzs7OztRQVExQixZQUFPLEdBQVcsRUFBRSxDQUFDOzs7O1FBSXJCLFlBQU8sR0FBWSxLQUFLLENBQUM7Ozs7UUFJekIsWUFBTyxHQUFZLEtBQUssQ0FBQzs7OztRQUl6QixXQUFNLEdBQVksS0FBSyxDQUFDO0lBRTVCLENBQUM7O2dCQXJDQSxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSxhQUFhO3FCQUN2QjtvQkFDRCw0c0JBQThDO29CQUM5QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDeEM7OzswQkFHSSxLQUFLOzJCQUlMLEtBQUs7d0JBSUwsS0FBSzswQkFJTCxLQUFLOzBCQUlMLEtBQUs7MEJBSUwsS0FBSzt5QkFJTCxLQUFLOztJQUdWLCtCQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0E3Qlksd0JBQXdCOzs7Ozs7SUFFakMsMkNBQ3dCOzs7OztJQUd4Qiw0Q0FDMEI7Ozs7O0lBRzFCLHlDQUNjOzs7OztJQUdkLDJDQUNxQjs7Ozs7SUFHckIsMkNBQ3lCOzs7OztJQUd6QiwyQ0FDeUI7Ozs7O0lBR3pCLDBDQUN3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdCwgSW5qZWN0LCBJbnB1dCwgT25EZXN0cm95LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQb3BvdmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vcG9wb3Zlci5jb21wb25lbnQnO1xuLyoqXG4gKiBBIGNvbXBvbmVudCB1c2VkIHRvIGVuZm9yY2UgYSBjZXJ0YWluIGxheW91dCBmb3IgdGhlIHBvcG92ZXIuIFdpdGggYWRkaXRpb25hbCBzdHlsaW5nXG4gKiBgYGBodG1sXG4gKiA8ZmQtcG9wb3Zlcj5cbiAqICAgICA8ZmQtZHJvcGRvd24+RHJvcGRvd248L2ZkLWRyb3Bkb3duPlxuICogICAgIDxmZC1wb3BvdmVyLWJvZHk+UG9wb3ZlciBCb2R5PC9mZC1wb3BvdmVyLWJvZHk+XG4gKiA8L2ZkLXBvcG92ZXI+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1kcm9wZG93bi1jb250cm9sJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnZmQtZHJvcGRvd24nLFxuICAgIH0sXG4gICAgdGVtcGxhdGVVcmw6ICdwb3BvdmVyLWRyb3Bkb3duLmNvbXBvbmVudC5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyRHJvcGRvd25Db21wb25lbnQge1xuICAgIC8qKiBXaGV0aGVyIHRoZSBwb3BvdmVyIHNob3VsZCBoYXZlIGFuIGFycm93LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgbm9BcnJvdzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcG9wb3ZlciBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogVGhlIGdseXBoIHRvIGRpc3BsYXkuICovXG4gICAgQElucHV0KClcbiAgICBnbHlwaDogc3RyaW5nO1xuXG4gICAgLyoqIFRoZSBidG5UeXBlIHRvIGRpc3BsYXkuICovXG4gICAgQElucHV0KClcbiAgICBidG5UeXBlOiBzdHJpbmcgPSAnJztcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBpcyBpbiBjb21wYWN0IGZvcm1hdC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbXBhY3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBkcm9wZG93biBpcyBpbiBhIHRvb2xiYXIuICovXG4gICAgQElucHV0KClcbiAgICB0b29sYmFyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gaXMgb3BlbmVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbn1cbiJdfQ==