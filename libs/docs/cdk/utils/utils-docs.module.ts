import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/cdk/shared';
import { UtilsHeaderComponent } from './utils-header/utils-header.component';
import { UtilsDocsComponent } from './utils-docs.component';
import { examples } from './examples';
import { UtilsModule } from '@fundamental-ngx/cdk/utils';

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
    declarations: [examples, UtilsDocsComponent, UtilsHeaderComponent],
    providers: [currentComponentProvider('utils')]
})
export class UtilsDocsModule {}
