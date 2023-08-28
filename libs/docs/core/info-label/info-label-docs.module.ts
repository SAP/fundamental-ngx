import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import {
    InfoLableDefaultExampleComponent,
    InfoLableNumericIconExampleComponent,
    InfoLableTextExampleComponent,
    InfoLableTextIconExampleComponent
} from './examples/info-label-examples.component';
import { InfoLabelDocsComponent } from './info-label-docs.component';
import { InfoLabelHeaderComponent } from './info-label-header/info-label-header.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        InfoLabelModule,
        InfoLabelDocsComponent,
        InfoLabelHeaderComponent,
        InfoLableDefaultExampleComponent,
        InfoLableTextExampleComponent,
        InfoLableTextIconExampleComponent,
        InfoLableNumericIconExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('info-label')]
})
export class InfoLabelDocsModule {}
