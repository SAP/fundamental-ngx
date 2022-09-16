import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { examples } from './examples';
import { MessageBoxDocsComponent } from './message-box-docs.component';
import { MessageBoxDocsHeaderComponent } from './message-box-docs-header/message-box-docs-header.component';
import { MessageBoxModule } from '@fundamental-ngx/core/message-box';
import { BarModule } from '@fundamental-ngx/core/bar';

const routes: Routes = [
    {
        path: '',
        component: MessageBoxDocsHeaderComponent,
        children: [
            { path: '', component: MessageBoxDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.messageBox } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, MessageBoxModule, BarModule],
    exports: [RouterModule],
    declarations: [examples, MessageBoxDocsComponent, MessageBoxDocsHeaderComponent],
    providers: [currentComponentProvider('message-box')]
})
export class MessageBoxDocsModule {}
