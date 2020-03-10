import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { MessageStripDocsComponent } from './message-strip-docs.component';
import { MessageStripExampleComponent } from './examples/message-strip-example.component';
import { MessageStripNoIconExampleComponent } from './examples/message-strip-noicon-example.component';
import { MessageStripWidthExampleComponent } from './examples/message-strip-width-example.component';
import { MessageStripHeaderComponent } from './message-strip-header/message-strip-header.component';
import { MessageStripModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: MessageStripHeaderComponent,
        children: [
            { path: '', component: MessageStripDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.messageStrip } }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        MessageStripModule
    ],
    exports: [RouterModule],
    declarations: [
        MessageStripHeaderComponent,
        MessageStripDocsComponent,
        MessageStripExampleComponent,
        MessageStripNoIconExampleComponent,
        MessageStripWidthExampleComponent
    ]
})
export class MessageStripDocsModule {
}
