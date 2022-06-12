import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { FeedListItemHeaderComponent } from './feed-list-item-header/feed-list-item-header.component';
import { FeedListItemDocsComponent } from './feed-list-item-docs.component';

import { examples } from './examples';
import { FeedListItemModule } from '@fundamental-ngx/core/feed-list-item';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { ActionSheetModule } from '@fundamental-ngx/core/action-sheet';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

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
        ContentDensityModule
    ],
    exports: [RouterModule],
    declarations: [FeedListItemHeaderComponent, FeedListItemDocsComponent, ...examples]
})
export class FeedListItemDocsModule {}
