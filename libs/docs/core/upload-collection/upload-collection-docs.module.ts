import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { FileUploaderModule } from '@fundamental-ngx/core/file-uploader';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ListModule } from '@fundamental-ngx/core/list';
import { MessagePageModule } from '@fundamental-ngx/core/message-page';
import { ObjectMarkerModule } from '@fundamental-ngx/core/object-marker';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { UploadCollectionModule } from '@fundamental-ngx/core/upload-collection';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import {
    ApiComponent,
    SharedDocumentationModule,
    SharedDocumentationPageModule,
    currentComponentProvider
} from '@fundamental-ngx/docs/shared';
import { UploadCollectionComplexExampleComponent } from './examples/upload-collection-complex-example.component';
import { UploadCollectionCustomExampleComponent } from './examples/upload-collection-custom-example.component';
import { UploadCollectionEmptyExampleComponent } from './examples/upload-collection-empty-example.component';
import { UploadCollectionExampleComponent } from './examples/upload-collection-example.component';
import { UploadCollectionSmallExampleComponent } from './examples/upload-collection-small-example.component';
import { UploadCollectionDocsComponent } from './upload-collection-docs.component';
import { UploadCollectionHeaderComponent } from './upload-collection-header/upload-collection-header.component';

const routes: Routes = [
    {
        path: '',
        component: UploadCollectionHeaderComponent,
        children: [
            { path: '', component: UploadCollectionDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.uploadCollection } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        UploadCollectionModule,
        SharedDocumentationPageModule,
        ListModule,
        ObjectStatusModule,
        ObjectMarkerModule,
        MessagePageModule,
        ToolbarModule,
        DialogModule,
        FileUploaderModule,
        CheckboxModule,
        InputGroupModule,
        UploadCollectionHeaderComponent,
        UploadCollectionDocsComponent,
        UploadCollectionExampleComponent,
        UploadCollectionSmallExampleComponent,
        UploadCollectionCustomExampleComponent,
        UploadCollectionEmptyExampleComponent,
        UploadCollectionComplexExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('upload-collection')]
})
export class UploadCollectionDocsModule {}
