import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '@fundamental-ngx/fn/button';
import { SwitchModule } from '@fundamental-ngx/fn/switch';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/fn/shared';
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
    declarations: [...examples, MessageStripDocsComponent, MessageStripHeaderComponent],
    providers: [currentComponentProvider('message-strip')]
})
export class MessageStripDocsModule {}
