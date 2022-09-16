import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { MessageToastExampleComponent } from './examples/message-toast-example.component';
import { MessageToastDocsComponent } from './message-toast-docs.component';

import { MessageToastHeaderComponent } from './message-toast-header/message-toast-header.component';
import { MessageToastContentExampleComponent } from './examples/message-toast-content-example.component';
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
    providers: [MessageToastService, currentComponentProvider('message-toast')]
})
export class MessageToastDocsModule {}
