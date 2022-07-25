import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '@fundamental-ngx/fn/button';
import { SwitchModule } from '@fundamental-ngx/fn/switch';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { MessageStripHeaderComponent } from './message-strip-header/message-strip-header.component';
import { MessageStripDocsComponent } from './message-strip-docs.component';
import { examples } from './examples';
import { MessageStripModule } from '@fundamental-ngx/fn/message-strip';

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
        MessageStripModule,
        SwitchModule,
        ButtonModule
    ],
    exports: [RouterModule],
    declarations: [...examples, MessageStripDocsComponent, MessageStripHeaderComponent]
})
export class MessageStripDocsModule {}
