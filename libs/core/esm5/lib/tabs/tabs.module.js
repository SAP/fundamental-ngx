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
var TabsModule = /** @class */ (function () {
    function TabsModule() {
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
    return TabsModule;
}());
export { TabsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGFicy90YWJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRWpFO0lBQUE7SUF1QnlCLENBQUM7O2dCQXZCekIsUUFBUSxTQUFDO29CQUNOLFlBQVksRUFBRTt3QkFDVixnQkFBZ0I7d0JBQ2hCLGlCQUFpQjt3QkFDakIsaUJBQWlCO3dCQUNqQixxQkFBcUI7d0JBQ3JCLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7cUJBQ25CO29CQUNELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDTCxnQkFBZ0I7d0JBQ2hCLGlCQUFpQjt3QkFDakIsaUJBQWlCO3dCQUNqQixxQkFBcUI7d0JBQ3JCLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7cUJBQ25CO2lCQUNKOztJQUN3QixpQkFBQztDQUFBLEFBdkIxQixJQXVCMEI7U0FBYixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFRhYlBhbmVsQ29tcG9uZW50IH0gZnJvbSAnLi90YWIvdGFiLXBhbmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYWJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi90YWItbGlzdC5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBUYWJMb2FkVGl0bGVEaXJlY3RpdmUsIFRhYlRpdGxlRGlyZWN0aXZlIH0gZnJvbSAnLi90YWItdXRpbHMvdGFiLWRpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgVGFiTmF2RGlyZWN0aXZlIH0gZnJvbSAnLi90YWItbmF2L3RhYi1uYXYuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRhYkxpbmtEaXJlY3RpdmUgfSBmcm9tICcuL3RhYi1saW5rL3RhYi1saW5rLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUYWJJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi90YWItaXRlbS90YWItaXRlbS5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBUYWJMaXN0Q29tcG9uZW50LFxuICAgICAgICBUYWJQYW5lbENvbXBvbmVudCxcbiAgICAgICAgVGFiVGl0bGVEaXJlY3RpdmUsXG4gICAgICAgIFRhYkxvYWRUaXRsZURpcmVjdGl2ZSxcbiAgICAgICAgVGFiTmF2RGlyZWN0aXZlLFxuICAgICAgICBUYWJMaW5rRGlyZWN0aXZlLFxuICAgICAgICBUYWJJdGVtRGlyZWN0aXZlXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBUYWJMaXN0Q29tcG9uZW50LFxuICAgICAgICBUYWJQYW5lbENvbXBvbmVudCxcbiAgICAgICAgVGFiVGl0bGVEaXJlY3RpdmUsXG4gICAgICAgIFRhYkxvYWRUaXRsZURpcmVjdGl2ZSxcbiAgICAgICAgVGFiTmF2RGlyZWN0aXZlLFxuICAgICAgICBUYWJJdGVtRGlyZWN0aXZlLFxuICAgICAgICBUYWJMaW5rRGlyZWN0aXZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBUYWJzTW9kdWxlIHt9XG4iXX0=