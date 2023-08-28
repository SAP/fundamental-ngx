import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';

import { FeedListItemDocsComponent } from './feed-list-item-docs.component';
import { FeedListItemHeaderComponent } from './feed-list-item-header/feed-list-item-header.component';

import { ActionSheetModule } from '@fundamental-ngx/core/action-sheet';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { FeedListItemModule } from '@fundamental-ngx/core/feed-list-item';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { FdPatchLanguageDirective } from '@fundamental-ngx/i18n';
import { examples } from './examples';

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
        ToolbarModule,
        FdPatchLanguageDirective,
        FeedListItemHeaderComponent,
        FeedListItemDocsComponent,
        ...examples
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('feed-list-item')]
})
export class FeedListItemDocsModule {}
