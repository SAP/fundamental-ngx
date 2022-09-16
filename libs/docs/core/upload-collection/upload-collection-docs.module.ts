import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    ApiComponent,
    currentComponentProvider,
    SharedDocumentationModule,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { UploadCollectionDocsComponent } from './upload-collection-docs.component';
import { UploadCollectionExampleComponent } from './examples/upload-collection-example.component';
import { UploadCollectionHeaderComponent } from './upload-collection-header/upload-collection-header.component';
import { UploadCollectionModule } from '@fundamental-ngx/core/upload-collection';
import { UploadCollectionSmallExampleComponent } from './examples/upload-collection-small-example.component';
import { UploadCollectionCustomExampleComponent } from './examples/upload-collection-custom-example.component';
import { UploadCollectionEmptyExampleComponent } from './examples/upload-collection-empty-example.component';
import { UploadCollectionComplexExampleComponent } from './examples/upload-collection-complex-example.component';
import { ListModule } from '@fundamental-ngx/core/list';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { ObjectMarkerModule } from '@fundamental-ngx/core/object-marker';
import { MessagePageModule } from '@fundamental-ngx/core/message-page';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { FileUploaderModule } from '@fundamental-ngx/core/file-uploader';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';

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
        InputGroupModule
    ],
    exports: [RouterModule],
    declarations: [
        UploadCollectionHeaderComponent,
        UploadCollectionDocsComponent,
        UploadCollectionExampleComponent,
        UploadCollectionSmallExampleComponent,
        UploadCollectionCustomExampleComponent,
        UploadCollectionEmptyExampleComponent,
        UploadCollectionComplexExampleComponent
    ],
    providers: [currentComponentProvider('upload-collection')]
})
export class UploadCollectionDocsModule {}
