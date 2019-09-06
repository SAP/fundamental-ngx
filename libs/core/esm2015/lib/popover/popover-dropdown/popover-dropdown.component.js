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
export class PopoverDropdownComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1kcm9wZG93bi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvcG9wb3Zlci9wb3BvdmVyLWRyb3Bkb3duL3BvcG92ZXItZHJvcGRvd24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFnQixLQUFLLEVBQWEsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7QUFvQjdGLE1BQU0sT0FBTyx3QkFBd0I7SUFSckM7Ozs7UUFXSSxZQUFPLEdBQVksSUFBSSxDQUFDOzs7O1FBSXhCLGFBQVEsR0FBWSxLQUFLLENBQUM7Ozs7UUFRMUIsWUFBTyxHQUFXLEVBQUUsQ0FBQzs7OztRQUlyQixZQUFPLEdBQVksS0FBSyxDQUFDOzs7O1FBSXpCLFlBQU8sR0FBWSxLQUFLLENBQUM7Ozs7UUFJekIsV0FBTSxHQUFZLEtBQUssQ0FBQztJQUU1QixDQUFDOzs7WUFyQ0EsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsYUFBYTtpQkFDdkI7Z0JBQ0QsNHNCQUE4QztnQkFDOUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDeEM7OztzQkFHSSxLQUFLO3VCQUlMLEtBQUs7b0JBSUwsS0FBSztzQkFJTCxLQUFLO3NCQUlMLEtBQUs7c0JBSUwsS0FBSztxQkFJTCxLQUFLOzs7Ozs7O0lBeEJOLDJDQUN3Qjs7Ozs7SUFHeEIsNENBQzBCOzs7OztJQUcxQix5Q0FDYzs7Ozs7SUFHZCwyQ0FDcUI7Ozs7O0lBR3JCLDJDQUN5Qjs7Ozs7SUFHekIsMkNBQ3lCOzs7OztJQUd6QiwwQ0FDd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3QsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbXBvbmVudCB9IGZyb20gJy4uL3BvcG92ZXIuY29tcG9uZW50Jztcbi8qKlxuICogQSBjb21wb25lbnQgdXNlZCB0byBlbmZvcmNlIGEgY2VydGFpbiBsYXlvdXQgZm9yIHRoZSBwb3BvdmVyLiBXaXRoIGFkZGl0aW9uYWwgc3R5bGluZ1xuICogYGBgaHRtbFxuICogPGZkLXBvcG92ZXI+XG4gKiAgICAgPGZkLWRyb3Bkb3duPkRyb3Bkb3duPC9mZC1kcm9wZG93bj5cbiAqICAgICA8ZmQtcG9wb3Zlci1ib2R5PlBvcG92ZXIgQm9keTwvZmQtcG9wb3Zlci1ib2R5PlxuICogPC9mZC1wb3BvdmVyPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtZHJvcGRvd24tY29udHJvbCcsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ2ZkLWRyb3Bkb3duJyxcbiAgICB9LFxuICAgIHRlbXBsYXRlVXJsOiAncG9wb3Zlci1kcm9wZG93bi5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckRyb3Bkb3duQ29tcG9uZW50IHtcbiAgICAvKiogV2hldGhlciB0aGUgcG9wb3ZlciBzaG91bGQgaGF2ZSBhbiBhcnJvdy4gKi9cbiAgICBASW5wdXQoKVxuICAgIG5vQXJyb3c6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHBvcG92ZXIgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFRoZSBnbHlwaCB0byBkaXNwbGF5LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2x5cGg6IHN0cmluZztcblxuICAgIC8qKiBUaGUgYnRuVHlwZSB0byBkaXNwbGF5LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgYnRuVHlwZTogc3RyaW5nID0gJyc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gaXMgaW4gY29tcGFjdCBmb3JtYXQuICovXG4gICAgQElucHV0KClcbiAgICBjb21wYWN0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZHJvcGRvd24gaXMgaW4gYSB0b29sYmFyLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgdG9vbGJhcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRyb3Bkb3duIGlzIG9wZW5lZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG59XG4iXX0=