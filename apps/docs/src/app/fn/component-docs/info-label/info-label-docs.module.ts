import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { InfoLabelHeaderComponent } from './info-label-header/info-label-header.component';
import { InfoLabelDocsComponent } from './info-label-docs.component';
import { examples } from './examples';
import { InfoLabelModule } from '@fundamental-ngx/fn/info-label';

const routes: Routes = [
    {
        path: '',
        component: InfoLabelHeaderComponent,
        children: [
            { path: '', component: InfoLabelDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.infoLabel } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, InfoLabelModule],
    exports: [RouterModule],
    declarations: [examples, InfoLabelDocsComponent, InfoLabelHeaderComponent]
})
export class InfoLabelDocsModule {}
