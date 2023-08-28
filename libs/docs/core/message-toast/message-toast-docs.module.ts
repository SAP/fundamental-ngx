import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { MessageToastExampleComponent } from './examples/message-toast-example.component';
import { MessageToastDocsComponent } from './message-toast-docs.component';

import { MessageToastModule, MessageToastService } from '@fundamental-ngx/core/message-toast';
import { MessageToastContentExampleComponent } from './examples/message-toast-content-example.component';
import { MessageToastPositionExampleComponent } from './examples/message-toast-position-example.component';
import { MessageToastHeaderComponent } from './message-toast-header/message-toast-header.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        MessageToastModule,
        MessageToastHeaderComponent,
        MessageToastDocsComponent,
        MessageToastContentExampleComponent,
        MessageToastExampleComponent,
        MessageToastPositionExampleComponent
    ],
    exports: [RouterModule],
    providers: [MessageToastService, currentComponentProvider('message-toast')]
})
export class MessageToastDocsModule {}
