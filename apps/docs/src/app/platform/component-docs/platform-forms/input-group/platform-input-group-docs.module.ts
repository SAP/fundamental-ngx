import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IconModule } from '@fundamental-ngx/core/icon';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformInputGroupModule, FdpFormGroupModule } from '@fundamental-ngx/platform/form';

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
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';

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
        PlatformButtonModule,
        IconModule,
        PlatformInputGroupModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformInputGroupDocsComponent,
        PlatformInputGroupHeaderComponent,
        PlatformInputGroupStandardExampleComponent,
        PlatformInputGroupCompactExampleComponent,
        PlatformInputGroupDisabledExampleComponent,
        PlatformInputGroupFormExampleComponent
    ],
    providers: [
        platformContentDensityModuleDeprecationsProvider('fdp-input-group'),
        platformContentDensityModuleDeprecationsProvider('fdp-input-group-addon-body')
    ]
})
export class PlatformInputGroupDocsModule {}
