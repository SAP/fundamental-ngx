import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { FeedInputDocsComponent } from './feed-input-docs.component';
import { FeedInputExampleComponent } from './examples/feed-input-example/feed-input-example.component';
import { FeedInputHeaderComponent } from './feed-input-header/feed-input-header.component';
import { FeedInputPlaceholderExampleComponent } from './examples/feed-input-placeholder-example/feed-input-placeholder-example.component';
import { FeedInputNoAvatarExampleComponent } from './examples/feed-input-no-avatar-example/feed-input-no-avatar-example.component';
import { FeedInputDisabledExampleComponent } from './examples/feed-input-disabled-example/feed-input-disabled-example.component';
import { FeedInputGrowExampleComponent } from './examples/feed-input-grow-example/feed-input-grow-example.component';
import { FeedInputModule } from '@fundamental-ngx/core/feed-input';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { FormControlModule } from '@fundamental-ngx/core/form';
import { FeedInputCircleAvatarExampleComponent } from './examples/feed-input-circle-avatar-example/feed-input-circle-avatar-example.component';

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
    imports: [
        RouterModule.forChild(routes),
        FeedInputModule,
        SharedDocumentationPageModule,
        AvatarModule,
        FormControlModule
    ],
    exports: [RouterModule],
    declarations: [
        FeedInputHeaderComponent,
        FeedInputDocsComponent,
        FeedInputExampleComponent,
        FeedInputPlaceholderExampleComponent,
        FeedInputNoAvatarExampleComponent,
        FeedInputDisabledExampleComponent,
        FeedInputGrowExampleComponent,
        FeedInputCircleAvatarExampleComponent
    ],
    providers: [currentComponentProvider('feed-input')]
})
export class FeedInputDocsModule {}
