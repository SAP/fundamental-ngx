import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlatformInputGroupModule, FdpFormGroupModule, PlatformStepInputModule } from '@fundamental-ngx/platform';

import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../../api-files';
import { SharedDocumentationModule } from '../../../../documentation/shared-documentation.module';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';

import { PlatformInputGroupHeaderComponent } from './platform-input-group-header/platform-input-group-header.component';
import { PlatformInputGroupDocsComponent } from './platform-input-group-docs.component';

import { PlatformInputGroupStandardExampleComponent } from './platform-input-group-examples/platform-input-group-standard-example.component';
import { PlatformInputGroupCompactExampleComponent } from './platform-input-group-examples/platform-input-group-compact-example.component';
import { PlatformInputGroupDisabledExampleComponent } from './platform-input-group-examples/platform-input-group-disabled-example.component';
import { PlatformInputGroupFormExampleComponent } from './platform-input-group-examples/platform-input-group-form-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformInputGroupHeaderComponent,
        children: [
            { path: '', component: PlatformInputGroupDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.inputGroup } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        SharedDocumentationPageModule,
        FdpFormGroupModule,
        PlatformInputGroupModule,
        PlatformStepInputModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformInputGroupDocsComponent,
        PlatformInputGroupHeaderComponent,
        PlatformInputGroupStandardExampleComponent,
        PlatformInputGroupCompactExampleComponent,
        PlatformInputGroupDisabledExampleComponent,
        PlatformInputGroupFormExampleComponent
    ]
})
export class PlatformInputGroupDocsModule {}
