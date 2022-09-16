import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconModule } from '@fundamental-ngx/core/icon';
import { RadioButtonModule } from '@fundamental-ngx/fn/radio';
import { AvatarModule } from '@fundamental-ngx/fn/avatar';
import { ButtonModule } from '@fundamental-ngx/fn/button';
import { NotificationModule } from '@fundamental-ngx/fn/notification';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/fn/shared';
import { NotificationHeaderComponent } from './notification-header/notification-header.component';
import { NotificationDocsComponent } from './notification-docs.component';
import { examples } from './examples';

const routes: Routes = [
    {
        path: '',
        component: NotificationHeaderComponent,
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
        ButtonModule,
        AvatarModule,
        IconModule,
        RadioButtonModule
    ],
    exports: [RouterModule],
    declarations: [examples, NotificationDocsComponent, NotificationHeaderComponent],
    providers: [currentComponentProvider('notification')]
})
export class NotificationDocsModule {}
