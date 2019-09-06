/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitButtonComponent } from './split-button.component';
import { ButtonModule } from '../button/button.module';
import { PopoverModule } from '../popover/popover.module';
import { SplitButtonActionTitle, SplitButtonLoadActionTitle, SplitButtonMenuDirective } from './split-button-utils/split-button.directives';
var SplitButtonModule = /** @class */ (function () {
    function SplitButtonModule() {
    }
    SplitButtonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ButtonModule, PopoverModule],
                    declarations: [SplitButtonComponent, SplitButtonMenuDirective, SplitButtonActionTitle, SplitButtonLoadActionTitle],
                    exports: [SplitButtonComponent, SplitButtonMenuDirective, SplitButtonActionTitle, SplitButtonLoadActionTitle]
                },] }
    ];
    return SplitButtonModule;
}());
export { SplitButtonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQtYnV0dG9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zcGxpdC1idXR0b24vc3BsaXQtYnV0dG9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsMEJBQTBCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUU1STtJQUFBO0lBS2dDLENBQUM7O2dCQUxoQyxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUM7b0JBQ3BELFlBQVksRUFBRSxDQUFDLG9CQUFvQixFQUFFLHdCQUF3QixFQUFFLHNCQUFzQixFQUFFLDBCQUEwQixDQUFDO29CQUNsSCxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSx3QkFBd0IsRUFBRSxzQkFBc0IsRUFBRSwwQkFBMEIsQ0FBQztpQkFDaEg7O0lBQytCLHdCQUFDO0NBQUEsQUFMakMsSUFLaUM7U0FBcEIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFNwbGl0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9zcGxpdC1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbi9idXR0b24ubW9kdWxlJztcbmltcG9ydCB7IFBvcG92ZXJNb2R1bGUgfSBmcm9tICcuLi9wb3BvdmVyL3BvcG92ZXIubW9kdWxlJztcbmltcG9ydCB7IFNwbGl0QnV0dG9uQWN0aW9uVGl0bGUsIFNwbGl0QnV0dG9uTG9hZEFjdGlvblRpdGxlLCBTcGxpdEJ1dHRvbk1lbnVEaXJlY3RpdmUgfSBmcm9tICcuL3NwbGl0LWJ1dHRvbi11dGlscy9zcGxpdC1idXR0b24uZGlyZWN0aXZlcyc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQnV0dG9uTW9kdWxlLCBQb3BvdmVyTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtTcGxpdEJ1dHRvbkNvbXBvbmVudCwgU3BsaXRCdXR0b25NZW51RGlyZWN0aXZlLCBTcGxpdEJ1dHRvbkFjdGlvblRpdGxlLCBTcGxpdEJ1dHRvbkxvYWRBY3Rpb25UaXRsZV0sXG4gICAgZXhwb3J0czogW1NwbGl0QnV0dG9uQ29tcG9uZW50LCBTcGxpdEJ1dHRvbk1lbnVEaXJlY3RpdmUsIFNwbGl0QnV0dG9uQWN0aW9uVGl0bGUsIFNwbGl0QnV0dG9uTG9hZEFjdGlvblRpdGxlXVxufSlcbmV4cG9ydCBjbGFzcyBTcGxpdEJ1dHRvbk1vZHVsZSB7fVxuIl19