import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';

import { PlatformFeedInputExampleComponent } from './examples/platform-feed-input-example/platform-feed-input-example.component';
import { PlatformFeedInputDocsComponent } from './platform-feed-input-docs.component';
import { PlatformFeedInputHeaderComponent } from './platform-feed-input-header/platform-feed-input-header.component';

import { FdPatchLanguageDirective } from '@fundamental-ngx/i18n';
import { PlatformFeedInputModule } from '@fundamental-ngx/platform/feed-input';
import { PlatformFeedInputDisabledExampleComponent } from './examples/platform-feed-input-disabled-example/platform-feed-input-disabled-example.component';
import { PlatformFeedInputMaxHeightExampleComponent } from './examples/platform-feed-input-max-height-example/platform-feed-input-max-height-example.component';
import { PlatformFeedInputNoAvatarExampleComponent } from './examples/platform-feed-input-no-avatar-example/platform-feed-input-no-avatar-example.component';
import { PlatformFeedInputPlaceholderExampleComponent } from './examples/platform-feed-input-placeholder-example/platform-feed-input-placeholder-example.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformFeedInputModule,
        FdPatchLanguageDirective,
        PlatformFeedInputHeaderComponent,
        PlatformFeedInputDocsComponent,
        PlatformFeedInputExampleComponent,
        PlatformFeedInputPlaceholderExampleComponent,
        PlatformFeedInputNoAvatarExampleComponent,
        PlatformFeedInputDisabledExampleComponent,
        PlatformFeedInputMaxHeightExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('feed-input')]
})
export class PlatformFeedInputDocsModule {}
