import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
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
import { moduleDeprecationsProvider } from '@fundamental-ngx/cdk/utils';

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
    providers: [
        moduleDeprecationsProvider(DeprecatedFormControlContentDensityDirective),
        currentComponentProvider('textarea')
    ]
})
export class TextareaDocsModule {}
