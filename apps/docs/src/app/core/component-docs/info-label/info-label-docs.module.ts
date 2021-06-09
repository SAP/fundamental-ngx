import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { InfoLabelDocsComponent } from './info-label-docs.component';
import {
    InfoLableDefaultExampleComponent,
    InfoLableTextExampleComponent,
    InfoLableTextIconExampleComponent,
    InfoLableNumericIconExampleComponent
} from './examples/info-label-examples.component';
import { InfoLabelHeaderComponent } from './info-label-header/info-label-header.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';

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
    declarations: [
        InfoLabelDocsComponent,
        InfoLabelHeaderComponent,
        InfoLableDefaultExampleComponent,
        InfoLableTextExampleComponent,
        InfoLableTextIconExampleComponent,
        InfoLableNumericIconExampleComponent
    ]
})
export class InfoLabelDocsModule {}
