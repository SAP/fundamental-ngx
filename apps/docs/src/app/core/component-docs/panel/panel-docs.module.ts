import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { API_FILES } from '../../api-files';
import { PanelDocsHeaderComponent } from './panel-docs-header/panel-docs-header.component';
import { PanelDocsComponent } from './panel-docs.component';
import { PanelExampleComponent } from './examples/panel-examples.component';
import { PanelEdgeBleedExampleComponent } from './examples/panel-edge-bleed-example.component';
import { PanelModule, TableModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: PanelDocsHeaderComponent,
        children: [
            { path: '', component: PanelDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.panel } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, PanelModule, TableModule],
    exports: [RouterModule],
    declarations: [PanelDocsComponent, PanelExampleComponent, PanelDocsHeaderComponent, PanelEdgeBleedExampleComponent]
})
export class PanelDocsModule {}
