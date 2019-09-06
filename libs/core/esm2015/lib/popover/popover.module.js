/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover.component';
import { PopoverControlComponent } from './popover-control/popover-control.component';
import { PopoverBodyComponent } from './popover-body/popover-body.component';
import { PopoverDirective } from './popover-directive/popover.directive';
import { PopoverContainer } from './popover-directive/popover-container';
import { PopoverDropdownComponent } from './popover-dropdown/popover-dropdown.component';
export class PopoverModule {
}
PopoverModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    PopoverComponent,
                    PopoverControlComponent,
                    PopoverBodyComponent,
                    PopoverDirective,
                    PopoverContainer,
                    PopoverDropdownComponent,
                ],
                imports: [CommonModule],
                exports: [PopoverComponent, PopoverControlComponent, PopoverBodyComponent, PopoverDirective, PopoverDropdownComponent],
                entryComponents: [PopoverContainer]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvcG9wb3Zlci9wb3BvdmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDdEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDekUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFlekYsTUFBTSxPQUFPLGFBQWE7OztZQWJ6QixRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFO29CQUNWLGdCQUFnQjtvQkFDaEIsdUJBQXVCO29CQUN2QixvQkFBb0I7b0JBQ3BCLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQix3QkFBd0I7aUJBQzNCO2dCQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsdUJBQXVCLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLEVBQUUsd0JBQXdCLENBQUM7Z0JBQ3RILGVBQWUsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2FBQ3RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFBvcG92ZXJDb21wb25lbnQgfSBmcm9tICcuL3BvcG92ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFBvcG92ZXJDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9wb3BvdmVyLWNvbnRyb2wvcG9wb3Zlci1jb250cm9sLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQb3BvdmVyQm9keUNvbXBvbmVudCB9IGZyb20gJy4vcG9wb3Zlci1ib2R5L3BvcG92ZXItYm9keS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9wb3ZlckRpcmVjdGl2ZSB9IGZyb20gJy4vcG9wb3Zlci1kaXJlY3RpdmUvcG9wb3Zlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbnRhaW5lciB9IGZyb20gJy4vcG9wb3Zlci1kaXJlY3RpdmUvcG9wb3Zlci1jb250YWluZXInO1xuaW1wb3J0IHsgUG9wb3ZlckRyb3Bkb3duQ29tcG9uZW50IH0gZnJvbSAnLi9wb3BvdmVyLWRyb3Bkb3duL3BvcG92ZXItZHJvcGRvd24uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgUG9wb3ZlckNvbXBvbmVudCxcbiAgICAgICAgUG9wb3ZlckNvbnRyb2xDb21wb25lbnQsXG4gICAgICAgIFBvcG92ZXJCb2R5Q29tcG9uZW50LFxuICAgICAgICBQb3BvdmVyRGlyZWN0aXZlLFxuICAgICAgICBQb3BvdmVyQ29udGFpbmVyLFxuICAgICAgICBQb3BvdmVyRHJvcGRvd25Db21wb25lbnQsXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbUG9wb3ZlckNvbXBvbmVudCwgUG9wb3ZlckNvbnRyb2xDb21wb25lbnQsIFBvcG92ZXJCb2R5Q29tcG9uZW50LCBQb3BvdmVyRGlyZWN0aXZlLCBQb3BvdmVyRHJvcGRvd25Db21wb25lbnRdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1BvcG92ZXJDb250YWluZXJdXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJNb2R1bGUge31cbiJdfQ==