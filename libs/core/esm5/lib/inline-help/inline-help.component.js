/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';
/**
 * The component that represents an inline-help.
 * Inline help is used to display help text in a popover, often inline with headers, body text and form labels.
 *
 * ```html
 * <fd-inline-help [placement]="'bottom-left'">
 *      Lorem ipsum dolor sit amet, consectetur adipiscing.
 * </fd-inline-help>
 * ```
 */
var InlineHelpComponent = /** @class */ (function () {
    function InlineHelpComponent() {
        /**
         * The placement of the inline help component. It can be one of: top, top-start, top-end, bottom,
         *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
         *   The default placement is *bottom start*
         */
        this.placement = 'bottom-start';
        /**
         * The trigger events that will open/close the inline help component.
         *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
         */
        this.triggers = ['mouseenter', 'mouseleave'];
    }
    InlineHelpComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-inline-help',
                    template: "<fd-popover [noArrow]=\"false\"\n            [placement]=\"placement\"\n            [triggers]=\"triggers\"\n    >\n        <fd-popover-control>\n            <span class=\"fd-inline-help\" role=\"alert\"></span>\n        </fd-popover-control>\n        <fd-popover-body>\n            <span class=\"fd-inline-help__content\">\n                <ng-content></ng-content>\n            </span>\n        </fd-popover-body>\n</fd-popover>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-inline-help__content{visibility:visible;opacity:1;overflow:visible;position:relative;top:0;right:0;border:none;color:var(--fd-color-text-1)}.fd-inline-help__content:after,.fd-inline-help__content:before{display:none}"]
                }] }
    ];
    InlineHelpComponent.propDecorators = {
        placement: [{ type: Input }],
        triggers: [{ type: Input }]
    };
    return InlineHelpComponent;
}());
export { InlineHelpComponent };
if (false) {
    /**
     * The placement of the inline help component. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     *   The default placement is *bottom start*
     * @type {?}
     */
    InlineHelpComponent.prototype.placement;
    /**
     * The trigger events that will open/close the inline help component.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     * @type {?}
     */
    InlineHelpComponent.prototype.triggers;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5saW5lLWhlbHAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2lubGluZS1oZWxwL2lubGluZS1oZWxwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7O0FBWXBFO0lBQUE7Ozs7OztRQWFJLGNBQVMsR0FBYyxjQUFjLENBQUM7Ozs7O1FBS3RDLGFBQVEsR0FBYSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUN0RCxDQUFDOztnQkFuQkEsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLDRiQUEyQztvQkFDM0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUV4Qzs7OzRCQU9JLEtBQUs7MkJBS0wsS0FBSzs7SUFFViwwQkFBQztDQUFBLEFBbkJELElBbUJDO1NBYlksbUJBQW1COzs7Ozs7OztJQU01Qix3Q0FDc0M7Ozs7OztJQUl0Qyx1Q0FDa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGxhY2VtZW50IH0gZnJvbSAncG9wcGVyLmpzJztcbi8qKlxuICogVGhlIGNvbXBvbmVudCB0aGF0IHJlcHJlc2VudHMgYW4gaW5saW5lLWhlbHAuIFxuICogSW5saW5lIGhlbHAgaXMgdXNlZCB0byBkaXNwbGF5IGhlbHAgdGV4dCBpbiBhIHBvcG92ZXIsIG9mdGVuIGlubGluZSB3aXRoIGhlYWRlcnMsIGJvZHkgdGV4dCBhbmQgZm9ybSBsYWJlbHMuXG4gKlxuICogYGBgaHRtbFxuICogPGZkLWlubGluZS1oZWxwIFtwbGFjZW1lbnRdPVwiJ2JvdHRvbS1sZWZ0J1wiPlxuICogICAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZy5cbiAqIDwvZmQtaW5saW5lLWhlbHA+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1pbmxpbmUtaGVscCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2lubGluZS1oZWxwLmNvbXBvbmVudC5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWydpbmxpbmUtaGVscC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIElubGluZUhlbHBDb21wb25lbnQge1xuXG4gICAgLyoqIFRoZSBwbGFjZW1lbnQgb2YgdGhlIGlubGluZSBoZWxwIGNvbXBvbmVudC4gSXQgY2FuIGJlIG9uZSBvZjogdG9wLCB0b3Atc3RhcnQsIHRvcC1lbmQsIGJvdHRvbSxcbiAgICAgKiAgYm90dG9tLXN0YXJ0LCBib3R0b20tZW5kLCByaWdodCwgcmlnaHQtc3RhcnQsIHJpZ2h0LWVuZCwgbGVmdCwgbGVmdC1zdGFydCwgbGVmdC1lbmQuXG4gICAgICogICBUaGUgZGVmYXVsdCBwbGFjZW1lbnQgaXMgKmJvdHRvbSBzdGFydCpcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHBsYWNlbWVudDogUGxhY2VtZW50ID0gJ2JvdHRvbS1zdGFydCc7XG5cbiAgICAvKiogVGhlIHRyaWdnZXIgZXZlbnRzIHRoYXQgd2lsbCBvcGVuL2Nsb3NlIHRoZSBpbmxpbmUgaGVscCBjb21wb25lbnQuXG4gICAgICogIEFjY2VwdHMgYW55IFtIVE1MIERPTSBFdmVudHNdKGh0dHBzOi8vd3d3Lnczc2Nob29scy5jb20vanNyZWYvZG9tX29ial9ldmVudC5hc3ApLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgdHJpZ2dlcnM6IHN0cmluZ1tdID0gWydtb3VzZWVudGVyJywgJ21vdXNlbGVhdmUnXTtcbn1cbiJdfQ==