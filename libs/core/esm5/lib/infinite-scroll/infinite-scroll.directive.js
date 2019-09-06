/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
/**
 * Tool directive used to achieve the infinite scroll mechanism.
 */
var InfiniteScrollDirective = /** @class */ (function () {
    /** @hidden */
    function InfiniteScrollDirective(element) {
        this.element = element;
        /**
         * Scroll percentage at which the onScrollAction event is fired.
         */
        this.scrollPercent = 75;
        /**
         * Event emitted when the scrollPercent threshold is met.
         */
        this.onScrollAction = new EventEmitter();
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    InfiniteScrollDirective.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        this.scrollEvent = fromEvent(this.element.nativeElement, 'scroll');
        this.subscription = this.scrollEvent.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if ((e.target.scrollTop + e.target.offsetHeight) / e.target.scrollHeight > _this.scrollPercent / 100) {
                _this.onScrollAction.emit(null);
            }
        }));
    };
    /**
     * @return {?}
     */
    InfiniteScrollDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    InfiniteScrollDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fdInfiniteScroll]'
                },] }
    ];
    /** @nocollapse */
    InfiniteScrollDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    InfiniteScrollDirective.propDecorators = {
        scrollPercent: [{ type: Input }],
        onScrollAction: [{ type: Output }]
    };
    return InfiniteScrollDirective;
}());
export { InfiniteScrollDirective };
if (false) {
    /**
     * Scroll percentage at which the onScrollAction event is fired.
     * @type {?}
     */
    InfiniteScrollDirective.prototype.scrollPercent;
    /**
     * Event emitted when the scrollPercent threshold is met.
     * @type {?}
     */
    InfiniteScrollDirective.prototype.onScrollAction;
    /**
     * @type {?}
     * @private
     */
    InfiniteScrollDirective.prototype.scrollEvent;
    /**
     * @type {?}
     * @private
     */
    InfiniteScrollDirective.prototype.subscription;
    /**
     * @type {?}
     * @private
     */
    InfiniteScrollDirective.prototype.element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maW5pdGUtc2Nyb2xsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbmZpbml0ZS1zY3JvbGwvaW5maW5pdGUtc2Nyb2xsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxTQUFTLEVBQTRCLE1BQU0sTUFBTSxDQUFDOzs7O0FBSzNEO0lBZ0JJLGNBQWM7SUFDZCxpQ0FBb0IsT0FBbUI7UUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTs7OztRQVZ2QyxrQkFBYSxHQUFXLEVBQUUsQ0FBQzs7OztRQUkzQixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7SUFNQyxDQUFDO0lBRTNDLGNBQWM7Ozs7O0lBQ2QsMENBQVE7Ozs7SUFBUjtRQUFBLGlCQVFDO1FBUEcsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFbkUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLENBQU07WUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsS0FBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLEVBQUU7Z0JBQ2pHLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2xDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQsNkNBQVc7OztJQUFYO1FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbkM7SUFDTCxDQUFDOztnQkFsQ0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7aUJBQ2pDOzs7O2dCQVJtQixVQUFVOzs7Z0NBWXpCLEtBQUs7aUNBSUwsTUFBTTs7SUEwQlgsOEJBQUM7Q0FBQSxBQXBDRCxJQW9DQztTQWpDWSx1QkFBdUI7Ozs7OztJQUdoQyxnREFDMkI7Ozs7O0lBRzNCLGlEQUN5Qzs7Ozs7SUFFekMsOENBQXFDOzs7OztJQUNyQywrQ0FBbUM7Ozs7O0lBR3ZCLDBDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBUb29sIGRpcmVjdGl2ZSB1c2VkIHRvIGFjaGlldmUgdGhlIGluZmluaXRlIHNjcm9sbCBtZWNoYW5pc20uXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2ZkSW5maW5pdGVTY3JvbGxdJ1xufSlcbmV4cG9ydCBjbGFzcyBJbmZpbml0ZVNjcm9sbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIC8qKiBTY3JvbGwgcGVyY2VudGFnZSBhdCB3aGljaCB0aGUgb25TY3JvbGxBY3Rpb24gZXZlbnQgaXMgZmlyZWQuICovXG4gICAgQElucHV0KClcbiAgICBzY3JvbGxQZXJjZW50OiBudW1iZXIgPSA3NTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNjcm9sbFBlcmNlbnQgdGhyZXNob2xkIGlzIG1ldC4gKi9cbiAgICBAT3V0cHV0KClcbiAgICBvblNjcm9sbEFjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgcHJpdmF0ZSBzY3JvbGxFdmVudDogT2JzZXJ2YWJsZTxhbnk+O1xuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZikge31cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2Nyb2xsRXZlbnQgPSBmcm9tRXZlbnQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzY3JvbGwnKTtcblxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuc2Nyb2xsRXZlbnQuc3Vic2NyaWJlKChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmICgoZS50YXJnZXQuc2Nyb2xsVG9wICsgZS50YXJnZXQub2Zmc2V0SGVpZ2h0KSAvIGUudGFyZ2V0LnNjcm9sbEhlaWdodCA+IHRoaXMuc2Nyb2xsUGVyY2VudCAvIDEwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25TY3JvbGxBY3Rpb24uZW1pdChudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19