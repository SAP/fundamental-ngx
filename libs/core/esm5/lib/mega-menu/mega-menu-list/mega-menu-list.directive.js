/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ContentChildren, Directive, HostBinding, QueryList } from '@angular/core';
import { MegaMenuItemComponent } from '../mega-menu-item/mega-menu-item.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MenuKeyboardService } from '../../menu/menu-keyboard.service';
/**
 *  Directive represents mega menu list, which contains items.
 *  ```html
 *  <ul fd-mega-menu-list>
 *      <fd-mega-menu-item>
 *          <a fd-mega-menu-link>Item 0</a>
 *          <li fd-mega-menu-subitem>
 *              <a fd-mega-menu-sublink>Sub Item 1</a>
 *          </li>
 *          <li fd-mega-menu-subitem>
 *              <a fd-mega-menu-sublink>Sub Item 2</a>
 *          </li>
 *          <li fd-mega-menu-subitem>
 *              <a fd-mega-menu-sublink>Sub Item 3</a>
 *          </li>
 *      </fd-mega-menu-item>
 *  </ul>
 *  ```
 *
 */
var MegaMenuListDirective = /** @class */ (function () {
    /** @hidden */
    function MegaMenuListDirective(menuKeyboardService) {
        this.menuKeyboardService = menuKeyboardService;
        /**
         * @hidden
         */
        this.fdMegaMenuClass = true;
        /**
         * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
         */
        this.onDestroy$ = new Subject();
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MegaMenuListDirective.prototype.ngAfterContentInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        this.items.forEach((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        function (item, index) { return item.keyDown
            .pipe(takeUntil(_this.onDestroy$))
            .subscribe((/**
         * @param {?} keyboardEvent
         * @return {?}
         */
        function (keyboardEvent) { return _this.handleListKeyDown(keyboardEvent, index); })); }));
    };
    /** Method that provides handles keydown events from menu item list */
    /**
     * Method that provides handles keydown events from menu item list
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    MegaMenuListDirective.prototype.handleListKeyDown = /**
     * Method that provides handles keydown events from menu item list
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        this.menuKeyboardService.keyDownHandler(event, index, this.items.toArray());
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MegaMenuListDirective.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    };
    MegaMenuListDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-mega-menu-list]'
                },] }
    ];
    /** @nocollapse */
    MegaMenuListDirective.ctorParameters = function () { return [
        { type: MenuKeyboardService }
    ]; };
    MegaMenuListDirective.propDecorators = {
        fdMegaMenuClass: [{ type: HostBinding, args: ['class.fd-mega-menu__list',] }],
        items: [{ type: ContentChildren, args: [MegaMenuItemComponent,] }]
    };
    return MegaMenuListDirective;
}());
export { MegaMenuListDirective };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    MegaMenuListDirective.prototype.fdMegaMenuClass;
    /**
     * @hidden
     * @type {?}
     */
    MegaMenuListDirective.prototype.items;
    /**
     * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
     * @type {?}
     * @private
     */
    MegaMenuListDirective.prototype.onDestroy$;
    /**
     * @type {?}
     * @private
     */
    MegaMenuListDirective.prototype.menuKeyboardService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVnYS1tZW51LWxpc3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21lZ2EtbWVudS9tZWdhLW1lbnUtbGlzdC9tZWdhLW1lbnUtbGlzdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFSCxlQUFlLEVBQ2YsU0FBUyxFQUNULFdBQVcsRUFFWCxTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDbkYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCdkU7SUFpQkksY0FBYztJQUNkLCtCQUNZLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCOzs7O1FBWHBELG9CQUFlLEdBQVksSUFBSSxDQUFDOzs7O1FBT2YsZUFBVSxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO0lBSzlELENBQUM7SUFFSixjQUFjOzs7OztJQUNkLGtEQUFrQjs7OztJQUFsQjtRQUFBLGlCQUtDO1FBSkcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPOzs7OztRQUFDLFVBQUMsSUFBMkIsRUFBRSxLQUFhLElBQUssT0FBQSxJQUFJLENBQUMsT0FBTzthQUMxRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoQyxTQUFTOzs7O1FBQUMsVUFBQyxhQUE0QixJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsRUFBNUMsQ0FBNEMsRUFBQyxFQUYzQixDQUUyQixFQUFDLENBQzlGO0lBQ0wsQ0FBQztJQUVELHNFQUFzRTs7Ozs7OztJQUN0RSxpREFBaUI7Ozs7OztJQUFqQixVQUFrQixLQUFvQixFQUFFLEtBQWE7UUFDakQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQsY0FBYzs7Ozs7SUFDZCwyQ0FBVzs7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUM7O2dCQXZDSixTQUFTLFNBQUM7O29CQUVQLFFBQVEsRUFBRSxxQkFBcUI7aUJBQ2xDOzs7O2dCQXhCUSxtQkFBbUI7OztrQ0E0QnZCLFdBQVcsU0FBQywwQkFBMEI7d0JBSXRDLGVBQWUsU0FBQyxxQkFBcUI7O0lBNkIxQyw0QkFBQztDQUFBLEFBeENELElBd0NDO1NBcENZLHFCQUFxQjs7Ozs7O0lBRzlCLGdEQUNnQzs7Ozs7SUFHaEMsc0NBQ3dDOzs7Ozs7SUFHeEMsMkNBQWlFOzs7OztJQUk3RCxvREFBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIERpcmVjdGl2ZSxcbiAgICBIb3N0QmluZGluZyxcbiAgICBPbkRlc3Ryb3ksXG4gICAgUXVlcnlMaXN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVnYU1lbnVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi4vbWVnYS1tZW51LWl0ZW0vbWVnYS1tZW51LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1lbnVLZXlib2FyZFNlcnZpY2UgfSBmcm9tICcuLi8uLi9tZW51L21lbnUta2V5Ym9hcmQuc2VydmljZSc7XG5cbi8qKlxuICogIERpcmVjdGl2ZSByZXByZXNlbnRzIG1lZ2EgbWVudSBsaXN0LCB3aGljaCBjb250YWlucyBpdGVtcy5cbiAqICBgYGBodG1sXG4gKiAgPHVsIGZkLW1lZ2EtbWVudS1saXN0PlxuICogICAgICA8ZmQtbWVnYS1tZW51LWl0ZW0+XG4gKiAgICAgICAgICA8YSBmZC1tZWdhLW1lbnUtbGluaz5JdGVtIDA8L2E+XG4gKiAgICAgICAgICA8bGkgZmQtbWVnYS1tZW51LXN1Yml0ZW0+XG4gKiAgICAgICAgICAgICAgPGEgZmQtbWVnYS1tZW51LXN1Ymxpbms+U3ViIEl0ZW0gMTwvYT5cbiAqICAgICAgICAgIDwvbGk+XG4gKiAgICAgICAgICA8bGkgZmQtbWVnYS1tZW51LXN1Yml0ZW0+XG4gKiAgICAgICAgICAgICAgPGEgZmQtbWVnYS1tZW51LXN1Ymxpbms+U3ViIEl0ZW0gMjwvYT5cbiAqICAgICAgICAgIDwvbGk+XG4gKiAgICAgICAgICA8bGkgZmQtbWVnYS1tZW51LXN1Yml0ZW0+XG4gKiAgICAgICAgICAgICAgPGEgZmQtbWVnYS1tZW51LXN1Ymxpbms+U3ViIEl0ZW0gMzwvYT5cbiAqICAgICAgICAgIDwvbGk+XG4gKiAgICAgIDwvZmQtbWVnYS1tZW51LWl0ZW0+XG4gKiAgPC91bD5cbiAqICBgYGBcbiAqICovXG5ARGlyZWN0aXZlKHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbZmQtbWVnYS1tZW51LWxpc3RdJ1xufSlcbmV4cG9ydCBjbGFzcyBNZWdhTWVudUxpc3REaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLW1lZ2EtbWVudV9fbGlzdCcpXG4gICAgZmRNZWdhTWVudUNsYXNzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihNZWdhTWVudUl0ZW1Db21wb25lbnQpXG4gICAgaXRlbXM6IFF1ZXJ5TGlzdDxNZWdhTWVudUl0ZW1Db21wb25lbnQ+O1xuXG4gICAgLyoqIEFuIFJ4SlMgU3ViamVjdCB0aGF0IHdpbGwga2lsbCB0aGUgZGF0YSBzdHJlYW0gdXBvbiBjb21wb25lbnTigJlzIGRlc3RydWN0aW9uIChmb3IgdW5zdWJzY3JpYmluZykgICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBvbkRlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgbWVudUtleWJvYXJkU2VydmljZTogTWVudUtleWJvYXJkU2VydmljZSxcbiAgICApIHt9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKChpdGVtOiBNZWdhTWVudUl0ZW1Db21wb25lbnQsIGluZGV4OiBudW1iZXIpID0+IGl0ZW0ua2V5RG93blxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMub25EZXN0cm95JCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChrZXlib2FyZEV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB0aGlzLmhhbmRsZUxpc3RLZXlEb3duKGtleWJvYXJkRXZlbnQsIGluZGV4KSkpXG4gICAgICAgIDtcbiAgICB9XG5cbiAgICAvKiogTWV0aG9kIHRoYXQgcHJvdmlkZXMgaGFuZGxlcyBrZXlkb3duIGV2ZW50cyBmcm9tIG1lbnUgaXRlbSBsaXN0ICovXG4gICAgaGFuZGxlTGlzdEtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZW51S2V5Ym9hcmRTZXJ2aWNlLmtleURvd25IYW5kbGVyKGV2ZW50LCBpbmRleCwgdGhpcy5pdGVtcy50b0FycmF5KCkpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25EZXN0cm95JC5uZXh0KCk7XG4gICAgICAgIHRoaXMub25EZXN0cm95JC5jb21wbGV0ZSgpO1xuICAgIH1cbn1cbiJdfQ==