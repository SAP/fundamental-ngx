import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlatformUploadCollectionModule } from '@fundamental-ngx/platform/upload-collection';

import { API_FILES } from '../../api-files';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { PlatformUploadColletionDocsComponent } from './platform-upload-collection-docs.component';
import { PlatformUploadCollectionExampleComponent } from './platform-upload-collection-examples/platform-upload-collection-example.component';
import { PlatformUploadCollectionDisabledExampleComponent } from './platform-upload-collection-examples/platform-upload-collection-disabled-example.component';
import { PlatformUploadCollectionReadonlyExampleComponent } from './platform-upload-collection-examples/platform-upload-collection-readonly-example.component';
import { PlatformUploadCollectionTurnOffExampleComponent } from './platform-upload-collection-examples/platform-upload-collection-turn-off-example.component';
import { PlatformUploadCollectionHeaderComponent } from './platform-upload-collection-header/platform-upload-collection-header.component';
import { getI18nKey, I18nDocsComponent } from '../../../documentation/core-helpers/i18n-docs/i18n-docs.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformUploadCollectionHeaderComponent,
        children: [
            { path: '', component: PlatformUploadColletionDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.uploadCollection } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformUploadCollection') }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, PlatformUploadCollectionModule],
    exports: [RouterModule],
    declarations: [
        PlatformUploadCollectionHeaderComponent,
        PlatformUploadColletionDocsComponent,
        PlatformUploadCollectionExampleComponent,
        PlatformUploadCollectionDisabledExampleComponent,
        PlatformUploadCollectionReadonlyExampleComponent,
        PlatformUploadCollectionTurnOffExampleComponent
    ]
})
export class PlatformUploadCollectionDocsModule {}
