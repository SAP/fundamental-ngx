/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, ViewChildren, QueryList, EventEmitter } from '@angular/core';
import { TreeChildComponent } from './tree-child.component';
export class TreeComponent {
    constructor() {
        this.editRowClicked = new EventEmitter();
        this.deleteRowClicked = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.hideAll = false;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.treeData && this.treeData.length) {
            this.treeData.forEach((/**
             * @param {?} row
             * @return {?}
             */
            row => {
                this.getChildDepth(row, 0);
                this.handleEmptyTrailingCells(row); // handle empty cells for parents
            }));
        }
    }
    /**
     * @return {?}
     */
    toggleDisplayAll() {
        this.hideAll = !this.hideAll;
        this.treeChildren.forEach((/**
         * @param {?} child
         * @return {?}
         */
        child => {
            child.toggleDisplayChildren(this.hideAll);
        }));
    }
    /**
     * @param {?} row
     * @param {?} depth
     * @return {?}
     */
    getChildDepth(row, depth) {
        if (depth > 0) {
            row.sublevelClass = 'fd-tree__group--sublevel-' + depth;
        }
        if (row.children) {
            row.children.forEach((/**
             * @param {?} child
             * @return {?}
             */
            child => {
                this.getChildDepth(child, depth + 1);
                this.handleEmptyTrailingCells(child); // handle empty cells for children
            }));
        }
    }
    /**
     * @param {?} row
     * @return {?}
     */
    handleEmptyTrailingCells(row) {
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
    }
    /**
     * @param {?} row
     * @return {?}
     */
    editClicked(row) {
        this.editRowClicked.emit(row);
    }
    /**
     * @param {?} row
     * @return {?}
     */
    deleteClicked(row) {
        this.deleteRowClicked.emit(row);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdHJlZS90cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUdOLFlBQVksRUFDWixTQUFTLEVBQ1QsWUFBWSxFQUNmLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBTTVELE1BQU0sT0FBTyxhQUFhO0lBSjFCO1FBYWMsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUU1RCxxQkFBZ0IsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQXVFNUUsQ0FBQzs7OztJQW5FRyxRQUFRO1FBQ0osSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELGtCQUFrQjtRQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU87Ozs7WUFBQyxHQUFHLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGlDQUFpQztZQUN6RSxDQUFDLEVBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7OztJQUVELGdCQUFnQjtRQUNaLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlCLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFRCxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUs7UUFDcEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ1gsR0FBRyxDQUFDLGFBQWEsR0FBRywyQkFBMkIsR0FBRyxLQUFLLENBQUM7U0FDM0Q7UUFDRCxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDZCxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU87Ozs7WUFBQyxLQUFLLENBQUMsRUFBRTtnQkFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxrQ0FBa0M7WUFDNUUsQ0FBQyxFQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Ozs7O0lBRUQsd0JBQXdCLENBQUMsR0FBRztRQUN4QixJQUNJLEdBQUc7WUFDSCxHQUFHLENBQUMsT0FBTztZQUNYLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUNsQixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUTtZQUNsQyxJQUFJLENBQUMsT0FBTztZQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUNyQjtZQUNFLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQzdDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3hCO1NBQ0o7YUFBTSxJQUNILEdBQUc7WUFDSCxHQUFHLENBQUMsT0FBTztZQUNYLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUNsQixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUTtZQUNsQyxJQUFJLENBQUMsT0FBTztZQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUNyQjtZQUNFLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQzdDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUNiLFdBQVcsRUFBRSxFQUFFO2lCQUNsQixDQUFDLENBQUM7YUFDTjtTQUNKO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsR0FBRztRQUNYLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLEdBQUc7UUFDYixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7OztZQXJGSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLGc4QkFBb0M7YUFDdkM7OztzQkFFSSxLQUFLO3VCQUVMLEtBQUs7c0JBRUwsS0FBSztpQ0FFTCxLQUFLOzZCQUVMLE1BQU07K0JBRU4sTUFBTTsyQkFFTixZQUFZLFNBQUMsa0JBQWtCOzs7O0lBWmhDLGdDQUEyQjs7SUFFM0IsaUNBQW1DOztJQUVuQyxnQ0FBMEI7O0lBRTFCLDJDQUFxQzs7SUFFckMsdUNBQXNFOztJQUV0RSx5Q0FBd0U7O0lBRXhFLHFDQUE4RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBPbkluaXQsXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBWaWV3Q2hpbGRyZW4sXG4gICAgUXVlcnlMaXN0LFxuICAgIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVHJlZVJvd09iamVjdCB9IGZyb20gJy4vdHJlZS1yb3ctb2JqZWN0Lm1vZGVsJztcbmltcG9ydCB7IFRyZWVDaGlsZENvbXBvbmVudCB9IGZyb20gJy4vdHJlZS1jaGlsZC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLXRyZWUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90cmVlLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBUcmVlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0IHtcbiAgICBASW5wdXQoKSBoZWFkZXJzOiBzdHJpbmdbXTtcblxuICAgIEBJbnB1dCgpIHRyZWVEYXRhOiBUcmVlUm93T2JqZWN0W107XG5cbiAgICBASW5wdXQoKSBoaWRlQWxsOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgZGlzcGxheVRyZWVBY3Rpb25zOiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgpIGVkaXRSb3dDbGlja2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQE91dHB1dCgpIGRlbGV0ZVJvd0NsaWNrZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAVmlld0NoaWxkcmVuKFRyZWVDaGlsZENvbXBvbmVudCkgdHJlZUNoaWxkcmVuOiBRdWVyeUxpc3Q8VHJlZUNoaWxkQ29tcG9uZW50PjtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmhpZGVBbGwgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnRyZWVEYXRhICYmIHRoaXMudHJlZURhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnRyZWVEYXRhLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldENoaWxkRGVwdGgocm93LCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUVtcHR5VHJhaWxpbmdDZWxscyhyb3cpOyAvLyBoYW5kbGUgZW1wdHkgY2VsbHMgZm9yIHBhcmVudHNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlRGlzcGxheUFsbCgpIHtcbiAgICAgICAgdGhpcy5oaWRlQWxsID0gIXRoaXMuaGlkZUFsbDtcbiAgICAgICAgdGhpcy50cmVlQ2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICBjaGlsZC50b2dnbGVEaXNwbGF5Q2hpbGRyZW4odGhpcy5oaWRlQWxsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0Q2hpbGREZXB0aChyb3csIGRlcHRoKSB7XG4gICAgICAgIGlmIChkZXB0aCA+IDApIHtcbiAgICAgICAgICAgIHJvdy5zdWJsZXZlbENsYXNzID0gJ2ZkLXRyZWVfX2dyb3VwLS1zdWJsZXZlbC0nICsgZGVwdGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvdy5jaGlsZHJlbikge1xuICAgICAgICAgICAgcm93LmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q2hpbGREZXB0aChjaGlsZCwgZGVwdGggKyAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUVtcHR5VHJhaWxpbmdDZWxscyhjaGlsZCk7IC8vIGhhbmRsZSBlbXB0eSBjZWxscyBmb3IgY2hpbGRyZW5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRW1wdHlUcmFpbGluZ0NlbGxzKHJvdykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICByb3cgJiZcbiAgICAgICAgICAgIHJvdy5yb3dEYXRhICYmXG4gICAgICAgICAgICByb3cucm93RGF0YS5sZW5ndGggJiZcbiAgICAgICAgICAgIHR5cGVvZiByb3cucm93RGF0YVswXSAhPT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyAmJlxuICAgICAgICAgICAgdGhpcy5oZWFkZXJzLmxlbmd0aFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHdoaWxlIChyb3cucm93RGF0YS5sZW5ndGggPCB0aGlzLmhlYWRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcm93LnJvd0RhdGEucHVzaCgnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICByb3cgJiZcbiAgICAgICAgICAgIHJvdy5yb3dEYXRhICYmXG4gICAgICAgICAgICByb3cucm93RGF0YS5sZW5ndGggJiZcbiAgICAgICAgICAgIHR5cGVvZiByb3cucm93RGF0YVswXSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyAmJlxuICAgICAgICAgICAgdGhpcy5oZWFkZXJzLmxlbmd0aFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHdoaWxlIChyb3cucm93RGF0YS5sZW5ndGggPCB0aGlzLmhlYWRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcm93LnJvd0RhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlUZXh0OiAnJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWRpdENsaWNrZWQocm93KSB7XG4gICAgICAgIHRoaXMuZWRpdFJvd0NsaWNrZWQuZW1pdChyb3cpO1xuICAgIH1cblxuICAgIGRlbGV0ZUNsaWNrZWQocm93KSB7XG4gICAgICAgIHRoaXMuZGVsZXRlUm93Q2xpY2tlZC5lbWl0KHJvdyk7XG4gICAgfVxufVxuIl19