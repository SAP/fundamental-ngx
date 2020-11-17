import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageBoxModule } from '@fundamental-ngx/core';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { entryComponents, examples } from './examples';
import { MessageBoxDocsComponent } from './message-box-docs.component';
import { MessageBoxDocsHeaderComponent } from './message-box-docs-header/message-box-docs-header.component';

const routes: Routes = [
    {
        path: '',
        component: MessageBoxDocsComponent,
        children: [
            { path: '', component: MessageBoxDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.messageBox } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        MessageBoxModule
    ],
    exports: [RouterModule],
    declarations: [
        examples,
        MessageBoxDocsComponent,
        MessageBoxDocsHeaderComponent
    ],
    entryComponents: [entryComponents]
})
export class MessageBoxDocsModule {
}
