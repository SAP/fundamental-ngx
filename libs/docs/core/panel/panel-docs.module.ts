import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelModule } from '@fundamental-ngx/core/panel';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { PanelCompactExampleComponent } from './examples/panel-compact-example.component';
import { PanelExpandableExampleComponent } from './examples/panel-expandable-examples.component';
import { PanelFixedExampleComponent } from './examples/panel-fixed-example.component';
import { PanelFixedHeightExampleComponent } from './examples/panel-fixed-height-example.component';
import { PanelDocsHeaderComponent } from './panel-docs-header/panel-docs-header.component';
import { PanelDocsComponent } from './panel-docs.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PanelModule,
        PanelDocsComponent,
        PanelExpandableExampleComponent,
        PanelDocsHeaderComponent,
        PanelFixedExampleComponent,
        PanelCompactExampleComponent,
        PanelFixedHeightExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('panel')]
})
export class PanelDocsModule {}
