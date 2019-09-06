/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MegaMenuComponent } from './mega-menu.component';
import { MegaMenuItemComponent } from './mega-menu-item/mega-menu-item.component';
import { MegaMenuSubitemDirective } from './mega-menu-subitem.directive';
import { MegaMenuSublinkDirective } from './mega-menu-sublink.directive';
import { MenuKeyboardService } from '../menu/menu-keyboard.service';
import { MegaMenuListDirective } from './mega-menu-list/mega-menu-list.directive';
import { MegaMenuLinkDirective } from './mega-menu-link/mega-menu-link.directive';
import { MegaMenuGroupComponent } from './mega-menu-group/mega-menu-group.component';
import { MegaMenuTitleDirective } from './mega-menu-title/mega-menu-title.directive';
var MegaMenuModule = /** @class */ (function () {
    function MegaMenuModule() {
    }
    MegaMenuModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [MegaMenuComponent, MegaMenuListDirective, MegaMenuItemComponent, MegaMenuSubitemDirective,
                        MegaMenuSublinkDirective, MegaMenuLinkDirective, MegaMenuGroupComponent, MegaMenuTitleDirective],
                    exports: [
                        MegaMenuComponent,
                        MegaMenuLinkDirective,
                        MegaMenuItemComponent,
                        MegaMenuSubitemDirective,
                        MegaMenuListDirective,
                        MegaMenuSublinkDirective,
                        MegaMenuGroupComponent,
                        MegaMenuTitleDirective
                    ],
                    providers: [MenuKeyboardService]
                },] }
    ];
    return MegaMenuModule;
}());
export { MegaMenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVnYS1tZW51Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tZWdhLW1lbnUvbWVnYS1tZW51Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDckYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFckY7SUFBQTtJQWdCNkIsQ0FBQzs7Z0JBaEI3QixRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSx3QkFBd0I7d0JBQ3BHLHdCQUF3QixFQUFFLHFCQUFxQixFQUFFLHNCQUFzQixFQUFFLHNCQUFzQixDQUFDO29CQUNwRyxPQUFPLEVBQUU7d0JBQ0wsaUJBQWlCO3dCQUNqQixxQkFBcUI7d0JBQ3JCLHFCQUFxQjt3QkFDckIsd0JBQXdCO3dCQUN4QixxQkFBcUI7d0JBQ3JCLHdCQUF3Qjt3QkFDeEIsc0JBQXNCO3dCQUN0QixzQkFBc0I7cUJBQ3pCO29CQUNELFNBQVMsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUNuQzs7SUFDNEIscUJBQUM7Q0FBQSxBQWhCOUIsSUFnQjhCO1NBQWpCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1lZ2FNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9tZWdhLW1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IE1lZ2FNZW51SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbWVnYS1tZW51LWl0ZW0vbWVnYS1tZW51LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE1lZ2FNZW51U3ViaXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbWVnYS1tZW51LXN1Yml0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IE1lZ2FNZW51U3VibGlua0RpcmVjdGl2ZSB9IGZyb20gJy4vbWVnYS1tZW51LXN1YmxpbmsuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1lbnVLZXlib2FyZFNlcnZpY2UgfSBmcm9tICcuLi9tZW51L21lbnUta2V5Ym9hcmQuc2VydmljZSc7XG5pbXBvcnQgeyBNZWdhTWVudUxpc3REaXJlY3RpdmUgfSBmcm9tICcuL21lZ2EtbWVudS1saXN0L21lZ2EtbWVudS1saXN0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZWdhTWVudUxpbmtEaXJlY3RpdmUgfSBmcm9tICcuL21lZ2EtbWVudS1saW5rL21lZ2EtbWVudS1saW5rLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZWdhTWVudUdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9tZWdhLW1lbnUtZ3JvdXAvbWVnYS1tZW51LWdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZWdhTWVudVRpdGxlRGlyZWN0aXZlIH0gZnJvbSAnLi9tZWdhLW1lbnUtdGl0bGUvbWVnYS1tZW51LXRpdGxlLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbTWVnYU1lbnVDb21wb25lbnQsIE1lZ2FNZW51TGlzdERpcmVjdGl2ZSwgTWVnYU1lbnVJdGVtQ29tcG9uZW50LCBNZWdhTWVudVN1Yml0ZW1EaXJlY3RpdmUsXG4gICAgICAgIE1lZ2FNZW51U3VibGlua0RpcmVjdGl2ZSwgTWVnYU1lbnVMaW5rRGlyZWN0aXZlLCBNZWdhTWVudUdyb3VwQ29tcG9uZW50LCBNZWdhTWVudVRpdGxlRGlyZWN0aXZlXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1lZ2FNZW51Q29tcG9uZW50LFxuICAgICAgICBNZWdhTWVudUxpbmtEaXJlY3RpdmUsXG4gICAgICAgIE1lZ2FNZW51SXRlbUNvbXBvbmVudCxcbiAgICAgICAgTWVnYU1lbnVTdWJpdGVtRGlyZWN0aXZlLFxuICAgICAgICBNZWdhTWVudUxpc3REaXJlY3RpdmUsXG4gICAgICAgIE1lZ2FNZW51U3VibGlua0RpcmVjdGl2ZSxcbiAgICAgICAgTWVnYU1lbnVHcm91cENvbXBvbmVudCxcbiAgICAgICAgTWVnYU1lbnVUaXRsZURpcmVjdGl2ZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbTWVudUtleWJvYXJkU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTWVnYU1lbnVNb2R1bGUge31cbiJdfQ==