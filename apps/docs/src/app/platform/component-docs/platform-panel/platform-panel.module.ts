import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { PlatformPanelModule, PlatformButtonModule } from '@fundamental-ngx/platform';

import { PlatformPanelHeaderComponent } from './platform-panel-header/platform-panel-header.component';
import { PlatformPanelDocsComponent } from './platform-panel-docs.component';

import { PlatformPanelExpandableExampleComponent } from './platform-panel-examples/platform-panel-expandable-example.component';
import { PlatformPanelFixedExampleComponent } from './platform-panel-examples/platform-panel-fixed-example.component';
import { PlatformPanelFixedHeightExampleComponent } from './platform-panel-examples/platform-panel-fixed-height-example.component';
import { PlatformPanelCompactExampleComponent } from './platform-panel-examples/platform-panel-compact-example.component';
import { PlatformPanelActionsExampleComponent } from './platform-panel-examples/platform-panel-actions-example.component';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, PlatformPanelModule, PlatformButtonModule],
    exports: [RouterModule],
    declarations: [
        PlatformPanelDocsComponent,
        PlatformPanelHeaderComponent,
        PlatformPanelExpandableExampleComponent,
        PlatformPanelFixedExampleComponent,
        PlatformPanelFixedHeightExampleComponent,
        PlatformPanelCompactExampleComponent,
        PlatformPanelActionsExampleComponent
    ]
})
export class PlatformPanelDocsModule {}
