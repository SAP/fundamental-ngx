/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';
/**
 * The component that represents an image.
 *
 * ```html
 * <fd-image style="margin-right: 10px;" [size]="'l'" [circle]="true" [photo]="'https://placeimg.com/400/400/nature'"></fd-image>
 * ```
 */
export class ImageComponent {
    constructor() {
        /**
         * The size of the image.
         * The predefined values for the size are *s*, *m*, and *l*.
         */
        this.size = 'm';
        /**
         * Whether to render a circle style for the image.
         */
        this.circle = false;
        /**
         * The image label.
         */
        this.label = 'Image label';
    }
}
ImageComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-image',
                template: "<span\n  [ngClass]='(size ? \"fd-image--\" + size : \"\") + (circle ? \" fd-image--circle\" : \"\") '\n  [attr.aria-label]='label'\n  [ngStyle]= \"{'background-image': 'url(' + photo + ')'}\">\n</span>\n",
                encapsulation: ViewEncapsulation.None
            }] }
];
ImageComponent.propDecorators = {
    size: [{ type: Input }],
    circle: [{ type: Input }],
    label: [{ type: Input }],
    photo: [{ type: Input }]
};
if (false) {
    /**
     * The size of the image.
     * The predefined values for the size are *s*, *m*, and *l*.
     * @type {?}
     */
    ImageComponent.prototype.size;
    /**
     * Whether to render a circle style for the image.
     * @type {?}
     */
    ImageComponent.prototype.circle;
    /**
     * The image label.
     * @type {?}
     */
    ImageComponent.prototype.label;
    /**
     * The image url.
     * @type {?}
     */
    ImageComponent.prototype.photo;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2ltYWdlL2ltYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBY3BFLE1BQU0sT0FBTyxjQUFjO0lBTDNCOzs7OztRQVVhLFNBQUksR0FBVyxHQUFHLENBQUM7Ozs7UUFLbkIsV0FBTSxHQUFZLEtBQUssQ0FBQzs7OztRQUt4QixVQUFLLEdBQVcsYUFBYSxDQUFDO0lBTTNDLENBQUM7OztZQTFCQSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLHVOQUFxQztnQkFDckMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDeEM7OzttQkFNSSxLQUFLO3FCQUtMLEtBQUs7b0JBS0wsS0FBSztvQkFLTCxLQUFLOzs7Ozs7OztJQWZOLDhCQUE0Qjs7Ozs7SUFLNUIsZ0NBQWlDOzs7OztJQUtqQywrQkFBdUM7Ozs7O0lBS3ZDLCtCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVGhlIGNvbXBvbmVudCB0aGF0IHJlcHJlc2VudHMgYW4gaW1hZ2UuIFxuICpcbiAqIGBgYGh0bWxcbiAqIDxmZC1pbWFnZSBzdHlsZT1cIm1hcmdpbi1yaWdodDogMTBweDtcIiBbc2l6ZV09XCInbCdcIiBbY2lyY2xlXT1cInRydWVcIiBbcGhvdG9dPVwiJ2h0dHBzOi8vcGxhY2VpbWcuY29tLzQwMC80MDAvbmF0dXJlJ1wiPjwvZmQtaW1hZ2U+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1pbWFnZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2ltYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEltYWdlQ29tcG9uZW50IHtcbiAgICAvKiogXG4gICAgICogVGhlIHNpemUgb2YgdGhlIGltYWdlLiBcbiAgICAgKiBUaGUgcHJlZGVmaW5lZCB2YWx1ZXMgZm9yIHRoZSBzaXplIGFyZSAqcyosICptKiwgYW5kICpsKi5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaXplOiBzdHJpbmcgPSAnbSc7XG5cbiAgICAvKiogXG4gICAgICogV2hldGhlciB0byByZW5kZXIgYSBjaXJjbGUgc3R5bGUgZm9yIHRoZSBpbWFnZS4gXG4gICAgICovXG4gICAgQElucHV0KCkgY2lyY2xlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogXG4gICAgICogVGhlIGltYWdlIGxhYmVsLiBcbiAgICAgKi9cbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nID0gJ0ltYWdlIGxhYmVsJztcblxuICAgIC8qKiBcbiAgICAgKiBUaGUgaW1hZ2UgdXJsLiBcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwaG90bzogc3RyaW5nO1xufVxuIl19