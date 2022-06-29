import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { TruncateDocsHeaderComponent } from './truncate-docs-header/truncate-docs-header.component';
import { TruncateDocsComponent } from './truncate-docs.component';
import { TruncateExampleComponent } from './examples/truncate-example.component';
import { TruncateModule } from '@fundamental-ngx/core/utils';
import { IconModule } from '@fundamental-ngx/core/icon';

const routes: Routes = [
    {
        path: '',
        component: TruncateDocsHeaderComponent,
        children: [
            { path: '', component: TruncateDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.truncate } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, TruncateModule, IconModule],
    exports: [RouterModule],
    declarations: [TruncateDocsComponent, TruncateExampleComponent, TruncateDocsHeaderComponent]
})
export class TruncateDocsModule {}
