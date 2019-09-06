/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ContentChild, Directive } from '@angular/core';
import { TabLinkDirective } from '../tab-link/tab-link.directive';
/**
 * Tab Item is optional wrapper for Tab link
 *
 * ```html
 * <div fd-tab-item>
 *    <a fd-tab-link>
 *        link
 *    </a>
 * </div>
 * ```
 */
export class TabItemDirective {
}
TabItemDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-tab-item]',
                host: {
                    'class': 'fd-tabs__item'
                }
            },] }
];
TabItemDirective.propDecorators = {
    linkItem: [{ type: ContentChild, args: [TabLinkDirective,] }]
};
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    TabItemDirective.prototype.linkItem;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3RhYnMvdGFiLWl0ZW0vdGFiLWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7Ozs7Ozs7O0FBbUJsRSxNQUFNLE9BQU8sZ0JBQWdCOzs7WUFQNUIsU0FBUyxTQUFDOztnQkFFUCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsSUFBSSxFQUFFO29CQUNGLE9BQU8sRUFBRSxlQUFlO2lCQUMzQjthQUNKOzs7dUJBSUksWUFBWSxTQUFDLGdCQUFnQjs7Ozs7OztJQUE5QixvQ0FBMkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250ZW50Q2hpbGQsIERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGFiTGlua0RpcmVjdGl2ZSB9IGZyb20gJy4uL3RhYi1saW5rL3RhYi1saW5rLmRpcmVjdGl2ZSc7XG4vKipcbiAqIFRhYiBJdGVtIGlzIG9wdGlvbmFsIHdyYXBwZXIgZm9yIFRhYiBsaW5rXG4gKlxuICogYGBgaHRtbFxuICogPGRpdiBmZC10YWItaXRlbT5cbiAqICAgIDxhIGZkLXRhYi1saW5rPlxuICogICAgICAgIGxpbmtcbiAqICAgIDwvYT5cbiAqIDwvZGl2PlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC10YWItaXRlbV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ2ZkLXRhYnNfX2l0ZW0nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBUYWJJdGVtRGlyZWN0aXZlIHtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQENvbnRlbnRDaGlsZChUYWJMaW5rRGlyZWN0aXZlKSBsaW5rSXRlbTogVGFiTGlua0RpcmVjdGl2ZTtcbn1cbiJdfQ==