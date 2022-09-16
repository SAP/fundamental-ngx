import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';

import { FeedListItemHeaderComponent } from './feed-list-item-header/feed-list-item-header.component';
import { FeedListItemDocsComponent } from './feed-list-item-docs.component';

import { examples } from './examples';
import { FeedListItemModule } from '@fundamental-ngx/core/feed-list-item';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { ActionSheetModule } from '@fundamental-ngx/core/action-sheet';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';

const routes: Routes = [
    {
        path: '',
        component: FeedListItemHeaderComponent,
        children: [
            { path: '', component: FeedListItemDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.feedListItem } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FeedListItemModule,
        MenuModule,
        ActionSheetModule,
        AvatarModule,
        ToolbarModule
    ],
    exports: [RouterModule],
    declarations: [FeedListItemHeaderComponent, FeedListItemDocsComponent, ...examples],
    providers: [currentComponentProvider('feed-list-item')]
})
export class FeedListItemDocsModule {}
