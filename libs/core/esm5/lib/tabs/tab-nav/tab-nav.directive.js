/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ContentChildren, Directive, EventEmitter, Output, QueryList, Renderer2 } from '@angular/core';
import { TabLinkDirective } from '../tab-link/tab-link.directive';
import { TabItemDirective } from '../tab-item/tab-item.directive';
import { TabsService } from '../tabs.service';
/**
 * Tab Nav for only navigation mode when you want for example use router-outlet
 *
 * ```html
 * <nav fd-tab-nav>
 *  <div fd-tab-item>
 *      <a fd-tab-link
 *      [active]="true">
 *          Link
 *      </a>
 *  </div>
 *  <div fd-tab-item>
 *      <a fd-tab-link
 *      [active]="false">
 *          Link
 *      </a>
 *  </div>
 *  <a fd-tab-link
 *  [active]="false">
 *      Link
 *  </a>
 * </nav>
 * ```
 */
var TabNavDirective = /** @class */ (function () {
    /** @hidden */
    function TabNavDirective(renderer, tabsService) {
        this.renderer = renderer;
        this.tabsService = tabsService;
        /**
         * Event Thrown every time something is clicked
         */
        this.onKeyDown = new EventEmitter();
    }
    Object.defineProperty(TabNavDirective.prototype, "tabLinks", {
        /** Function that gives possibility to get all the link directives, with and without nav__item wrapper */
        get: /**
         * Function that gives possibility to get all the link directives, with and without nav__item wrapper
         * @return {?}
         */
        function () {
            /** @type {?} */
            var tabLinks = [];
            if (this.links) {
                tabLinks = tabLinks.concat(this.links.map((/**
                 * @param {?} link
                 * @return {?}
                 */
                function (link) { return link; })));
            }
            if (this.items) {
                tabLinks = tabLinks.concat(this.items.filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return !!item.linkItem; })).map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.linkItem; })));
            }
            return tabLinks;
        },
        enumerable: true,
        configurable: true
    });
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TabNavDirective.prototype.ngAfterContentInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        this._tabSelectSubscription = this.tabsService.tabSelected.subscribe((/**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            _this.selectTab(index);
        }));
        this.tabLinks.forEach((/**
         * @param {?} linkElement
         * @param {?} index
         * @return {?}
         */
        function (linkElement, index) {
            _this.renderer.listen(linkElement.elementRef.nativeElement, 'keydown', (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                _this.tabsService.tabHeaderKeyHandler(index, event, _this.tabLinks.map((/**
                 * @param {?} link
                 * @return {?}
                 */
                function (link) { return link.elementRef.nativeElement; })));
            }));
        }));
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TabNavDirective.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._tabSelectSubscription.unsubscribe();
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
    TabNavDirective.prototype.selectTab = /**
     * Function to select a new tab from an index.
     * @param {?} tabIndex Index of the tab to select.
     * @return {?}
     */
    function (tabIndex) {
        this.tabLinks[tabIndex].elementRef.nativeElement.click();
    };
    TabNavDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-tab-nav]',
                    host: {
                        'class': 'fd-tabs',
                        'role': 'tablist'
                    },
                    providers: [TabsService]
                },] }
    ];
    /** @nocollapse */
    TabNavDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: TabsService }
    ]; };
    TabNavDirective.propDecorators = {
        links: [{ type: ContentChildren, args: [TabLinkDirective,] }],
        items: [{ type: ContentChildren, args: [TabItemDirective,] }],
        onKeyDown: [{ type: Output }]
    };
    return TabNavDirective;
}());
export { TabNavDirective };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    TabNavDirective.prototype.links;
    /**
     * @hidden
     * @type {?}
     */
    TabNavDirective.prototype.items;
    /**
     * @hidden
     * @type {?}
     * @private
     */
    TabNavDirective.prototype._tabSelectSubscription;
    /**
     * Event Thrown every time something is clicked
     * @type {?}
     */
    TabNavDirective.prototype.onKeyDown;
    /**
     * @type {?}
     * @private
     */
    TabNavDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    TabNavDirective.prototype.tabsService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGFicy90YWItbmF2L3RhYi1uYXYuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUgsZUFBZSxFQUNmLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkI5QztJQXVCSSxjQUFjO0lBQ2QseUJBQ1ksUUFBbUIsRUFDbkIsV0FBd0I7UUFEeEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTs7OztRQUwxQixjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQStCLENBQUM7SUFNbkUsQ0FBQztJQUdKLHNCQUFXLHFDQUFRO1FBRG5CLHlHQUF5Rzs7Ozs7UUFDekc7O2dCQUNRLFFBQVEsR0FBdUIsRUFBRTtZQUNyQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQUUsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHOzs7O2dCQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxFQUFKLENBQUksRUFBQyxDQUFDLENBQUM7YUFBRTtZQUM3RSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQUUsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNOzs7O2dCQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQWYsQ0FBZSxFQUFDLENBQUMsR0FBRzs7OztnQkFBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxRQUFRLEVBQWIsQ0FBYSxFQUFDLENBQUMsQ0FBQzthQUFFO1lBQ3RILE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7OztPQUFBO0lBRUQsY0FBYzs7Ozs7SUFDUCw0Q0FBa0I7Ozs7SUFBekI7UUFBQSxpQkFVQztRQVRHLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxLQUFLO1lBQ3RFLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU87Ozs7O1FBQUMsVUFBQyxXQUFXLEVBQUUsS0FBSztZQUNyQyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxTQUFTOzs7O1lBQUUsVUFBQyxLQUFLO2dCQUN4RSxLQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHOzs7O2dCQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQTdCLENBQTZCLEVBQUMsQ0FBQyxDQUFBO1lBQ2hILENBQUMsRUFDSixDQUFBO1FBQUEsQ0FBQyxFQUFDLENBQUE7SUFDUCxDQUFDO0lBRUQsY0FBYzs7Ozs7SUFDZCxxQ0FBVzs7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILG1DQUFTOzs7OztJQUFULFVBQVUsUUFBZ0I7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdELENBQUM7O2dCQTdESixTQUFTLFNBQUM7O29CQUVQLFFBQVEsRUFBRSxjQUFjO29CQUN4QixJQUFJLEVBQUU7d0JBQ0YsT0FBTyxFQUFFLFNBQVM7d0JBQ2xCLE1BQU0sRUFBRSxTQUFTO3FCQUNwQjtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxXQUFXLENBQUM7aUJBQzNCOzs7O2dCQXpDRyxTQUFTO2dCQUlKLFdBQVc7Ozt3QkF5Q2YsZUFBZSxTQUFDLGdCQUFnQjt3QkFHaEMsZUFBZSxTQUFDLGdCQUFnQjs0QkFNaEMsTUFBTTs7SUF5Q1gsc0JBQUM7Q0FBQSxBQTlERCxJQThEQztTQXJEWSxlQUFlOzs7Ozs7SUFHeEIsZ0NBQXNFOzs7OztJQUd0RSxnQ0FBc0U7Ozs7OztJQUd0RSxpREFBNkM7Ozs7O0lBRzdDLG9DQUFzRTs7Ozs7SUFJbEUsbUNBQTJCOzs7OztJQUMzQixzQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhYkxpbmtEaXJlY3RpdmUgfSBmcm9tICcuLi90YWItbGluay90YWItbGluay5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGFiSXRlbURpcmVjdGl2ZSB9IGZyb20gJy4uL3RhYi1pdGVtL3RhYi1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUYWJzU2VydmljZSB9IGZyb20gJy4uL3RhYnMuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuXG4vKipcbiAqIFRhYiBOYXYgZm9yIG9ubHkgbmF2aWdhdGlvbiBtb2RlIHdoZW4geW91IHdhbnQgZm9yIGV4YW1wbGUgdXNlIHJvdXRlci1vdXRsZXRcbiAqXG4gKiBgYGBodG1sXG4gKjxuYXYgZmQtdGFiLW5hdj5cbiAqICA8ZGl2IGZkLXRhYi1pdGVtPlxuICogICAgICA8YSBmZC10YWItbGlua1xuICogICAgICBbYWN0aXZlXT1cInRydWVcIj5cbiAqICAgICAgICAgIExpbmtcbiAqICAgICAgPC9hPlxuICogIDwvZGl2PlxuICogIDxkaXYgZmQtdGFiLWl0ZW0+XG4gKiAgICAgIDxhIGZkLXRhYi1saW5rXG4gKiAgICAgIFthY3RpdmVdPVwiZmFsc2VcIj5cbiAqICAgICAgICAgIExpbmtcbiAqICAgICAgPC9hPlxuICogIDwvZGl2PlxuICogIDxhIGZkLXRhYi1saW5rXG4gKiAgW2FjdGl2ZV09XCJmYWxzZVwiPlxuICogICAgICBMaW5rXG4gKiAgPC9hPlxuICogPC9uYXY+XG4gKiBgYGBcbiAqL1xuXG5ARGlyZWN0aXZlKHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbZmQtdGFiLW5hdl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ2ZkLXRhYnMnLFxuICAgICAgICAncm9sZSc6ICd0YWJsaXN0J1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbVGFic1NlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFRhYk5hdkRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oVGFiTGlua0RpcmVjdGl2ZSkgbGlua3M6IFF1ZXJ5TGlzdDxUYWJMaW5rRGlyZWN0aXZlPjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihUYWJJdGVtRGlyZWN0aXZlKSBpdGVtczogUXVlcnlMaXN0PFRhYkl0ZW1EaXJlY3RpdmU+O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBwcml2YXRlIF90YWJTZWxlY3RTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIC8qKiBFdmVudCBUaHJvd24gZXZlcnkgdGltZSBzb21ldGhpbmcgaXMgY2xpY2tlZCAqL1xuICAgIEBPdXRwdXQoKSBvbktleURvd24gPSBuZXcgRXZlbnRFbWl0dGVyPHtldmVudDogYW55LCBpbmRleDogbnVtYmVyfT4oKTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSB0YWJzU2VydmljZTogVGFic1NlcnZpY2VcbiAgICApIHt9XG5cbiAgICAvKiogRnVuY3Rpb24gdGhhdCBnaXZlcyBwb3NzaWJpbGl0eSB0byBnZXQgYWxsIHRoZSBsaW5rIGRpcmVjdGl2ZXMsIHdpdGggYW5kIHdpdGhvdXQgbmF2X19pdGVtIHdyYXBwZXIgKi9cbiAgICBwdWJsaWMgZ2V0IHRhYkxpbmtzKCk6IFRhYkxpbmtEaXJlY3RpdmVbXSB7XG4gICAgICAgIGxldCB0YWJMaW5rczogVGFiTGlua0RpcmVjdGl2ZVtdID0gW107XG4gICAgICAgIGlmICh0aGlzLmxpbmtzKSB7IHRhYkxpbmtzID0gdGFiTGlua3MuY29uY2F0KHRoaXMubGlua3MubWFwKGxpbmsgPT4gbGluaykpOyB9XG4gICAgICAgIGlmICh0aGlzLml0ZW1zKSB7IHRhYkxpbmtzID0gdGFiTGlua3MuY29uY2F0KHRoaXMuaXRlbXMuZmlsdGVyKGl0ZW0gPT4gISFpdGVtLmxpbmtJdGVtKS5tYXAoaXRlbSA9PiBpdGVtLmxpbmtJdGVtKSk7IH1cbiAgICAgICAgcmV0dXJuIHRhYkxpbmtzO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdGFiU2VsZWN0U3Vic2NyaXB0aW9uID0gdGhpcy50YWJzU2VydmljZS50YWJTZWxlY3RlZC5zdWJzY3JpYmUoaW5kZXggPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWIoaW5kZXgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRhYkxpbmtzLmZvckVhY2goKGxpbmtFbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4obGlua0VsZW1lbnQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudGFic1NlcnZpY2UudGFiSGVhZGVyS2V5SGFuZGxlcihpbmRleCwgZXZlbnQsIHRoaXMudGFiTGlua3MubWFwKGxpbmsgPT4gbGluay5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKVxuICAgICAgICAgICAgfVxuICAgICAgICApfSlcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90YWJTZWxlY3RTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBzZWxlY3QgYSBuZXcgdGFiIGZyb20gYW4gaW5kZXguXG4gICAgICogQHBhcmFtIHRhYkluZGV4IEluZGV4IG9mIHRoZSB0YWIgdG8gc2VsZWN0LlxuICAgICAqL1xuICAgIHNlbGVjdFRhYih0YWJJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFiTGlua3NbdGFiSW5kZXhdLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgIH1cbn1cbiJdfQ==