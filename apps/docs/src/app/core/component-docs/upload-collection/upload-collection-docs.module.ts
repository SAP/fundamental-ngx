import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { UploadCollectionDocsComponent } from './upload-collection-docs.component';
import { UploadCollectionExampleComponent } from './examples/upload-collection-example.component';
import { UploadCollectionHeaderComponent } from './upload-collection-header/upload-collection-header.component';
import { UploadCollectionModule } from '@fundamental-ngx/core/upload-collection';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import {
    CheckboxModule,
    DialogModule,
    FileUploaderModule,
    InputGroupModule,
    ListModule,
    MessagePageModule,
    ObjectMarkerModule,
    ObjectStatusModule,
    ToolbarModule
} from '@fundamental-ngx/core';
import { UploadCollectionSmallExampleComponent } from './examples/upload-collection-small-example.component';
import { UploadCollectionCustomExampleComponent } from './examples/upload-collection-custom-example.component';
import { UploadCollectionEmptyExampleComponent } from './examples/upload-collection-empty-example.component';
import { UploadCollectionComplexExampleComponent } from './examples/upload-collection-complex-example.component';

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
    ]
})
export class UploadCollectionDocsModule {}
