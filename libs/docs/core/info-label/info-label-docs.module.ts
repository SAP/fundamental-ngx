import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { InfoLabelDocsComponent } from './info-label-docs.component';
import {
    InfoLableDefaultExampleComponent,
    InfoLableNumericIconExampleComponent,
    InfoLableTextExampleComponent,
    InfoLableTextIconExampleComponent
} from './examples/info-label-examples.component';
import { InfoLabelHeaderComponent } from './info-label-header/info-label-header.component';
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
    ],
    providers: [currentComponentProvider('info-label')]
})
export class InfoLabelDocsModule {}
