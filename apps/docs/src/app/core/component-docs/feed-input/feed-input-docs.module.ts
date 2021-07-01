import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { FeedInputDocsComponent } from './feed-input-docs.component';
import { FeedInputExampleComponent } from './examples/feed-input-example/feed-input-example.component';
import { FeedInputHeaderComponent } from './feed-input-header/feed-input-header.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { FeedInputPlaceholderExampleComponent } from './examples/feed-input-placeholder-example/feed-input-placeholder-example.component';
import { FeedInputNoAvatarExampleComponent } from './examples/feed-input-no-avatar-example/feed-input-no-avatar-example.component';
import { FeedInputDisabledExampleComponent } from './examples/feed-input-disabled-example/feed-input-disabled-example.component';
import { FeedInputGrowExampleComponent } from './examples/feed-input-grow-example/feed-input-grow-example.component';
import { FeedInputModule } from '@fundamental-ngx/core/feed-input';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { FormControlModule } from '@fundamental-ngx/core/form';

const routes: Routes = [
    {
        path: '',
        component: FeedInputHeaderComponent,
        children: [
            { path: '', component: FeedInputDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.feedInput } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), FeedInputModule, SharedDocumentationPageModule, AvatarModule, FormControlModule],
    exports: [RouterModule],
    declarations: [
        FeedInputHeaderComponent,
        FeedInputDocsComponent,
        FeedInputExampleComponent,
        FeedInputPlaceholderExampleComponent,
        FeedInputNoAvatarExampleComponent,
        FeedInputDisabledExampleComponent,
        FeedInputGrowExampleComponent
    ]
})
export class FeedInputDocsModule {}
