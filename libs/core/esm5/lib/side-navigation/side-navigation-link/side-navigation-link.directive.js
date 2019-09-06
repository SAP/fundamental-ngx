/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Input, ElementRef, Output, EventEmitter, Directive, HostListener, Inject, HostBinding } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
/**
 * The component that represents a navigation link.
 * ```html
 *    <a fd-side-nav-link>
 *        <a [attr.href]="'#'">Link Item</a>
 *    </a>
 * ```
 */
var SideNavigationLinkDirective = /** @class */ (function (_super) {
    tslib_1.__extends(SideNavigationLinkDirective, _super);
    /** @hidden */
    function SideNavigationLinkDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * Whether the link has a sublist.
         */
        _this.hasSublist = false;
        /**
         * Whether the sub list is opened or closed
         */
        _this.onSubListOpenChange = new EventEmitter();
        _this.sublistIsOpen = false;
        _this.role = _this.hasSublist ? 'button' : '';
        _this.hasPopup = _this.hasSublist;
        _this.tabindex = _this.hasSublist ? '0' : '';
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    SideNavigationLinkDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-side-nav__link');
        if (this.hasSublist) {
            this._addClassToElement('has-child');
            this._addStyleToElement('cursor', 'pointer');
            this.elementRef.nativeElement.setAttribute('aria-expanded', this.sublistIsOpen);
        }
        if (this.sublistIsOpen && this.hasSublist) {
            this._addClassToElement('is-selected');
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    SideNavigationLinkDirective.prototype.onKeypressHandler = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.hasSublist && (event.code === 'Enter' || event.code === 'Space')) {
            event.preventDefault();
            this.changeSubListIsOpen();
        }
    };
    /**
     * @return {?}
     */
    SideNavigationLinkDirective.prototype.changeSubListIsOpen = /**
     * @return {?}
     */
    function () {
        if (this.hasSublist) {
            this.sublistIsOpen = !this.sublistIsOpen;
            this.onSubListOpenChange.emit(this.sublistIsOpen);
            this.ngOnChanges();
        }
    };
    SideNavigationLinkDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-side-nav-link]',
                },] }
    ];
    /** @nocollapse */
    SideNavigationLinkDirective.ctorParameters = function () { return [
        { type: ElementRef, decorators: [{ type: Inject, args: [ElementRef,] }] }
    ]; };
    SideNavigationLinkDirective.propDecorators = {
        hasSublist: [{ type: Input }],
        onSubListOpenChange: [{ type: Output }],
        sublistIsOpen: [{ type: Input }],
        role: [{ type: HostBinding, args: ['attr.role',] }],
        hasPopup: [{ type: HostBinding, args: ['attr.aria-haspopup',] }],
        tabindex: [{ type: HostBinding, args: ['tabindex',] }],
        onKeypressHandler: [{ type: HostListener, args: ['keypress', ['$event'],] }],
        changeSubListIsOpen: [{ type: HostListener, args: ['click', ['$event.target'],] }]
    };
    return SideNavigationLinkDirective;
}(AbstractFdNgxClass));
export { SideNavigationLinkDirective };
if (false) {
    /**
     * Whether the link has a sublist.
     * @type {?}
     */
    SideNavigationLinkDirective.prototype.hasSublist;
    /**
     * Whether the sub list is opened or closed
     * @type {?}
     */
    SideNavigationLinkDirective.prototype.onSubListOpenChange;
    /** @type {?} */
    SideNavigationLinkDirective.prototype.sublistIsOpen;
    /** @type {?} */
    SideNavigationLinkDirective.prototype.role;
    /** @type {?} */
    SideNavigationLinkDirective.prototype.hasPopup;
    /** @type {?} */
    SideNavigationLinkDirective.prototype.tabindex;
    /**
     * @type {?}
     * @private
     */
    SideNavigationLinkDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1uYXZpZ2F0aW9uLWxpbmsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NpZGUtbmF2aWdhdGlvbi9zaWRlLW5hdmlnYXRpb24tbGluay9zaWRlLW5hdmlnYXRpb24tbGluay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0gsS0FBSyxFQUNMLFVBQVUsRUFDVixNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFDL0MsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7Ozs7OztBQVV2RTtJQUlpRCx1REFBa0I7SUE4Qi9ELGNBQWM7SUFDZCxxQ0FBd0MsVUFBc0I7UUFBOUQsWUFDSSxrQkFBTSxVQUFVLENBQUMsU0FDcEI7UUFGdUMsZ0JBQVUsR0FBVixVQUFVLENBQVk7Ozs7UUEzQjlELGdCQUFVLEdBQVksS0FBSyxDQUFDOzs7O1FBSTVCLHlCQUFtQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFHbEQsbUJBQWEsR0FBWSxLQUFLLENBQUM7UUFFTCxVQUFJLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUIsY0FBUSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUM7UUFDckMsY0FBUSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOztJQWtCL0QsQ0FBQztJQWhCRCxjQUFjOzs7OztJQUNkLG9EQUFjOzs7O0lBQWQ7UUFDSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUM3QyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbkY7UUFDRCxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN2QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDMUM7SUFDTCxDQUFDO0lBT0QsY0FBYzs7Ozs7O0lBRWQsdURBQWlCOzs7OztJQURqQixVQUNrQixLQUFLO1FBQ25CLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLEVBQUU7WUFDdkUsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzlCO0lBQ0wsQ0FBQzs7OztJQUdELHlEQUFtQjs7O0lBRG5CO1FBRUksSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7O2dCQXZESixTQUFTLFNBQUM7O29CQUVQLFFBQVEsRUFBRSxvQkFBb0I7aUJBQ2pDOzs7O2dCQWxCRyxVQUFVLHVCQWtERyxNQUFNLFNBQUMsVUFBVTs7OzZCQTVCN0IsS0FBSztzQ0FJTCxNQUFNO2dDQUdOLEtBQUs7dUJBR0wsV0FBVyxTQUFDLFdBQVc7MkJBQ3ZCLFdBQVcsU0FBQyxvQkFBb0I7MkJBQ2hDLFdBQVcsU0FBQyxVQUFVO29DQXFCdEIsWUFBWSxTQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQztzQ0FRbkMsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQzs7SUFRNUMsa0NBQUM7Q0FBQSxBQXhERCxDQUlpRCxrQkFBa0IsR0FvRGxFO1NBcERZLDJCQUEyQjs7Ozs7O0lBR3BDLGlEQUM0Qjs7Ozs7SUFHNUIsMERBQ2tEOztJQUVsRCxvREFDK0I7O0lBRS9CLDJDQUFpRTs7SUFDakUsK0NBQThEOztJQUM5RCwrQ0FBK0Q7Ozs7O0lBZ0JuRCxpREFBa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIElucHV0LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgT3V0cHV0LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5qZWN0LCBIb3N0QmluZGluZ1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0RmROZ3hDbGFzcyB9IGZyb20gJy4uLy4uL3V0aWxzL2Fic3RyYWN0LWZkLW5neC1jbGFzcyc7XG5cbi8qKlxuICogVGhlIGNvbXBvbmVudCB0aGF0IHJlcHJlc2VudHMgYSBuYXZpZ2F0aW9uIGxpbmsuXG4gKiBgYGBodG1sXG4gKiAgICA8YSBmZC1zaWRlLW5hdi1saW5rPlxuICogICAgICAgIDxhIFthdHRyLmhyZWZdPVwiJyMnXCI+TGluayBJdGVtPC9hPlxuICogICAgPC9hPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC1zaWRlLW5hdi1saW5rXScsXG59KVxuZXhwb3J0IGNsYXNzIFNpZGVOYXZpZ2F0aW9uTGlua0RpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0RmROZ3hDbGFzcyB7XG5cbiAgICAvKiogV2hldGhlciB0aGUgbGluayBoYXMgYSBzdWJsaXN0LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgaGFzU3VibGlzdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHN1YiBsaXN0IGlzIG9wZW5lZCBvciBjbG9zZWQgKi9cbiAgICBAT3V0cHV0KClcbiAgICBvblN1Ykxpc3RPcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQElucHV0KClcbiAgICBzdWJsaXN0SXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpIHJvbGUgPSB0aGlzLmhhc1N1Ymxpc3QgPyAnYnV0dG9uJyA6ICcnO1xuICAgIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWhhc3BvcHVwJykgaGFzUG9wdXAgPSB0aGlzLmhhc1N1Ymxpc3Q7XG4gICAgQEhvc3RCaW5kaW5nKCd0YWJpbmRleCcpIHRhYmluZGV4ID0gdGhpcy5oYXNTdWJsaXN0ID8gJzAnIDogJyc7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIF9zZXRQcm9wZXJ0aWVzKCkge1xuICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtc2lkZS1uYXZfX2xpbmsnKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzU3VibGlzdCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2hhcy1jaGlsZCcpO1xuICAgICAgICAgICAgdGhpcy5fYWRkU3R5bGVUb0VsZW1lbnQoJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0aGlzLnN1Ymxpc3RJc09wZW4pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN1Ymxpc3RJc09wZW4gJiYgdGhpcy5oYXNTdWJsaXN0KSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IoQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdExpc3RlbmVyKCdrZXlwcmVzcycsIFsnJGV2ZW50J10pXG4gICAgb25LZXlwcmVzc0hhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzU3VibGlzdCAmJiAoZXZlbnQuY29kZSA9PT0gJ0VudGVyJyB8fCBldmVudC5jb2RlID09PSAnU3BhY2UnKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU3ViTGlzdElzT3BlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudC50YXJnZXQnXSlcbiAgICBjaGFuZ2VTdWJMaXN0SXNPcGVuKCkge1xuICAgICAgICBpZiAodGhpcy5oYXNTdWJsaXN0KSB7XG4gICAgICAgICAgICB0aGlzLnN1Ymxpc3RJc09wZW4gPSAhdGhpcy5zdWJsaXN0SXNPcGVuO1xuICAgICAgICAgICAgdGhpcy5vblN1Ykxpc3RPcGVuQ2hhbmdlLmVtaXQodGhpcy5zdWJsaXN0SXNPcGVuKTtcbiAgICAgICAgICAgIHRoaXMubmdPbkNoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==