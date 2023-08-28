import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormModule } from '@fundamental-ngx/core/form';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import {
    TextareaExampleComponent,
    TextareaInlineHelpExampleComponent,
    TextareaStateExampleComponent
} from './examples/textarea-examples.component';
import { TextareaFormGroupExampleComponent } from './examples/textarea-form-group-example.component';
import { TextareaDocsComponent } from './textarea-docs.component';
import { TextareaHeaderComponent } from './textarea-header/textarea-header.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FormModule,
        InlineHelpModule,
        TextareaDocsComponent,
        TextareaHeaderComponent,
        TextareaExampleComponent,
        TextareaStateExampleComponent,
        TextareaFormGroupExampleComponent,
        TextareaInlineHelpExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('textarea')]
})
export class TextareaDocsModule {}
