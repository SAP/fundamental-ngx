import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { IllustratedMessageHeaderComponent } from './illustrated-message-header/illustrated-message-header.component';
import { IllustratedMessageDocsComponent } from './illustrated-message-docs.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { IllustratedMessageExampleComponent } from './examples/illustrated-message-example.component';
import { IllustratedMessageDialogExampleComponent } from './examples/illustrated-message-dialog-example.component';
import { IllustratedMessageSpotExampleComponent } from './examples/illustrated-message-spot-example.component';
import { IllustratedMessageModule } from '@fundamental-ngx/core/illustrated-message';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { CardModule } from '@fundamental-ngx/core/card';
import { IllustratedMessageInlineExampleComponent } from './examples/illustrated-message-inline-example.component';

const routes: Routes = [
    {
        path: '',
        component: IllustratedMessageHeaderComponent,
        children: [
            { path: '', component: IllustratedMessageDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.illustratedMessage } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        IllustratedMessageModule,
        ButtonModule,
        DialogModule,
        CardModule
    ],
    exports: [RouterModule],
    declarations: [
        IllustratedMessageDocsComponent,
        IllustratedMessageHeaderComponent,
        IllustratedMessageExampleComponent,
        IllustratedMessageDialogExampleComponent,
        IllustratedMessageSpotExampleComponent,
        IllustratedMessageInlineExampleComponent
    ]
})
export class IllustratedMessageDocsModule {}
