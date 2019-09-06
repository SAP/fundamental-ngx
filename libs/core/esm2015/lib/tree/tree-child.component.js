/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
export class TreeChildComponent {
    constructor() {
        this.editClicked = new EventEmitter();
        this.deleteClicked = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.hideChildren = false;
    }
    /**
     * @param {?=} hideAll
     * @return {?}
     */
    toggleDisplayChildren(hideAll) {
        if (hideAll !== undefined) {
            this.hideChildren = hideAll;
        }
        else {
            this.hideChildren = !this.hideChildren;
        }
    }
    /**
     * @param {?=} variable
     * @return {?}
     */
    typeOf(variable) {
        /** @type {?} */
        let retVal;
        if (typeof variable === 'string') {
            retVal = 'string';
        }
        else if (typeof variable === 'object') {
            retVal = 'object';
        }
        return retVal;
    }
    /**
     * @param {?=} row
     * @return {?}
     */
    editTreeItem(row) {
        if (row) {
            this.editClicked.emit(row);
        }
    }
    /**
     * @param {?=} row
     * @return {?}
     */
    deleteTreeItem(row) {
        if (row) {
            this.deleteClicked.emit(row);
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1jaGlsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdHJlZS90cmVlLWNoaWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU8vRSxNQUFNLE9BQU8sa0JBQWtCO0lBSi9CO1FBV2MsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUV6RCxrQkFBYSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO0lBb0N6RSxDQUFDOzs7O0lBbENHLFFBQVE7UUFDSixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDOzs7OztJQUVELHFCQUFxQixDQUFDLE9BQVE7UUFDMUIsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1NBQy9CO2FBQU07WUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMxQztJQUNMLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLFFBQVM7O1lBQ1IsTUFBTTtRQUNWLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQzlCLE1BQU0sR0FBRyxRQUFRLENBQUM7U0FDckI7YUFBTSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNyQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1NBQ3JCO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsR0FBSTtRQUNiLElBQUksR0FBRyxFQUFFO1lBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUI7SUFDTCxDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxHQUFJO1FBQ2YsSUFBSSxHQUFHLEVBQUU7WUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUM7OztZQWhESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLGk5RUFBMEM7YUFDN0M7OztrQkFFSSxLQUFLOzJCQUVMLEtBQUs7aUNBRUwsS0FBSzswQkFFTCxNQUFNOzRCQUVOLE1BQU07Ozs7SUFSUCxpQ0FBNEI7O0lBRTVCLDBDQUErQjs7SUFFL0IsZ0RBQXFDOztJQUVyQyx5Q0FBbUU7O0lBRW5FLDJDQUFxRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVSb3dPYmplY3QgfSBmcm9tICcuL3RyZWUtcm93LW9iamVjdC5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtdHJlZS1jaGlsZCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RyZWUtY2hpbGQuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVDaGlsZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcm93OiBUcmVlUm93T2JqZWN0O1xuXG4gICAgQElucHV0KCkgaGlkZUNoaWxkcmVuOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgZGlzcGxheVRyZWVBY3Rpb25zOiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgpIGVkaXRDbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQE91dHB1dCgpIGRlbGV0ZUNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5oaWRlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0b2dnbGVEaXNwbGF5Q2hpbGRyZW4oaGlkZUFsbD8pIHtcbiAgICAgICAgaWYgKGhpZGVBbGwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5oaWRlQ2hpbGRyZW4gPSBoaWRlQWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWRlQ2hpbGRyZW4gPSAhdGhpcy5oaWRlQ2hpbGRyZW47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0eXBlT2YodmFyaWFibGU/KSB7XG4gICAgICAgIGxldCByZXRWYWw7XG4gICAgICAgIGlmICh0eXBlb2YgdmFyaWFibGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXRWYWwgPSAnc3RyaW5nJztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFyaWFibGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXRWYWwgPSAnb2JqZWN0JztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXRWYWw7XG4gICAgfVxuXG4gICAgZWRpdFRyZWVJdGVtKHJvdz8pIHtcbiAgICAgICAgaWYgKHJvdykge1xuICAgICAgICAgICAgdGhpcy5lZGl0Q2xpY2tlZC5lbWl0KHJvdyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGVUcmVlSXRlbShyb3c/KSB7XG4gICAgICAgIGlmIChyb3cpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlQ2xpY2tlZC5lbWl0KHJvdyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=