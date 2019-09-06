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
export class MenuModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvbWVudS9tZW51Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBdUJyRSxNQUFNLE9BQU8sVUFBVTs7O1lBckJ0QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixPQUFPLEVBQUU7b0JBQ0wsYUFBYTtvQkFDYixrQkFBa0I7b0JBQ2xCLGtCQUFrQjtvQkFDbEIsaUJBQWlCO29CQUNqQixpQkFBaUI7b0JBQ2pCLGtCQUFrQjtvQkFDbEIsc0JBQXNCO2lCQUN6QjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsYUFBYTtvQkFDYixrQkFBa0I7b0JBQ2xCLGtCQUFrQjtvQkFDbEIsaUJBQWlCO29CQUNqQixpQkFBaUI7b0JBQ2pCLGtCQUFrQjtvQkFDbEIsc0JBQXNCO2lCQUN6QjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IE1lbnVDb21wb25lbnQgfSBmcm9tICcuL21lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IE1lbnVHcm91cENvbXBvbmVudCB9IGZyb20gJy4vbWVudS1ncm91cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVudVRpdGxlRGlyZWN0aXZlIH0gZnJvbSAnLi9tZW51LXRpdGxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZW51TGlzdERpcmVjdGl2ZSB9IGZyb20gJy4vbWVudS1saXN0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbWVudS1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZW51QWRkb25EaXJlY3RpdmUgfSBmcm9tICcuL21lbnUtYWRkb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IE1lbnVJdGVtQWRkb25EaXJlY3RpdmUgfSBmcm9tICcuL21lbnUtaXRlbS1hZGRvbi5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWVudUNvbXBvbmVudCxcbiAgICAgICAgTWVudUdyb3VwQ29tcG9uZW50LFxuICAgICAgICBNZW51VGl0bGVEaXJlY3RpdmUsXG4gICAgICAgIE1lbnVMaXN0RGlyZWN0aXZlLFxuICAgICAgICBNZW51SXRlbURpcmVjdGl2ZSxcbiAgICAgICAgTWVudUFkZG9uRGlyZWN0aXZlLFxuICAgICAgICBNZW51SXRlbUFkZG9uRGlyZWN0aXZlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWVudUNvbXBvbmVudCxcbiAgICAgICAgTWVudUdyb3VwQ29tcG9uZW50LFxuICAgICAgICBNZW51VGl0bGVEaXJlY3RpdmUsXG4gICAgICAgIE1lbnVMaXN0RGlyZWN0aXZlLFxuICAgICAgICBNZW51SXRlbURpcmVjdGl2ZSxcbiAgICAgICAgTWVudUFkZG9uRGlyZWN0aXZlLFxuICAgICAgICBNZW51SXRlbUFkZG9uRGlyZWN0aXZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNZW51TW9kdWxlIHsgfVxuIl19