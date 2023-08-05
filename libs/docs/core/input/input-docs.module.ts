import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { InputHeaderComponent } from './input-header/input-header.component';
import { InputDocsComponent } from './input-docs.component';
import { InputFormGroupExampleComponent } from './examples/input-form-group-example.component';
import {
    InputExampleComponent,
    InputInlineHelpExampleComponent,
    InputStateExampleComponent
} from './examples/input-examples.component';
import { FormModule } from '@fundamental-ngx/core/form';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';

const routes: Routes = [
    {
        path: '',
        component: InputHeaderComponent,
        children: [
            { path: '', component: InputDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.inputGroup } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, FormModule, InlineHelpModule],
    exports: [RouterModule],
    declarations: [
        InputDocsComponent,
        InputHeaderComponent,
        InputExampleComponent,
        InputStateExampleComponent,
        InputFormGroupExampleComponent,
        InputInlineHelpExampleComponent
    ],
    providers: [currentComponentProvider('input')]
})
export class InputDocsModule {}
