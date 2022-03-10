import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ButtonModule } from '@fundamental-ngx/fn/button';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { MessageToastComponentExampleComponent } from './examples/default/message-toast-default-example.component';
import { MessageToastHeaderComponent } from './message-toast-header/message-toast-header.component';
import { MessageToastDocsComponent } from './message-toast-docs.component';
import { examples } from './examples';
import { MessageToastModule } from '@fundamental-ngx/fn/message-toast';

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
        ButtonModule,
        IconModule
    ],
    exports: [RouterModule],
    declarations: [
        examples,
        MessageToastDocsComponent,
        MessageToastHeaderComponent,
        MessageToastComponentExampleComponent
    ]
})
export class MessageToastDocsModule {}
