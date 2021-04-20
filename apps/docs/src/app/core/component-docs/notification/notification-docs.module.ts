import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { NotificationDocsHeaderComponent } from './notification-docs-header/notification-docs-header.component';
import { NotificationDocsComponent } from './notification-docs.component';
import { NotificationComponentAsContentExampleComponent } from './examples/component-as-content/notification-component-as-content-example.component';
import { NotificationContentComponent } from './examples/component-as-content/notification-content.component';
import { NotificationOptionsExampleComponent } from './examples/notification-options/notification-options-example.component';
import { NotificationOpenTemplateExampleComponent } from './examples/template-as-content/notification-open-template-example.component';
import { AvatarModule, NotificationModule, NotificationService, MessageStripModule} from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

const routes: Routes = [
    {
        path: '',
        component: NotificationDocsHeaderComponent,
        children: [
            { path: '', component: NotificationDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.notification } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, NotificationModule, AvatarModule, MessageStripModule],
    exports: [RouterModule],
    declarations: [
        NotificationDocsComponent,
        NotificationContentComponent,
        NotificationDocsHeaderComponent,
        NotificationOptionsExampleComponent,
        NotificationOpenTemplateExampleComponent,
        NotificationComponentAsContentExampleComponent
    ],
    entryComponents: [NotificationContentComponent],
    providers: [NotificationService]
})
export class NotificationDocsModule {}
