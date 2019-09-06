/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
var TreeChildComponent = /** @class */ (function () {
    function TreeChildComponent() {
        this.editClicked = new EventEmitter();
        this.deleteClicked = new EventEmitter();
    }
    /**
     * @return {?}
     */
    TreeChildComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.hideChildren = false;
    };
    /**
     * @param {?=} hideAll
     * @return {?}
     */
    TreeChildComponent.prototype.toggleDisplayChildren = /**
     * @param {?=} hideAll
     * @return {?}
     */
    function (hideAll) {
        if (hideAll !== undefined) {
            this.hideChildren = hideAll;
        }
        else {
            this.hideChildren = !this.hideChildren;
        }
    };
    /**
     * @param {?=} variable
     * @return {?}
     */
    TreeChildComponent.prototype.typeOf = /**
     * @param {?=} variable
     * @return {?}
     */
    function (variable) {
        /** @type {?} */
        var retVal;
        if (typeof variable === 'string') {
            retVal = 'string';
        }
        else if (typeof variable === 'object') {
            retVal = 'object';
        }
        return retVal;
    };
    /**
     * @param {?=} row
     * @return {?}
     */
    TreeChildComponent.prototype.editTreeItem = /**
     * @param {?=} row
     * @return {?}
     */
    function (row) {
        if (row) {
            this.editClicked.emit(row);
        }
    };
    /**
     * @param {?=} row
     * @return {?}
     */
    TreeChildComponent.prototype.deleteTreeItem = /**
     * @param {?=} row
     * @return {?}
     */
    function (row) {
        if (row) {
            this.deleteClicked.emit(row);
        }
    };
    TreeChildComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-tree-child',
                    template: "<li #treeChild\n    class=\"fd-tree__item\"\n    role=\"treeitem\">\n  <div class=\"fd-tree__row\">\n    <div *ngFor=\"let cell of row.rowData; let i = index\"\n         [attr.data-index]=\"i\"\n         class=\"fd-tree__col\"\n         [ngClass]=\"{'fd-tree__col--control': i === 0}\">\n      <button (click)=\"toggleDisplayChildren()\"\n              *ngIf=\"row.children && i === 0\"\n              class=\"fd-tree__control\"\n              aria-label=\"Expand\"\n              [attr.aria-pressed]=\"!hideChildren\"></button>\n      <ng-container *ngIf=\"typeOf(cell) === 'string'\">\n        {{cell}}\n      </ng-container>\n      <ng-container *ngIf=\"typeOf(cell) === 'object'\">\n        <ng-container *ngIf=\"cell.linkUrl\">\n          <ng-container *ngIf=\"cell.displayText\">\n            <!-- link with display text -->\n            <a [attr.href]=\"cell.linkUrl\"\n               class=\"fd-has-font-weight-semi\">{{cell.displayText}}</a>\n          </ng-container>\n          <ng-container *ngIf=\"!cell.displayText\">\n            <!-- link without display text -->\n            <a [attr.href]=\"cell.linkUrl\"\n               class=\"fd-has-font-weight-semi\">{{cell.linkUrl}}</a>\n          </ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"!cell.linkUrl\">\n          {{cell.displayText}}\n        </ng-container>\n      </ng-container>\n    </div>\n    <div class=\"fd-tree__col fd-tree__col--actions\">\n      <ng-container *ngIf=\"displayTreeActions\">\n        <fd-popover>\n          <fd-popover-control>\n            <button fd-button\n                    [options]=\"'light'\"\n                    [glyph]=\"'vertical-grip'\"></button>\n          </fd-popover-control>\n          <fd-popover-body>\n            <fd-menu>\n              <ul fd-menu-list>\n                <li fd-menu-item (click)=\"editTreeItem(row)\">Edit</li>\n                <li fd-menu-item (click)=\"deleteTreeItem(row)\">Delete</li>\n              </ul>\n            </fd-menu>\n          </fd-popover-body>\n        </fd-popover>\n      </ng-container>\n    </div>\n  </div>\n  <ul *ngIf=\"row.children && row.children.length > 0\"\n      [ngClass]=\"{'is-hidden': hideChildren}\"\n      class=\"fd-tree__group\"\n      role=\"group\">\n    <fd-tree-child *ngFor=\"let child of row.children\"\n                   [displayTreeActions]=\"displayTreeActions\"\n                   [row]=\"child\"\n                   [ngClass]=\"child.sublevelClass\"></fd-tree-child>\n  </ul>\n</li>\n"
                }] }
    ];
    TreeChildComponent.propDecorators = {
        row: [{ type: Input }],
        hideChildren: [{ type: Input }],
        displayTreeActions: [{ type: Input }],
        editClicked: [{ type: Output }],
        deleteClicked: [{ type: Output }]
    };
    return TreeChildComponent;
}());
export { TreeChildComponent };
if (false) {
    /** @type {?} */
    TreeChildComponent.prototype.row;
    /** @type {?} */
    TreeChildComponent.prototype.hideChildren;
    /** @type {?} */
    TreeChildComponent.prototype.displayTreeActions;
    /** @type {?} */
    TreeChildComponent.prototype.editClicked;
    /** @type {?} */
    TreeChildComponent.prototype.deleteClicked;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1jaGlsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdHJlZS90cmVlLWNoaWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcvRTtJQUFBO1FBV2MsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUV6RCxrQkFBYSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO0lBb0N6RSxDQUFDOzs7O0lBbENHLHFDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRUQsa0RBQXFCOzs7O0lBQXJCLFVBQXNCLE9BQVE7UUFDMUIsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1NBQy9CO2FBQU07WUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMxQztJQUNMLENBQUM7Ozs7O0lBRUQsbUNBQU07Ozs7SUFBTixVQUFPLFFBQVM7O1lBQ1IsTUFBTTtRQUNWLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQzlCLE1BQU0sR0FBRyxRQUFRLENBQUM7U0FDckI7YUFBTSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNyQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1NBQ3JCO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQzs7Ozs7SUFFRCx5Q0FBWTs7OztJQUFaLFVBQWEsR0FBSTtRQUNiLElBQUksR0FBRyxFQUFFO1lBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUI7SUFDTCxDQUFDOzs7OztJQUVELDJDQUFjOzs7O0lBQWQsVUFBZSxHQUFJO1FBQ2YsSUFBSSxHQUFHLEVBQUU7WUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUM7O2dCQWhESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLGk5RUFBMEM7aUJBQzdDOzs7c0JBRUksS0FBSzsrQkFFTCxLQUFLO3FDQUVMLEtBQUs7OEJBRUwsTUFBTTtnQ0FFTixNQUFNOztJQW9DWCx5QkFBQztDQUFBLEFBakRELElBaURDO1NBN0NZLGtCQUFrQjs7O0lBQzNCLGlDQUE0Qjs7SUFFNUIsMENBQStCOztJQUUvQixnREFBcUM7O0lBRXJDLHlDQUFtRTs7SUFFbkUsMkNBQXFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZVJvd09iamVjdCB9IGZyb20gJy4vdHJlZS1yb3ctb2JqZWN0Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC10cmVlLWNoaWxkJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdHJlZS1jaGlsZC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgVHJlZUNoaWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSByb3c6IFRyZWVSb3dPYmplY3Q7XG5cbiAgICBASW5wdXQoKSBoaWRlQ2hpbGRyZW46IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBkaXNwbGF5VHJlZUFjdGlvbnM6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KCkgZWRpdENsaWNrZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAT3V0cHV0KCkgZGVsZXRlQ2xpY2tlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmhpZGVDaGlsZHJlbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRvZ2dsZURpc3BsYXlDaGlsZHJlbihoaWRlQWxsPykge1xuICAgICAgICBpZiAoaGlkZUFsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVDaGlsZHJlbiA9IGhpZGVBbGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVDaGlsZHJlbiA9ICF0aGlzLmhpZGVDaGlsZHJlbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHR5cGVPZih2YXJpYWJsZT8pIHtcbiAgICAgICAgbGV0IHJldFZhbDtcbiAgICAgICAgaWYgKHR5cGVvZiB2YXJpYWJsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldFZhbCA9ICdzdHJpbmcnO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YXJpYWJsZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJldFZhbCA9ICdvYmplY3QnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldFZhbDtcbiAgICB9XG5cbiAgICBlZGl0VHJlZUl0ZW0ocm93Pykge1xuICAgICAgICBpZiAocm93KSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRDbGlja2VkLmVtaXQocm93KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlbGV0ZVRyZWVJdGVtKHJvdz8pIHtcbiAgICAgICAgaWYgKHJvdykge1xuICAgICAgICAgICAgdGhpcy5kZWxldGVDbGlja2VkLmVtaXQocm93KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==