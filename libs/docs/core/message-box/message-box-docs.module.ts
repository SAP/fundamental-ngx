import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarModule } from '@fundamental-ngx/core/bar';
import { MessageBoxModule } from '@fundamental-ngx/core/message-box';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { examples } from './examples';
import { MessageBoxDocsHeaderComponent } from './message-box-docs-header/message-box-docs-header.component';
import { MessageBoxDocsComponent } from './message-box-docs.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        MessageBoxModule,
        BarModule,
        examples,
        MessageBoxDocsComponent,
        MessageBoxDocsHeaderComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('message-box')]
})
export class MessageBoxDocsModule {}
