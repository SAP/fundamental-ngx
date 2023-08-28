import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { IllustratedMessageDocsComponent } from './illustrated-message-docs.component';
import { IllustratedMessageHeaderComponent } from './illustrated-message-header/illustrated-message-header.component';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { CardModule } from '@fundamental-ngx/core/card';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { IllustratedMessageModule } from '@fundamental-ngx/core/illustrated-message';
import { IllustratedMessageDialogExampleComponent } from './examples/illustrated-message-dialog-example.component';
import { IllustratedMessageDotExampleComponent } from './examples/illustrated-message-dot-example.component';
import { IllustratedMessageExampleComponent } from './examples/illustrated-message-example.component';
import { IllustratedMessageInlineExampleComponent } from './examples/illustrated-message-inline-example.component';
import { IllustratedMessageSpotExampleComponent } from './examples/illustrated-message-spot-example.component';

const routes: Routes = [
    {
        path: '',
        component: IllustratedMessageHeaderComponent,
        children: [
            { path: '', component: IllustratedMessageDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.illustratedMessage } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        IllustratedMessageModule,
        ButtonModule,
        DialogModule,
        CardModule,
        IllustratedMessageDocsComponent,
        IllustratedMessageHeaderComponent,
        IllustratedMessageExampleComponent,
        IllustratedMessageDialogExampleComponent,
        IllustratedMessageSpotExampleComponent,
        IllustratedMessageDotExampleComponent,
        IllustratedMessageInlineExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('illustrated-message')]
})
export class IllustratedMessageDocsModule {}
