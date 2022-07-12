import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericTagModule } from '@fundamental-ngx/fn/generic-tag';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { TagHeaderComponent } from './tag-header/tag-header.component';
import { GenericTagDocsComponent } from './generic-tag-docs.component';
import { examples } from './examples';

const routes: Routes = [
    {
        path: '',
        component: TagHeaderComponent,
        children: [
            {
                path: '',
                component: GenericTagDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.tabs } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, GenericTagModule],
    exports: [RouterModule],
    declarations: [examples, TagHeaderComponent, GenericTagDocsComponent]
})
export class GenericTagDocsModule {}
