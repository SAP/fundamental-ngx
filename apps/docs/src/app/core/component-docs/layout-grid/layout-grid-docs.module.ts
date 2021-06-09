import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { LayoutGridDocsComponent } from './layout-grid-docs.component';
import { LayoutGridDocsHeaderComponent } from './layout-grid-docs-header/layout-grid-docs-header.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { examples } from './examples';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';

const routes: Routes = [
    {
        path: '',
        component: LayoutGridDocsHeaderComponent,
        children: [
            { path: '', component: LayoutGridDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.layoutGrid } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, LayoutGridModule],
    exports: [RouterModule],
    declarations: [examples, LayoutGridDocsComponent, LayoutGridDocsHeaderComponent]
})
export class LayoutGridDocsModule {}
