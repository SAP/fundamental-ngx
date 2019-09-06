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
export class TabNavDirective {
    /**
     * @hidden
     * @param {?} renderer
     * @param {?} tabsService
     */
    constructor(renderer, tabsService) {
        this.renderer = renderer;
        this.tabsService = tabsService;
        /**
         * Event Thrown every time something is clicked
         */
        this.onKeyDown = new EventEmitter();
    }
    /**
     * Function that gives possibility to get all the link directives, with and without nav__item wrapper
     * @return {?}
     */
    get tabLinks() {
        /** @type {?} */
        let tabLinks = [];
        if (this.links) {
            tabLinks = tabLinks.concat(this.links.map((/**
             * @param {?} link
             * @return {?}
             */
            link => link)));
        }
        if (this.items) {
            tabLinks = tabLinks.concat(this.items.filter((/**
             * @param {?} item
             * @return {?}
             */
            item => !!item.linkItem)).map((/**
             * @param {?} item
             * @return {?}
             */
            item => item.linkItem)));
        }
        return tabLinks;
    }
    /**
     * @hidden
     * @return {?}
     */
    ngAfterContentInit() {
        this._tabSelectSubscription = this.tabsService.tabSelected.subscribe((/**
         * @param {?} index
         * @return {?}
         */
        index => {
            this.selectTab(index);
        }));
        this.tabLinks.forEach((/**
         * @param {?} linkElement
         * @param {?} index
         * @return {?}
         */
        (linkElement, index) => {
            this.renderer.listen(linkElement.elementRef.nativeElement, 'keydown', (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                this.tabsService.tabHeaderKeyHandler(index, event, this.tabLinks.map((/**
                 * @param {?} link
                 * @return {?}
                 */
                link => link.elementRef.nativeElement)));
            }));
        }));
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        this._tabSelectSubscription.unsubscribe();
    }
    /**
     * Function to select a new tab from an index.
     * @param {?} tabIndex Index of the tab to select.
     * @return {?}
     */
    selectTab(tabIndex) {
        this.tabLinks[tabIndex].elementRef.nativeElement.click();
    }
}
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
TabNavDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: TabsService }
];
TabNavDirective.propDecorators = {
    links: [{ type: ContentChildren, args: [TabLinkDirective,] }],
    items: [{ type: ContentChildren, args: [TabItemDirective,] }],
    onKeyDown: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGFicy90YWItbmF2L3RhYi1uYXYuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUgsZUFBZSxFQUNmLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0M5QyxNQUFNLE9BQU8sZUFBZTs7Ozs7O0lBZXhCLFlBQ1ksUUFBbUIsRUFDbkIsV0FBd0I7UUFEeEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTs7OztRQUwxQixjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQStCLENBQUM7SUFNbkUsQ0FBQzs7Ozs7SUFHSixJQUFXLFFBQVE7O1lBQ1gsUUFBUSxHQUF1QixFQUFFO1FBQ3JDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUFFLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRzs7OztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztTQUFFO1FBQzdFLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUFFLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTs7OztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxHQUFHOzs7O1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztTQUFFO1FBQ3RILE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7Ozs7O0lBR00sa0JBQWtCO1FBQ3JCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxTQUFTOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTzs7Ozs7UUFBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxTQUFTOzs7O1lBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDNUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRzs7OztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFDLENBQUMsQ0FBQTtZQUNoSCxDQUFDLEVBQ0osQ0FBQTtRQUFBLENBQUMsRUFBQyxDQUFBO0lBQ1AsQ0FBQzs7Ozs7SUFHRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlDLENBQUM7Ozs7OztJQU1ELFNBQVMsQ0FBQyxRQUFnQjtRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0QsQ0FBQzs7O1lBN0RKLFNBQVMsU0FBQzs7Z0JBRVAsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLElBQUksRUFBRTtvQkFDRixPQUFPLEVBQUUsU0FBUztvQkFDbEIsTUFBTSxFQUFFLFNBQVM7aUJBQ3BCO2dCQUNELFNBQVMsRUFBRSxDQUFDLFdBQVcsQ0FBQzthQUMzQjs7OztZQXpDRyxTQUFTO1lBSUosV0FBVzs7O29CQXlDZixlQUFlLFNBQUMsZ0JBQWdCO29CQUdoQyxlQUFlLFNBQUMsZ0JBQWdCO3dCQU1oQyxNQUFNOzs7Ozs7O0lBVFAsZ0NBQXNFOzs7OztJQUd0RSxnQ0FBc0U7Ozs7OztJQUd0RSxpREFBNkM7Ozs7O0lBRzdDLG9DQUFzRTs7Ozs7SUFJbEUsbUNBQTJCOzs7OztJQUMzQixzQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERpcmVjdGl2ZSxcbiAgICBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhYkxpbmtEaXJlY3RpdmUgfSBmcm9tICcuLi90YWItbGluay90YWItbGluay5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGFiSXRlbURpcmVjdGl2ZSB9IGZyb20gJy4uL3RhYi1pdGVtL3RhYi1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUYWJzU2VydmljZSB9IGZyb20gJy4uL3RhYnMuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuXG4vKipcbiAqIFRhYiBOYXYgZm9yIG9ubHkgbmF2aWdhdGlvbiBtb2RlIHdoZW4geW91IHdhbnQgZm9yIGV4YW1wbGUgdXNlIHJvdXRlci1vdXRsZXRcbiAqXG4gKiBgYGBodG1sXG4gKjxuYXYgZmQtdGFiLW5hdj5cbiAqICA8ZGl2IGZkLXRhYi1pdGVtPlxuICogICAgICA8YSBmZC10YWItbGlua1xuICogICAgICBbYWN0aXZlXT1cInRydWVcIj5cbiAqICAgICAgICAgIExpbmtcbiAqICAgICAgPC9hPlxuICogIDwvZGl2PlxuICogIDxkaXYgZmQtdGFiLWl0ZW0+XG4gKiAgICAgIDxhIGZkLXRhYi1saW5rXG4gKiAgICAgIFthY3RpdmVdPVwiZmFsc2VcIj5cbiAqICAgICAgICAgIExpbmtcbiAqICAgICAgPC9hPlxuICogIDwvZGl2PlxuICogIDxhIGZkLXRhYi1saW5rXG4gKiAgW2FjdGl2ZV09XCJmYWxzZVwiPlxuICogICAgICBMaW5rXG4gKiAgPC9hPlxuICogPC9uYXY+XG4gKiBgYGBcbiAqL1xuXG5ARGlyZWN0aXZlKHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbZmQtdGFiLW5hdl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ2ZkLXRhYnMnLFxuICAgICAgICAncm9sZSc6ICd0YWJsaXN0J1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbVGFic1NlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFRhYk5hdkRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oVGFiTGlua0RpcmVjdGl2ZSkgbGlua3M6IFF1ZXJ5TGlzdDxUYWJMaW5rRGlyZWN0aXZlPjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihUYWJJdGVtRGlyZWN0aXZlKSBpdGVtczogUXVlcnlMaXN0PFRhYkl0ZW1EaXJlY3RpdmU+O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBwcml2YXRlIF90YWJTZWxlY3RTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIC8qKiBFdmVudCBUaHJvd24gZXZlcnkgdGltZSBzb21ldGhpbmcgaXMgY2xpY2tlZCAqL1xuICAgIEBPdXRwdXQoKSBvbktleURvd24gPSBuZXcgRXZlbnRFbWl0dGVyPHtldmVudDogYW55LCBpbmRleDogbnVtYmVyfT4oKTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSB0YWJzU2VydmljZTogVGFic1NlcnZpY2VcbiAgICApIHt9XG5cbiAgICAvKiogRnVuY3Rpb24gdGhhdCBnaXZlcyBwb3NzaWJpbGl0eSB0byBnZXQgYWxsIHRoZSBsaW5rIGRpcmVjdGl2ZXMsIHdpdGggYW5kIHdpdGhvdXQgbmF2X19pdGVtIHdyYXBwZXIgKi9cbiAgICBwdWJsaWMgZ2V0IHRhYkxpbmtzKCk6IFRhYkxpbmtEaXJlY3RpdmVbXSB7XG4gICAgICAgIGxldCB0YWJMaW5rczogVGFiTGlua0RpcmVjdGl2ZVtdID0gW107XG4gICAgICAgIGlmICh0aGlzLmxpbmtzKSB7IHRhYkxpbmtzID0gdGFiTGlua3MuY29uY2F0KHRoaXMubGlua3MubWFwKGxpbmsgPT4gbGluaykpOyB9XG4gICAgICAgIGlmICh0aGlzLml0ZW1zKSB7IHRhYkxpbmtzID0gdGFiTGlua3MuY29uY2F0KHRoaXMuaXRlbXMuZmlsdGVyKGl0ZW0gPT4gISFpdGVtLmxpbmtJdGVtKS5tYXAoaXRlbSA9PiBpdGVtLmxpbmtJdGVtKSk7IH1cbiAgICAgICAgcmV0dXJuIHRhYkxpbmtzO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdGFiU2VsZWN0U3Vic2NyaXB0aW9uID0gdGhpcy50YWJzU2VydmljZS50YWJTZWxlY3RlZC5zdWJzY3JpYmUoaW5kZXggPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWIoaW5kZXgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRhYkxpbmtzLmZvckVhY2goKGxpbmtFbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4obGlua0VsZW1lbnQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudGFic1NlcnZpY2UudGFiSGVhZGVyS2V5SGFuZGxlcihpbmRleCwgZXZlbnQsIHRoaXMudGFiTGlua3MubWFwKGxpbmsgPT4gbGluay5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKVxuICAgICAgICAgICAgfVxuICAgICAgICApfSlcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90YWJTZWxlY3RTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBzZWxlY3QgYSBuZXcgdGFiIGZyb20gYW4gaW5kZXguXG4gICAgICogQHBhcmFtIHRhYkluZGV4IEluZGV4IG9mIHRoZSB0YWIgdG8gc2VsZWN0LlxuICAgICAqL1xuICAgIHNlbGVjdFRhYih0YWJJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFiTGlua3NbdGFiSW5kZXhdLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgIH1cbn1cbiJdfQ==