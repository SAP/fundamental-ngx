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
var TabListComponent = /** @class */ (function () {
    function TabListComponent(tabsService) {
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
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TabListComponent.prototype.ngAfterContentInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.selectTab(_this.selectedIndex);
        }));
        this._tabSelectSubscription = this.tabsService.tabSelected.subscribe((/**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            if (index !== _this.selectedIndex) {
                _this.selectTab(index);
            }
        }));
        this._tabsSubscription = this.panelTabs.changes.subscribe((/**
         * @return {?}
         */
        function () {
            if (!_this.isIndexInRange() || _this.isTabContentEmpty()) {
                _this.resetTabHook();
            }
        }));
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TabListComponent.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._tabsSubscription.unsubscribe();
        this._tabSelectSubscription.unsubscribe();
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    TabListComponent.prototype.ngOnChanges = /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes.selectedIndex) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.selectTab(changes.selectedIndex.currentValue);
            }));
        }
    };
    /**
     * Function to select a new tab from an index.
     * @param tabIndex Index of the tab to select.
     */
    /**
     * Function to select a new tab from an index.
     * @param {?} tabIndex Index of the tab to select.
     * @return {?}
     */
    TabListComponent.prototype.selectTab = /**
     * Function to select a new tab from an index.
     * @param {?} tabIndex Index of the tab to select.
     * @return {?}
     */
    function (tabIndex) {
        if (this.isIndexInRange() && this.isTargetTabEnabled(tabIndex)) {
            this.panelTabs.forEach((/**
             * @param {?} tab
             * @param {?} index
             * @return {?}
             */
            function (tab, index) {
                tab.expanded = index === tabIndex;
            }));
            this.selectedIndex = tabIndex;
            this.selectedIndexChange.emit(tabIndex);
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} tabIndex
     * @return {?}
     */
    TabListComponent.prototype.tabHeaderClickHandler = /**
     * @hidden
     * @param {?} tabIndex
     * @return {?}
     */
    function (tabIndex) {
        if (this.selectedIndex !== tabIndex) {
            this.selectTab(tabIndex);
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    TabListComponent.prototype.tabHeaderKeyHandler = /**
     * @hidden
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    function (index, event) {
        this.tabsService.tabHeaderKeyHandler(index, event, this.tabLinks.map((/**
         * @param {?} tab
         * @return {?}
         */
        function (tab) { return tab.nativeElement; })));
    };
    /**
     * @private
     * @return {?}
     */
    TabListComponent.prototype.isIndexInRange = /**
     * @private
     * @return {?}
     */
    function () {
        return this.panelTabs && this.panelTabs.length > 0 && this.selectedIndex < this.panelTabs.length;
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    TabListComponent.prototype.isTargetTabEnabled = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return !this.panelTabs.toArray()[index].disabled;
    };
    /**
     * @private
     * @return {?}
     */
    TabListComponent.prototype.isTabContentEmpty = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var result = true;
        this.panelTabs.forEach((/**
         * @param {?} tab
         * @return {?}
         */
        function (tab) {
            if (tab.expanded) {
                result = false;
            }
        }));
        return result;
    };
    /**
     * @private
     * @return {?}
     */
    TabListComponent.prototype.resetTabHook = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.selectedIndex = 0;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.selectTab(_this.selectedIndex);
        }));
    };
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
    TabListComponent.ctorParameters = function () { return [
        { type: TabsService }
    ]; };
    TabListComponent.propDecorators = {
        panelTabs: [{ type: ContentChildren, args: [TabPanelComponent,] }],
        tabLinks: [{ type: ViewChildren, args: ['tabLink',] }],
        selectedIndex: [{ type: Input }],
        selectedIndexChange: [{ type: Output }]
    };
    return TabListComponent;
}());
export { TabListComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3RhYnMvdGFiLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUgsU0FBUyxFQUNULGVBQWUsRUFFZixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBRVQsWUFBWSxFQUNaLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFLN0M7SUErQkksMEJBQ1ksV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7Ozs7UUFWcEMsa0JBQWEsR0FBVyxDQUFDLENBQUM7Ozs7UUFJMUIsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQU85QyxDQUFDO0lBRUosY0FBYzs7Ozs7SUFDZCw2Q0FBa0I7Ozs7SUFBbEI7UUFBQSxpQkFnQkM7UUFmRyxVQUFVOzs7UUFBQztZQUNQLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLEtBQUs7WUFDdEUsSUFBSSxLQUFLLEtBQUssS0FBSSxDQUFDLGFBQWEsRUFBRTtnQkFDOUIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6QjtRQUNMLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVM7OztRQUFDO1lBQ3RELElBQUks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QUMsQ0FBQztRQUN2QyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7O2dCQXRISixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLDQrQkFBd0M7b0JBRXhDLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsZ0JBQWdCO3FCQUMxQjtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDOztpQkFDM0I7Ozs7Z0JBZFEsV0FBVzs7OzRCQWtCZixlQUFlLFNBQUMsaUJBQWlCOzJCQUlqQyxZQUFZLFNBQUMsU0FBUztnQ0FJdEIsS0FBSztzQ0FJTCxNQUFNOztJQThGWCx1QkFBQztDQUFBLEFBdkhELElBdUhDO1NBN0dZLGdCQUFnQjs7Ozs7O0lBR3pCLHFDQUN3Qzs7Ozs7SUFHeEMsb0NBQ2dDOzs7OztJQUdoQyx5Q0FDMEI7Ozs7O0lBRzFCLCtDQUNpRDs7Ozs7SUFFakQsNkNBQXdDOzs7OztJQUN4QyxrREFBNkM7Ozs7O0lBR3pDLHVDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFZpZXdDaGlsZHJlbixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhYlBhbmVsQ29tcG9uZW50IH0gZnJvbSAnLi90YWIvdGFiLXBhbmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi90YWJzLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBsaXN0IG9mIHRhYi1wYW5lbHMuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtdGFiLWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90YWItbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGFiLWxpc3QuY29tcG9uZW50LnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnZmQtdGFicy1jdXN0b20nXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW1RhYnNTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBUYWJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAQ29udGVudENoaWxkcmVuKFRhYlBhbmVsQ29tcG9uZW50KVxuICAgIHBhbmVsVGFiczogUXVlcnlMaXN0PFRhYlBhbmVsQ29tcG9uZW50PjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQFZpZXdDaGlsZHJlbigndGFiTGluaycpXG4gICAgdGFiTGlua3M6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcblxuICAgIC8qKiBJbmRleCBvZiB0aGUgc2VsZWN0ZWQgdGFiIHBhbmVsLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0ZWRJbmRleDogbnVtYmVyID0gMDtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdGVkIHBhbmVsIGNoYW5nZXMuICovXG4gICAgQE91dHB1dCgpXG4gICAgc2VsZWN0ZWRJbmRleENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgcHJpdmF0ZSBfdGFic1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgX3RhYlNlbGVjdFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgdGFic1NlcnZpY2U6IFRhYnNTZXJ2aWNlXG4gICAgKSB7fVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWIodGhpcy5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fdGFiU2VsZWN0U3Vic2NyaXB0aW9uID0gdGhpcy50YWJzU2VydmljZS50YWJTZWxlY3RlZC5zdWJzY3JpYmUoaW5kZXggPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSB0aGlzLnNlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYihpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX3RhYnNTdWJzY3JpcHRpb24gPSB0aGlzLnBhbmVsVGFicy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNJbmRleEluUmFuZ2UoKSB8fCB0aGlzLmlzVGFiQ29udGVudEVtcHR5KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0VGFiSG9vaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90YWJzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuX3RhYlNlbGVjdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoY2hhbmdlcy5zZWxlY3RlZEluZGV4KSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFRhYihjaGFuZ2VzLnNlbGVjdGVkSW5kZXguY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gc2VsZWN0IGEgbmV3IHRhYiBmcm9tIGFuIGluZGV4LlxuICAgICAqIEBwYXJhbSB0YWJJbmRleCBJbmRleCBvZiB0aGUgdGFiIHRvIHNlbGVjdC5cbiAgICAgKi9cbiAgICBzZWxlY3RUYWIodGFiSW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgIGlmICh0aGlzLmlzSW5kZXhJblJhbmdlKCkgJiYgdGhpcy5pc1RhcmdldFRhYkVuYWJsZWQodGFiSW5kZXgpKSB7XG4gICAgICAgICAgICB0aGlzLnBhbmVsVGFicy5mb3JFYWNoKCh0YWIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGFiLmV4cGFuZGVkID0gaW5kZXggPT09IHRhYkluZGV4O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0YWJJbmRleDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleENoYW5nZS5lbWl0KHRhYkluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgdGFiSGVhZGVyQ2xpY2tIYW5kbGVyKHRhYkluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCAhPT0gdGFiSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFiKHRhYkluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgdGFiSGVhZGVyS2V5SGFuZGxlcihpbmRleDogbnVtYmVyLCBldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFic1NlcnZpY2UudGFiSGVhZGVyS2V5SGFuZGxlcihpbmRleCwgZXZlbnQsIHRoaXMudGFiTGlua3MubWFwKHRhYiA9PiB0YWIubmF0aXZlRWxlbWVudCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNJbmRleEluUmFuZ2UoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhbmVsVGFicyAmJiB0aGlzLnBhbmVsVGFicy5sZW5ndGggPiAwICYmIHRoaXMuc2VsZWN0ZWRJbmRleCA8IHRoaXMucGFuZWxUYWJzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVGFyZ2V0VGFiRW5hYmxlZChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhdGhpcy5wYW5lbFRhYnMudG9BcnJheSgpW2luZGV4XS5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVGFiQ29udGVudEVtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYW5lbFRhYnMuZm9yRWFjaCh0YWIgPT4ge1xuICAgICAgICAgICAgaWYgKHRhYi5leHBhbmRlZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0VGFiSG9vaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=