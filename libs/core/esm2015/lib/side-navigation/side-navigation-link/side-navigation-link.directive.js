/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Input, ElementRef, Output, EventEmitter, Directive, HostListener, Inject, HostBinding } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
/**
 * The component that represents a navigation link.
 * ```html
 *    <a fd-side-nav-link>
 *        <a [attr.href]="'#'">Link Item</a>
 *    </a>
 * ```
 */
export class SideNavigationLinkDirective extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * Whether the link has a sublist.
         */
        this.hasSublist = false;
        /**
         * Whether the sub list is opened or closed
         */
        this.onSubListOpenChange = new EventEmitter();
        this.sublistIsOpen = false;
        this.role = this.hasSublist ? 'button' : '';
        this.hasPopup = this.hasSublist;
        this.tabindex = this.hasSublist ? '0' : '';
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        this._addClassToElement('fd-side-nav__link');
        if (this.hasSublist) {
            this._addClassToElement('has-child');
            this._addStyleToElement('cursor', 'pointer');
            this.elementRef.nativeElement.setAttribute('aria-expanded', this.sublistIsOpen);
        }
        if (this.sublistIsOpen && this.hasSublist) {
            this._addClassToElement('is-selected');
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    onKeypressHandler(event) {
        if (this.hasSublist && (event.code === 'Enter' || event.code === 'Space')) {
            event.preventDefault();
            this.changeSubListIsOpen();
        }
    }
    /**
     * @return {?}
     */
    changeSubListIsOpen() {
        if (this.hasSublist) {
            this.sublistIsOpen = !this.sublistIsOpen;
            this.onSubListOpenChange.emit(this.sublistIsOpen);
            this.ngOnChanges();
        }
    }
}
SideNavigationLinkDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-side-nav-link]',
            },] }
];
/** @nocollapse */
SideNavigationLinkDirective.ctorParameters = () => [
    { type: ElementRef, decorators: [{ type: Inject, args: [ElementRef,] }] }
];
SideNavigationLinkDirective.propDecorators = {
    hasSublist: [{ type: Input }],
    onSubListOpenChange: [{ type: Output }],
    sublistIsOpen: [{ type: Input }],
    role: [{ type: HostBinding, args: ['attr.role',] }],
    hasPopup: [{ type: HostBinding, args: ['attr.aria-haspopup',] }],
    tabindex: [{ type: HostBinding, args: ['tabindex',] }],
    onKeypressHandler: [{ type: HostListener, args: ['keypress', ['$event'],] }],
    changeSubListIsOpen: [{ type: HostListener, args: ['click', ['$event.target'],] }]
};
if (false) {
    /**
     * Whether the link has a sublist.
     * @type {?}
     */
    SideNavigationLinkDirective.prototype.hasSublist;
    /**
     * Whether the sub list is opened or closed
     * @type {?}
     */
    SideNavigationLinkDirective.prototype.onSubListOpenChange;
    /** @type {?} */
    SideNavigationLinkDirective.prototype.sublistIsOpen;
    /** @type {?} */
    SideNavigationLinkDirective.prototype.role;
    /** @type {?} */
    SideNavigationLinkDirective.prototype.hasPopup;
    /** @type {?} */
    SideNavigationLinkDirective.prototype.tabindex;
    /**
     * @type {?}
     * @private
     */
    SideNavigationLinkDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1uYXZpZ2F0aW9uLWxpbmsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NpZGUtbmF2aWdhdGlvbi9zaWRlLW5hdmlnYXRpb24tbGluay9zaWRlLW5hdmlnYXRpb24tbGluay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE1BQU0sRUFDTixZQUFZLEVBQ1osU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUMvQyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7Ozs7Ozs7O0FBY3ZFLE1BQU0sT0FBTywyQkFBNEIsU0FBUSxrQkFBa0I7Ozs7O0lBK0IvRCxZQUF3QyxVQUFzQjtRQUMxRCxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFEa0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTs7OztRQTNCOUQsZUFBVSxHQUFZLEtBQUssQ0FBQzs7OztRQUk1Qix3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBR2xELGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBRUwsU0FBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzlCLGFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3JDLGFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQWtCL0QsQ0FBQzs7Ozs7SUFmRCxjQUFjO1FBQ1YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ25GO1FBQ0QsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzFDO0lBQ0wsQ0FBQzs7Ozs7O0lBU0QsaUJBQWlCLENBQUMsS0FBSztRQUNuQixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUM5QjtJQUNMLENBQUM7Ozs7SUFHRCxtQkFBbUI7UUFDZixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDekMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQzs7O1lBdkRKLFNBQVMsU0FBQzs7Z0JBRVAsUUFBUSxFQUFFLG9CQUFvQjthQUNqQzs7OztZQWxCRyxVQUFVLHVCQWtERyxNQUFNLFNBQUMsVUFBVTs7O3lCQTVCN0IsS0FBSztrQ0FJTCxNQUFNOzRCQUdOLEtBQUs7bUJBR0wsV0FBVyxTQUFDLFdBQVc7dUJBQ3ZCLFdBQVcsU0FBQyxvQkFBb0I7dUJBQ2hDLFdBQVcsU0FBQyxVQUFVO2dDQXFCdEIsWUFBWSxTQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQztrQ0FRbkMsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQzs7Ozs7OztJQXpDeEMsaURBQzRCOzs7OztJQUc1QiwwREFDa0Q7O0lBRWxELG9EQUMrQjs7SUFFL0IsMkNBQWlFOztJQUNqRSwrQ0FBOEQ7O0lBQzlELCtDQUErRDs7Ozs7SUFnQm5ELGlEQUFrRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgSW5wdXQsXG4gICAgRWxlbWVudFJlZixcbiAgICBPdXRwdXQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbmplY3QsIEhvc3RCaW5kaW5nXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RGZE5neENsYXNzIH0gZnJvbSAnLi4vLi4vdXRpbHMvYWJzdHJhY3QtZmQtbmd4LWNsYXNzJztcblxuLyoqXG4gKiBUaGUgY29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyBhIG5hdmlnYXRpb24gbGluay5cbiAqIGBgYGh0bWxcbiAqICAgIDxhIGZkLXNpZGUtbmF2LWxpbms+XG4gKiAgICAgICAgPGEgW2F0dHIuaHJlZl09XCInIydcIj5MaW5rIEl0ZW08L2E+XG4gKiAgICA8L2E+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLXNpZGUtbmF2LWxpbmtdJyxcbn0pXG5leHBvcnQgY2xhc3MgU2lkZU5hdmlnYXRpb25MaW5rRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RGZE5neENsYXNzIHtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBsaW5rIGhhcyBhIHN1Ymxpc3QuICovXG4gICAgQElucHV0KClcbiAgICBoYXNTdWJsaXN0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0aGUgc3ViIGxpc3QgaXMgb3BlbmVkIG9yIGNsb3NlZCAqL1xuICAgIEBPdXRwdXQoKVxuICAgIG9uU3ViTGlzdE9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBASW5wdXQoKVxuICAgIHN1Ymxpc3RJc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJykgcm9sZSA9IHRoaXMuaGFzU3VibGlzdCA/ICdidXR0b24nIDogJyc7XG4gICAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtaGFzcG9wdXAnKSBoYXNQb3B1cCA9IHRoaXMuaGFzU3VibGlzdDtcbiAgICBASG9zdEJpbmRpbmcoJ3RhYmluZGV4JykgdGFiaW5kZXggPSB0aGlzLmhhc1N1Ymxpc3QgPyAnMCcgOiAnJztcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgX3NldFByb3BlcnRpZXMoKSB7XG4gICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1zaWRlLW5hdl9fbGluaycpO1xuICAgICAgICBpZiAodGhpcy5oYXNTdWJsaXN0KSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnaGFzLWNoaWxkJyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRTdHlsZVRvRWxlbWVudCgnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRoaXMuc3VibGlzdElzT3Blbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3VibGlzdElzT3BlbiAmJiB0aGlzLmhhc1N1Ymxpc3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdpcy1zZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2tleXByZXNzJywgWyckZXZlbnQnXSlcbiAgICBvbktleXByZXNzSGFuZGxlcihldmVudCkge1xuICAgICAgICBpZiAodGhpcy5oYXNTdWJsaXN0ICYmIChldmVudC5jb2RlID09PSAnRW50ZXInIHx8IGV2ZW50LmNvZGUgPT09ICdTcGFjZScpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdWJMaXN0SXNPcGVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50LnRhcmdldCddKVxuICAgIGNoYW5nZVN1Ykxpc3RJc09wZW4oKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc1N1Ymxpc3QpIHtcbiAgICAgICAgICAgIHRoaXMuc3VibGlzdElzT3BlbiA9ICF0aGlzLnN1Ymxpc3RJc09wZW47XG4gICAgICAgICAgICB0aGlzLm9uU3ViTGlzdE9wZW5DaGFuZ2UuZW1pdCh0aGlzLnN1Ymxpc3RJc09wZW4pO1xuICAgICAgICAgICAgdGhpcy5uZ09uQ2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19