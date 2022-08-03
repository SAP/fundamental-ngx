import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformPanelModule } from '@fundamental-ngx/platform/panel';
import { PlatformPanelHeaderComponent } from './platform-panel-header/platform-panel-header.component';
import { PlatformPanelDocsComponent } from './platform-panel-docs.component';
import { PlatformPanelExpandableExampleComponent } from './platform-panel-examples/platform-panel-expandable-example.component';
import { PlatformPanelFixedExampleComponent } from './platform-panel-examples/platform-panel-fixed-example.component';
import { PlatformPanelFixedHeightExampleComponent } from './platform-panel-examples/platform-panel-fixed-height-example.component';
import { PlatformPanelCompactExampleComponent } from './platform-panel-examples/platform-panel-compact-example.component';
import { PlatformPanelActionsExampleComponent } from './platform-panel-examples/platform-panel-actions-example.component';
import { PlatformPanelConfigExampleComponent } from './platform-panel-examples/platform-panel-config-example.component';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';

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
    providers: [platformContentDensityModuleDeprecationsProvider('fdp-panel')]
})
export class PlatformPanelDocsModule {}
