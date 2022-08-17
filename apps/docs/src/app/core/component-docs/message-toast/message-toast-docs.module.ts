import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { MessageToastExampleComponent } from './examples/message-toast-example.component';
import { MessageToastDocsComponent } from './message-toast-docs.component';

import { MessageToastHeaderComponent } from './message-toast-header/message-toast-header.component';
import { MessageToastContentExampleComponent } from './examples/message-toast-content-example.component';

import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { MessageToastModule, MessageToastService } from '@fundamental-ngx/core/message-toast';

const routes: Routes = [
    {
        path: '',
        component: MessageToastHeaderComponent,
        children: [
            { path: '', component: MessageToastDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.messageToast } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, MessageToastModule],
    exports: [RouterModule],
    declarations: [
        MessageToastHeaderComponent,
        MessageToastDocsComponent,
        MessageToastContentExampleComponent,
        MessageToastExampleComponent
    ],
    providers: [MessageToastService]
})
export class MessageToastDocsModule {}
