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
import { ListModule, ObjectMarkerModule, ObjectStatusModule } from '@fundamental-ngx/core';

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
        ObjectMarkerModule
    ],
    exports: [RouterModule],
    declarations: [UploadCollectionHeaderComponent, UploadCollectionDocsComponent, UploadCollectionExampleComponent]
})
export class UploadCollectionDocsModule {}
