import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformSmartFilterBarModule } from '@fundamental-ngx/platform/smart-filter-bar';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { PlatformSmartFilterBarHeaderComponent } from './platform-smart-filter-bar-header/platform-smart-filter-bar-header.component';
import { PlatformSmartFilterBarDocsComponent } from './platform-smart-filter-bar-docs.component';
import { PlatformSmartFilterBarBasicExampleComponent } from './platform-smart-filter-bar-examples/platform-smart-filter-bar-basic-example.component';
import { PlatformTableModule } from '@fundamental-ngx/platform/table';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';

const routes: Routes = [
    {
        path: '',
        component: PlatformSmartFilterBarHeaderComponent,
        children: [
            { path: '', component: PlatformSmartFilterBarDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.menu } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformTableModule,
        PlatformButtonModule,
        PlatformSmartFilterBarModule,
        FdDatetimeModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformSmartFilterBarDocsComponent,
        PlatformSmartFilterBarHeaderComponent,
        PlatformSmartFilterBarBasicExampleComponent
    ]
})
export class PlatformSmartFilterBarDocsModule {}
