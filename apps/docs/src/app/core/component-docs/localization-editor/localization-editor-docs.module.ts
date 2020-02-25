import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {API_FILES} from '../../api-files';
import {LocalizationEditorHeaderComponent} from './localization-editor-header/localization-editor-header.component';
import {LocalizationEditorDocsComponent} from './localization-editor-docs.component';
import {LocalizationEditorExampleComponent} from './examples/localization-editor-example.component';
import {LocalizationEditorFormsExampleComponent} from './examples/localization-editor-forms-example.component';
import {LocalizationEditorTextareaExampleComponent} from './examples/localization-editor-textarea-example.component';
import {LocalizationEditorTemplateExampleComponent} from './examples/localization-editor-template-example.component';
import { LocalizationEditorModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: LocalizationEditorHeaderComponent,
        children: [
            {path: '', component: LocalizationEditorDocsComponent},
            {path: 'api', component: ApiComponent, data: {content: API_FILES.localizationEditor}}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        LocalizationEditorModule
    ],
    exports: [RouterModule],
    declarations: [
        LocalizationEditorDocsComponent,
        LocalizationEditorHeaderComponent,
        LocalizationEditorExampleComponent,
        LocalizationEditorFormsExampleComponent,
        LocalizationEditorTextareaExampleComponent,
        LocalizationEditorTemplateExampleComponent
    ]
})
export class LocalizationEditorDocsModule {
}
