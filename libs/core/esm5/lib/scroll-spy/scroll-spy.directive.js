/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
/**
 * A directive designed to help navigation elements determine the element currently in view of the user.
 */
var ScrollSpyDirective = /** @class */ (function () {
    /** @hidden */
    function ScrollSpyDirective(elRef) {
        this.elRef = elRef;
        /**
         * An array of tags to track.
         */
        this.trackedTags = [];
        /**
         * Whether events are still fired if there is no tag present on the user's screen.
         */
        this.fireEmpty = false;
        /**
         * A number that represent at what location in the container the event is fired.
         * 0.5 would fire the events in the middle of the container,
         * 0 for the top and 1 for the bottom.
         */
        this.targetPercent = 0;
        /**
         * Event fired on the scroll element when a new item becomes activated by the scrollspy .
         * The returned value is the HTMLElement itself.
         */
        this.spyChange = new EventEmitter();
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    ScrollSpyDirective.prototype.onScroll = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var spiedTag;
        /** @type {?} */
        var children = this.elRef.nativeElement.children;
        /** @type {?} */
        var targetScrollTop = event.target.scrollTop;
        /** @type {?} */
        var targetOffsetTop = event.target.offsetTop;
        var _loop_1 = function (i) {
            /** @type {?} */
            var element = children[i];
            if (this_1.trackedTags.some((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) { return tag.toLocaleUpperCase() === element.tagName.toLocaleUpperCase(); }))) {
                if ((element.offsetTop - targetOffsetTop) <= targetScrollTop + event.target.offsetHeight * this_1.targetPercent) {
                    spiedTag = element;
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < children.length; i++) {
            _loop_1(i);
        }
        if ((spiedTag || this.fireEmpty) && spiedTag !== this.currentActive) {
            this.currentActive = spiedTag;
            this.spyChange.emit(this.currentActive);
        }
    };
    ScrollSpyDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fdScrollSpy]'
                },] }
    ];
    /** @nocollapse */
    ScrollSpyDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ScrollSpyDirective.propDecorators = {
        trackedTags: [{ type: Input }],
        fireEmpty: [{ type: Input }],
        targetPercent: [{ type: Input }],
        spyChange: [{ type: Output }],
        onScroll: [{ type: HostListener, args: ['scroll', ['$event'],] }]
    };
    return ScrollSpyDirective;
}());
export { ScrollSpyDirective };
if (false) {
    /**
     * An array of tags to track.
     * @type {?}
     */
    ScrollSpyDirective.prototype.trackedTags;
    /**
     * Whether events are still fired if there is no tag present on the user's screen.
     * @type {?}
     */
    ScrollSpyDirective.prototype.fireEmpty;
    /**
     * A number that represent at what location in the container the event is fired.
     * 0.5 would fire the events in the middle of the container,
     * 0 for the top and 1 for the bottom.
     * @type {?}
     */
    ScrollSpyDirective.prototype.targetPercent;
    /**
     * Event fired on the scroll element when a new item becomes activated by the scrollspy .
     * The returned value is the HTMLElement itself.
     * @type {?}
     */
    ScrollSpyDirective.prototype.spyChange;
    /**
     * @hidden
     * @type {?}
     * @private
     */
    ScrollSpyDirective.prototype.currentActive;
    /**
     * @type {?}
     * @private
     */
    ScrollSpyDirective.prototype.elRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXNweS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2Nyb2xsLXNweS9zY3JvbGwtc3B5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBS2pHO0lBa0NJLGNBQWM7SUFDZCw0QkFBb0IsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTs7OztRQTNCOUIsZ0JBQVcsR0FBYSxFQUFFLENBQUM7Ozs7UUFNM0IsY0FBUyxHQUFZLEtBQUssQ0FBQzs7Ozs7O1FBUTNCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDOzs7OztRQU9qQixjQUFTLEdBQThCLElBQUksWUFBWSxFQUFlLENBQUM7SUFNL0MsQ0FBQztJQUV6QyxjQUFjOzs7Ozs7SUFFZCxxQ0FBUTs7Ozs7SUFEUixVQUNTLEtBQVU7O1lBQ1gsUUFBcUI7O1lBQ25CLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFROztZQUM1QyxlQUFlLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTOztZQUN4QyxlQUFlLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTO2dDQUVyQyxDQUFDOztnQkFDQSxPQUFPLEdBQWdCLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxPQUFLLFdBQVcsQ0FBQyxJQUFJOzs7O1lBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEVBQS9ELENBQStELEVBQUMsRUFBRTtnQkFDL0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLE9BQUssYUFBYSxFQUFFO29CQUMzRyxRQUFRLEdBQUcsT0FBTyxDQUFDO2lCQUN0QjthQUNKOzs7UUFOTCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7b0JBQS9CLENBQUM7U0FPVDtRQUVELElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2pFLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMzQztJQUNMLENBQUM7O2dCQTFESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGVBQWU7aUJBQzVCOzs7O2dCQVBtQixVQUFVOzs7OEJBWXpCLEtBQUs7NEJBTUwsS0FBSztnQ0FRTCxLQUFLOzRCQU9MLE1BQU07MkJBVU4sWUFBWSxTQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUFzQnRDLHlCQUFDO0NBQUEsQUE1REQsSUE0REM7U0F6RFksa0JBQWtCOzs7Ozs7SUFJM0IseUNBQ2tDOzs7OztJQUtsQyx1Q0FDa0M7Ozs7Ozs7SUFPbEMsMkNBQ2lDOzs7Ozs7SUFNakMsdUNBQ3VGOzs7Ozs7SUFHdkYsMkNBQW1DOzs7OztJQUd2QixtQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgZGVzaWduZWQgdG8gaGVscCBuYXZpZ2F0aW9uIGVsZW1lbnRzIGRldGVybWluZSB0aGUgZWxlbWVudCBjdXJyZW50bHkgaW4gdmlldyBvZiB0aGUgdXNlci4gXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2ZkU2Nyb2xsU3B5XSdcbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsU3B5RGlyZWN0aXZlIHtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiB0YWdzIHRvIHRyYWNrLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHRyYWNrZWRUYWdzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBldmVudHMgYXJlIHN0aWxsIGZpcmVkIGlmIHRoZXJlIGlzIG5vIHRhZyBwcmVzZW50IG9uIHRoZSB1c2VyJ3Mgc2NyZWVuLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGZpcmVFbXB0eTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFxuICAgICAqIEEgbnVtYmVyIHRoYXQgcmVwcmVzZW50IGF0IHdoYXQgbG9jYXRpb24gaW4gdGhlIGNvbnRhaW5lciB0aGUgZXZlbnQgaXMgZmlyZWQuIFxuICAgICAqIDAuNSB3b3VsZCBmaXJlIHRoZSBldmVudHMgaW4gdGhlIG1pZGRsZSBvZiB0aGUgY29udGFpbmVyLCBcbiAgICAgKiAwIGZvciB0aGUgdG9wIGFuZCAxIGZvciB0aGUgYm90dG9tLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHRhcmdldFBlcmNlbnQ6IG51bWJlciA9IDA7XG5cbiAgICAvKiogXG4gICAgICogRXZlbnQgZmlyZWQgb24gdGhlIHNjcm9sbCBlbGVtZW50IHdoZW4gYSBuZXcgaXRlbSBiZWNvbWVzIGFjdGl2YXRlZCBieSB0aGUgc2Nyb2xsc3B5IC4gXG4gICAgICogVGhlIHJldHVybmVkIHZhbHVlIGlzIHRoZSBIVE1MRWxlbWVudCBpdHNlbGYuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlYWRvbmx5IHNweUNoYW5nZTogRXZlbnRFbWl0dGVyPEhUTUxFbGVtZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8SFRNTEVsZW1lbnQ+KCk7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHByaXZhdGUgY3VycmVudEFjdGl2ZTogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ3Njcm9sbCcsIFsnJGV2ZW50J10pXG4gICAgb25TY3JvbGwoZXZlbnQ6IGFueSkge1xuICAgICAgICBsZXQgc3BpZWRUYWc6IEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jaGlsZHJlbjtcbiAgICAgICAgY29uc3QgdGFyZ2V0U2Nyb2xsVG9wID0gZXZlbnQudGFyZ2V0LnNjcm9sbFRvcDtcbiAgICAgICAgY29uc3QgdGFyZ2V0T2Zmc2V0VG9wID0gZXZlbnQudGFyZ2V0Lm9mZnNldFRvcDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50OiBIVE1MRWxlbWVudCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2tlZFRhZ3Muc29tZSh0YWcgPT4gdGFnLnRvTG9jYWxlVXBwZXJDYXNlKCkgPT09IGVsZW1lbnQudGFnTmFtZS50b0xvY2FsZVVwcGVyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgIGlmICgoZWxlbWVudC5vZmZzZXRUb3AgLSB0YXJnZXRPZmZzZXRUb3ApIDw9IHRhcmdldFNjcm9sbFRvcCArIGV2ZW50LnRhcmdldC5vZmZzZXRIZWlnaHQgKiB0aGlzLnRhcmdldFBlcmNlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3BpZWRUYWcgPSBlbGVtZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoc3BpZWRUYWcgfHwgdGhpcy5maXJlRW1wdHkpICYmIHNwaWVkVGFnICE9PSB0aGlzLmN1cnJlbnRBY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEFjdGl2ZSA9IHNwaWVkVGFnO1xuICAgICAgICAgICAgdGhpcy5zcHlDaGFuZ2UuZW1pdCh0aGlzLmN1cnJlbnRBY3RpdmUpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=