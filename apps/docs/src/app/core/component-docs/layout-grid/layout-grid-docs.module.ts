import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { LayoutGridDocsComponent } from './layout-grid-docs.component';
import {
    LayoutColumnsExampleComponent,
    LayoutGridColumnSpanExampleComponent,
    LayoutGridExampleComponent,
    LayoutGridGapSizeExample,
    LayoutGridNoGapExampleComponent
} from './examples/layout-grid-examples.component';
import { LayoutGridDocsHeaderComponent } from './layout-grid-docs-header/layout-grid-docs-header.component';
import { LayoutGridModule, LayoutPanelModule } from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, LayoutGridModule, LayoutPanelModule],
    exports: [RouterModule],
    declarations: [
        LayoutGridDocsComponent,
        LayoutGridGapSizeExample,
        LayoutGridExampleComponent,
        LayoutGridDocsHeaderComponent,
        LayoutColumnsExampleComponent,
        LayoutGridNoGapExampleComponent,
        LayoutGridColumnSpanExampleComponent
    ]
})
export class LayoutGridDocsModule {}
