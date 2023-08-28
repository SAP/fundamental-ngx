import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { examples } from './examples';
import { LayoutGridDocsHeaderComponent } from './layout-grid-docs-header/layout-grid-docs-header.component';
import { LayoutGridDocsComponent } from './layout-grid-docs.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        LayoutGridModule,
        examples,
        LayoutGridDocsComponent,
        LayoutGridDocsHeaderComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('layout-grid')]
})
export class LayoutGridDocsModule {}
