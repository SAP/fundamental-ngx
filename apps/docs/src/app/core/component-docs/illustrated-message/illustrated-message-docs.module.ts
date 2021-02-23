import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { IllustratedMessageHeaderComponent } from './illustrated-message-header/illustrated-message-header.component';
import { IllustratedMessageDocsComponent } from './illustrated-message-docs.component';
import { IllustratedMessageExampleComponent } from './examples/illustrated-message-example.component';
import { IllustratedMessageModule, ButtonModule, AvatarModule } from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, IllustratedMessageModule, ButtonModule, AvatarModule],
    exports: [RouterModule],
    declarations: [IllustratedMessageDocsComponent, IllustratedMessageHeaderComponent, IllustratedMessageExampleComponent]
})
export class IllustratedMessageDocsModule {}
