import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { PlatformPanelModule, PlatformButtonModule } from '@fundamental-ngx/platform';

import { PlatformPanelHeaderComponent } from './platform-panel-header/platform-panel-header.component';
import { PlatformPanelDocsComponent } from './platform-panel-docs.component';
import { PlatformPanelSimpleExampleComponent } from './platform-panel-examples/platform-panel-simple-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformPanelHeaderComponent,
        children: [
            { path: '', component: PlatformPanelDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.button } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, PlatformPanelModule, PlatformButtonModule],
    exports: [RouterModule],
    declarations: [PlatformPanelDocsComponent, PlatformPanelHeaderComponent, PlatformPanelSimpleExampleComponent]
})
export class PlatformPanelDocsModule {}
