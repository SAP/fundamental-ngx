/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDirective } from './list.directive';
import { ListItemDirective } from './list-item.directive';
import { ListCheckboxComponent } from './list-checkbox.component';
import { ListActionDirective } from './list-action.directive';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { FormsModule } from '@angular/forms';
var ListModule = /** @class */ (function () {
    function ListModule() {
    }
    ListModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ListDirective, ListItemDirective, ListActionDirective, ListCheckboxComponent],
                    imports: [CommonModule, ButtonModule, IconModule, FormsModule],
                    exports: [ListDirective, ListItemDirective, ListActionDirective, ListCheckboxComponent]
                },] }
    ];
    return ListModule;
}());
export { ListModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvbGlzdC9saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDO0lBQUE7SUFLeUIsQ0FBQzs7Z0JBTHpCLFFBQVEsU0FBQztvQkFDTixZQUFZLEVBQUUsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUscUJBQXFCLENBQUM7b0JBQzVGLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQztvQkFDOUQsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLHFCQUFxQixDQUFDO2lCQUMxRjs7SUFDd0IsaUJBQUM7Q0FBQSxBQUwxQixJQUswQjtTQUFiLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IExpc3REaXJlY3RpdmUgfSBmcm9tICcuL2xpc3QuZGlyZWN0aXZlJztcbmltcG9ydCB7IExpc3RJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9saXN0LWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IExpc3RDaGVja2JveENvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1jaGVja2JveC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlzdEFjdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vbGlzdC1hY3Rpb24uZGlyZWN0aXZlJztcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbi9idXR0b24ubW9kdWxlJztcbmltcG9ydCB7IEljb25Nb2R1bGUgfSBmcm9tICcuLi9pY29uL2ljb24ubW9kdWxlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtMaXN0RGlyZWN0aXZlLCBMaXN0SXRlbURpcmVjdGl2ZSwgTGlzdEFjdGlvbkRpcmVjdGl2ZSwgTGlzdENoZWNrYm94Q29tcG9uZW50XSxcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBCdXR0b25Nb2R1bGUsIEljb25Nb2R1bGUsIEZvcm1zTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbTGlzdERpcmVjdGl2ZSwgTGlzdEl0ZW1EaXJlY3RpdmUsIExpc3RBY3Rpb25EaXJlY3RpdmUsIExpc3RDaGVja2JveENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTGlzdE1vZHVsZSB7fVxuIl19