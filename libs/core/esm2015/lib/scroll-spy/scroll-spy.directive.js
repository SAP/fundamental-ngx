/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
/**
 * A directive designed to help navigation elements determine the element currently in view of the user.
 */
export class ScrollSpyDirective {
    /**
     * @hidden
     * @param {?} elRef
     */
    constructor(elRef) {
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
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    onScroll(event) {
        /** @type {?} */
        let spiedTag;
        /** @type {?} */
        const children = this.elRef.nativeElement.children;
        /** @type {?} */
        const targetScrollTop = event.target.scrollTop;
        /** @type {?} */
        const targetOffsetTop = event.target.offsetTop;
        for (let i = 0; i < children.length; i++) {
            /** @type {?} */
            const element = children[i];
            if (this.trackedTags.some((/**
             * @param {?} tag
             * @return {?}
             */
            tag => tag.toLocaleUpperCase() === element.tagName.toLocaleUpperCase()))) {
                if ((element.offsetTop - targetOffsetTop) <= targetScrollTop + event.target.offsetHeight * this.targetPercent) {
                    spiedTag = element;
                }
            }
        }
        if ((spiedTag || this.fireEmpty) && spiedTag !== this.currentActive) {
            this.currentActive = spiedTag;
            this.spyChange.emit(this.currentActive);
        }
    }
}
ScrollSpyDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fdScrollSpy]'
            },] }
];
/** @nocollapse */
ScrollSpyDirective.ctorParameters = () => [
    { type: ElementRef }
];
ScrollSpyDirective.propDecorators = {
    trackedTags: [{ type: Input }],
    fireEmpty: [{ type: Input }],
    targetPercent: [{ type: Input }],
    spyChange: [{ type: Output }],
    onScroll: [{ type: HostListener, args: ['scroll', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXNweS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2Nyb2xsLXNweS9zY3JvbGwtc3B5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBUWpHLE1BQU0sT0FBTyxrQkFBa0I7Ozs7O0lBZ0MzQixZQUFvQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZOzs7O1FBM0I5QixnQkFBVyxHQUFhLEVBQUUsQ0FBQzs7OztRQU0zQixjQUFTLEdBQVksS0FBSyxDQUFDOzs7Ozs7UUFRM0Isa0JBQWEsR0FBVyxDQUFDLENBQUM7Ozs7O1FBT2pCLGNBQVMsR0FBOEIsSUFBSSxZQUFZLEVBQWUsQ0FBQztJQU0vQyxDQUFDOzs7Ozs7SUFJekMsUUFBUSxDQUFDLEtBQVU7O1lBQ1gsUUFBcUI7O2NBQ25CLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFROztjQUM1QyxlQUFlLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTOztjQUN4QyxlQUFlLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTO1FBRTlDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztrQkFDaEMsT0FBTyxHQUFnQixRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJOzs7O1lBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEVBQUMsRUFBRTtnQkFDL0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQzNHLFFBQVEsR0FBRyxPQUFPLENBQUM7aUJBQ3RCO2FBQ0o7U0FDSjtRQUVELElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsS0FBSyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2pFLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMzQztJQUNMLENBQUM7OztZQTFESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7YUFDNUI7Ozs7WUFQbUIsVUFBVTs7OzBCQVl6QixLQUFLO3dCQU1MLEtBQUs7NEJBUUwsS0FBSzt3QkFPTCxNQUFNO3VCQVVOLFlBQVksU0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7SUEvQmxDLHlDQUNrQzs7Ozs7SUFLbEMsdUNBQ2tDOzs7Ozs7O0lBT2xDLDJDQUNpQzs7Ozs7O0lBTWpDLHVDQUN1Rjs7Ozs7O0lBR3ZGLDJDQUFtQzs7Ozs7SUFHdkIsbUNBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIGRlc2lnbmVkIHRvIGhlbHAgbmF2aWdhdGlvbiBlbGVtZW50cyBkZXRlcm1pbmUgdGhlIGVsZW1lbnQgY3VycmVudGx5IGluIHZpZXcgb2YgdGhlIHVzZXIuIFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tmZFNjcm9sbFNweV0nXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbFNweURpcmVjdGl2ZSB7XG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2YgdGFncyB0byB0cmFjay5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0cmFja2VkVGFnczogc3RyaW5nW10gPSBbXTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgZXZlbnRzIGFyZSBzdGlsbCBmaXJlZCBpZiB0aGVyZSBpcyBubyB0YWcgcHJlc2VudCBvbiB0aGUgdXNlcidzIHNjcmVlbi5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBmaXJlRW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBcbiAgICAgKiBBIG51bWJlciB0aGF0IHJlcHJlc2VudCBhdCB3aGF0IGxvY2F0aW9uIGluIHRoZSBjb250YWluZXIgdGhlIGV2ZW50IGlzIGZpcmVkLiBcbiAgICAgKiAwLjUgd291bGQgZmlyZSB0aGUgZXZlbnRzIGluIHRoZSBtaWRkbGUgb2YgdGhlIGNvbnRhaW5lciwgXG4gICAgICogMCBmb3IgdGhlIHRvcCBhbmQgMSBmb3IgdGhlIGJvdHRvbS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyB0YXJnZXRQZXJjZW50OiBudW1iZXIgPSAwO1xuXG4gICAgLyoqIFxuICAgICAqIEV2ZW50IGZpcmVkIG9uIHRoZSBzY3JvbGwgZWxlbWVudCB3aGVuIGEgbmV3IGl0ZW0gYmVjb21lcyBhY3RpdmF0ZWQgYnkgdGhlIHNjcm9sbHNweSAuIFxuICAgICAqIFRoZSByZXR1cm5lZCB2YWx1ZSBpcyB0aGUgSFRNTEVsZW1lbnQgaXRzZWxmLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBzcHlDaGFuZ2U6IEV2ZW50RW1pdHRlcjxIVE1MRWxlbWVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEhUTUxFbGVtZW50PigpO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBwcml2YXRlIGN1cnJlbnRBY3RpdmU6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdExpc3RlbmVyKCdzY3JvbGwnLCBbJyRldmVudCddKVxuICAgIG9uU2Nyb2xsKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgbGV0IHNwaWVkVGFnOiBIVE1MRWxlbWVudDtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW47XG4gICAgICAgIGNvbnN0IHRhcmdldFNjcm9sbFRvcCA9IGV2ZW50LnRhcmdldC5zY3JvbGxUb3A7XG4gICAgICAgIGNvbnN0IHRhcmdldE9mZnNldFRvcCA9IGV2ZW50LnRhcmdldC5vZmZzZXRUb3A7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudDogSFRNTEVsZW1lbnQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrZWRUYWdzLnNvbWUodGFnID0+IHRhZy50b0xvY2FsZVVwcGVyQ2FzZSgpID09PSBlbGVtZW50LnRhZ05hbWUudG9Mb2NhbGVVcHBlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoKGVsZW1lbnQub2Zmc2V0VG9wIC0gdGFyZ2V0T2Zmc2V0VG9wKSA8PSB0YXJnZXRTY3JvbGxUb3AgKyBldmVudC50YXJnZXQub2Zmc2V0SGVpZ2h0ICogdGhpcy50YXJnZXRQZXJjZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHNwaWVkVGFnID0gZWxlbWVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKHNwaWVkVGFnIHx8IHRoaXMuZmlyZUVtcHR5KSAmJiBzcGllZFRhZyAhPT0gdGhpcy5jdXJyZW50QWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRBY3RpdmUgPSBzcGllZFRhZztcbiAgICAgICAgICAgIHRoaXMuc3B5Q2hhbmdlLmVtaXQodGhpcy5jdXJyZW50QWN0aXZlKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19