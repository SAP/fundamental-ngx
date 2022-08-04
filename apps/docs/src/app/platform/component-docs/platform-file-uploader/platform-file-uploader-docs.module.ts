import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FdpFormGroupModule, PlatformFileUploaderModule } from '@fundamental-ngx/platform/form';

import { PlatformFileUploaderDocsComponent } from './platform-file-uploader-docs.component';
import { API_FILES } from '../../api-files';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { PlatformFileUploaderHeaderComponent } from './platform-file-uploader-header/platform-file-uploader-header.component';
import { PlatformFileUploaderExampleComponent } from './platform-file-uploader-examples/platform-file-uploader-example.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { PlatformFileUploaderMinFileSizeExampleComponent } from './platform-file-uploader-examples/platform-file-uploader-min-file-size-example.component';
import { PlatformFileUploaderMaxFileSizeExampleComponent } from './platform-file-uploader-examples/platform-file-uploader-max-file-size-example.component';
import { PlatformFileUploaderCompactExampleComponent } from './platform-file-uploader-examples/platform-file-uploader-compact-example.component';
import { PlatformFileUploaderFileTypesExampleComponent } from './platform-file-uploader-examples/platform-file-uploader-file-types-example.component';
import { PlatformFileUploaderReactiveExampleComponent } from './platform-file-uploader-examples/platform-file-uploader-reactive-example.component';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';

const routes: Routes = [
    {
        path: '',
        component: PlatformFileUploaderHeaderComponent,
        children: [
            { path: '', component: PlatformFileUploaderDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.fileUploader } }
        ]
    }
];
@NgModule({
    declarations: [
        PlatformFileUploaderHeaderComponent,
        PlatformFileUploaderExampleComponent,
        PlatformFileUploaderReactiveExampleComponent,
        PlatformFileUploaderDocsComponent,
        PlatformFileUploaderCompactExampleComponent,
        PlatformFileUploaderMaxFileSizeExampleComponent,
        PlatformFileUploaderMinFileSizeExampleComponent,
        PlatformFileUploaderFileTypesExampleComponent
    ],
    exports: [RouterModule],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformFileUploaderModule,
        FdpFormGroupModule,
        PlatformButtonModule,
        FormsModule
    ],
    providers: [platformContentDensityModuleDeprecationsProvider('fdp-file-uploader')]
})
export class PlatformFileUploaderDocsModule {}
