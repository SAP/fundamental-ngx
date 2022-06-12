import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { NotificationDocsHeaderComponent } from './notification-docs-header/notification-docs-header.component';
import { NotificationDocsComponent } from './notification-docs.component';
import { NotificationComponentAsContentExampleComponent } from './examples/component-as-content/notification-component-as-content-example.component';
import { NotificationExampleContentComponent } from './examples/component-as-content/notification-content.component';
import { NotificationOptionsExampleComponent } from './examples/notification-options/notification-options-example.component';
import { NotificationOpenTemplateExampleComponent } from './examples/template-as-content/notification-open-template-example.component';
import { NotificationGroupExampleComponent } from './examples/notification-group/notification-group-example.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { NotificationModule } from '@fundamental-ngx/core/notification';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { ListModule } from '@fundamental-ngx/core/list';
import { ActionSheetModule } from '@fundamental-ngx/core/action-sheet';
import { MessageToastModule } from '@fundamental-ngx/core/message-toast';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        NotificationModule,
        AvatarModule,
        MessageStripModule,
        TabsModule,
        ButtonModule,
        PopoverModule,
        MenuModule,
        ListModule,
        ActionSheetModule,
        MessageToastModule,
        ContentDensityModule
    ],
    exports: [RouterModule],
    declarations: [
        NotificationDocsComponent,
        NotificationExampleContentComponent,
        NotificationDocsHeaderComponent,
        NotificationOptionsExampleComponent,
        NotificationOpenTemplateExampleComponent,
        NotificationComponentAsContentExampleComponent,
        NotificationGroupExampleComponent
    ]
})
export class NotificationDocsModule {}
