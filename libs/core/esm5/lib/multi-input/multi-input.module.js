/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiInputComponent } from './multi-input.component';
import { TokenModule } from '../token/token.module';
import { FormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';
import { PopoverModule } from '../popover/popover.module';
import { PipeModule } from '../utils/pipes/pipe.module';
var MultiInputModule = /** @class */ (function () {
    function MultiInputModule() {
    }
    MultiInputModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [MultiInputComponent],
                    imports: [
                        CommonModule,
                        TokenModule,
                        FormsModule,
                        MenuModule,
                        PopoverModule,
                        PipeModule
                    ],
                    exports: [MultiInputComponent]
                },] }
    ];
    return MultiInputModule;
}());
export { MultiInputModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktaW5wdXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL211bHRpLWlucHV0L211bHRpLWlucHV0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV4RDtJQUFBO0lBWStCLENBQUM7O2dCQVovQixRQUFRLFNBQUM7b0JBQ04sWUFBWSxFQUFFLENBQUMsbUJBQW1CLENBQUM7b0JBQ25DLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsV0FBVzt3QkFDWCxVQUFVO3dCQUNWLGFBQWE7d0JBQ2IsVUFBVTtxQkFDYjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDakM7O0lBQzhCLHVCQUFDO0NBQUEsQUFaaEMsSUFZZ0M7U0FBbkIsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNdWx0aUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9tdWx0aS1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVG9rZW5Nb2R1bGUgfSBmcm9tICcuLi90b2tlbi90b2tlbi5tb2R1bGUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNZW51TW9kdWxlIH0gZnJvbSAnLi4vbWVudS9tZW51Lm1vZHVsZSc7XG5pbXBvcnQgeyBQb3BvdmVyTW9kdWxlIH0gZnJvbSAnLi4vcG9wb3Zlci9wb3BvdmVyLm1vZHVsZSc7XG5pbXBvcnQgeyBQaXBlTW9kdWxlIH0gZnJvbSAnLi4vdXRpbHMvcGlwZXMvcGlwZS5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW011bHRpSW5wdXRDb21wb25lbnRdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBUb2tlbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIE1lbnVNb2R1bGUsXG4gICAgICAgIFBvcG92ZXJNb2R1bGUsXG4gICAgICAgIFBpcGVNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtNdWx0aUlucHV0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBNdWx0aUlucHV0TW9kdWxlIHt9XG4iXX0=