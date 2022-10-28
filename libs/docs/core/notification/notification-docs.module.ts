import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { NotificationDocsHeaderComponent } from './notification-docs-header/notification-docs-header.component';
import { NotificationDocsComponent } from './notification-docs.component';
import { NotificationComponentAsContentExampleComponent } from './examples/component-as-content/notification-component-as-content-example.component';
import { NotificationExampleContentComponent } from './examples/component-as-content/notification-content.component';
import { NotificationOptionsExampleComponent } from './examples/notification-options/notification-options-example.component';
import { NotificationOpenTemplateExampleComponent } from './examples/template-as-content/notification-open-template-example.component';
import { NotificationGroupExampleComponent } from './examples/notification-group/notification-group-example.component';
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
import { NotificationMobileExampleComponent } from './examples/notification-mobile/notification-mobile-example.component';

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
        PopoverModule
    ],
    exports: [RouterModule],
    declarations: [
        NotificationDocsComponent,
        NotificationExampleContentComponent,
        NotificationDocsHeaderComponent,
        NotificationOptionsExampleComponent,
        NotificationOpenTemplateExampleComponent,
        NotificationComponentAsContentExampleComponent,
        NotificationGroupExampleComponent,
        NotificationMobileExampleComponent
    ],
    providers: [currentComponentProvider('notification')]
})
export class NotificationDocsModule {}
