import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';

import { MessagePageDocsComponent } from './message-page-docs.component';
import { MessagePageHeaderComponent } from './message-page-header/message-page-header.component';
import {
    MessagePageActionsExampleComponent,
    MessagePageCustomIconExampleComponent,
    MessagePageErrorExampleComponent,
    MessagePageFilterExampleComponent,
    MessagePageNoIconExampleComponent,
    MessagePageNoItemsExampleComponent,
    MessagePageSearchExampleComponent
} from './examples/message-page-examples.component';
import { MessagePageModule } from '@fundamental-ngx/core/message-page';
import { LinkModule } from '@fundamental-ngx/core/link';

const routes: Routes = [
    {
        path: '',
        component: MessagePageHeaderComponent,
        children: [
            { path: '', component: MessagePageDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.messagePage } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, MessagePageModule, LinkModule],
    exports: [RouterModule],
    declarations: [
        MessagePageHeaderComponent,
        MessagePageDocsComponent,
        MessagePageFilterExampleComponent,
        MessagePageSearchExampleComponent,
        MessagePageNoItemsExampleComponent,
        MessagePageErrorExampleComponent,
        MessagePageActionsExampleComponent,
        MessagePageCustomIconExampleComponent,
        MessagePageNoIconExampleComponent
    ],
    providers: [currentComponentProvider('message-page')]
})
export class MessagePageDocsModule {}
