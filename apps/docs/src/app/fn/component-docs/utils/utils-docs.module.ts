import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { UtilsHeaderComponent } from './utils-header/utils-header.component';
import { UtilsDocsComponent } from './utils-docs.component';
import { examples } from './examples';
import { UtilsModule } from '@fundamental-ngx/fn/utils';

const routes: Routes = [
    {
        path: '',
        component: UtilsHeaderComponent,
        children: [
            { path: '', component: UtilsDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.utils } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, UtilsModule],
    exports: [RouterModule],
    declarations: [examples, UtilsDocsComponent, UtilsHeaderComponent]
})
export class UtilsDocsModule {}
