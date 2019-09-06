/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabPanelComponent } from './tab/tab-panel.component';
import { TabListComponent } from './tab-list.component';
import { TabLoadTitleDirective, TabTitleDirective } from './tab-utils/tab-directives';
import { TabNavDirective } from './tab-nav/tab-nav.directive';
import { TabLinkDirective } from './tab-link/tab-link.directive';
import { TabItemDirective } from './tab-item/tab-item.directive';
export class TabsModule {
}
TabsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    TabListComponent,
                    TabPanelComponent,
                    TabTitleDirective,
                    TabLoadTitleDirective,
                    TabNavDirective,
                    TabLinkDirective,
                    TabItemDirective
                ],
                imports: [
                    CommonModule
                ],
                exports: [
                    TabListComponent,
                    TabPanelComponent,
                    TabTitleDirective,
                    TabLoadTitleDirective,
                    TabNavDirective,
                    TabItemDirective,
                    TabLinkDirective
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGFicy90YWJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBeUJqRSxNQUFNLE9BQU8sVUFBVTs7O1lBdkJ0QixRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFO29CQUNWLGdCQUFnQjtvQkFDaEIsaUJBQWlCO29CQUNqQixpQkFBaUI7b0JBQ2pCLHFCQUFxQjtvQkFDckIsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtpQkFDbkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFlBQVk7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGdCQUFnQjtvQkFDaEIsaUJBQWlCO29CQUNqQixpQkFBaUI7b0JBQ2pCLHFCQUFxQjtvQkFDckIsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtpQkFDbkI7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBUYWJQYW5lbENvbXBvbmVudCB9IGZyb20gJy4vdGFiL3RhYi1wYW5lbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFiTGlzdENvbXBvbmVudCB9IGZyb20gJy4vdGFiLWxpc3QuY29tcG9uZW50JztcblxuaW1wb3J0IHsgVGFiTG9hZFRpdGxlRGlyZWN0aXZlLCBUYWJUaXRsZURpcmVjdGl2ZSB9IGZyb20gJy4vdGFiLXV0aWxzL3RhYi1kaXJlY3RpdmVzJztcbmltcG9ydCB7IFRhYk5hdkRpcmVjdGl2ZSB9IGZyb20gJy4vdGFiLW5hdi90YWItbmF2LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUYWJMaW5rRGlyZWN0aXZlIH0gZnJvbSAnLi90YWItbGluay90YWItbGluay5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGFiSXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vdGFiLWl0ZW0vdGFiLWl0ZW0uZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgVGFiTGlzdENvbXBvbmVudCxcbiAgICAgICAgVGFiUGFuZWxDb21wb25lbnQsXG4gICAgICAgIFRhYlRpdGxlRGlyZWN0aXZlLFxuICAgICAgICBUYWJMb2FkVGl0bGVEaXJlY3RpdmUsXG4gICAgICAgIFRhYk5hdkRpcmVjdGl2ZSxcbiAgICAgICAgVGFiTGlua0RpcmVjdGl2ZSxcbiAgICAgICAgVGFiSXRlbURpcmVjdGl2ZVxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgVGFiTGlzdENvbXBvbmVudCxcbiAgICAgICAgVGFiUGFuZWxDb21wb25lbnQsXG4gICAgICAgIFRhYlRpdGxlRGlyZWN0aXZlLFxuICAgICAgICBUYWJMb2FkVGl0bGVEaXJlY3RpdmUsXG4gICAgICAgIFRhYk5hdkRpcmVjdGl2ZSxcbiAgICAgICAgVGFiSXRlbURpcmVjdGl2ZSxcbiAgICAgICAgVGFiTGlua0RpcmVjdGl2ZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgVGFic01vZHVsZSB7fVxuIl19