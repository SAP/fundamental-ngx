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
var ModalModule = /** @class */ (function () {
    function ModalModule() {
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
    return ModalModule;
}());
export { ModalModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21vZGFsL21vZGFsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFFN0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHlCQUF5QixFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDaEcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFFL0Y7SUFBQTtJQWdDMEIsQ0FBQzs7Z0JBaEMxQixRQUFRLFNBQUM7b0JBQ04sWUFBWSxFQUFFO3dCQUNWLGNBQWM7d0JBQ2Qsb0JBQW9CO3dCQUNwQixrQkFBa0I7d0JBQ2xCLG9CQUFvQjt3QkFDcEIsYUFBYTt3QkFDYixjQUFjO3dCQUNkLHlCQUF5Qjt3QkFDekIsbUJBQW1CO3FCQUN0QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixZQUFZO3dCQUNaLFVBQVU7cUJBQ2I7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLG9CQUFvQjt3QkFDcEIsa0JBQWtCO3dCQUNsQixvQkFBb0I7d0JBQ3BCLGFBQWE7d0JBQ2IsY0FBYzt3QkFDZCx5QkFBeUI7d0JBQ3pCLG1CQUFtQjtxQkFDdEI7b0JBQ0QsZUFBZSxFQUFFO3dCQUNiLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixjQUFjO3FCQUNqQjtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxZQUFZLEVBQUUsdUJBQXVCLENBQUM7aUJBQ3JEOztJQUN5QixrQkFBQztDQUFBLEFBaEMzQixJQWdDMkI7U0FBZCxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBCdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24vYnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBJY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbi9pY29uLm1vZHVsZSc7XG5cbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9kYWxIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLWhlYWRlci9tb2RhbC1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGFsQm9keUNvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwtYm9keS9tb2RhbC1ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RhbEZvb3RlckNvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwtZm9vdGVyL21vZGFsLWZvb3Rlci5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBNb2RhbFNlcnZpY2UgfSBmcm9tICcuL21vZGFsLXNlcnZpY2UvbW9kYWwuc2VydmljZSc7XG5pbXBvcnQgeyBNb2RhbEJhY2tkcm9wIH0gZnJvbSAnLi9tb2RhbC11dGlscy9tb2RhbC1iYWNrZHJvcCc7XG5pbXBvcnQgeyBNb2RhbENvbnRhaW5lciB9IGZyb20gJy4vbW9kYWwtdXRpbHMvbW9kYWwtY29udGFpbmVyJztcbmltcG9ydCB7IE1vZGFsQ2xvc2VCdXR0b25EaXJlY3RpdmUsIE1vZGFsVGl0bGVEaXJlY3RpdmUgfSBmcm9tICcuL21vZGFsLXV0aWxzL21vZGFsLWRpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgRHluYW1pY0NvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi91dGlscy9keW5hbWljLWNvbXBvbmVudC9keW5hbWljLWNvbXBvbmVudC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTW9kYWxDb21wb25lbnQsXG4gICAgICAgIE1vZGFsSGVhZGVyQ29tcG9uZW50LFxuICAgICAgICBNb2RhbEJvZHlDb21wb25lbnQsXG4gICAgICAgIE1vZGFsRm9vdGVyQ29tcG9uZW50LFxuICAgICAgICBNb2RhbEJhY2tkcm9wLFxuICAgICAgICBNb2RhbENvbnRhaW5lcixcbiAgICAgICAgTW9kYWxDbG9zZUJ1dHRvbkRpcmVjdGl2ZSxcbiAgICAgICAgTW9kYWxUaXRsZURpcmVjdGl2ZVxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgSWNvbk1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNb2RhbEhlYWRlckNvbXBvbmVudCxcbiAgICAgICAgTW9kYWxCb2R5Q29tcG9uZW50LFxuICAgICAgICBNb2RhbEZvb3RlckNvbXBvbmVudCxcbiAgICAgICAgTW9kYWxCYWNrZHJvcCxcbiAgICAgICAgTW9kYWxDb250YWluZXIsXG4gICAgICAgIE1vZGFsQ2xvc2VCdXR0b25EaXJlY3RpdmUsXG4gICAgICAgIE1vZGFsVGl0bGVEaXJlY3RpdmVcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBNb2RhbENvbXBvbmVudCxcbiAgICAgICAgTW9kYWxCYWNrZHJvcCxcbiAgICAgICAgTW9kYWxDb250YWluZXJcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW01vZGFsU2VydmljZSwgRHluYW1pY0NvbXBvbmVudFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsTW9kdWxlIHt9XG4iXX0=