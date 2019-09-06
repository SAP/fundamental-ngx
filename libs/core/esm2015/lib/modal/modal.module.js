/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { ModalComponent } from './modal.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalBodyComponent } from './modal-body/modal-body.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';
import { ModalService } from './modal-service/modal.service';
import { ModalBackdrop } from './modal-utils/modal-backdrop';
import { ModalContainer } from './modal-utils/modal-container';
import { ModalCloseButtonDirective, ModalTitleDirective } from './modal-utils/modal-directives';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
export class ModalModule {
}
ModalModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ModalComponent,
                    ModalHeaderComponent,
                    ModalBodyComponent,
                    ModalFooterComponent,
                    ModalBackdrop,
                    ModalContainer,
                    ModalCloseButtonDirective,
                    ModalTitleDirective
                ],
                imports: [
                    CommonModule,
                    ButtonModule,
                    IconModule
                ],
                exports: [
                    ModalHeaderComponent,
                    ModalBodyComponent,
                    ModalFooterComponent,
                    ModalBackdrop,
                    ModalContainer,
                    ModalCloseButtonDirective,
                    ModalTitleDirective
                ],
                entryComponents: [
                    ModalComponent,
                    ModalBackdrop,
                    ModalContainer
                ],
                providers: [ModalService, DynamicComponentService]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21vZGFsL21vZGFsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFFN0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHlCQUF5QixFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDaEcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFrQy9GLE1BQU0sT0FBTyxXQUFXOzs7WUFoQ3ZCLFFBQVEsU0FBQztnQkFDTixZQUFZLEVBQUU7b0JBQ1YsY0FBYztvQkFDZCxvQkFBb0I7b0JBQ3BCLGtCQUFrQjtvQkFDbEIsb0JBQW9CO29CQUNwQixhQUFhO29CQUNiLGNBQWM7b0JBQ2QseUJBQXlCO29CQUN6QixtQkFBbUI7aUJBQ3RCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFlBQVk7b0JBQ1osVUFBVTtpQkFDYjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsb0JBQW9CO29CQUNwQixrQkFBa0I7b0JBQ2xCLG9CQUFvQjtvQkFDcEIsYUFBYTtvQkFDYixjQUFjO29CQUNkLHlCQUF5QjtvQkFDekIsbUJBQW1CO2lCQUN0QjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2IsY0FBYztvQkFDZCxhQUFhO29CQUNiLGNBQWM7aUJBQ2pCO2dCQUNELFNBQVMsRUFBRSxDQUFDLFlBQVksRUFBRSx1QkFBdUIsQ0FBQzthQUNyRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uL2J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgSWNvbk1vZHVsZSB9IGZyb20gJy4uL2ljb24vaWNvbi5tb2R1bGUnO1xuXG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGFsSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1oZWFkZXIvbW9kYWwtaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RhbEJvZHlDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLWJvZHkvbW9kYWwtYm9keS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9kYWxGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLWZvb3Rlci9tb2RhbC1mb290ZXIuY29tcG9uZW50JztcblxuaW1wb3J0IHsgTW9kYWxTZXJ2aWNlIH0gZnJvbSAnLi9tb2RhbC1zZXJ2aWNlL21vZGFsLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kYWxCYWNrZHJvcCB9IGZyb20gJy4vbW9kYWwtdXRpbHMvbW9kYWwtYmFja2Ryb3AnO1xuaW1wb3J0IHsgTW9kYWxDb250YWluZXIgfSBmcm9tICcuL21vZGFsLXV0aWxzL21vZGFsLWNvbnRhaW5lcic7XG5pbXBvcnQgeyBNb2RhbENsb3NlQnV0dG9uRGlyZWN0aXZlLCBNb2RhbFRpdGxlRGlyZWN0aXZlIH0gZnJvbSAnLi9tb2RhbC11dGlscy9tb2RhbC1kaXJlY3RpdmVzJztcbmltcG9ydCB7IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vdXRpbHMvZHluYW1pYy1jb21wb25lbnQvZHluYW1pYy1jb21wb25lbnQuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE1vZGFsQ29tcG9uZW50LFxuICAgICAgICBNb2RhbEhlYWRlckNvbXBvbmVudCxcbiAgICAgICAgTW9kYWxCb2R5Q29tcG9uZW50LFxuICAgICAgICBNb2RhbEZvb3RlckNvbXBvbmVudCxcbiAgICAgICAgTW9kYWxCYWNrZHJvcCxcbiAgICAgICAgTW9kYWxDb250YWluZXIsXG4gICAgICAgIE1vZGFsQ2xvc2VCdXR0b25EaXJlY3RpdmUsXG4gICAgICAgIE1vZGFsVGl0bGVEaXJlY3RpdmVcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBCdXR0b25Nb2R1bGUsXG4gICAgICAgIEljb25Nb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTW9kYWxIZWFkZXJDb21wb25lbnQsXG4gICAgICAgIE1vZGFsQm9keUNvbXBvbmVudCxcbiAgICAgICAgTW9kYWxGb290ZXJDb21wb25lbnQsXG4gICAgICAgIE1vZGFsQmFja2Ryb3AsXG4gICAgICAgIE1vZGFsQ29udGFpbmVyLFxuICAgICAgICBNb2RhbENsb3NlQnV0dG9uRGlyZWN0aXZlLFxuICAgICAgICBNb2RhbFRpdGxlRGlyZWN0aXZlXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgTW9kYWxDb21wb25lbnQsXG4gICAgICAgIE1vZGFsQmFja2Ryb3AsXG4gICAgICAgIE1vZGFsQ29udGFpbmVyXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtNb2RhbFNlcnZpY2UsIER5bmFtaWNDb21wb25lbnRTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbE1vZHVsZSB7fVxuIl19