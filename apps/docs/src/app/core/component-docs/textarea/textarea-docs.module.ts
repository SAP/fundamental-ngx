import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { TextareaHeaderComponent } from './textarea-header/textarea-header.component';
import { TextareaDocsComponent } from './textarea-docs.component';
import {
    TextareaExampleComponent,
    TextareaInlineHelpExampleComponent,
    TextareaStateExampleComponent
} from './examples/textarea-examples.component';
import { TextareaFormGroupExampleComponent } from './examples/textarea-form-group-example.component';
import { DeprecatedFormControlContentDensityDirective, FormModule } from '@fundamental-ngx/core/form';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { moduleDeprecationsProvider } from '@fundamental-ngx/core/utils';

const routes: Routes = [
    {
        path: '',
        component: TextareaHeaderComponent,
        children: [
            { path: '', component: TextareaDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.form } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, FormModule, InlineHelpModule],
    exports: [RouterModule],
    declarations: [
        TextareaDocsComponent,
        TextareaHeaderComponent,
        TextareaExampleComponent,
        TextareaStateExampleComponent,
        TextareaFormGroupExampleComponent,
        TextareaInlineHelpExampleComponent
    ],
    providers: [moduleDeprecationsProvider(DeprecatedFormControlContentDensityDirective)]
})
export class TextareaDocsModule {}
