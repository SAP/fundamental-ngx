import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { ThemingHeaderComponent } from './theming-header/theming-header.component';
import { ThemingDocsComponent } from './theming-docs.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { examples } from './examples';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';

const routes: Routes = [
    {
        path: '',
        component: ThemingHeaderComponent,
        children: [
            { path: '', component: ThemingDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.theming } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, ObjectStatusModule],
    exports: [RouterModule],
    declarations: [ThemingDocsComponent, ThemingHeaderComponent, examples]
})
export class ThemingDocsModule {}
