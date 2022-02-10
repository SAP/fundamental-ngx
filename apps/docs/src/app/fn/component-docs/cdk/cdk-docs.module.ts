import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { CdkHeaderComponent } from './cdk-header/cdk-header.component';
import { CdkDocsComponent } from './cdk-docs.component';
import { examples } from './examples';
import { CdkModule } from '@fundamental-ngx/fn/cdk';

const routes: Routes = [
    {
        path: '',
        component: CdkHeaderComponent,
        children: [
            { path: '', component: CdkDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.cdk } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, CdkModule],
    exports: [RouterModule],
    declarations: [examples, CdkDocsComponent, CdkHeaderComponent]
})
export class CdkDocsModule {}
