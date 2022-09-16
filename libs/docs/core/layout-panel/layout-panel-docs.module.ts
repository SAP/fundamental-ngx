import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { LayoutPanelDocsHeaderComponent } from './layout-panel-docs-header/layout-panel-docs-header.component';
import { LayoutPanelDocsComponent } from './layout-panel-docs.component';
import { LayoutPanelExampleComponent } from './examples/layout-panel-examples.component';
import { LayoutPanelEdgeBleedExampleComponent } from './examples/layout-panel-edge-bleed-example.component';
import { LayoutPanelModule } from '@fundamental-ngx/core/layout-panel';
import { TableModule } from '@fundamental-ngx/core/table';

const routes: Routes = [
    {
        path: '',
        component: LayoutPanelDocsHeaderComponent,
        children: [
            { path: '', component: LayoutPanelDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.layoutPanel } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, LayoutPanelModule, TableModule],
    exports: [RouterModule],
    declarations: [
        LayoutPanelDocsComponent,
        LayoutPanelExampleComponent,
        LayoutPanelDocsHeaderComponent,
        LayoutPanelEdgeBleedExampleComponent
    ],
    providers: [currentComponentProvider('layout-panel')]
})
export class LayoutPanelDocsModule {}
