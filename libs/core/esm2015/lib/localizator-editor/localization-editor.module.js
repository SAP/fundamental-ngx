/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationEditorComponent } from './localization-editor.component';
import { PopoverModule } from '../popover/popover.module';
import { FormModule } from '../form/form.module';
import { InputGroupModule } from '../input-group/input-group.module';
import { MenuModule } from '../menu/menu.module';
import { LocalizationEditorInputDirective, LocalizationEditorLabel, LocalizationEditorElement, LocalizationEditorLoadLabel, LocalizationEditorTextareaDirective } from './localization-editor.directives';
import { LocalizationEditorMainComponent } from './localization-editor-main/localization-editor-main.component';
import { LocalizationEditorItemComponent } from './localization-editor-item/localization-editor-item.component';
export class LocalizationEditorModule {
}
LocalizationEditorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    LocalizationEditorComponent,
                    LocalizationEditorMainComponent,
                    LocalizationEditorItemComponent,
                    LocalizationEditorInputDirective,
                    LocalizationEditorLabel,
                    LocalizationEditorLoadLabel,
                    LocalizationEditorTextareaDirective,
                    LocalizationEditorElement
                ],
                exports: [
                    LocalizationEditorComponent,
                    LocalizationEditorItemComponent,
                    LocalizationEditorMainComponent,
                    LocalizationEditorInputDirective,
                    LocalizationEditorLabel,
                    LocalizationEditorLoadLabel,
                    LocalizationEditorTextareaDirective,
                    LocalizationEditorElement
                ],
                imports: [CommonModule, PopoverModule, FormModule, InputGroupModule, MenuModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemF0aW9uLWVkaXRvci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvbG9jYWxpemF0b3ItZWRpdG9yL2xvY2FsaXphdGlvbi1lZGl0b3IubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0gsZ0NBQWdDLEVBQ2hDLHVCQUF1QixFQUN2Qix5QkFBeUIsRUFDekIsMkJBQTJCLEVBQzNCLG1DQUFtQyxFQUN0QyxNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQ2hILE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBeUJoSCxNQUFNLE9BQU8sd0JBQXdCOzs7WUF2QnBDLFFBQVEsU0FBQztnQkFDTixZQUFZLEVBQUU7b0JBQ1YsMkJBQTJCO29CQUMzQiwrQkFBK0I7b0JBQy9CLCtCQUErQjtvQkFDL0IsZ0NBQWdDO29CQUNoQyx1QkFBdUI7b0JBQ3ZCLDJCQUEyQjtvQkFDM0IsbUNBQW1DO29CQUNuQyx5QkFBeUI7aUJBQzVCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCwyQkFBMkI7b0JBQzNCLCtCQUErQjtvQkFDL0IsK0JBQStCO29CQUMvQixnQ0FBZ0M7b0JBQ2hDLHVCQUF1QjtvQkFDdkIsMkJBQTJCO29CQUMzQixtQ0FBbUM7b0JBQ25DLHlCQUF5QjtpQkFDNUI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDO2FBQ25GIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBMb2NhbGl6YXRpb25FZGl0b3JDb21wb25lbnQgfSBmcm9tICcuL2xvY2FsaXphdGlvbi1lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7IFBvcG92ZXJNb2R1bGUgfSBmcm9tICcuLi9wb3BvdmVyL3BvcG92ZXIubW9kdWxlJztcbmltcG9ydCB7IEZvcm1Nb2R1bGUgfSBmcm9tICcuLi9mb3JtL2Zvcm0ubW9kdWxlJztcbmltcG9ydCB7IElucHV0R3JvdXBNb2R1bGUgfSBmcm9tICcuLi9pbnB1dC1ncm91cC9pbnB1dC1ncm91cC5tb2R1bGUnO1xuaW1wb3J0IHsgTWVudU1vZHVsZSB9IGZyb20gJy4uL21lbnUvbWVudS5tb2R1bGUnO1xuaW1wb3J0IHtcbiAgICBMb2NhbGl6YXRpb25FZGl0b3JJbnB1dERpcmVjdGl2ZSxcbiAgICBMb2NhbGl6YXRpb25FZGl0b3JMYWJlbCxcbiAgICBMb2NhbGl6YXRpb25FZGl0b3JFbGVtZW50LFxuICAgIExvY2FsaXphdGlvbkVkaXRvckxvYWRMYWJlbCxcbiAgICBMb2NhbGl6YXRpb25FZGl0b3JUZXh0YXJlYURpcmVjdGl2ZVxufSBmcm9tICcuL2xvY2FsaXphdGlvbi1lZGl0b3IuZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBMb2NhbGl6YXRpb25FZGl0b3JNYWluQ29tcG9uZW50IH0gZnJvbSAnLi9sb2NhbGl6YXRpb24tZWRpdG9yLW1haW4vbG9jYWxpemF0aW9uLWVkaXRvci1tYWluLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2NhbGl6YXRpb25FZGl0b3JJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9sb2NhbGl6YXRpb24tZWRpdG9yLWl0ZW0vbG9jYWxpemF0aW9uLWVkaXRvci1pdGVtLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIExvY2FsaXphdGlvbkVkaXRvckNvbXBvbmVudCxcbiAgICAgICAgTG9jYWxpemF0aW9uRWRpdG9yTWFpbkNvbXBvbmVudCxcbiAgICAgICAgTG9jYWxpemF0aW9uRWRpdG9ySXRlbUNvbXBvbmVudCxcbiAgICAgICAgTG9jYWxpemF0aW9uRWRpdG9ySW5wdXREaXJlY3RpdmUsXG4gICAgICAgIExvY2FsaXphdGlvbkVkaXRvckxhYmVsLFxuICAgICAgICBMb2NhbGl6YXRpb25FZGl0b3JMb2FkTGFiZWwsXG4gICAgICAgIExvY2FsaXphdGlvbkVkaXRvclRleHRhcmVhRGlyZWN0aXZlLFxuICAgICAgICBMb2NhbGl6YXRpb25FZGl0b3JFbGVtZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIExvY2FsaXphdGlvbkVkaXRvckNvbXBvbmVudCxcbiAgICAgICAgTG9jYWxpemF0aW9uRWRpdG9ySXRlbUNvbXBvbmVudCxcbiAgICAgICAgTG9jYWxpemF0aW9uRWRpdG9yTWFpbkNvbXBvbmVudCxcbiAgICAgICAgTG9jYWxpemF0aW9uRWRpdG9ySW5wdXREaXJlY3RpdmUsXG4gICAgICAgIExvY2FsaXphdGlvbkVkaXRvckxhYmVsLFxuICAgICAgICBMb2NhbGl6YXRpb25FZGl0b3JMb2FkTGFiZWwsXG4gICAgICAgIExvY2FsaXphdGlvbkVkaXRvclRleHRhcmVhRGlyZWN0aXZlLFxuICAgICAgICBMb2NhbGl6YXRpb25FZGl0b3JFbGVtZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBQb3BvdmVyTW9kdWxlLCBGb3JtTW9kdWxlLCBJbnB1dEdyb3VwTW9kdWxlLCBNZW51TW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBMb2NhbGl6YXRpb25FZGl0b3JNb2R1bGUge31cbiJdfQ==