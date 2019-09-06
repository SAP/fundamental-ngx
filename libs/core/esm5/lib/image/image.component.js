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
var ImageComponent = /** @class */ (function () {
    function ImageComponent() {
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
    return ImageComponent;
}());
export { ImageComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2ltYWdlL2ltYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBU3BFO0lBQUE7Ozs7O1FBVWEsU0FBSSxHQUFXLEdBQUcsQ0FBQzs7OztRQUtuQixXQUFNLEdBQVksS0FBSyxDQUFDOzs7O1FBS3hCLFVBQUssR0FBVyxhQUFhLENBQUM7SUFNM0MsQ0FBQzs7Z0JBMUJBLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsVUFBVTtvQkFDcEIsdU5BQXFDO29CQUNyQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDeEM7Ozt1QkFNSSxLQUFLO3lCQUtMLEtBQUs7d0JBS0wsS0FBSzt3QkFLTCxLQUFLOztJQUNWLHFCQUFDO0NBQUEsQUExQkQsSUEwQkM7U0FyQlksY0FBYzs7Ozs7OztJQUt2Qiw4QkFBNEI7Ozs7O0lBSzVCLGdDQUFpQzs7Ozs7SUFLakMsK0JBQXVDOzs7OztJQUt2QywrQkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFRoZSBjb21wb25lbnQgdGhhdCByZXByZXNlbnRzIGFuIGltYWdlLiBcbiAqXG4gKiBgYGBodG1sXG4gKiA8ZmQtaW1hZ2Ugc3R5bGU9XCJtYXJnaW4tcmlnaHQ6IDEwcHg7XCIgW3NpemVdPVwiJ2wnXCIgW2NpcmNsZV09XCJ0cnVlXCIgW3Bob3RvXT1cIidodHRwczovL3BsYWNlaW1nLmNvbS80MDAvNDAwL25hdHVyZSdcIj48L2ZkLWltYWdlPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtaW1hZ2UnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9pbWFnZS5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBJbWFnZUNvbXBvbmVudCB7XG4gICAgLyoqIFxuICAgICAqIFRoZSBzaXplIG9mIHRoZSBpbWFnZS4gXG4gICAgICogVGhlIHByZWRlZmluZWQgdmFsdWVzIGZvciB0aGUgc2l6ZSBhcmUgKnMqLCAqbSosIGFuZCAqbCouXG4gICAgICovXG4gICAgQElucHV0KCkgc2l6ZTogc3RyaW5nID0gJ20nO1xuXG4gICAgLyoqIFxuICAgICAqIFdoZXRoZXIgdG8gcmVuZGVyIGEgY2lyY2xlIHN0eWxlIGZvciB0aGUgaW1hZ2UuIFxuICAgICAqL1xuICAgIEBJbnB1dCgpIGNpcmNsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFxuICAgICAqIFRoZSBpbWFnZSBsYWJlbC4gXG4gICAgICovXG4gICAgQElucHV0KCkgbGFiZWw6IHN0cmluZyA9ICdJbWFnZSBsYWJlbCc7XG5cbiAgICAvKiogXG4gICAgICogVGhlIGltYWdlIHVybC4gXG4gICAgICovXG4gICAgQElucHV0KCkgcGhvdG86IHN0cmluZztcbn1cbiJdfQ==