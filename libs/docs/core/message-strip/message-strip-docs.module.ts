import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { MessageStripAlertExampleComponent } from './examples/message-strip-alert-example.component';
import { MessageStripAutoDismissExampleComponent } from './examples/message-strip-auto-dismiss-example.component';
import { MessageStripCustomIconExampleComponent } from './examples/message-strip-custom-icon-example.component';
import { MessageStripExampleComponent } from './examples/message-strip-example.component';
import { MessageStripIndicationColorsExampleComponent } from './examples/message-strip-indication-colors-example.component';
import { MessageStripNoIconExampleComponent } from './examples/message-strip-noicon-example.component';
import { MessageStripWidthExampleComponent } from './examples/message-strip-width-example.component';
import { MessageStripDocsComponent } from './message-strip-docs.component';
import { MessageStripHeaderComponent } from './message-strip-header/message-strip-header.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        MessageStripHeaderComponent,
        MessageStripDocsComponent,
        MessageStripExampleComponent,
        MessageStripNoIconExampleComponent,
        MessageStripWidthExampleComponent,
        MessageStripAlertExampleComponent,
        MessageStripIndicationColorsExampleComponent,
        MessageStripCustomIconExampleComponent,
        MessageStripAlertExampleComponent,
        MessageStripAutoDismissExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('message-strip')]
})
export class MessageStripDocsModule {}
