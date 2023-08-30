import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { GenericTagModule } from '@fundamental-ngx/core/generic-tag';
import { GenericTagDocsComponent } from './generic-tag-docs.component';
import { GenericTagHeaderComponent } from './generic-tag-header/generic-tag-header.component';
import { GenericTagDefaultExampleComponent } from './examples/generic-tag-default-example.component';

const routes: Routes = [
    {
        path: '',
        component: GenericTagHeaderComponent,
        children: [
            { path: '', component: GenericTagDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.genericTag } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, GenericTagModule],
    exports: [RouterModule],
    declarations: [GenericTagDocsComponent, GenericTagHeaderComponent, GenericTagDefaultExampleComponent],
    providers: [currentComponentProvider('generic-tag')]
})
export class GenericTagDocsModule {}
