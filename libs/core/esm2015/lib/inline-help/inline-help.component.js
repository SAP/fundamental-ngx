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
export class InlineHelpComponent {
    constructor() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5saW5lLWhlbHAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2lubGluZS1oZWxwL2lubGluZS1oZWxwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7O0FBa0JwRSxNQUFNLE9BQU8sbUJBQW1CO0lBTmhDOzs7Ozs7UUFhSSxjQUFTLEdBQWMsY0FBYyxDQUFDOzs7OztRQUt0QyxhQUFRLEdBQWEsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7O1lBbkJBLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQiw0YkFBMkM7Z0JBQzNDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUV4Qzs7O3dCQU9JLEtBQUs7dUJBS0wsS0FBSzs7Ozs7Ozs7O0lBTE4sd0NBQ3NDOzs7Ozs7SUFJdEMsdUNBQ2tEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBsYWNlbWVudCB9IGZyb20gJ3BvcHBlci5qcyc7XG4vKipcbiAqIFRoZSBjb21wb25lbnQgdGhhdCByZXByZXNlbnRzIGFuIGlubGluZS1oZWxwLiBcbiAqIElubGluZSBoZWxwIGlzIHVzZWQgdG8gZGlzcGxheSBoZWxwIHRleHQgaW4gYSBwb3BvdmVyLCBvZnRlbiBpbmxpbmUgd2l0aCBoZWFkZXJzLCBib2R5IHRleHQgYW5kIGZvcm0gbGFiZWxzLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxmZC1pbmxpbmUtaGVscCBbcGxhY2VtZW50XT1cIidib3R0b20tbGVmdCdcIj5cbiAqICAgICAgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcuXG4gKiA8L2ZkLWlubGluZS1oZWxwPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtaW5saW5lLWhlbHAnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9pbmxpbmUtaGVscC5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnaW5saW5lLWhlbHAuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBJbmxpbmVIZWxwQ29tcG9uZW50IHtcblxuICAgIC8qKiBUaGUgcGxhY2VtZW50IG9mIHRoZSBpbmxpbmUgaGVscCBjb21wb25lbnQuIEl0IGNhbiBiZSBvbmUgb2Y6IHRvcCwgdG9wLXN0YXJ0LCB0b3AtZW5kLCBib3R0b20sXG4gICAgICogIGJvdHRvbS1zdGFydCwgYm90dG9tLWVuZCwgcmlnaHQsIHJpZ2h0LXN0YXJ0LCByaWdodC1lbmQsIGxlZnQsIGxlZnQtc3RhcnQsIGxlZnQtZW5kLlxuICAgICAqICAgVGhlIGRlZmF1bHQgcGxhY2VtZW50IGlzICpib3R0b20gc3RhcnQqXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBwbGFjZW1lbnQ6IFBsYWNlbWVudCA9ICdib3R0b20tc3RhcnQnO1xuXG4gICAgLyoqIFRoZSB0cmlnZ2VyIGV2ZW50cyB0aGF0IHdpbGwgb3Blbi9jbG9zZSB0aGUgaW5saW5lIGhlbHAgY29tcG9uZW50LlxuICAgICAqICBBY2NlcHRzIGFueSBbSFRNTCBET00gRXZlbnRzXShodHRwczovL3d3dy53M3NjaG9vbHMuY29tL2pzcmVmL2RvbV9vYmpfZXZlbnQuYXNwKS4gKi9cbiAgICBASW5wdXQoKVxuICAgIHRyaWdnZXJzOiBzdHJpbmdbXSA9IFsnbW91c2VlbnRlcicsICdtb3VzZWxlYXZlJ107XG59XG4iXX0=