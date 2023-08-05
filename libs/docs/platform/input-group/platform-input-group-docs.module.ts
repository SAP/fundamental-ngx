import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IconModule } from '@fundamental-ngx/core/icon';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FdpFormGroupModule, PlatformInputGroupModule } from '@fundamental-ngx/platform/form';

import {
    ApiComponent,
    currentComponentProvider,
    SharedDocumentationModule,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';

import { PlatformInputGroupHeaderComponent } from './platform-input-group-header/platform-input-group-header.component';
import { PlatformInputGroupDocsComponent } from './platform-input-group-docs.component';

import { PlatformInputGroupStandardExampleComponent } from './examples/platform-input-group-standard-example.component';
import { PlatformInputGroupCompactExampleComponent } from './examples/platform-input-group-compact-example.component';
import { PlatformInputGroupDisabledExampleComponent } from './examples/platform-input-group-disabled-example.component';
import { PlatformInputGroupFormExampleComponent } from './examples/platform-input-group-form-example.component';


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
        platformContentDensityModuleDeprecationsProvider('fdp-input-group-addon-body'),
        currentComponentProvider('input-group')
    ]
})
export class PlatformInputGroupDocsModule {}
