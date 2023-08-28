import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformPanelModule } from '@fundamental-ngx/platform/panel';
import { PlatformPanelActionsExampleComponent } from './examples/platform-panel-actions-example.component';
import { PlatformPanelCompactExampleComponent } from './examples/platform-panel-compact-example.component';
import { PlatformPanelConfigExampleComponent } from './examples/platform-panel-config-example.component';
import { PlatformPanelExpandableExampleComponent } from './examples/platform-panel-expandable-example.component';
import { PlatformPanelFixedExampleComponent } from './examples/platform-panel-fixed-example.component';
import { PlatformPanelFixedHeightExampleComponent } from './examples/platform-panel-fixed-height-example.component';
import { PlatformPanelDocsComponent } from './platform-panel-docs.component';
import { PlatformPanelHeaderComponent } from './platform-panel-header/platform-panel-header.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformPanelModule,
        PlatformButtonModule,
        PlatformPanelDocsComponent,
        PlatformPanelHeaderComponent,
        PlatformPanelExpandableExampleComponent,
        PlatformPanelFixedExampleComponent,
        PlatformPanelFixedHeightExampleComponent,
        PlatformPanelCompactExampleComponent,
        PlatformPanelActionsExampleComponent,
        PlatformPanelConfigExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('panel')]
})
export class PlatformPanelDocsModule {}
