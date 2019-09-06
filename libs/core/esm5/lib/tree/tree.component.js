/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, ViewChildren, QueryList, EventEmitter } from '@angular/core';
import { TreeChildComponent } from './tree-child.component';
var TreeComponent = /** @class */ (function () {
    function TreeComponent() {
        this.editRowClicked = new EventEmitter();
        this.deleteRowClicked = new EventEmitter();
    }
    /**
     * @return {?}
     */
    TreeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.hideAll = false;
    };
    /**
     * @return {?}
     */
    TreeComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.treeData && this.treeData.length) {
            this.treeData.forEach((/**
             * @param {?} row
             * @return {?}
             */
            function (row) {
                _this.getChildDepth(row, 0);
                _this.handleEmptyTrailingCells(row); // handle empty cells for parents
            }));
        }
    };
    /**
     * @return {?}
     */
    TreeComponent.prototype.toggleDisplayAll = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.hideAll = !this.hideAll;
        this.treeChildren.forEach((/**
         * @param {?} child
         * @return {?}
         */
        function (child) {
            child.toggleDisplayChildren(_this.hideAll);
        }));
    };
    /**
     * @param {?} row
     * @param {?} depth
     * @return {?}
     */
    TreeComponent.prototype.getChildDepth = /**
     * @param {?} row
     * @param {?} depth
     * @return {?}
     */
    function (row, depth) {
        var _this = this;
        if (depth > 0) {
            row.sublevelClass = 'fd-tree__group--sublevel-' + depth;
        }
        if (row.children) {
            row.children.forEach((/**
             * @param {?} child
             * @return {?}
             */
            function (child) {
                _this.getChildDepth(child, depth + 1);
                _this.handleEmptyTrailingCells(child); // handle empty cells for children
            }));
        }
    };
    /**
     * @param {?} row
     * @return {?}
     */
    TreeComponent.prototype.handleEmptyTrailingCells = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        if (row &&
            row.rowData &&
            row.rowData.length &&
            typeof row.rowData[0] !== 'object' &&
            this.headers &&
            this.headers.length) {
            while (row.rowData.length < this.headers.length) {
                row.rowData.push('');
            }
        }
        else if (row &&
            row.rowData &&
            row.rowData.length &&
            typeof row.rowData[0] === 'object' &&
            this.headers &&
            this.headers.length) {
            while (row.rowData.length < this.headers.length) {
                row.rowData.push({
                    displayText: ''
                });
            }
        }
    };
    /**
     * @param {?} row
     * @return {?}
     */
    TreeComponent.prototype.editClicked = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        this.editRowClicked.emit(row);
    };
    /**
     * @param {?} row
     * @return {?}
     */
    TreeComponent.prototype.deleteClicked = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        this.deleteRowClicked.emit(row);
    };
    TreeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-tree',
                    template: "<div class=\"fd-tree fd-tree--header\"\n     *ngIf=\"headers.length > 0\">\n  <div class=\"fd-tree__row fd-tree__row--header\">\n    <div class=\"fd-tree__col fd-tree__col--control\">\n      <button (click)=\"toggleDisplayAll()\"\n              class=\"fd-tree__control\"\n              aria-label=\"Expand all\"\n              [attr.aria-pressed]=\"!hideAll\"></button>\n      {{headers[0]}}\n    </div>\n    <div class=\"fd-tree__col\"\n         *ngFor=\"let header of headers | slice:1\">\n      {{header}}\n    </div>\n    <div class=\"fd-tree__col fd-tree__col--actions\"></div>\n  </div>\n</div>\n<ul class=\"fd-tree\"\n    id=\"ENusD653\"\n    role=\"tree\">\n  <fd-tree-child (editClicked)=\"editClicked($event)\"\n                 (deleteClicked)=\"deleteClicked($event)\"\n                 [displayTreeActions]=\"displayTreeActions\"\n                 *ngFor=\"let row of treeData\"\n                 [row]=\"row\"></fd-tree-child>\n</ul>"
                }] }
    ];
    TreeComponent.propDecorators = {
        headers: [{ type: Input }],
        treeData: [{ type: Input }],
        hideAll: [{ type: Input }],
        displayTreeActions: [{ type: Input }],
        editRowClicked: [{ type: Output }],
        deleteRowClicked: [{ type: Output }],
        treeChildren: [{ type: ViewChildren, args: [TreeChildComponent,] }]
    };
    return TreeComponent;
}());
export { TreeComponent };
if (false) {
    /** @type {?} */
    TreeComponent.prototype.headers;
    /** @type {?} */
    TreeComponent.prototype.treeData;
    /** @type {?} */
    TreeComponent.prototype.hideAll;
    /** @type {?} */
    TreeComponent.prototype.displayTreeActions;
    /** @type {?} */
    TreeComponent.prototype.editRowClicked;
    /** @type {?} */
    TreeComponent.prototype.deleteRowClicked;
    /** @type {?} */
    TreeComponent.prototype.treeChildren;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdHJlZS90cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUdOLFlBQVksRUFDWixTQUFTLEVBQ1QsWUFBWSxFQUNmLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTVEO0lBQUE7UUFhYyxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRTVELHFCQUFnQixHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO0lBdUU1RSxDQUFDOzs7O0lBbkVHLGdDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCwwQ0FBa0I7OztJQUFsQjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTzs7OztZQUFDLFVBQUEsR0FBRztnQkFDckIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGlDQUFpQztZQUN6RSxDQUFDLEVBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7OztJQUVELHdDQUFnQjs7O0lBQWhCO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLEtBQUs7WUFDM0IsS0FBSyxDQUFDLHFCQUFxQixDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVELHFDQUFhOzs7OztJQUFiLFVBQWMsR0FBRyxFQUFFLEtBQUs7UUFBeEIsaUJBVUM7UUFURyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDWCxHQUFHLENBQUMsYUFBYSxHQUFHLDJCQUEyQixHQUFHLEtBQUssQ0FBQztTQUMzRDtRQUNELElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRTtZQUNkLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTzs7OztZQUFDLFVBQUEsS0FBSztnQkFDdEIsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxLQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxrQ0FBa0M7WUFDNUUsQ0FBQyxFQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Ozs7O0lBRUQsZ0RBQXdCOzs7O0lBQXhCLFVBQXlCLEdBQUc7UUFDeEIsSUFDSSxHQUFHO1lBQ0gsR0FBRyxDQUFDLE9BQU87WUFDWCxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDbEIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVE7WUFDbEMsSUFBSSxDQUFDLE9BQU87WUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFDckI7WUFDRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUM3QyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN4QjtTQUNKO2FBQU0sSUFDSCxHQUFHO1lBQ0gsR0FBRyxDQUFDLE9BQU87WUFDWCxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDbEIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVE7WUFDbEMsSUFBSSxDQUFDLE9BQU87WUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFDckI7WUFDRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUM3QyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDYixXQUFXLEVBQUUsRUFBRTtpQkFDbEIsQ0FBQyxDQUFDO2FBQ047U0FDSjtJQUNMLENBQUM7Ozs7O0lBRUQsbUNBQVc7Ozs7SUFBWCxVQUFZLEdBQUc7UUFDWCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVELHFDQUFhOzs7O0lBQWIsVUFBYyxHQUFHO1FBQ2IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDOztnQkFyRkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxTQUFTO29CQUNuQixnOEJBQW9DO2lCQUN2Qzs7OzBCQUVJLEtBQUs7MkJBRUwsS0FBSzswQkFFTCxLQUFLO3FDQUVMLEtBQUs7aUNBRUwsTUFBTTttQ0FFTixNQUFNOytCQUVOLFlBQVksU0FBQyxrQkFBa0I7O0lBcUVwQyxvQkFBQztDQUFBLEFBdEZELElBc0ZDO1NBbEZZLGFBQWE7OztJQUN0QixnQ0FBMkI7O0lBRTNCLGlDQUFtQzs7SUFFbkMsZ0NBQTBCOztJQUUxQiwyQ0FBcUM7O0lBRXJDLHVDQUFzRTs7SUFFdEUseUNBQXdFOztJQUV4RSxxQ0FBOEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgT25Jbml0LFxuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgVmlld0NoaWxkcmVuLFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRyZWVSb3dPYmplY3QgfSBmcm9tICcuL3RyZWUtcm93LW9iamVjdC5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlQ2hpbGRDb21wb25lbnQgfSBmcm9tICcuL3RyZWUtY2hpbGQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC10cmVlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdHJlZS5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgVHJlZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gICAgQElucHV0KCkgaGVhZGVyczogc3RyaW5nW107XG5cbiAgICBASW5wdXQoKSB0cmVlRGF0YTogVHJlZVJvd09iamVjdFtdO1xuXG4gICAgQElucHV0KCkgaGlkZUFsbDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGRpc3BsYXlUcmVlQWN0aW9uczogYm9vbGVhbjtcblxuICAgIEBPdXRwdXQoKSBlZGl0Um93Q2xpY2tlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBPdXRwdXQoKSBkZWxldGVSb3dDbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQFZpZXdDaGlsZHJlbihUcmVlQ2hpbGRDb21wb25lbnQpIHRyZWVDaGlsZHJlbjogUXVlcnlMaXN0PFRyZWVDaGlsZENvbXBvbmVudD47XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5oaWRlQWxsID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICBpZiAodGhpcy50cmVlRGF0YSAmJiB0aGlzLnRyZWVEYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy50cmVlRGF0YS5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDaGlsZERlcHRoKHJvdywgMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVFbXB0eVRyYWlsaW5nQ2VsbHMocm93KTsgLy8gaGFuZGxlIGVtcHR5IGNlbGxzIGZvciBwYXJlbnRzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZURpc3BsYXlBbGwoKSB7XG4gICAgICAgIHRoaXMuaGlkZUFsbCA9ICF0aGlzLmhpZGVBbGw7XG4gICAgICAgIHRoaXMudHJlZUNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgY2hpbGQudG9nZ2xlRGlzcGxheUNoaWxkcmVuKHRoaXMuaGlkZUFsbCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldENoaWxkRGVwdGgocm93LCBkZXB0aCkge1xuICAgICAgICBpZiAoZGVwdGggPiAwKSB7XG4gICAgICAgICAgICByb3cuc3VibGV2ZWxDbGFzcyA9ICdmZC10cmVlX19ncm91cC0tc3VibGV2ZWwtJyArIGRlcHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyb3cuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHJvdy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldENoaWxkRGVwdGgoY2hpbGQsIGRlcHRoICsgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVFbXB0eVRyYWlsaW5nQ2VsbHMoY2hpbGQpOyAvLyBoYW5kbGUgZW1wdHkgY2VsbHMgZm9yIGNoaWxkcmVuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUVtcHR5VHJhaWxpbmdDZWxscyhyb3cpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgcm93ICYmXG4gICAgICAgICAgICByb3cucm93RGF0YSAmJlxuICAgICAgICAgICAgcm93LnJvd0RhdGEubGVuZ3RoICYmXG4gICAgICAgICAgICB0eXBlb2Ygcm93LnJvd0RhdGFbMF0gIT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgJiZcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycy5sZW5ndGhcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB3aGlsZSAocm93LnJvd0RhdGEubGVuZ3RoIDwgdGhpcy5oZWFkZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJvdy5yb3dEYXRhLnB1c2goJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgcm93ICYmXG4gICAgICAgICAgICByb3cucm93RGF0YSAmJlxuICAgICAgICAgICAgcm93LnJvd0RhdGEubGVuZ3RoICYmXG4gICAgICAgICAgICB0eXBlb2Ygcm93LnJvd0RhdGFbMF0gPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgJiZcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycy5sZW5ndGhcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB3aGlsZSAocm93LnJvd0RhdGEubGVuZ3RoIDwgdGhpcy5oZWFkZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJvdy5yb3dEYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5VGV4dDogJydcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVkaXRDbGlja2VkKHJvdykge1xuICAgICAgICB0aGlzLmVkaXRSb3dDbGlja2VkLmVtaXQocm93KTtcbiAgICB9XG5cbiAgICBkZWxldGVDbGlja2VkKHJvdykge1xuICAgICAgICB0aGlzLmRlbGV0ZVJvd0NsaWNrZWQuZW1pdChyb3cpO1xuICAgIH1cbn1cbiJdfQ==