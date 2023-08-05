import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformPanelModule } from '@fundamental-ngx/platform/panel';
import { PlatformPanelHeaderComponent } from './platform-panel-header/platform-panel-header.component';
import { PlatformPanelDocsComponent } from './platform-panel-docs.component';
import { PlatformPanelExpandableExampleComponent } from './examples/platform-panel-expandable-example.component';
import { PlatformPanelFixedExampleComponent } from './examples/platform-panel-fixed-example.component';
import { PlatformPanelFixedHeightExampleComponent } from './examples/platform-panel-fixed-height-example.component';
import { PlatformPanelCompactExampleComponent } from './examples/platform-panel-compact-example.component';
import { PlatformPanelActionsExampleComponent } from './examples/platform-panel-actions-example.component';
import { PlatformPanelConfigExampleComponent } from './examples/platform-panel-config-example.component';


const routes: Routes = [
    {
        path: '',
        component: PlatformPanelHeaderComponent,
        children: [
            { path: '', component: PlatformPanelDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.panel } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, PlatformPanelModule, PlatformButtonModule],
    exports: [RouterModule],
    declarations: [
        PlatformPanelDocsComponent,
        PlatformPanelHeaderComponent,
        PlatformPanelExpandableExampleComponent,
        PlatformPanelFixedExampleComponent,
        PlatformPanelFixedHeightExampleComponent,
        PlatformPanelCompactExampleComponent,
        PlatformPanelActionsExampleComponent,
        PlatformPanelConfigExampleComponent
    ],
    providers: [platformContentDensityModuleDeprecationsProvider('fdp-panel'), currentComponentProvider('panel')]
})
export class PlatformPanelDocsModule {}
