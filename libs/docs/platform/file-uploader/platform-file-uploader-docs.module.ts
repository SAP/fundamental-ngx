import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FdpFormGroupModule, PlatformFileUploaderModule } from '@fundamental-ngx/platform/form';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { PlatformFileUploaderCompactExampleComponent } from './examples/platform-file-uploader-compact-example.component';
import { PlatformFileUploaderExampleComponent } from './examples/platform-file-uploader-example.component';
import { PlatformFileUploaderFileTypesExampleComponent } from './examples/platform-file-uploader-file-types-example.component';
import { PlatformFileUploaderMaxFileSizeExampleComponent } from './examples/platform-file-uploader-max-file-size-example.component';
import { PlatformFileUploaderMinFileSizeExampleComponent } from './examples/platform-file-uploader-min-file-size-example.component';
import { PlatformFileUploaderReactiveExampleComponent } from './examples/platform-file-uploader-reactive-example.component';
import { PlatformFileUploaderDocsComponent } from './platform-file-uploader-docs.component';
import { PlatformFileUploaderHeaderComponent } from './platform-file-uploader-header/platform-file-uploader-header.component';

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
    exports: [RouterModule],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformFileUploaderModule,
        FdpFormGroupModule,
        PlatformButtonModule,
        FormsModule,
        PlatformFileUploaderHeaderComponent,
        PlatformFileUploaderExampleComponent,
        PlatformFileUploaderReactiveExampleComponent,
        PlatformFileUploaderDocsComponent,
        PlatformFileUploaderCompactExampleComponent,
        PlatformFileUploaderMaxFileSizeExampleComponent,
        PlatformFileUploaderMinFileSizeExampleComponent,
        PlatformFileUploaderFileTypesExampleComponent
    ],
    providers: [currentComponentProvider('file-uploader')]
})
export class PlatformFileUploaderDocsModule {}
