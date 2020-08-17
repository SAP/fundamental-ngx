import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlatformInputGroupModule, PlatformButtonModule, PlatformInputModule } from '@fundamental-ngx/platform';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';

import { PlatformInputGroupHeaderComponent } from './platform-input-group-header/platform-input-group-header.component';
import { PlatformInputGroupDocsComponent } from './platform-input-group-docs.component';

import { PlatformInputGroupStandardExampleComponent } from './platform-input-group-examples/platform-input-group-standard-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformInputGroupHeaderComponent,
        children: [
            { path: '', component: PlatformInputGroupDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.panel } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        PlatformInputGroupModule,
        PlatformButtonModule,
        PlatformInputModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformInputGroupDocsComponent,
        PlatformInputGroupHeaderComponent,
        PlatformInputGroupStandardExampleComponent
    ]
})
export class PlatformInputGroupDocsModule {}
