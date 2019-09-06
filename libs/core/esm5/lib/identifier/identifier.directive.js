/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * The directive that represents an identifier.
 * Identifier is a way to visually present something using an icon or user initials.
 *
 * ```html
 * <span fd-identifier [size]="'l'" [glyph]="'washing-machine'"></span>
 * ```
 */
var IdentifierDirective = /** @class */ (function (_super) {
    tslib_1.__extends(IdentifierDirective, _super);
    /** @hidden */
    function IdentifierDirective(elementRef) {
        return _super.call(this, elementRef) || this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    IdentifierDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.size) {
            this._addClassToElement('fd-identifier--' + this.size);
        }
        if (this.circle) {
            this._addClassToElement('fd-identifier--circle');
        }
        if (this.transparent) {
            this._addClassToElement('fd-identifier--transparent');
        }
        if (this.colorAccent) {
            this._addClassToElement('fd-has-background-color-accent-' + this.colorAccent);
        }
        if (this.glyph) {
            this._addClassToElement('sap-icon--' + this.glyph);
        }
    };
    IdentifierDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-identifier]',
                    host: {
                        role: 'presentation'
                    }
                },] }
    ];
    /** @nocollapse */
    IdentifierDirective.ctorParameters = function () { return [
        { type: ElementRef, decorators: [{ type: Inject, args: [ElementRef,] }] }
    ]; };
    IdentifierDirective.propDecorators = {
        size: [{ type: Input }],
        circle: [{ type: Input }],
        transparent: [{ type: Input }],
        colorAccent: [{ type: Input }],
        glyph: [{ type: Input }]
    };
    return IdentifierDirective;
}(AbstractFdNgxClass));
export { IdentifierDirective };
if (false) {
    /**
     * The size of the identifier.
     * The predefined values for the size are *xxs*, *xs*, *s*, *m*, *l*, *xl* and *xxl*.
     *  *size* can accept any other string, for example *xxxs*, which will be translated into class *fd-identifier--xxxs*.
     * @type {?}
     */
    IdentifierDirective.prototype.size;
    /**
     * Whether to render a circle style for the identifier.
     * @type {?}
     */
    IdentifierDirective.prototype.circle;
    /**
     * Whether to render a transparent style for the identifier.
     * @type {?}
     */
    IdentifierDirective.prototype.transparent;
    /**
     * A number specifying the background color of the identifier.
     * @type {?}
     */
    IdentifierDirective.prototype.colorAccent;
    /**
     * The glyph name
     * @type {?}
     */
    IdentifierDirective.prototype.glyph;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlbnRpZmllci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvaWRlbnRpZmllci9pZGVudGlmaWVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7Ozs7Ozs7OztBQVVwRTtJQVF5QywrQ0FBa0I7SUEyQ3ZELGNBQWM7SUFDZCw2QkFBZ0MsVUFBc0I7ZUFDbEQsa0JBQU0sVUFBVSxDQUFDO0lBQ3JCLENBQUM7SUF0QkQsY0FBYzs7Ozs7SUFDZCw0Q0FBYzs7OztJQUFkO1FBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxRDtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxpQ0FBaUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDakY7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN0RDtJQUNMLENBQUM7O2dCQWpESixTQUFTLFNBQUM7OztvQkFHUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixJQUFJLEVBQUU7d0JBQ0YsSUFBSSxFQUFFLGNBQWM7cUJBQ3ZCO2lCQUNKOzs7O2dCQWxCbUIsVUFBVSx1QkErRGIsTUFBTSxTQUFDLFVBQVU7Ozt1QkF0QzdCLEtBQUs7eUJBS0wsS0FBSzs4QkFLTCxLQUFLOzhCQUdMLEtBQUs7d0JBR0wsS0FBSzs7SUF5QlYsMEJBQUM7Q0FBQSxBQXZERCxDQVF5QyxrQkFBa0IsR0ErQzFEO1NBL0NZLG1CQUFtQjs7Ozs7Ozs7SUFNNUIsbUNBQXNCOzs7OztJQUt0QixxQ0FBeUI7Ozs7O0lBS3pCLDBDQUE4Qjs7Ozs7SUFHOUIsMENBQTZCOzs7OztJQUc3QixvQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0RmROZ3hDbGFzcyB9IGZyb20gJy4uL3V0aWxzL2Fic3RyYWN0LWZkLW5neC1jbGFzcyc7XG5cbi8qKlxuICogVGhlIGRpcmVjdGl2ZSB0aGF0IHJlcHJlc2VudHMgYW4gaWRlbnRpZmllci4gXG4gKiBJZGVudGlmaWVyIGlzIGEgd2F5IHRvIHZpc3VhbGx5IHByZXNlbnQgc29tZXRoaW5nIHVzaW5nIGFuIGljb24gb3IgdXNlciBpbml0aWFscy5cbiAqXG4gKiBgYGBodG1sXG4gKiA8c3BhbiBmZC1pZGVudGlmaWVyIFtzaXplXT1cIidsJ1wiIFtnbHlwaF09XCInd2FzaGluZy1tYWNoaW5lJ1wiPjwvc3Bhbj5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICAvLyBUT0RPIHRvIGJlIGRpc2N1c3NlZFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC1pZGVudGlmaWVyXScsXG4gICAgaG9zdDoge1xuICAgICAgICByb2xlOiAncHJlc2VudGF0aW9uJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgSWRlbnRpZmllckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0RmROZ3hDbGFzcyB7XG4gICAgLyoqIFxuICAgICAqIFRoZSBzaXplIG9mIHRoZSBpZGVudGlmaWVyLiBcbiAgICAgKiBUaGUgcHJlZGVmaW5lZCB2YWx1ZXMgZm9yIHRoZSBzaXplIGFyZSAqeHhzKiwgKnhzKiwgKnMqLCAqbSosICpsKiwgKnhsKiBhbmQgKnh4bCouXG4gICAgICogICpzaXplKiBjYW4gYWNjZXB0IGFueSBvdGhlciBzdHJpbmcsIGZvciBleGFtcGxlICp4eHhzKiwgd2hpY2ggd2lsbCBiZSB0cmFuc2xhdGVkIGludG8gY2xhc3MgKmZkLWlkZW50aWZpZXItLXh4eHMqLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHNpemU6IHN0cmluZztcblxuICAgIC8qKiBcbiAgICAgKiBXaGV0aGVyIHRvIHJlbmRlciBhIGNpcmNsZSBzdHlsZSBmb3IgdGhlIGlkZW50aWZpZXIuIFxuICAgICAqL1xuICAgIEBJbnB1dCgpIGNpcmNsZTogYm9vbGVhbjtcblxuICAgIC8qKiBcbiAgICAgKiBXaGV0aGVyIHRvIHJlbmRlciBhIHRyYW5zcGFyZW50IHN0eWxlIGZvciB0aGUgaWRlbnRpZmllci4gXG4gICAgICovXG4gICAgQElucHV0KCkgdHJhbnNwYXJlbnQ6IGJvb2xlYW47XG5cbiAgICAvKiogQSBudW1iZXIgc3BlY2lmeWluZyB0aGUgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgaWRlbnRpZmllci4gKi9cbiAgICBASW5wdXQoKSBjb2xvckFjY2VudDogbnVtYmVyO1xuXG4gICAgLyoqIFRoZSBnbHlwaCBuYW1lICovXG4gICAgQElucHV0KCkgZ2x5cGg6IHN0cmluZztcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgX3NldFByb3BlcnRpZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnNpemUpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1pZGVudGlmaWVyLS0nICsgdGhpcy5zaXplKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jaXJjbGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1pZGVudGlmaWVyLS1jaXJjbGUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50cmFuc3BhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLWlkZW50aWZpZXItLXRyYW5zcGFyZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29sb3JBY2NlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1oYXMtYmFja2dyb3VuZC1jb2xvci1hY2NlbnQtJyArIHRoaXMuY29sb3JBY2NlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmdseXBoKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnc2FwLWljb24tLScgKyB0aGlzLmdseXBoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IoQEluamVjdChFbGVtZW50UmVmKSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cbn1cbiJdfQ==