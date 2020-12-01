import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { FeedListItemHeaderComponent } from './feed-list-item-header/feed-list-item-header.component';
import { FeedListItemDocsComponent } from './feed-list-item-docs.component';

import { examples } from './examples';

import { FeedListItemModule, MenuModule, ActionSheetModule, AvatarModule, ToolbarModule } from '@fundamental-ngx/core';

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
        RouterModule.forChild(routes), SharedDocumentationPageModule,
        FeedListItemModule,
        MenuModule,
        ActionSheetModule,
        AvatarModule,
        ToolbarModule
    ],
    exports: [RouterModule],
    declarations: [
        FeedListItemHeaderComponent,
        FeedListItemDocsComponent,
        ...examples
    ]
})
export class FeedListItemDocsModule { }
