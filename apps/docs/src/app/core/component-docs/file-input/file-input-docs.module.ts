import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { FileInputHeaderComponent } from './file-input-header/file-input-header.component';
import { FileInputDocsComponent } from './file-input-docs.component';
import { API_FILES } from '../../api-files';
import { FileInputExampleComponent } from './examples/file-input-example/file-input-example.component';
import { FileInputCustomExampleComponent } from './examples/file-input-custom-example/file-input-custom-example.component';
import { FileInputDragDisabledExampleComponent } from './examples/file-input-drag-disabled-example/file-input-drag-disabled-example.component';
import { FileInputMaxExampleComponent } from './examples/file-input-max-example/file-input-max-example.component';
import { FileInputModule, FormModule } from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

const routes: Routes = [
    {
        path: '',
        component: FileInputHeaderComponent,
        children: [
            { path: '', component: FileInputDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.fileInput } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, FormModule, FileInputModule],
    exports: [RouterModule],
    declarations: [
        FileInputDocsComponent,
        FileInputHeaderComponent,
        FileInputExampleComponent,
        FileInputMaxExampleComponent,
        FileInputCustomExampleComponent,
        FileInputDragDisabledExampleComponent
    ]
})
export class FileInputDocsModule {}
