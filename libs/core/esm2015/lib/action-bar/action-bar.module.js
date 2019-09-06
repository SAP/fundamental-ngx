/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { ActionBarDirective } from './action-bar.directive';
import { ActionBarTitleDirective } from './action-bar-title/action-bar-title.directive';
import { ActionBarDescriptionDirective } from './action-bar-description/action-bar-description.directive';
import { ActionBarHeaderDirective } from './action-bar-header/action-bar-header.directive';
import { ActionBarActionsDirective } from './action-bar-actions/action-bar-actions.directive';
import { ActionBarBackDirective } from './action-bar-back/action-bar-back.directive';
import { ActionBarMobileDirective } from './action-bar-mobile/action-bar-mobile.directive';
export class ActionBarModule {
}
ActionBarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ActionBarDirective,
                    ActionBarTitleDirective,
                    ActionBarDescriptionDirective,
                    ActionBarHeaderDirective,
                    ActionBarActionsDirective,
                    ActionBarBackDirective,
                    ActionBarMobileDirective
                ],
                imports: [CommonModule, ButtonModule, IconModule],
                exports: [
                    ActionBarDirective,
                    ActionBarTitleDirective,
                    ActionBarDescriptionDirective,
                    ActionBarHeaderDirective,
                    ActionBarActionsDirective,
                    ActionBarBackDirective,
                    ActionBarMobileDirective
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWJhci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvYWN0aW9uLWJhci9hY3Rpb24tYmFyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUMzRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUM5RixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNyRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQXVCM0YsTUFBTSxPQUFPLGVBQWU7OztZQXJCM0IsUUFBUSxTQUFDO2dCQUNOLFlBQVksRUFBRTtvQkFDVixrQkFBa0I7b0JBQ2xCLHVCQUF1QjtvQkFDdkIsNkJBQTZCO29CQUM3Qix3QkFBd0I7b0JBQ3hCLHlCQUF5QjtvQkFDekIsc0JBQXNCO29CQUN0Qix3QkFBd0I7aUJBQzNCO2dCQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDO2dCQUNqRCxPQUFPLEVBQUU7b0JBQ0wsa0JBQWtCO29CQUNsQix1QkFBdUI7b0JBQ3ZCLDZCQUE2QjtvQkFDN0Isd0JBQXdCO29CQUN4Qix5QkFBeUI7b0JBQ3pCLHNCQUFzQjtvQkFDdEIsd0JBQXdCO2lCQUMzQjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBCdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24vYnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBJY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbi9pY29uLm1vZHVsZSc7XG5cbmltcG9ydCB7IEFjdGlvbkJhckRpcmVjdGl2ZSB9IGZyb20gJy4vYWN0aW9uLWJhci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWN0aW9uQmFyVGl0bGVEaXJlY3RpdmUgfSBmcm9tICcuL2FjdGlvbi1iYXItdGl0bGUvYWN0aW9uLWJhci10aXRsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWN0aW9uQmFyRGVzY3JpcHRpb25EaXJlY3RpdmUgfSBmcm9tICcuL2FjdGlvbi1iYXItZGVzY3JpcHRpb24vYWN0aW9uLWJhci1kZXNjcmlwdGlvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWN0aW9uQmFySGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9hY3Rpb24tYmFyLWhlYWRlci9hY3Rpb24tYmFyLWhlYWRlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWN0aW9uQmFyQWN0aW9uc0RpcmVjdGl2ZSB9IGZyb20gJy4vYWN0aW9uLWJhci1hY3Rpb25zL2FjdGlvbi1iYXItYWN0aW9ucy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWN0aW9uQmFyQmFja0RpcmVjdGl2ZSB9IGZyb20gJy4vYWN0aW9uLWJhci1iYWNrL2FjdGlvbi1iYXItYmFjay5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQWN0aW9uQmFyTW9iaWxlRGlyZWN0aXZlIH0gZnJvbSAnLi9hY3Rpb24tYmFyLW1vYmlsZS9hY3Rpb24tYmFyLW1vYmlsZS5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBY3Rpb25CYXJEaXJlY3RpdmUsXG4gICAgICAgIEFjdGlvbkJhclRpdGxlRGlyZWN0aXZlLFxuICAgICAgICBBY3Rpb25CYXJEZXNjcmlwdGlvbkRpcmVjdGl2ZSxcbiAgICAgICAgQWN0aW9uQmFySGVhZGVyRGlyZWN0aXZlLFxuICAgICAgICBBY3Rpb25CYXJBY3Rpb25zRGlyZWN0aXZlLFxuICAgICAgICBBY3Rpb25CYXJCYWNrRGlyZWN0aXZlLFxuICAgICAgICBBY3Rpb25CYXJNb2JpbGVEaXJlY3RpdmVcbiAgICBdLFxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEJ1dHRvbk1vZHVsZSwgSWNvbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBBY3Rpb25CYXJEaXJlY3RpdmUsXG4gICAgICAgIEFjdGlvbkJhclRpdGxlRGlyZWN0aXZlLFxuICAgICAgICBBY3Rpb25CYXJEZXNjcmlwdGlvbkRpcmVjdGl2ZSxcbiAgICAgICAgQWN0aW9uQmFySGVhZGVyRGlyZWN0aXZlLFxuICAgICAgICBBY3Rpb25CYXJBY3Rpb25zRGlyZWN0aXZlLFxuICAgICAgICBBY3Rpb25CYXJCYWNrRGlyZWN0aXZlLFxuICAgICAgICBBY3Rpb25CYXJNb2JpbGVEaXJlY3RpdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFjdGlvbkJhck1vZHVsZSB7fVxuIl19