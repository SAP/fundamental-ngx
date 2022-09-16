import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';

import { PlatformFeedInputHeaderComponent } from './platform-feed-input-header/platform-feed-input-header.component';
import { PlatformFeedInputExampleComponent } from './examples/platform-feed-input-example/platform-feed-input-example.component';
import { PlatformFeedInputDocsComponent } from './platform-feed-input-docs.component';

import { PlatformFeedInputModule } from '@fundamental-ngx/platform/feed-input';
import { PlatformFeedInputPlaceholderExampleComponent } from './examples/platform-feed-input-placeholder-example/platform-feed-input-placeholder-example.component';
import { PlatformFeedInputNoAvatarExampleComponent } from './examples/platform-feed-input-no-avatar-example/platform-feed-input-no-avatar-example.component';
import { PlatformFeedInputDisabledExampleComponent } from './examples/platform-feed-input-disabled-example/platform-feed-input-disabled-example.component';
import { PlatformFeedInputMaxHeightExampleComponent } from './examples/platform-feed-input-max-height-example/platform-feed-input-max-height-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformFeedInputHeaderComponent,
        children: [
            { path: '', component: PlatformFeedInputDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.feedInput } }
        ]
    }
];

@NgModule({
    declarations: [
        PlatformFeedInputHeaderComponent,
        PlatformFeedInputDocsComponent,
        PlatformFeedInputExampleComponent,
        PlatformFeedInputPlaceholderExampleComponent,
        PlatformFeedInputNoAvatarExampleComponent,
        PlatformFeedInputDisabledExampleComponent,
        PlatformFeedInputMaxHeightExampleComponent
    ],
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, PlatformFeedInputModule],
    exports: [RouterModule],
    providers: [currentComponentProvider('feed-input')]
})
export class PlatformFeedInputDocsModule {}
