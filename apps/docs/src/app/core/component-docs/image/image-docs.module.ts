import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { ImageHeaderComponent } from './image-header/image-header.component';
import { ImageDocsComponent } from './image-docs.component';
import { ImageShapesExampleComponent, ImageSizesExampleComponent } from './examples/image-examples.component';
import { ImageModule } from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

const routes: Routes = [
    {
        path: '',
        component: ImageHeaderComponent,
        children: [
            { path: '', component: ImageDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.image } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, ImageModule],
    exports: [RouterModule],
    declarations: [ImageDocsComponent, ImageHeaderComponent, ImageSizesExampleComponent, ImageShapesExampleComponent]
})
export class ImageDocsModule {}
