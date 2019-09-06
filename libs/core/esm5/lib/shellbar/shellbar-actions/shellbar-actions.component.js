/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChildren, HostListener, Input, QueryList, ViewEncapsulation, ContentChild, ViewChildren } from '@angular/core';
import { ShellbarActionComponent } from '../shellbar-action/shellbar-action.component';
import { SearchInputComponent } from '../../search-input/search-input.component';
import { PopoverComponent } from '../../popover/popover.component';
/**
 * The component that represents shellbar actions.
 * It is a container wrapper for all product actions and links (required element).
 * ```html
 * <fd-shellbar-actions [user]="user"
 *                      [userMenu]="userMenu"
 *                      [productSwitcher]="productSwitcher">
 *        <button fd-button [fdType]="'standard'">Custom Button</button>
 *
 *        <fd-shellbar-action *ngFor="let action of actions"
 *                            [glyph]="action.glyph"
 *                            [callback]="action.callback"
 *                            [label]="action.label"
 *                            [notificationCount]="action.notificationCount"
 *                            [notificationLabel]="action.notificationLabel">
 *        </fd-shellbar-action>
 * </fd-shellbar-actions>
 * ```
 */
var ShellbarActionsComponent = /** @class */ (function () {
    function ShellbarActionsComponent() {
        /**
         * @hidden
         */
        this.actionsCollapsed = false;
        /**
         * @hidden
         */
        this.showCollapsedProducts = false;
        /**
         * When set to true, popover list will be closed after selecting the option
         */
        this.closePopoverOnSelect = false;
        /**
         * Label for the collapsed item menu.
         */
        this.collapsedItemMenuLabel = 'Collapsed Item Menu';
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ShellbarActionsComponent.prototype.onResize = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.actionsCollapsed = window.innerWidth < 1024;
    };
    /**
     * @hidden
     */
    /**
     * @hidden
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    ShellbarActionsComponent.prototype.itemClicked = /**
     * @hidden
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    function (item, event) {
        if (this.closePopoverOnSelect) {
            this.popoverComponents.forEach((/**
             * @param {?} popover
             * @return {?}
             */
            function (popover) { return popover.close(); }));
        }
        item.callback(event);
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ShellbarActionsComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.onResize();
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ShellbarActionsComponent.prototype.ngAfterContentChecked = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        this.totalNotifications = 0;
        this.shellbarActions.forEach((/**
         * @param {?} action
         * @return {?}
         */
        function (action) {
            if (action.notificationCount && typeof action.notificationCount === 'number') {
                _this.totalNotifications = _this.totalNotifications + action.notificationCount;
            }
        }));
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    ShellbarActionsComponent.prototype.toggleCollapsedProducts = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.showCollapsedProducts = !this.showCollapsedProducts;
    };
    ShellbarActionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-shellbar-actions',
                    template: "<div class=\"fd-shellbar__actions\">\n    <div *ngIf=\"searchInputComponent\" class=\"fd-shellbar__action fd-shellbar__action--collapsible\">\n        <div class=\"fd-search-input fd-search-input--closed\">\n            <ng-content select=\"fd-search-input\"></ng-content>\n        </div>\n    </div>\n    <div *ngIf=\"actionsCollapsed && shellbarActions.length\"\n         class=\"fd-shellbar__action fd-shellbar__action--collapse\">\n        <div class=\"fd-shellbar-collapse\">\n            <fd-popover [options]=\"{placement: 'bottom-end'}\"\n                        [focusTrapped]=\"false\">\n                <fd-popover-control>\n                    <div class=\"fd-shellbar-collapse--control\">\n                        <button class=\"fd-button--shell sap-icon--overflow\"\n                                [attr.aria-label]=\"collapsedItemMenuLabel\">\n                            <span *ngIf=\"totalNotifications\"\n                                  class=\"fd-counter fd-counter--notification\">{{totalNotifications}}</span>\n                        </button>\n                    </div>\n                </fd-popover-control>\n                <fd-popover-body>\n                    <fd-menu>\n                        <ul fd-menu-list\n                            *ngIf=\"!showCollapsedProducts\">\n                            <div *ngFor=\"let action of shellbarActions\"\n                                 class=\"fd-menu__addon-before\">\n                                <span [ngClass]=\"'sap-icon--' + action.glyph\"></span>\n                            </div>\n                            <li fd-menu-item\n                                *ngFor=\"let action of shellbarActions\"\n                                (click)=\"itemClicked(action, $event)\">\n                                {{action.label}}\n                            </li>\n                            <div *ngIf=\"productSwitcher\"\n                                 class=\"fd-menu__addon-before\">\n                                <span [ngClass]=\"'sap-icon--grid'\"></span>\n                            </div>\n                            <li fd-menu-item\n                                *ngIf=\"productSwitcher\"\n                                (click)=\"toggleCollapsedProducts($event);\">\n                                Product Switcher\n                            </li>\n                        </ul>\n                        <ul fd-menu-list\n                            *ngIf=\"showCollapsedProducts\">\n                            <li fd-menu-item\n                                (click)=\"toggleCollapsedProducts($event)\">\n                                <span class=\"fd-menu__item sap-icon--nav-back\"></span>\n                            </li>\n                            <hr>\n                            <li fd-menu-item\n                                *ngFor=\"let product of productSwitcher\"\n                                (click)=\"itemClicked(product, $event)\">\n                                {{product.title}}\n                            </li>\n                        </ul>\n                    </fd-menu>\n                </fd-popover-body>\n            </fd-popover>\n        </div>\n    </div>\n    <ng-content></ng-content>\n    <ng-content select=\"fd-shellbar-action\"></ng-content>\n    <ng-container *ngIf=\"user\">\n        <div class=\"fd-shellbar__action fd-shellbar__action--show-always\">\n            <div class=\"fd-user-menu\">\n                <fd-popover [options]=\"{placement: 'bottom-end'}\"\n                            [focusTrapped]=\"false\">\n                    <fd-popover-control>\n                        <div class=\"fd-user-menu__control\">\n                            <span *ngIf=\"!user.image\"\n                                  class=\"fd-identifier fd-identifier--xs fd-identifier--circle\"\n                                  [ngClass]=\"(user.colorAccent ? 'fd-has-background-color-accent-' + user.colorAccent : '')\">\n                                {{user.initials}}\n                            </span>\n                            <span *ngIf=\"user.image\"\n                                  class=\"fd-identifier fd-identifier--xs fd-identifier--circle fd-identifier--thumbnail\"\n                                  [ngStyle]=\"{'background-image': 'url(' + user.image + ')'}\">\n                            </span>\n                        </div>\n                    </fd-popover-control>\n                    <fd-popover-body>\n                        <fd-menu>\n                            <ul fd-menu-list>\n                                <li fd-menu-item\n                                    *ngFor=\"let item of userMenu\"\n                                    (click)=\"itemClicked(item, $event)\">\n                                    {{item.text}}\n                                </li>\n                            </ul>\n                        </fd-menu>\n                    </fd-popover-body>\n                </fd-popover>\n            </div>\n        </div>\n    </ng-container>\n    <ng-container *ngIf=\"productSwitcher\">\n        <div class=\"fd-shellbar__action fd-shellbar__action--collapsible\">\n            <div class=\"fd-product-switcher\">\n                <fd-popover [options]=\"{placement: 'bottom-end'}\"\n                            [focusTrapped]=\"false\">\n                    <fd-popover-control>\n                        <button class=\"fd-button--shell sap-icon--grid\"></button>\n                    </fd-popover-control>\n                    <fd-popover-body>\n                        <div class=\"fd-product-switcher__body\">\n                            <nav>\n                                <ul>\n                                    <li *ngFor=\"let product of productSwitcher\"\n                                        (click)=\"itemClicked(product, $event)\">\n                                        <span class=\"fd-product-switcher__product-icon\">\n                                            <img [src]=\"product.image\">\n                                        </span>\n                                        <span class=\"fd-product-switcher__product-title\">\n                                            {{product.title}}\n                                        </span>\n                                    </li>\n                                </ul>\n                            </nav>\n                        </div>\n                    </fd-popover-body>\n                </fd-popover>\n            </div>\n        </div>\n    </ng-container>\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-search-input--closed .fd-popover__popper{width:300px!important;left:-264px!important}"]
                }] }
    ];
    ShellbarActionsComponent.propDecorators = {
        productSwitcher: [{ type: Input }],
        user: [{ type: Input }],
        userMenu: [{ type: Input }],
        closePopoverOnSelect: [{ type: Input }],
        collapsedItemMenuLabel: [{ type: Input }],
        shellbarActions: [{ type: ContentChildren, args: [ShellbarActionComponent,] }],
        popoverComponents: [{ type: ViewChildren, args: [PopoverComponent,] }],
        searchInputComponent: [{ type: ContentChild, args: [SearchInputComponent,] }],
        onResize: [{ type: HostListener, args: ['window:resize', [],] }]
    };
    return ShellbarActionsComponent;
}());
export { ShellbarActionsComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    ShellbarActionsComponent.prototype.actionsCollapsed;
    /**
     * @hidden
     * @type {?}
     */
    ShellbarActionsComponent.prototype.showCollapsedProducts;
    /**
     * The product switcher data.
     * @type {?}
     */
    ShellbarActionsComponent.prototype.productSwitcher;
    /**
     * The user data.
     * @type {?}
     */
    ShellbarActionsComponent.prototype.user;
    /**
     * The user menu data.
     * @type {?}
     */
    ShellbarActionsComponent.prototype.userMenu;
    /**
     * When set to true, popover list will be closed after selecting the option
     * @type {?}
     */
    ShellbarActionsComponent.prototype.closePopoverOnSelect;
    /**
     * Label for the collapsed item menu.
     * @type {?}
     */
    ShellbarActionsComponent.prototype.collapsedItemMenuLabel;
    /**
     * @hidden
     * @type {?}
     */
    ShellbarActionsComponent.prototype.shellbarActions;
    /**
     * @hidden
     * @type {?}
     */
    ShellbarActionsComponent.prototype.popoverComponents;
    /**
     * @hidden
     * @type {?}
     */
    ShellbarActionsComponent.prototype.searchInputComponent;
    /**
     * @hidden
     * @type {?}
     */
    ShellbarActionsComponent.prototype.totalNotifications;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlbGxiYXItYWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2hlbGxiYXIvc2hlbGxiYXItYWN0aW9ucy9zaGVsbGJhci1hY3Rpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxlQUFlLEVBQ2YsWUFBWSxFQUNaLEtBQUssRUFHTCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLFlBQVksRUFBRSxZQUFZLEVBQzdCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCbkU7SUFBQTs7OztRQVNJLHFCQUFnQixHQUFZLEtBQUssQ0FBQzs7OztRQUdsQywwQkFBcUIsR0FBWSxLQUFLLENBQUM7Ozs7UUFnQnZDLHlCQUFvQixHQUFZLEtBQUssQ0FBQzs7OztRQUl0QywyQkFBc0IsR0FBVyxxQkFBcUIsQ0FBQztJQXVEM0QsQ0FBQztJQXRDRyxjQUFjOzs7OztJQUVkLDJDQUFROzs7O0lBRFI7UUFFSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDckQsQ0FBQztJQUVEOztPQUVHOzs7Ozs7O0lBQ0gsOENBQVc7Ozs7OztJQUFYLFVBQVksSUFBUyxFQUFFLEtBQVU7UUFDN0IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBZixDQUFlLEVBQUMsQ0FBQztTQUM5RDtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELGNBQWM7Ozs7O0lBQ2QsMkNBQVE7Ozs7SUFBUjtRQUNJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsY0FBYzs7Ozs7SUFDZCx3REFBcUI7Ozs7SUFBckI7UUFBQSxpQkFPQztRQU5HLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxNQUFNO1lBQ2hDLElBQUksTUFBTSxDQUFDLGlCQUFpQixJQUFJLE9BQU8sTUFBTSxDQUFDLGlCQUFpQixLQUFLLFFBQVEsRUFBRTtnQkFDMUUsS0FBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUM7YUFDaEY7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxjQUFjOzs7Ozs7SUFDZCwwREFBdUI7Ozs7O0lBQXZCLFVBQXdCLEtBQUs7UUFDekIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMscUJBQXFCLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7SUFDN0QsQ0FBQzs7Z0JBckZKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixrOE1BQWdEO29CQUVoRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3hDOzs7a0NBVUksS0FBSzt1QkFJTCxLQUFLOzJCQUlMLEtBQUs7dUNBSUwsS0FBSzt5Q0FJTCxLQUFLO2tDQUlMLGVBQWUsU0FBQyx1QkFBdUI7b0NBSXZDLFlBQVksU0FBQyxnQkFBZ0I7dUNBSTdCLFlBQVksU0FBQyxvQkFBb0I7MkJBT2pDLFlBQVksU0FBQyxlQUFlLEVBQUUsRUFBRTs7SUFxQ3JDLCtCQUFDO0NBQUEsQUF2RkQsSUF1RkM7U0FqRlksd0JBQXdCOzs7Ozs7SUFHakMsb0RBQWtDOzs7OztJQUdsQyx5REFBdUM7Ozs7O0lBR3ZDLG1EQUN1Qjs7Ozs7SUFHdkIsd0NBQ1U7Ozs7O0lBR1YsNENBQ2dCOzs7OztJQUdoQix3REFDc0M7Ozs7O0lBR3RDLDBEQUN1RDs7Ozs7SUFHdkQsbURBQ29EOzs7OztJQUdwRCxxREFDK0M7Ozs7O0lBRy9DLHdEQUMyQzs7Ozs7SUFHM0Msc0RBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBJbnB1dCxcbiAgICBPbkluaXQsXG4gICAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgICBRdWVyeUxpc3QsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgQ29udGVudENoaWxkLCBWaWV3Q2hpbGRyZW5cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaGVsbGJhckFjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4uL3NoZWxsYmFyLWFjdGlvbi9zaGVsbGJhci1hY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFNlYXJjaElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vc2VhcmNoLWlucHV0L3NlYXJjaC1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQnO1xuXG4vKipcbiAqIFRoZSBjb21wb25lbnQgdGhhdCByZXByZXNlbnRzIHNoZWxsYmFyIGFjdGlvbnMuXG4gKiBJdCBpcyBhIGNvbnRhaW5lciB3cmFwcGVyIGZvciBhbGwgcHJvZHVjdCBhY3Rpb25zIGFuZCBsaW5rcyAocmVxdWlyZWQgZWxlbWVudCkuXG4gKiBgYGBodG1sXG4gKiA8ZmQtc2hlbGxiYXItYWN0aW9ucyBbdXNlcl09XCJ1c2VyXCJcbiAqICAgICAgICAgICAgICAgICAgICAgIFt1c2VyTWVudV09XCJ1c2VyTWVudVwiXG4gKiAgICAgICAgICAgICAgICAgICAgICBbcHJvZHVjdFN3aXRjaGVyXT1cInByb2R1Y3RTd2l0Y2hlclwiPlxuICogICAgICAgIDxidXR0b24gZmQtYnV0dG9uIFtmZFR5cGVdPVwiJ3N0YW5kYXJkJ1wiPkN1c3RvbSBCdXR0b248L2J1dHRvbj5cbiAqXG4gKiAgICAgICAgPGZkLXNoZWxsYmFyLWFjdGlvbiAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIGFjdGlvbnNcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgW2dseXBoXT1cImFjdGlvbi5nbHlwaFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2FsbGJhY2tdPVwiYWN0aW9uLmNhbGxiYWNrXCJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtsYWJlbF09XCJhY3Rpb24ubGFiZWxcIlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgW25vdGlmaWNhdGlvbkNvdW50XT1cImFjdGlvbi5ub3RpZmljYXRpb25Db3VudFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbm90aWZpY2F0aW9uTGFiZWxdPVwiYWN0aW9uLm5vdGlmaWNhdGlvbkxhYmVsXCI+XG4gKiAgICAgICAgPC9mZC1zaGVsbGJhci1hY3Rpb24+XG4gKiA8L2ZkLXNoZWxsYmFyLWFjdGlvbnM+XG4gKiBgYGBcbiAqL1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLXNoZWxsYmFyLWFjdGlvbnMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zaGVsbGJhci1hY3Rpb25zLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zaGVsbGJhci1hY3Rpb25zLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBTaGVsbGJhckFjdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudENoZWNrZWQge1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBhY3Rpb25zQ29sbGFwc2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHNob3dDb2xsYXBzZWRQcm9kdWN0czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFRoZSBwcm9kdWN0IHN3aXRjaGVyIGRhdGEuICovXG4gICAgQElucHV0KClcbiAgICBwcm9kdWN0U3dpdGNoZXI6IGFueVtdO1xuXG4gICAgLyoqIFRoZSB1c2VyIGRhdGEuICovXG4gICAgQElucHV0KClcbiAgICB1c2VyOiBhbnk7XG5cbiAgICAvKiogVGhlIHVzZXIgbWVudSBkYXRhLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgdXNlck1lbnU6IGFueVtdO1xuXG4gICAgLyoqIFdoZW4gc2V0IHRvIHRydWUsIHBvcG92ZXIgbGlzdCB3aWxsIGJlIGNsb3NlZCBhZnRlciBzZWxlY3RpbmcgdGhlIG9wdGlvbiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2xvc2VQb3BvdmVyT25TZWxlY3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBMYWJlbCBmb3IgdGhlIGNvbGxhcHNlZCBpdGVtIG1lbnUuICovXG4gICAgQElucHV0KClcbiAgICBjb2xsYXBzZWRJdGVtTWVudUxhYmVsOiBzdHJpbmcgPSAnQ29sbGFwc2VkIEl0ZW0gTWVudSc7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBDb250ZW50Q2hpbGRyZW4oU2hlbGxiYXJBY3Rpb25Db21wb25lbnQpXG4gICAgc2hlbGxiYXJBY3Rpb25zOiBRdWVyeUxpc3Q8U2hlbGxiYXJBY3Rpb25Db21wb25lbnQ+O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAVmlld0NoaWxkcmVuKFBvcG92ZXJDb21wb25lbnQpXG4gICAgcG9wb3ZlckNvbXBvbmVudHM6IFF1ZXJ5TGlzdDxQb3BvdmVyQ29tcG9uZW50PjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQENvbnRlbnRDaGlsZChTZWFyY2hJbnB1dENvbXBvbmVudClcbiAgICBzZWFyY2hJbnB1dENvbXBvbmVudDogU2VhcmNoSW5wdXRDb21wb25lbnQ7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHRvdGFsTm90aWZpY2F0aW9uczogbnVtYmVyO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgW10pXG4gICAgb25SZXNpemUoKSB7XG4gICAgICAgIHRoaXMuYWN0aW9uc0NvbGxhcHNlZCA9IHdpbmRvdy5pbm5lcldpZHRoIDwgMTAyNDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICovXG4gICAgaXRlbUNsaWNrZWQoaXRlbTogYW55LCBldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlUG9wb3Zlck9uU2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXJDb21wb25lbnRzLmZvckVhY2gocG9wb3ZlciA9PiBwb3BvdmVyLmNsb3NlKCkpO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW0uY2FsbGJhY2soZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMub25SZXNpemUoKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICAgICAgdGhpcy50b3RhbE5vdGlmaWNhdGlvbnMgPSAwO1xuICAgICAgICB0aGlzLnNoZWxsYmFyQWN0aW9ucy5mb3JFYWNoKChhY3Rpb24pID0+IHtcbiAgICAgICAgICAgIGlmIChhY3Rpb24ubm90aWZpY2F0aW9uQ291bnQgJiYgdHlwZW9mIGFjdGlvbi5ub3RpZmljYXRpb25Db3VudCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsTm90aWZpY2F0aW9ucyA9IHRoaXMudG90YWxOb3RpZmljYXRpb25zICsgYWN0aW9uLm5vdGlmaWNhdGlvbkNvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHRvZ2dsZUNvbGxhcHNlZFByb2R1Y3RzKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLnNob3dDb2xsYXBzZWRQcm9kdWN0cyA9ICF0aGlzLnNob3dDb2xsYXBzZWRQcm9kdWN0cztcbiAgICB9XG5cbn1cbiJdfQ==