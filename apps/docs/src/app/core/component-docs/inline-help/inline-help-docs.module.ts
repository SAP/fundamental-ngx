import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { InlineHelpHeaderComponent } from './inline-help-header/inline-help-header.component';
import { InlineHelpDocsComponent } from './inline-help-docs.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { InlineHelpExampleComponent } from './examples/inline-help-example.component';
import { InlineHelpStyledExampleComponent } from './examples/inline-help-styled-example.component';
import { InlineHelpTriggerExampleComponent } from './examples/inline-help-trigger-example.component';
import { InlineHelpTemplateExampleComponent } from './examples/inline-help-template-example/inline-help-template-example.component';
import { FormModule } from '@fundamental-ngx/core/form';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';

const routes: Routes = [
    {
        path: '',
        component: InlineHelpHeaderComponent,
        children: [
            { path: '', component: InlineHelpDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.inlineHelp } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, FormModule, InlineHelpModule, ObjectStatusModule],
    exports: [RouterModule],
    declarations: [
        InlineHelpDocsComponent,
        InlineHelpHeaderComponent,
        InlineHelpExampleComponent,
        InlineHelpStyledExampleComponent,
        InlineHelpTriggerExampleComponent,
        InlineHelpTemplateExampleComponent
    ]
})
export class InlineHelpDocsModule {}
