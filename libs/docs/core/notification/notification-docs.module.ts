import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionSheetModule } from '@fundamental-ngx/core/action-sheet';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ListModule } from '@fundamental-ngx/core/list';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';
import { MessageToastModule } from '@fundamental-ngx/core/message-toast';
import { NotificationModule } from '@fundamental-ngx/core/notification';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { NotificationComponentAsContentExampleComponent } from './examples/component-as-content/notification-component-as-content-example.component';
import { NotificationExampleContentComponent } from './examples/component-as-content/notification-content.component';
import { NotificationGroupExampleComponent } from './examples/notification-group/notification-group-example.component';
import { NotificationMobileExampleComponent } from './examples/notification-mobile/notification-mobile-example.component';
import { NotificationOptionsExampleComponent } from './examples/notification-options/notification-options-example.component';
import { NotificationOpenTemplateExampleComponent } from './examples/template-as-content/notification-open-template-example.component';
import { NotificationDocsHeaderComponent } from './notification-docs-header/notification-docs-header.component';
import { NotificationDocsComponent } from './notification-docs.component';

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
        PopoverModule,
        NotificationDocsComponent,
        NotificationExampleContentComponent,
        NotificationDocsHeaderComponent,
        NotificationOptionsExampleComponent,
        NotificationOpenTemplateExampleComponent,
        NotificationComponentAsContentExampleComponent,
        NotificationGroupExampleComponent,
        NotificationMobileExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('notification')]
})
export class NotificationDocsModule {}
