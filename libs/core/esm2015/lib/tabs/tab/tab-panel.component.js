/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChild, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { TabTitleDirective } from '../tab-utils/tab-directives';
/** @type {?} */
let tabPanelUniqueId = 0;
/**
 * Represents the body of a tab element. It also contains elements pertaining to the associated tab header.
 */
export class TabPanelComponent {
    constructor() {
        /**
         * Id of the tab. If none is provided, one will be generated.
         */
        this.id = 'fd-tab-panel' + tabPanelUniqueId++;
        /**
         * @hidden
         */
        this.expanded = false;
    }
}
TabPanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-tab',
                template: "<ng-container *ngIf=\"expanded\">\n  <ng-content></ng-content>\n</ng-container>\n",
                host: {
                    role: 'tabpanel',
                    class: 'fd-tabs__panel',
                    '[attr.id]': 'id',
                    '[attr.aria-expanded]': 'expanded ? true : null',
                    '[class.is-expanded]': 'expanded'
                },
                encapsulation: ViewEncapsulation.None
            }] }
];
TabPanelComponent.propDecorators = {
    titleTemplate: [{ type: ContentChild, args: [TabTitleDirective, { read: TemplateRef },] }],
    title: [{ type: Input }],
    ariaLabel: [{ type: Input }],
    ariaLabelledBy: [{ type: Input }],
    disabled: [{ type: Input }],
    id: [{ type: Input }]
};
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    TabPanelComponent.prototype.titleTemplate;
    /**
     * The title of the tab header.
     * @type {?}
     */
    TabPanelComponent.prototype.title;
    /**
     * Aria-label of the tab. Also applied to the tab header.
     * @type {?}
     */
    TabPanelComponent.prototype.ariaLabel;
    /**
     * Id of the element that labels the tab. Also applied to the tab header.
     * @type {?}
     */
    TabPanelComponent.prototype.ariaLabelledBy;
    /**
     * Whether the tab is disabled.
     * @type {?}
     */
    TabPanelComponent.prototype.disabled;
    /**
     * Id of the tab. If none is provided, one will be generated.
     * @type {?}
     */
    TabPanelComponent.prototype.id;
    /**
     * @hidden
     * @type {?}
     */
    TabPanelComponent.prototype.expanded;
    /**
     * @hidden
     * @type {?}
     */
    TabPanelComponent.prototype.index;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi90YWJzL3RhYi90YWItcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9GLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztJQUU1RCxnQkFBZ0IsR0FBVyxDQUFDOzs7O0FBaUJoQyxNQUFNLE9BQU8saUJBQWlCO0lBWjlCOzs7O1FBb0NJLE9BQUUsR0FBVyxjQUFjLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQzs7OztRQUdqRCxhQUFRLEdBQUcsS0FBSyxDQUFDO0lBSXJCLENBQUM7OztZQTNDQSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLDZGQUF5QztnQkFDekMsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxVQUFVO29CQUNoQixLQUFLLEVBQUUsZ0JBQWdCO29CQUN2QixXQUFXLEVBQUUsSUFBSTtvQkFDakIsc0JBQXNCLEVBQUUsd0JBQXdCO29CQUNoRCxxQkFBcUIsRUFBRSxVQUFVO2lCQUNwQztnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN4Qzs7OzRCQUlJLFlBQVksU0FBQyxpQkFBaUIsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUM7b0JBSW5ELEtBQUs7d0JBSUwsS0FBSzs2QkFJTCxLQUFLO3VCQUlMLEtBQUs7aUJBSUwsS0FBSzs7Ozs7OztJQXBCTiwwQ0FDZ0M7Ozs7O0lBR2hDLGtDQUNjOzs7OztJQUdkLHNDQUNrQjs7Ozs7SUFHbEIsMkNBQ3VCOzs7OztJQUd2QixxQ0FDa0I7Ozs7O0lBR2xCLCtCQUNpRDs7Ozs7SUFHakQscUNBQWlCOzs7OztJQUdqQixrQ0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUYWJUaXRsZURpcmVjdGl2ZSB9IGZyb20gJy4uL3RhYi11dGlscy90YWItZGlyZWN0aXZlcyc7XG5cbmxldCB0YWJQYW5lbFVuaXF1ZUlkOiBudW1iZXIgPSAwO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGJvZHkgb2YgYSB0YWIgZWxlbWVudC4gSXQgYWxzbyBjb250YWlucyBlbGVtZW50cyBwZXJ0YWluaW5nIHRvIHRoZSBhc3NvY2lhdGVkIHRhYiBoZWFkZXIuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtdGFiJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGFiLXBhbmVsLmNvbXBvbmVudC5odG1sJyxcbiAgICBob3N0OiB7XG4gICAgICAgIHJvbGU6ICd0YWJwYW5lbCcsXG4gICAgICAgIGNsYXNzOiAnZmQtdGFic19fcGFuZWwnLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2V4cGFuZGVkID8gdHJ1ZSA6IG51bGwnLFxuICAgICAgICAnW2NsYXNzLmlzLWV4cGFuZGVkXSc6ICdleHBhbmRlZCdcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIFRhYlBhbmVsQ29tcG9uZW50IHtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQENvbnRlbnRDaGlsZChUYWJUaXRsZURpcmVjdGl2ZSwge3JlYWQ6IFRlbXBsYXRlUmVmfSlcbiAgICB0aXRsZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqIFRoZSB0aXRsZSBvZiB0aGUgdGFiIGhlYWRlci4gKi9cbiAgICBASW5wdXQoKVxuICAgIHRpdGxlOiBzdHJpbmc7XG5cbiAgICAvKiogQXJpYS1sYWJlbCBvZiB0aGUgdGFiLiBBbHNvIGFwcGxpZWQgdG8gdGhlIHRhYiBoZWFkZXIuICovXG4gICAgQElucHV0KClcbiAgICBhcmlhTGFiZWw6IHN0cmluZztcblxuICAgIC8qKiBJZCBvZiB0aGUgZWxlbWVudCB0aGF0IGxhYmVscyB0aGUgdGFiLiBBbHNvIGFwcGxpZWQgdG8gdGhlIHRhYiBoZWFkZXIuICovXG4gICAgQElucHV0KClcbiAgICBhcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRhYiBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgLyoqIElkIG9mIHRoZSB0YWIuIElmIG5vbmUgaXMgcHJvdmlkZWQsIG9uZSB3aWxsIGJlIGdlbmVyYXRlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGlkOiBzdHJpbmcgPSAnZmQtdGFiLXBhbmVsJyArIHRhYlBhbmVsVW5pcXVlSWQrKztcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgZXhwYW5kZWQgPSBmYWxzZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgaW5kZXg6IG51bWJlcjtcbn1cbiJdfQ==