import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { ActionListItemModule, PlatformListModule } from '@fundamental-ngx/platform/list';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { PlatformActionListItemBorderLessExampleComponent } from './examples/platform-action-list-item-border-less-example.component';
import { PlatformActionListItemExampleComponent } from './examples/platform-action-list-item-example.component';
import { PlatformActionListItemDocsComponent } from './platform-action-list-item-docs.component';
import { PlatformActionListItemHeaderComponent } from './platform-action-list-item-header/platform-action-list-item-header.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformActionListItemHeaderComponent,
        children: [
            { path: '', component: PlatformActionListItemDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.actionlistitem } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ToolbarModule,
        PlatformListModule,
        PlatformButtonModule,
        ActionListItemModule,
        PlatformActionListItemDocsComponent,
        PlatformActionListItemHeaderComponent,
        PlatformActionListItemExampleComponent,
        PlatformActionListItemBorderLessExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('action-list-item')]
})
export class PlatformActionListItemDocsModule {}
