import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import { API_FILES } from '../../api-files';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { PlatformTableHeaderComponent } from './platform-table-header/platform-table-header.component';
import { PlatformTableDocsComponent } from './platform-table-docs.component';
import { PlatformTableDefaultExampleComponent } from './platform-table-examples/platform-table-default-example.component';
import { PlatformTableModule } from '@fundamental-ngx/platform';

const routes: Routes = [
    {
        path: '',
        component: PlatformTableHeaderComponent,
        children: [
            { path: '', component: PlatformTableDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.table } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, CdkTableModule, PlatformTableModule],
    exports: [RouterModule],
    declarations: [
        PlatformTableDocsComponent,
        PlatformTableHeaderComponent,
        PlatformTableDefaultExampleComponent
    ]
})
export class PlatformTableDocsModule {}
