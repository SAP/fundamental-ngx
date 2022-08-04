import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { PlatformThumbnailModule } from '@fundamental-ngx/platform/thumbnail';
import { PlatformThumbnailDocsComponent } from './platform-thumbnail.docs.component';
import { PlatformThumbnailHeaderComponent } from './platform-thumbnail-header/platform-thumbnail-header.component';
import { PlatformThumbnailBasicExampleComponent } from './platform-thumbnail-examples/platform-thumbnail-basic-example.component';
import { PlatformThumbnailHorizontalExampleComponent } from './platform-thumbnail-examples/platform-thumbnail-horizontal-example.component';
import { PlatformThumbnailVideoMediaExampleComponent } from './platform-thumbnail-examples/platform-thumbnail-video-media-example.component';
import { getI18nKey, I18nDocsComponent } from '../../../documentation/core-helpers/i18n-docs/i18n-docs.component';

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
    imports: [RouterModule.forChild(routes), CommonModule, SharedDocumentationPageModule, PlatformThumbnailModule],
    exports: [RouterModule],
    declarations: [
        PlatformThumbnailDocsComponent,
        PlatformThumbnailHeaderComponent,
        PlatformThumbnailBasicExampleComponent,
        PlatformThumbnailHorizontalExampleComponent,
        PlatformThumbnailVideoMediaExampleComponent
    ]
})
export class PlatformThumbnailDocsModule {}
