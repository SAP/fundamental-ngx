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
var PopoverModule = /** @class */ (function () {
    function PopoverModule() {
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
    return PopoverModule;
}());
export { PopoverModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvcG9wb3Zlci9wb3BvdmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDdEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDekUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFFekY7SUFBQTtJQWE0QixDQUFDOztnQkFiNUIsUUFBUSxTQUFDO29CQUNOLFlBQVksRUFBRTt3QkFDVixnQkFBZ0I7d0JBQ2hCLHVCQUF1Qjt3QkFDdkIsb0JBQW9CO3dCQUNwQixnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsd0JBQXdCO3FCQUMzQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixFQUFFLHVCQUF1QixFQUFFLG9CQUFvQixFQUFFLGdCQUFnQixFQUFFLHdCQUF3QixDQUFDO29CQUN0SCxlQUFlLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDdEM7O0lBQzJCLG9CQUFDO0NBQUEsQUFiN0IsSUFhNkI7U0FBaEIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBQb3BvdmVyQ29tcG9uZW50IH0gZnJvbSAnLi9wb3BvdmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQb3BvdmVyQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vcG9wb3Zlci1jb250cm9sL3BvcG92ZXItY29udHJvbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9wb3ZlckJvZHlDb21wb25lbnQgfSBmcm9tICcuL3BvcG92ZXItYm9keS9wb3BvdmVyLWJvZHkuY29tcG9uZW50JztcbmltcG9ydCB7IFBvcG92ZXJEaXJlY3RpdmUgfSBmcm9tICcuL3BvcG92ZXItZGlyZWN0aXZlL3BvcG92ZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IFBvcG92ZXJDb250YWluZXIgfSBmcm9tICcuL3BvcG92ZXItZGlyZWN0aXZlL3BvcG92ZXItY29udGFpbmVyJztcbmltcG9ydCB7IFBvcG92ZXJEcm9wZG93bkNvbXBvbmVudCB9IGZyb20gJy4vcG9wb3Zlci1kcm9wZG93bi9wb3BvdmVyLWRyb3Bkb3duLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFBvcG92ZXJDb21wb25lbnQsXG4gICAgICAgIFBvcG92ZXJDb250cm9sQ29tcG9uZW50LFxuICAgICAgICBQb3BvdmVyQm9keUNvbXBvbmVudCxcbiAgICAgICAgUG9wb3ZlckRpcmVjdGl2ZSxcbiAgICAgICAgUG9wb3ZlckNvbnRhaW5lcixcbiAgICAgICAgUG9wb3ZlckRyb3Bkb3duQ29tcG9uZW50LFxuICAgIF0sXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1BvcG92ZXJDb21wb25lbnQsIFBvcG92ZXJDb250cm9sQ29tcG9uZW50LCBQb3BvdmVyQm9keUNvbXBvbmVudCwgUG9wb3ZlckRpcmVjdGl2ZSwgUG9wb3ZlckRyb3Bkb3duQ29tcG9uZW50XSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtQb3BvdmVyQ29udGFpbmVyXVxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyTW9kdWxlIHt9XG4iXX0=