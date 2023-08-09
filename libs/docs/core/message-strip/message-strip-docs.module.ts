import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { MessageStripDocsComponent } from './message-strip-docs.component';
import { MessageStripExampleComponent } from './examples/message-strip-example.component';
import { MessageStripNoIconExampleComponent } from './examples/message-strip-noicon-example.component';
import { MessageStripWidthExampleComponent } from './examples/message-strip-width-example.component';
import { MessageStripHeaderComponent } from './message-strip-header/message-strip-header.component';
import { MessageStripAlertExampleComponent } from './examples/message-strip-alert-example.component';
import { MessageStripAutoDismissExampleComponent } from './examples/message-strip-auto-dismiss-example.component';

const routes: Routes = [
    {
        path: '',
        component: MessageStripHeaderComponent,
        children: [
            { path: '', component: MessageStripDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.messageStrip } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule],
    exports: [RouterModule],
    declarations: [
        MessageStripHeaderComponent,
        MessageStripDocsComponent,
        MessageStripExampleComponent,
        MessageStripNoIconExampleComponent,
        MessageStripWidthExampleComponent,
        MessageStripAlertExampleComponent,
        MessageStripAutoDismissExampleComponent
    ],
    providers: [currentComponentProvider('message-strip')]
})
export class MessageStripDocsModule {}
