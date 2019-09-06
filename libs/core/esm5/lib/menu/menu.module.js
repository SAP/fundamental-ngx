/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuGroupComponent } from './menu-group.component';
import { MenuTitleDirective } from './menu-title.directive';
import { MenuListDirective } from './menu-list.directive';
import { MenuItemDirective } from './menu-item.directive';
import { MenuAddonDirective } from './menu-addon.directive';
import { MenuItemAddonDirective } from './menu-item-addon.directive';
var MenuModule = /** @class */ (function () {
    function MenuModule() {
    }
    MenuModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [
                        MenuComponent,
                        MenuGroupComponent,
                        MenuTitleDirective,
                        MenuListDirective,
                        MenuItemDirective,
                        MenuAddonDirective,
                        MenuItemAddonDirective
                    ],
                    declarations: [
                        MenuComponent,
                        MenuGroupComponent,
                        MenuTitleDirective,
                        MenuListDirective,
                        MenuItemDirective,
                        MenuAddonDirective,
                        MenuItemAddonDirective
                    ]
                },] }
    ];
    return MenuModule;
}());
export { MenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvbWVudS9tZW51Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXJFO0lBQUE7SUFxQjBCLENBQUM7O2dCQXJCMUIsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFO3dCQUNMLGFBQWE7d0JBQ2Isa0JBQWtCO3dCQUNsQixrQkFBa0I7d0JBQ2xCLGlCQUFpQjt3QkFDakIsaUJBQWlCO3dCQUNqQixrQkFBa0I7d0JBQ2xCLHNCQUFzQjtxQkFDekI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLGFBQWE7d0JBQ2Isa0JBQWtCO3dCQUNsQixrQkFBa0I7d0JBQ2xCLGlCQUFpQjt3QkFDakIsaUJBQWlCO3dCQUNqQixrQkFBa0I7d0JBQ2xCLHNCQUFzQjtxQkFDekI7aUJBQ0o7O0lBQ3lCLGlCQUFDO0NBQUEsQUFyQjNCLElBcUIyQjtTQUFkLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgTWVudUNvbXBvbmVudCB9IGZyb20gJy4vbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVudUdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9tZW51LWdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZW51VGl0bGVEaXJlY3RpdmUgfSBmcm9tICcuL21lbnUtdGl0bGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1lbnVMaXN0RGlyZWN0aXZlIH0gZnJvbSAnLi9tZW51LWxpc3QuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1lbnVJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9tZW51LWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IE1lbnVBZGRvbkRpcmVjdGl2ZSB9IGZyb20gJy4vbWVudS1hZGRvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWVudUl0ZW1BZGRvbkRpcmVjdGl2ZSB9IGZyb20gJy4vbWVudS1pdGVtLWFkZG9uLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNZW51Q29tcG9uZW50LFxuICAgICAgICBNZW51R3JvdXBDb21wb25lbnQsXG4gICAgICAgIE1lbnVUaXRsZURpcmVjdGl2ZSxcbiAgICAgICAgTWVudUxpc3REaXJlY3RpdmUsXG4gICAgICAgIE1lbnVJdGVtRGlyZWN0aXZlLFxuICAgICAgICBNZW51QWRkb25EaXJlY3RpdmUsXG4gICAgICAgIE1lbnVJdGVtQWRkb25EaXJlY3RpdmVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBNZW51Q29tcG9uZW50LFxuICAgICAgICBNZW51R3JvdXBDb21wb25lbnQsXG4gICAgICAgIE1lbnVUaXRsZURpcmVjdGl2ZSxcbiAgICAgICAgTWVudUxpc3REaXJlY3RpdmUsXG4gICAgICAgIE1lbnVJdGVtRGlyZWN0aXZlLFxuICAgICAgICBNZW51QWRkb25EaXJlY3RpdmUsXG4gICAgICAgIE1lbnVJdGVtQWRkb25EaXJlY3RpdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVNb2R1bGUgeyB9XG4iXX0=