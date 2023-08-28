import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import {
    ApiComponent,
    currentComponentProvider,
    getI18nKey,
    I18nDocsComponent,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';

import { PlatformThumbnailModule } from '@fundamental-ngx/platform/thumbnail';
import { PlatformThumbnailBasicExampleComponent } from './examples/platform-thumbnail-basic-example.component';
import { PlatformThumbnailHorizontalExampleComponent } from './examples/platform-thumbnail-horizontal-example.component';
import { PlatformThumbnailVideoMediaExampleComponent } from './examples/platform-thumbnail-video-media-example.component';
import { PlatformThumbnailHeaderComponent } from './platform-thumbnail-header/platform-thumbnail-header.component';
import { PlatformThumbnailDocsComponent } from './platform-thumbnail.docs.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformThumbnailHeaderComponent,
        children: [
            { path: '', component: PlatformThumbnailDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.thumbnail } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformThumbnail') }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedDocumentationPageModule,
        PlatformThumbnailModule,
        PlatformThumbnailDocsComponent,
        PlatformThumbnailHeaderComponent,
        PlatformThumbnailBasicExampleComponent,
        PlatformThumbnailHorizontalExampleComponent,
        PlatformThumbnailVideoMediaExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('thumbnail')]
})
export class PlatformThumbnailDocsModule {}
