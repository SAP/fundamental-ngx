import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlatformUploadCollectionModule } from '@fundamental-ngx/platform/upload-collection';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import {
    ApiComponent,
    currentComponentProvider,
    getI18nKey,
    I18nDocsComponent,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';
import { PlatformUploadColletionDocsComponent } from './platform-upload-collection-docs.component';
import { PlatformUploadCollectionExampleComponent } from './examples/platform-upload-collection-example.component';
import { PlatformUploadCollectionDisabledExampleComponent } from './examples/platform-upload-collection-disabled-example.component';
import { PlatformUploadCollectionReadonlyExampleComponent } from './examples/platform-upload-collection-readonly-example.component';
import { PlatformUploadCollectionTurnOffExampleComponent } from './examples/platform-upload-collection-turn-off-example.component';
import { PlatformUploadCollectionHeaderComponent } from './platform-upload-collection-header/platform-upload-collection-header.component';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';

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
    ],
    providers: [
        platformContentDensityModuleDeprecationsProvider('fdp-upload-collection'),
        currentComponentProvider('upload-collection')
    ]
})
export class PlatformUploadCollectionDocsModule {}
