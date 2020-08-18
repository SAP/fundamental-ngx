import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { InlineHelpHeaderComponent } from './inline-help-header/inline-help-header.component';
import { InlineHelpDocsComponent } from './inline-help-docs.component';
import {
    InlineHelpExampleComponent,
    InlineHelpStyledExampleComponent,
    InlineHelpTriggerExampleComponent
} from './examples/inline-help-examples.component';
import { FormModule, InlineHelpModule } from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, FormModule, InlineHelpModule],
    exports: [RouterModule],
    declarations: [
        InlineHelpDocsComponent,
        InlineHelpHeaderComponent,
        InlineHelpExampleComponent,
        InlineHelpStyledExampleComponent,
        InlineHelpTriggerExampleComponent
    ]
})
export class InlineHelpDocsModule {}
