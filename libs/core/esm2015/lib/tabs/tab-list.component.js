/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { TabPanelComponent } from './tab/tab-panel.component';
import { TabsService } from './tabs.service';
/**
 * Represents a list of tab-panels.
 */
export class TabListComponent {
    /**
     * @param {?} tabsService
     */
    constructor(tabsService) {
        this.tabsService = tabsService;
        /**
         * Index of the selected tab panel.
         */
        this.selectedIndex = 0;
        /**
         * Event emitted when the selected panel changes.
         */
        this.selectedIndexChange = new EventEmitter();
    }
    /**
     * @hidden
     * @return {?}
     */
    ngAfterContentInit() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.selectTab(this.selectedIndex);
        }));
        this._tabSelectSubscription = this.tabsService.tabSelected.subscribe((/**
         * @param {?} index
         * @return {?}
         */
        index => {
            if (index !== this.selectedIndex) {
                this.selectTab(index);
            }
        }));
        this._tabsSubscription = this.panelTabs.changes.subscribe((/**
         * @return {?}
         */
        () => {
            if (!this.isIndexInRange() || this.isTabContentEmpty()) {
                this.resetTabHook();
            }
        }));
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        this._tabsSubscription.unsubscribe();
        this._tabSelectSubscription.unsubscribe();
    }
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.selectedIndex) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.selectTab(changes.selectedIndex.currentValue);
            }));
        }
    }
    /**
     * Function to select a new tab from an index.
     * @param {?} tabIndex Index of the tab to select.
     * @return {?}
     */
    selectTab(tabIndex) {
        if (this.isIndexInRange() && this.isTargetTabEnabled(tabIndex)) {
            this.panelTabs.forEach((/**
             * @param {?} tab
             * @param {?} index
             * @return {?}
             */
            (tab, index) => {
                tab.expanded = index === tabIndex;
            }));
            this.selectedIndex = tabIndex;
            this.selectedIndexChange.emit(tabIndex);
        }
    }
    /**
     * @hidden
     * @param {?} tabIndex
     * @return {?}
     */
    tabHeaderClickHandler(tabIndex) {
        if (this.selectedIndex !== tabIndex) {
            this.selectTab(tabIndex);
        }
    }
    /**
     * @hidden
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    tabHeaderKeyHandler(index, event) {
        this.tabsService.tabHeaderKeyHandler(index, event, this.tabLinks.map((/**
         * @param {?} tab
         * @return {?}
         */
        tab => tab.nativeElement)));
    }
    /**
     * @private
     * @return {?}
     */
    isIndexInRange() {
        return this.panelTabs && this.panelTabs.length > 0 && this.selectedIndex < this.panelTabs.length;
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    isTargetTabEnabled(index) {
        return !this.panelTabs.toArray()[index].disabled;
    }
    /**
     * @private
     * @return {?}
     */
    isTabContentEmpty() {
        /** @type {?} */
        let result = true;
        this.panelTabs.forEach((/**
         * @param {?} tab
         * @return {?}
         */
        tab => {
            if (tab.expanded) {
                result = false;
            }
        }));
        return result;
    }
    /**
     * @private
     * @return {?}
     */
    resetTabHook() {
        this.selectedIndex = 0;
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.selectTab(this.selectedIndex);
        }));
    }
}
TabListComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-tab-list',
                template: "<ul class=\"fd-tabs\"\n    role=\"tablist\">\n    <li fd-tab-item\n        *ngFor=\"let tab of panelTabs.toArray(); let i = index;\">\n        <a #tabLink\n           fd-tab-link\n           [disabled]=\"tab.disabled\"\n           [active]=\"tab.expanded\"\n           [attr.tabindex]=\"tab.disabled ? -1 : 0\"\n           [attr.aria-controls]=\"tab.id\"\n           [attr.aria-label]=\"tab.ariaLabel || null\"\n           [attr.aria-labelledby]=\"(!tab.ariaLabel && tab.ariaLabelledBy) ? tab.ariaLabelledBy : null\"\n           (keydown)=\"tabHeaderKeyHandler(i, $event)\"\n           (click)=\"tabHeaderClickHandler(i)\">\n\n            <ng-container *ngIf=\"tab.titleTemplate\">\n                <ng-container [fd-tab-load-title]=\"tab.titleTemplate\"></ng-container>\n            </ng-container>\n            <ng-container *ngIf=\"!tab.titleTemplate\">{{ tab.title }}</ng-container>\n        </a>\n    </li>\n</ul>\n<ng-content select=\"fd-tab\"></ng-content>\n<ng-content></ng-content>\n",
                host: {
                    class: 'fd-tabs-custom'
                },
                encapsulation: ViewEncapsulation.None,
                providers: [TabsService],
                styles: [".fd-tabs-custom{display:block}"]
            }] }
];
/** @nocollapse */
TabListComponent.ctorParameters = () => [
    { type: TabsService }
];
TabListComponent.propDecorators = {
    panelTabs: [{ type: ContentChildren, args: [TabPanelComponent,] }],
    tabLinks: [{ type: ViewChildren, args: ['tabLink',] }],
    selectedIndex: [{ type: Input }],
    selectedIndexChange: [{ type: Output }]
};
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    TabListComponent.prototype.panelTabs;
    /**
     * @hidden
     * @type {?}
     */
    TabListComponent.prototype.tabLinks;
    /**
     * Index of the selected tab panel.
     * @type {?}
     */
    TabListComponent.prototype.selectedIndex;
    /**
     * Event emitted when the selected panel changes.
     * @type {?}
     */
    TabListComponent.prototype.selectedIndexChange;
    /**
     * @type {?}
     * @private
     */
    TabListComponent.prototype._tabsSubscription;
    /**
     * @type {?}
     * @private
     */
    TabListComponent.prototype._tabSelectSubscription;
    /**
     * @type {?}
     * @private
     */
    TabListComponent.prototype.tabsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3RhYnMvdGFiLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUgsU0FBUyxFQUNULGVBQWUsRUFFZixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBRVQsWUFBWSxFQUNaLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFlN0MsTUFBTSxPQUFPLGdCQUFnQjs7OztJQXFCekIsWUFDWSxXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTs7OztRQVZwQyxrQkFBYSxHQUFXLENBQUMsQ0FBQzs7OztRQUkxQix3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBTzlDLENBQUM7Ozs7O0lBR0osa0JBQWtCO1FBQ2QsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pFLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVB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Z0JBQWdCO2lCQUMxQjtnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDOzthQUMzQjs7OztZQWRRLFdBQVc7Ozt3QkFrQmYsZUFBZSxTQUFDLGlCQUFpQjt1QkFJakMsWUFBWSxTQUFDLFNBQVM7NEJBSXRCLEtBQUs7a0NBSUwsTUFBTTs7Ozs7OztJQVpQLHFDQUN3Qzs7Ozs7SUFHeEMsb0NBQ2dDOzs7OztJQUdoQyx5Q0FDMEI7Ozs7O0lBRzFCLCtDQUNpRDs7Ozs7SUFFakQsNkNBQXdDOzs7OztJQUN4QyxrREFBNkM7Ozs7O0lBR3pDLHVDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFZpZXdDaGlsZHJlbixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhYlBhbmVsQ29tcG9uZW50IH0gZnJvbSAnLi90YWIvdGFiLXBhbmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi90YWJzLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBsaXN0IG9mIHRhYi1wYW5lbHMuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtdGFiLWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90YWItbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGFiLWxpc3QuY29tcG9uZW50LnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnZmQtdGFicy1jdXN0b20nXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW1RhYnNTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBUYWJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAQ29udGVudENoaWxkcmVuKFRhYlBhbmVsQ29tcG9uZW50KVxuICAgIHBhbmVsVGFiczogUXVlcnlMaXN0PFRhYlBhbmVsQ29tcG9uZW50PjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQFZpZXdDaGlsZHJlbigndGFiTGluaycpXG4gICAgdGFiTGlua3M6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcblxuICAgIC8qKiBJbmRleCBvZiB0aGUgc2VsZWN0ZWQgdGFiIHBhbmVsLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0ZWRJbmRleDogbnVtYmVyID0gMDtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdGVkIHBhbmVsIGNoYW5nZXMuICovXG4gICAgQE91dHB1dCgpXG4gICAgc2VsZWN0ZWRJbmRleENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgcHJpdmF0ZSBfdGFic1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgX3RhYlNlbGVjdFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgdGFic1NlcnZpY2U6IFRhYnNTZXJ2aWNlXG4gICAgKSB7fVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWIodGhpcy5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fdGFiU2VsZWN0U3Vic2NyaXB0aW9uID0gdGhpcy50YWJzU2VydmljZS50YWJTZWxlY3RlZC5zdWJzY3JpYmUoaW5kZXggPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSB0aGlzLnNlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYihpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX3RhYnNTdWJzY3JpcHRpb24gPSB0aGlzLnBhbmVsVGFicy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNJbmRleEluUmFuZ2UoKSB8fCB0aGlzLmlzVGFiQ29udGVudEVtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0VGFiSG9vaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90YWJzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuX3RhYlNlbGVjdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoY2hhbmdlcy5zZWxlY3RlZEluZGV4KSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYihjaGFuZ2VzLnNlbGVjdGVkSW5kZXguY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gc2VsZWN0IGEgbmV3IHRhYiBmcm9tIGFuIGluZGV4LlxuICAgICAqIEBwYXJhbSB0YWJJbmRleCBJbmRleCBvZiB0aGUgdGFiIHRvIHNlbGVjdC5cbiAgICAgKi9cbiAgICBzZWxlY3RUYWIodGFiSW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgIGlmICh0aGlzLmlzSW5kZXhJblJhbmdlKCkgJiYgdGhpcy5pc1RhcmdldFRhYkVuYWJsZWQodGFiSW5kZXgpKSB7XG4gICAgICAgICAgICB0aGlzLnBhbmVsVGFicy5mb3JFYWNoKCh0YWIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGFiLmV4cGFuZGVkID0gaW5kZXggPT09IHRhYkluZGV4O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0YWJJbmRleDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleENoYW5nZS5lbWl0KHRhYkluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgdGFiSGVhZGVyQ2xpY2tIYW5kbGVyKHRhYkluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCAhPT0gdGFiSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiKHRhYkluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgdGFiSGVhZGVyS2V5SGFuZGxlcihpbmRleDogbnVtYmVyLCBldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UudGFiSGVhZGVyS2V5SGFuZGxlcihpbmRleCwgZXZlbnQsIHRoaXMudGFiTGlua3MubWFwKHRhYiA9PiB0YWIubmF0aXZlRWxlbWVudCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNJbmRleEluUmFuZ2UoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhbmVsVGFicyAmJiB0aGlzLnBhbmVsVGFicy5sZW5ndGggPiAwICYmIHRoaXMuc2VsZWN0ZWRJbmRleCA8IHRoaXMucGFuZWxUYWJzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVGFyZ2V0VGFiRW5hYmxlZChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5wYW5lbFRhYnMudG9BcnJheSgpW2luZGV4XS5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVGFiQ29udGVudEVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYW5lbFRhYnMuZm9yRWFjaCh0YWIgPT4ge1xuICAgICAgICAgICAgaWYgKHRhYi5leHBhbmRlZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0VGFiSG9vaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=