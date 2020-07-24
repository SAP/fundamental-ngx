import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { GlobalConfigHeaderComponent } from './global-config-header/global-config-header.component';
import { GlobalConfigDocsComponent } from './global-config-docs.component';

const routes: Routes = [
    {
        path: '',
        component: GlobalConfigHeaderComponent,
        children: [
            {path: '', component: GlobalConfigDocsComponent},
            {path: 'api', component: ApiComponent, data: {content: API_FILES.globalConfig}}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule],
    exports: [RouterModule],
    declarations: [GlobalConfigDocsComponent, GlobalConfigHeaderComponent]
})
export class GlobalConfigDocsModule {
}
