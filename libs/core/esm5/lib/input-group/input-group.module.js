/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputGroupComponent } from './input-group.component';
import { InputGroupNumberComponent } from './input-group-number.component';
import { InputGroupSearchComponent } from './input-group-search.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
var InputGroupModule = /** @class */ (function () {
    function InputGroupModule() {
    }
    InputGroupModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [InputGroupSearchComponent, InputGroupNumberComponent, InputGroupComponent],
                    imports: [CommonModule, ButtonModule, IconModule, FormsModule],
                    exports: [InputGroupSearchComponent, InputGroupNumberComponent, InputGroupComponent]
                },] }
    ];
    return InputGroupModule;
}());
export { InputGroupModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZ3JvdXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2lucHV0LWdyb3VwL2lucHV0LWdyb3VwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFakQ7SUFBQTtJQUsrQixDQUFDOztnQkFML0IsUUFBUSxTQUFDO29CQUNOLFlBQVksRUFBRSxDQUFDLHlCQUF5QixFQUFFLHlCQUF5QixFQUFFLG1CQUFtQixDQUFDO29CQUN6RixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUM7b0JBQzlELE9BQU8sRUFBRSxDQUFDLHlCQUF5QixFQUFFLHlCQUF5QixFQUFFLG1CQUFtQixDQUFDO2lCQUN2Rjs7SUFDOEIsdUJBQUM7Q0FBQSxBQUxoQyxJQUtnQztTQUFuQixnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBJbnB1dEdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9pbnB1dC1ncm91cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW5wdXRHcm91cE51bWJlckNvbXBvbmVudCB9IGZyb20gJy4vaW5wdXQtZ3JvdXAtbnVtYmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbnB1dEdyb3VwU2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi9pbnB1dC1ncm91cC1zZWFyY2guY29tcG9uZW50JztcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbi9idXR0b24ubW9kdWxlJztcbmltcG9ydCB7IEljb25Nb2R1bGUgfSBmcm9tICcuLi9pY29uL2ljb24ubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtJbnB1dEdyb3VwU2VhcmNoQ29tcG9uZW50LCBJbnB1dEdyb3VwTnVtYmVyQ29tcG9uZW50LCBJbnB1dEdyb3VwQ29tcG9uZW50XSxcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBCdXR0b25Nb2R1bGUsIEljb25Nb2R1bGUsIEZvcm1zTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbSW5wdXRHcm91cFNlYXJjaENvbXBvbmVudCwgSW5wdXRHcm91cE51bWJlckNvbXBvbmVudCwgSW5wdXRHcm91cENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRHcm91cE1vZHVsZSB7fVxuIl19